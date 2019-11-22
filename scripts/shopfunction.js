define(["jquery"], function($) {
    function bigImg() {
        $(".img").on("mouseenter", function() {
            $(".mark").show();
            $(".big-img").show();
        }).on("mouseleave", function() {
            $(".mark").hide();
            $(".big-img").hide();
        }).on("mousemove", function(ev) {
            var l = ev.pageX - $(this).offset().left - 50;
            if (l <= 0) {
                l = 0;
            }
            if (l >= 150) {
                l = 150;
            }
            var t = ev.pageY - $(this).offset().top - 50;
            if (t <= 0) {
                t = 0;
            }
            if (t >= 120) {
                t = 120;
            }
            $(".mark").css({
                left: l,
                top: t
            })
            $(".big-img img").css({
                left: -3 * l,
                top: -3 * t
            })
        })
    }

    return {
        bigImg: bigImg
    }

})