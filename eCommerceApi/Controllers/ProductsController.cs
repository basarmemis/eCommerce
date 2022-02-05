using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            //Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return StatusCode(StatusCodes.Status200OK, products);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<List<Product>>> GetProduct(Guid id)
        {
            var product = await _context.Products.SingleOrDefaultAsync(product => product.Id == id);
            if (product == null) return StatusCode(StatusCodes.Status404NotFound);
            return StatusCode(StatusCodes.Status200OK, product);
        }
    }
}