console.log("加载成功");
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        "zhuce": "zhuce"
    },
    shim: {
        "jquery-cookie": ["jquery"],
        "parabola": {
            exports: "_"
        }
    }
})

require(["zhuce"], function(zhuce) {
    zhuce.tabPage();
    zhuce.verUsername();
    zhuce.enroll();
    zhuce.login();
})