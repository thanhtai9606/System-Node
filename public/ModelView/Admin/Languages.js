
var ExportView = (function () {
    var lang = 'Vn';
    var displayAllLanguage = function () {
        // ajax load all Items control Language  
        $.ajax({
            url: '/Language/GetTypeLanguage/' + lang,
            type: "POST",
            dataType: "JSON",
            success: function (data) {
                console.log(JSON.stringify(data));
                loadControlChanged(data); // Change language           
            },
            error: function (jqXHR, textStatus, errorThrown) {
                new PNotify({
                    title: "Có lỗi xảy ra!",
                    text: textStatus + ' : ' + errorThrown,
                    type: "dager",
                    nonblock: {
                        nonblock: false
                    }
                });
            }
        });
        var loadControlChanged = function (item) {
           
            if (lang === "Eng") {
                $.each(item, function () {
                    $('#' + this.ControlName).text(this.Eng);//.attr('title', this.Description);
                });
            }
            else $.each(item, function () {
                $('#' + this.ControlName).text(this.Vn);

            });
        };

    };
    var messageChanged = function () {
        $('#btnEnglish').click(function(){
            lang = 'Eng';
            displayAllLanguage();
        });
        $('#btnVietnam').click(function(){
             lang = 'Vn';
            displayAllLanguage();
        });
    };
    return {
        //show all the Control's language
        displayClientSide: function () {
            $(document).ready(function () {
                displayAllLanguage();
                messageChanged();
            });
        },
        displayServerSide: function () {

        },
        voidMessageLanguageChanged: function () {
            try {
                displayAllLanguage();
                new PNotify({
                    title: "Đã thiết lập",
                    type: "success",
                    text: "Ngôn ngữ đã được thiết lập",
                    delay: 1000,
                    nonblock: {
                        nonblock: true
                    }
                });
            } catch (ex) {
                new PNotify({
                    title: "Lỗi: " + lang,
                    type: "dager",
                    text: "Có lỗi: " + ex.toString(),
                    delay: 1000,
                    nonblock: {
                        nonblock: true
                    }
                });

            }
        }
    };
})();
ExportView.displayClientSide();