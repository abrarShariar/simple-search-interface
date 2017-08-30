var http = require('axios');

class HttpService {
    static searchProduct(searchKeyword) {
        return http.get('http://es.backpackbang.com:9200/products/amazon/_search?q=title:' + searchKeyword);
    }
}

export default HttpService;