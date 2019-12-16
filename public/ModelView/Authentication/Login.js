
var HTMLLogin = (function () {
   
    var validLogin = function () {

        var entity = $('#form').serialize();        
        // ajax load process and valid Login
        $.ajax({
            url: "/Admin/ValidateLogin/",
            type: "POST",
            data: entity,
            dataType: "JSON",
            success: function (data) {
               // console.log(JSON.stringify(data));
                if (data.statusCode === 200) //if success close modal and reload ajax table
                {
                    new PNotify({
                        title: "Thông báo!",
                        type: "success",
                        text: data.status,
                        nonblock: {
                            nonblock: false
                        }
                    });
                    window.setTimeout(function () {
                        window.location.href = '/';
                    }, 1000);
                }
                else
                    if (data.statusCode === 400) {
                        new PNotify({
                            title: "Lỗi đăng nhập!",
                            type: "dager",
                            text: data.status,
                            nonblock: {
                                nonblock: false
                            }
                        })
                        window.setTimeout(function () {
                           window.location.href = '/Admin';
                        }, 2000);
                    }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Error adding / update data');

            }
        });

    }
    return {
        resetForm: function () {
            $('#form2')[0].reset(); // reset form on modals
        },
        loginEvent : function () {           
            $(document).ready(function(){
                $('#btnLogin').click(function(){
                    validLogin();
                })
            });
            document.addEventListener("keydown", function (event) {               
                if (event.keyCode === 13) {
                    validLogin();
                }
            });
        }       
    }    
})();
HTMLLogin.loginEvent();

