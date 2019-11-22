define(["jquery"], function($) {
    // 切换登录和注册
    function tabPage() {
        $("#register-tip").on("click", function() {
            $("#login-box").css("display", "none");
            $("#register-box").css("display", "block");
            $("#register-tip").addClass("btn-active");
            $("#login-tip").removeClass("btn-active");
        })
        $("#login-tip").on("click", function() {
            $("#login-box").css("display", "block");
            $("#register-box").css("display", "none");
            $("#register-tip").removeClass("btn-active");
            $("#login-tip").addClass("btn-active");
        })
    }

    // 验证注册用户名格式是否正确
    function verUsername() {
        // 给用户名输入框添加失去焦点事件
        $("#zc-username").on("blur", function() {
            // alert($("#zc-username").val());
            var oValue = $("#zc-username").val();
            if (oValue.length < 6 || oValue.length > 18) {
                $("#zc-error").css("color", "red");
                $("#zc-error").html("长度应为6~18个字符!");
            } else if (!/[a-zA-Z]/.test(oValue[0])) {
                $("#zc-error").css("color", "red");
                $("#zc-error").html("首字符必须是字母!");
            } else if (/\W/.test(oValue)) {
                $("#zc-error").css("color", "red");
                $("#zc-error").html("用户名须由数字字母下划线组成!");
            } else {
                $("#zc-error").css("color", "green");
                $("#zc-error").html("恭喜该用户名可注册✔");
            }
        })
    }

    // 注册功能
    function enroll() {
        $("#zc-btn").on("click", function() {
            // alert(1);
            $.ajax({
                method: "post",
                url: "./php/register.php",
                data: {
                    username: $("#zc-username").val(),
                    password: $("#zc-psd").val(),
                    repassword: $("#algin-zc-psd").val(),
                    createTime: (new Date()).getTime()
                },
                success: function(result) {
                    // console.log(result);
                    var obj = JSON.parse(result);
                    // console.log(obj);
                    if (obj.code) {
                        $("#jingao").css("color", "red");
                    } else {
                        $("#jingao").css("color", "green");
                    }
                    $("#jingao").html(obj.message);
                    $("#jingao").show();
                    /* setTimeout(function() {
                        location.assign("login.html");
                    }, 500) */
                },
                error: function(msg) {
                    alert(msg);
                }
            })
        })
    }

    // 登录功能
    function login() {
        // alert(1);
        $("#log-btn").on("click", function() {
            // alert(1);
            $.ajax({
                method: "post",
                url: "./php/login.php",
                data: {
                    username: $("#user-name").val(),
                    password: $("#psd").val()
                },
                success: function(result) {
                    // alert(result);
                    var obj = JSON.parse(result);
                    // console.log(obj);
                    if (obj.code) {
                        $("#dl-error").css("color", "red");
                    } else {
                        $("#dl-error").css("color", "green");
                    }
                    $("#dl-error").html(obj.message);
                    $("#dl-error").show();
                    if ($("#dl-error").html() == "登录成功") {
                        setTimeout(function() {
                            location.assign("index.html");
                        }, 500)
                    } else {
                        // alert("用户名或密码错误");
                        $("#dl-error").html(obj.message);
                        $("#dl-error").show();
                    }

                },
                error: function(msg) {
                    alert(msg);
                }
            })
        })
    }

    return {
        tabPage: tabPage,
        verUsername: verUsername,
        enroll: enroll,
        login: login
    }

})