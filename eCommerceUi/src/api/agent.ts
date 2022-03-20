import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "..";


axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const sleep = async (): Promise<void> => {
    return new Promise<void>((resolve) => { setTimeout(resolve, 500) });
}

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async (response) => {
    await sleep();
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(`Validation is failed for the property:'${key}'. ` + data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push('/server-error', { error: data });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
});

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: () => request.get('products'),
    details: (id: string) => request.get(`products/${id}`),
    fetchFilters: () => request.get('products/filters')
}

const TestErrors = {
    get400Error: () => request.get('buggy/bad-request'),
    get401Error: () => request.get('buggy/unauthorized'),
    get404Error: () => request.get('buggy/not-found'),
    get500Error: () => request.get('buggy/server-error'),
    getValidationError: () => request.get('buggy/validation-error')
}

const Basket = {
    get: () => request.get('basket'),
    addItem: (productId: string, quantity = 1) => request.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: string, quantity = 1) => request.delete(`basket?productId=${productId}&quantity=${quantity}`),

}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;