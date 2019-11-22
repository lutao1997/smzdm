define(["jquery"], function($) {
    // 底部关于我们添加移入字体变红样式
    function showA() {
        $("#about").on("mouseenter", "li", function() {
            $(this).css("color", "red");
            $(this).css("cursor", "pointer");
        })
        $("#about").on("mouseleave", "li", function() {
            $(this).css("color", "#333");
            $(this).css("cursor", "");
        })
    }
    return {
        showA: showA
    }
})