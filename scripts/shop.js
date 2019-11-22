console.log("加载成功");
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        "shopfunction": "shopfunction"
    },
    shim: {
        "jquery-cookie": ["jquery"],
        "parabola": {
            exports: "_"
        }
    }
})

require(["shopfunction"], function(shopfunction) {
    shopfunction.bigImg();
})