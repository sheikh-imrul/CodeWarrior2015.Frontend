﻿class ProductService {
    public getProducts(catId) {
        var getUrl = new Constant().apiRoot + "/api/products/GetByCategory?categoryId="+catId;
        return $.get(getUrl);
    }

    public getProductById(id) {
        var getUrl = new Constant().apiRoot + "/api/Products/Get/" + id;
        return $.get(getUrl);
    }

    public getCommentsById(id) {
        var getUrl = new Constant().apiRoot + "/api/Comments/Get?product=" + id;
        return $.get(getUrl);
    }

    public getRecommendedProduct() {
        var getUrl = new Constant().apiRoot + "/api/Products/GetRecommended";
        return $.get(getUrl);
    }
} 