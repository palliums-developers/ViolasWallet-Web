let getProductId = (token_module, product_list) => {
    for (let i in product_list) {
        if (token_module === product_list[i].token_module) {
            console.log(product_list[i].id)
            return product_list[i].id
        }
    }
}


getProductId('LBR', [
    {
        "desc": "aaaaaaaaaaaaaaaaaaaaaaaaaa",
        "id": "100001",
        "logo": "http://xxxxxxxxx",
        "name": "aaaaaa",
        "rate": 0.032,
        "rate_desc": "年化利率",
        "token_module": "BTC"
    },
    {
        "desc": "bbbbbbbbbbbbbbbbbbbbbbbbbb",
        "id": "100002",
        "logo": "http://xxxxxxxxx",
        "name": "bbbbbb",
        "rate": 1.032,
        "rate_desc": "7日年化利率",
        "token_module": "LBR"
    }
])