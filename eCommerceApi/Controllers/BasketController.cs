using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
        }



        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(Guid productId, int quantity)
        {
            // get basket || create basket
            var basket = await RetrieveBasket();
            if (basket == null) basket = await CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
                return StatusCode(StatusCodes.Status400BadRequest, new ProblemDetails
                {
                    Title = "Product Not Found"
                });
            // add item
            basket.AddItem(product, quantity);

            var results = await _context.SaveChangesAsync() > 0;
            // save changes


            if (results) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
            return StatusCode(StatusCodes.Status400BadRequest, new ProblemDetails
            {
                Title = "Problem saving items to basket"
            });
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(Guid productId, int quantity)
        {
            // get basket
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            // remove item or reduce quantity
            basket.RemoveItem(productId, quantity);

            if (basket.Items.Count <= 0)
                await RemoveBasket();
            // save changes
            var results = await _context.SaveChangesAsync() > 0;
            if (results)
            {
                return StatusCode(StatusCodes.Status200OK);
            }
            return StatusCode(StatusCodes.Status400BadRequest, new ProblemDetails
            {
                Title = "Problem removing item from the basket"
            });
        }


        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId.ToString() == Request.Cookies["buyerId"]);
        }
        private async Task<Basket> CreateBasket()
        {
            var buyerId = Guid.NewGuid();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30),
                HttpOnly = false
            };

            Response.Cookies.Append("buyerId", buyerId.ToString(), cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            await _context.Baskets.AddAsync(basket);
            return basket;
        }

        private async Task RemoveBasket()
        {
            var basket = await _context.Baskets.SingleOrDefaultAsync(b => b.BuyerId.ToString() == Request.Cookies["buyerId"]);
            _context.Baskets.Remove(basket);
        }

        string GetCookieValueFromResponse(HttpResponse response, string cookieName)
        {
            foreach (var headers in response.Headers)
            {
                if (headers.Key != "Set-Cookie")
                    continue;
                string header = headers.Value;
                if (header.StartsWith($"{cookieName}="))
                {
                    var p1 = header.IndexOf('=');
                    var p2 = header.IndexOf(';');
                    return header.Substring(p1 + 1, p2 - p1 - 1);
                }
            }
            return null;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId.ToString(),
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}