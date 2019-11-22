console.log("加载成功");
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        "nav": "nav",
        "sidnav": "sidnav",
        "about": "about"
    },
    shim: {
        "jquery-cookie": ["jquery"],
        "parabola": {
            exports: "_"
        }
    }
})

require(["nav", "sidnav", "about"], function(nav, sidnav, about) {
    nav.downloadBanner();
    sidnav.downloadSidnav();
    sidnav.leftNavTab();
    sidnav.bannerTab();
    nav.smallShow();
    nav.rankingShow();
    about.showA();
    nav.shopCarBtn();
    nav.shopCar();
    nav.clearShopcar();
    nav.clearShop();
    nav.deleteall();
    nav.count();
})