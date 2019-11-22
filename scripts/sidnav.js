define(["jquery"], function($) {
    function downloadSidnav() {
        // 取左侧边栏数据
        $.ajax({
            url: "./json/sidnav.json",
            success: function(obj) {
                var listArr = obj.sideNav;
                // alert(listArr.length);
                for (var i = 0; i < listArr.length; i++) {
                    var node = $(`<li class="list-item">
                            <a href="">${listArr[i].title}</a><span>&gt;</span>
                            <div class="list" style="display:none;">
                                <ul class = 'box'>
                                    
                                </ul>
                            </div>
                    </li>`);
                    node.appendTo($("#container .left-list"));
                    // 取出当前分类下所有数据
                    var childArr = listArr[i].child;
                    // alert(childArr.length);
                    for (var j = 0; j < childArr.length; j++) {
                        var node2 = $(`<li>${childArr[j].stitle}
                            <ul>
                                
                            </ul>
                        </li>`).appendTo(node.find(".box"));
                        var arr = childArr[j].code;
                        for (var k = 0; k < arr.length; k++) {
                            $(`<li>${arr[k]}</li>`).appendTo(node2.find("ul"));
                        }
                    }
                }
            }
        })
    }

    // 选项卡切换

    function leftNavTab() {
        $(".left-list").on("mouseenter", ".list-item", function() {
            $(this).find($(".list")).show();
        });
        $(".left-list").on("mouseleave", ".list-item", function() {
            $(this).find($(".list")).hide();
        });
    }

    // 轮播图效果

    function bannerTab() {
        var timer = null;
        var iNow = 0;
        timer = setInterval(function() {
            iNow++;
            Tab();
        }, 2000);

        function Tab() {
            var aImgs = $("#banner .banner").find("a");
            var oBtns = $("#banner .dots ul").find("li");
            // var oUl = $("#banner").find("ul");
            aImgs.hide().eq(iNow).show().animate({
                left: iNow * 680
            }, 1000, function() {
                if (iNow == oBtns.size() - 1) {
                    iNow = -1;
                }
            });
            oBtns.removeClass("dots-active").eq(iNow).addClass("dots-active");
        }

    }

    return {
        downloadSidnav: downloadSidnav,
        leftNavTab: leftNavTab,
        bannerTab: bannerTab
    }
})