define(["parabola", "jquery", "jquery-cookie"], function(parabola, $) {
    function downloadBanner() {
        // 取轮播图片数据
        $.ajax({
            url: "./json/nav.json",
            success: function(obj) {
                var bannerArr = obj.banner;
                // alert(bannerArr.length);
                for (var i = 0; i < bannerArr.length; i++) {
                    // 插入轮播图片
                    $(`<a href="#" style="display:${i == 0 ? "block" : "none"}">
                        <img src="images/${bannerArr[i].img}" alt="广告一" />
                    </a>`).appendTo($("#banner .banner"));
                    // 插入轮播图按钮节点
                    var node = $(`<li class="${i == 0 ? "dots-active" : ""}"></li>`);
                    node.appendTo($("#banner .dots ul"));
                }
            },
            error: function(msg) {
                console.log(msg);
            }
        })
    }

    // small-show
    function smallShow() {
        // 取出图片数据
        $.ajax({
            url: "./json/smallshow.json",
            success: function(obj) {
                var smallshowArr = obj.smallshow;
                // alert(smallshowArr.length);
                for (var i = 0; i < smallshowArr.length; i++) {
                    var node = $(`<a href=""><img src="${smallshowArr[i].img}" alt=""></a>`);
                    node.appendTo("#container .small-banner");
                }
            }
        })
    }

    // ranking 排行榜

    function rankingShow() {
        shopSum();
        count();
        $.ajax({
            url: "./json/ranking.json",
            success: function(arr) {
                for (var i = 0; i < arr.length; i++) {
                    var node = $(`<li>
                        <a href="http://localhost:5256/shop.html" target="_blank">
                            <img src="${arr[i].img}" alt="">
                            <div>${arr[i].desc}</div>
                            <span>${arr[i].tip}</span>
                        </a>
                        <button id="${arr[i].id}" class="jion-shopcarbtn">加入购物车</button>
                    </li>`);
                    node.appendTo("#rankingbox .bottom");
                }
            }
        });
    }

    // 加入购物车按钮事件
    function shopCarBtn() {
        $(".bottom").on("click", ".jion-shopcarbtn", function() {
            // alert(this.id);
            var id = this.id; // 取到购物车按钮所在的商品id
            var first = $.cookie("goods") == null ? true : false //goods为存购物车商品数据的键
            if (first) {
                var obj = [{
                    id: id,
                    num: 1
                }];
                $.cookie("goods", JSON.stringify(obj), {
                    expires: 7
                });
            } else {
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);

                var same = false;
                for (var i = 0; i < cookieArr.length; i++) {
                    if (id == cookieArr[i].id) {
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if (!same) {
                    var obj = {
                        id: id,
                        num: 1
                    };
                    cookieArr.push(obj);
                }
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            shopSum();
            count();
            // window.location.replace("http://localhost:5256/shopcar.html");
            // console.log($.cookie("goods"));
            ballMove(this);
        })
    }

    // 小球运动函数
    function ballMove(node) {
        $("#ball").css({
            left: $(node).offset().left,
            top: $(node).offset().top,
            display: "block"
        })
        var X = $("#number").offset().left - $(node).offset().left;
        var Y = $("#number").offset().top - $(node).offset().top;
        var bool = new Parabola({
            el: "#ball",
            offset: [X, Y],
            duration: 800,
            curvature: 0.0005,
            callback: function() {
                $("#ball").hide();
            }
        })
        bool.start();
    }

    // 删除商品
    function clearShop() {
        $(".shopcar-list").on("click", ".delete-shop", function() {
            var id = $(this).closest("li").remove().attr("id");
            var cookieArr = JSON.parse($.cookie("goods"));
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    cookieArr.splice(i, 1);
                    break;
                }
            }
            if (!cookieArr.length) {
                $.cookie("goods", null);
            } else {
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            shopSum();
            count();
            // window.location.reload();
        })
    }

    //加载数据到购物车页面
    function shopCar() {
        // $(".shopcar-list").html("");
        //$("..shopcar-list").empty(); //删除该节点下所有的子节点
        $.ajax({
            url: "./json/ranking.json",
            success: function(arr) {
                // alert(arr.length);
                var cookieStr = $.cookie("goods");
                if (cookieStr) {
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = [];
                    for (var i = 0; i < arr.length; i++) {
                        for (var j = 0; j < cookieArr.length; j++) {
                            if (arr[i].id == cookieArr[j].id) {
                                arr[i].num = cookieArr[j].num;
                                newArr.push(arr[i]);
                            }
                        }
                    }
                    for (var i = 0; i < newArr.length; i++) {
                        var node = $(`<li id="${newArr[i].id}">
                                <input class="checkbox" type="checkbox">
                                <div class="shop-img">
                                    <img src="${newArr[i].img}" alt="">
                                </div>
                                <a href="http://localhost:5256/shop.html" target="_blank">
                                    <div class="shop-name">
                                        Apple/苹果 13 英寸 MacBook Pro 触控栏和触控 ID 2.4GHz 四核处理器 (Turbo Boost 最高可达 4.1GHz) 512GB 存储容量
                                    </div>
                                </a>
                                <div class="icon-img">
                                    <div><img src="https://img.alicdn.com/tps/i3/T1bnR4XEBhXXcQVo..-14-16.png" alt=""></div>
                                    <div><img src="https://img.alicdn.com/tps/i3/T1Vyl6FCBlXXaSQP_X-16-16.png" alt=""></div>
                                    <div><img src="https://img.alicdn.com/tps/i4/T1BCidFrNlXXaSQP_X-16-16.png" alt=""></div>
                                </div>
                                <div class="shop-tip">
                                    颜色分类:深空灰色
                                </div>
                                <div class="shop-price">
                                    ${newArr[i].tip}
                                </div>
                                <!-- 加减操作 -->
                                <ul class="amount">
                                    <button class="jia">+</button><input class="shopnumber" type="text" value="${newArr[i].num}"><button class="jia">-</button>
                                </ul>
                                <span class="total">${newArr[i].tip}</span>
                                <!-- 操作 -->
                                <button class="delete-shop">删除商品</button>
                            </li>`);
                        node.appendTo(".shopcar-list");
                    }
                    count();
                }
            },
            error: function(msg) {
                console.log(msg);
            },
        });
        $(".shopcar-list").on("click", ".jia", function() {
            var id = $(this).closest("li").attr("id");
            var cookieArr = JSON.parse($.cookie("goods"));
            var money = 0;
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    if (this.innerHTML == "+") {
                        cookieArr[i].num++;
                    } else if (cookieArr[i].num == 1 && this.innerHTML == "-") {
                        alert("商品数量最少为1");
                    } else {
                        cookieArr[i].num--;
                    }
                    $(this).parent().find(".shopnumber").val(cookieArr[i].num);
                    var a = $(this).parent().find(".shopnumber").val();
                    var b = parseInt($(this).closest(".amount").siblings(".shop-price").html());
                    var c = a * b;
                    $(this).parent().next(".total").html(c + "元");
                    // alert(d);
                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    })
                    shopSum();
                    count();
                    break;
                }
            }
        })
    }

    // 计算总价

    function count() {
        var sum = 0;
        $(".total").each(function(index, item) {
            // alert(parseInt($(item).html()));
            sum += parseInt($(item).html());
            // alert(sum);
            $(".money").html(sum + "元");
        })
    }

    // 计算商品的总数
    function shopSum() {
        var cookieStr = $.cookie("goods");
        var cookieArr = JSON.parse(cookieStr);
        // alert(cookieArr);
        if (cookieArr) {
            var sum = 0;
            // console.log(cookieArr.length);
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
                // alert(cookieArr[i].num);
            }
            $("#number").html(sum);
            $(".number strong").html(sum);
        } else {
            $("#number").html(0);
            $(".number strong").html(0);
        }
    }

    // 清空购物车
    function clearShopcar() {
        $("#clearshopcar").on("click", function() {
            $.cookie("goods", null);
            $(".shopcar-list").empty();
            $(".money").html("0.00");
            shopSum();
            count();
        })
    }

    function deleteall() {
        $("#deleteall").on("click", function() {
            $.cookie("goods", null);
            $(".shopcar-list").empty();
            $(".money").html("0.00");
            shopSum();
            count();
        })
    }

    return {
        downloadBanner: downloadBanner,
        smallShow: smallShow,
        rankingShow: rankingShow,
        shopCarBtn: shopCarBtn,
        shopCar: shopCar,
        clearShopcar: clearShopcar,
        clearShop: clearShop,
        deleteall: deleteall,
        count: count
    }
})