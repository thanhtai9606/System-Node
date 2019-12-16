var ExportView = (function () {
    var save_method; //for save method string
    var table;

    var reload_table = function () {
        table.ajax.reload(null, false); //reload datatable ajax  
    }
    var triggerControls = function () {
        $('#btnCreate').click(function () { ExportView.voidAdd(); }); // onClick to load addNew items
        $('#btnRefreshTable').click(function () { ExportView.refreshTable(); }); // onClick to load refresh datatable
        $('#btnSave').click(function () { ExportView.voidSave(); }); // onClick to load for save database
        ExportView.populatedProvince();
    }
    var comboBoxProvince = function(data){
        // Clear drop down list           
        options = $('[name="ProvinceID"]');
        options.empty();
        $.each(data, function () {
            var obj = [{ id: this.ProvinceID, text: this.ProvinceName }]      
            options.select2({ data: obj });
         });
    }
    return {

        displayClientSide: function () {
            table = $("#tableData").DataTable({
                processing: false,
                serverSide: false,
                fixedHeader: true,
                dom: "Bflrtip",
                ajax: {
                    "url": "/District/getAllEntities/",
                    "type": "GET",
                    "dataSrc": ""
                },
                columns: [
                    { "data": "DistrictID" },
                    { "data": "DistrictName" },
                    { "data": "EnglishName" },
                    { "data": "Level" },
                    { "data": "ProvinceID" },
                    { "data": "ProvinceName" },
                    {
                        "data": null,
                        "mRender": function (data, type, full) {
                            return "<button type='button' class='btn btn-round btn-info' href='javascript:void(0)' title='Edit' onclick='ExportView.voidEdit(" + '"' + data.DistrictID + '"' + ")'><i class='glyphicon glyphicon-pencil'></i></button>"
                                + "<button type='button' class='btn btn-round btn-danger' href='javascript:void(0)' title='Delete' onclick='ExportView.voidRemoveById(" + '"' + data.DistrictID + '"' + ")'><i class='glyphicon glyphicon-trash'></i></button>";
                        }
                    }
                ],
                buttons: [{
                    extend: "copy",
                    className: "btn-sm"
                }, {
                    extend: "excel",
                    className: "btn-sm",
                    text: "Xuất Excel"
                }, {
                    extend: "pdf",
                    className: "btn-sm",
                    text: "Xuất PDF"
                }, {
                    extend: "print",
                    className: "btn-sm",
                    text: "In ấn",
                    message: 'District!'
                }],
                //Set column definition initialisation properties.
                "columnDefs": [
                    {
                        "width": "5%",
                        "targets": [0], //last column
                        "orderable": 2, //set not orderable
                    }, {
                        "className": "text-center custom-middle-align",
                        "targets": [0, 1, 2, 3]
                    }
                ],
                responsive: 0,
                keys: true,

            })
            var handleDataTableButtons = function () {
                "use strict";
                0 !== $("#tableData").length && table
            },
                TableManageButtons = function () {
                    "use strict";
                    return {
                        init: function () {
                            handleDataTableButtons()
                        }
                    }
                }();
            TableManageButtons.init();

        },
        displayServerSide: function () {
            table = $("#tableData").DataTable({
                processing: true,
                serverSide: true,
                fixedHeader: true,
                dom: "Bflrtip",
                ajax: {
                    "url": "/District/getDataServerSide/",
                    "type": "POST",
                    "dataType": "JSON",
                    "contentType": 'application/json; charset=utf-8',
                    "dataSrc": "",
                    'data': function (data) { return data = JSON.stringify(data); }
                },
                columns: [
                    { "data": "DistrictID" },
                    { "data": "DistrictName" },
                    { "data": "EnglishName" },
                    { "data": "Level" },
                    { "data": "ProvinceID" },
                    { "data": "ProvinceName" },
                    {
                        "data": null,
                        "mRender": function (data, type, full) {
                            return "<button type='button' class='btn btn-round btn-info' href='javascript:void(0)' title='Edit' onclick='ExportView.voidEdit(" + '"' + data.DistrictID + '"' + ")'><i class='glyphicon glyphicon-pencil'></i></button>"
                                + "<button type='button' class='btn btn-round btn-danger' href='javascript:void(0)' title='Delete' onclick='ExportView.voidRemoveById(" + '"' + data.DistrictID + '"' + ")'><i class='glyphicon glyphicon-trash'></i></button>";
                        }
                    }
                ],
                buttons: [{
                    extend: "copy",
                    className: "btn-sm"
                }, {
                    extend: "excel",
                    className: "btn-sm",
                    text: "Xuất Excel"
                }, {
                    extend: "pdf",
                    className: "btn-sm",
                    text: "Xuất PDF"
                }, {
                    extend: "print",
                    className: "btn-sm",
                    text: "In ấn",
                    message: 'District!'
                }],
                //Set column definition initialisation properties.
                "columnDefs": [
                    { "width": "5%", "targets": [0] },
                    { "className": "text-center custom-middle-align", "targets": [0, 1, 2, 3] },
                ],
                "language":
                {
                    "processing": "<div class='overlay custom-loader-background'>Đang xử lý...<i class='fa fa-cog fa-spin custom-loader-color'></i></div>"
                },
                responsive: 0,
                keys: true,

            })
            var handleDataTableButtons = function () {
                "use strict";
                0 !== $("#tableData").length && table
            },
                TableManageButtons = function () {
                    "use strict";
                    return {
                        init: function () {
                            handleDataTableButtons()
                        }
                    }
                }();
            TableManageButtons.init();

        },
        voidAdd: function () {
            save_method = 'add';
            $('#form')[0].reset(); // reset form on modals
            $('[name="DistrictID"]').attr('readonly', false); //set textbox input enable
            $('.form-group').removeClass('has-error'); // clear error class
            $('.help-block').empty(); // clear error string
            $('#modal_form').modal('show'); // show bootstrap modal
            $('.modal-title').text('Thêm Mới'); // Set Title to Bootstrap modal title  
        },
        voidSave: function () {
            var obj = $('#form').serialize();
            console.log(JSON.stringify(obj));
            $('#btnSave').text('Đang lưu...'); //change button text
            $('#btnSave').attr('disabled', true); //set button disable 
            var url;
            if (save_method === 'add') {
                url = "/District/addEntity/";
            } else {
                url = "/District/editEntity/";
            }
            // ajax adding data to database
            $.ajax({
                url: url,
                type: "POST",
                data: obj,
                dataType: "JSON",
                success: function (data) {
                    alert(JSON.stringify(data));
                    if (data.statusCode === 200) //if success close modal and reload ajax table
                    {
                        new PNotify({
                            title: "Thông báo!",
                            type: "success",
                            text: data.status,
                            nonblock: {
                                nonblock: false
                            },
                            delay : 500
                        });
                    }
                    else
                        if (data.statusCode === 400) {
                            // $.toaster({ message: data.status, title: 'Lỗi đăng nhập!', priority: 'danger' });
                            new PNotify({
                                title: "Có lỗi xảy ra!",
                                type: "dager",
                                text: data.status,
                                nonblock: {
                                    nonblock: false
                                },
                                delay : 3000
                            });
                        }
                    $('#btnSave').text('save'); //change button text
                    $('#btnSave').attr('disabled', false); //set button enable 
                    $('#modal_form').modal('hide'); // show bootstrap modal     
                    reload_table();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Error adding / update data ' + textStatus);
                    $('#btnSave').text('save'); //change button text
                    $('#btnSave').attr('disabled', false); //set button enable 

                }
            });
        },
        voidEdit: function (id) {
            save_method = 'update';
            $('#form')[0].reset(); // reset form on modals
            $('.form-group').removeClass('has-error'); // clear error class
            $('.help-block').empty(); // clear error string
              $('[name="DistrictID"]').attr('readonly', true); //set textbox input enable
            //Ajax Load data from ajax
            $.ajax({
                url: "/District/getById/" + id,
                type: "GET",
                dataType: "JSON",
                success: function (data) {
                    // console.log(JSON.stringify(data));
                    $('[name="DistrictID"]').val(data.DistrictID);
                    $('[name="DistrictName"]').val(data.DistrictName);
                    $('[name="EnglishName"]').val(data.EnglishName);
                    $('[name="Level"]').val(data.Level).trigger("change");
                    $('[name="ProvinceID"]').val(data.ProvinceID).trigger("change");
                    $('#modal_form').modal('show'); // show bootstrap modal when complete loaded
                    $('.modal-title').text('Sửa Thông tin'); // Set title to Bootstrap modal title

                },
                error: function (jqXHR, textStatus, errorThrown) {

                    $.alert('Lỗi khi nhận dữ liệu từ ajax' + textStatus);
                }
            });
        },
        voidRemoveById: function (id) {
            $.confirm('Bạn có chắc muốn thực hiện không?', function (a) {
                if (a) {
                    // ajax delete data to database
                    $.ajax({
                        url: "/District/removeById/" + id,
                        type: "POST",
                        dataType: "JSON",
                        success: function (data) {
                            //if success reload ajax table      
                            new PNotify({
                                title: "Thông báo!",
                                type: "success",
                                text: data.status,
                                nonblock: {
                                    nonblock: false
                                }
                            });
                            reload_table();

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert('Error deleting data');
                        }
                    });
                }
            });
        },
        populatedProvince : function(){
             $("#Level").select2({
                placeholder: "Chọn một Tỉnh",
                allowClear: true
            });
            // ajax adding data to database
            $.ajax({
                url: '/Province/getAllEntities/',
                type: "GET",
                dataType: "JSON",
                success: function (data) {
               //chkbox(data);
                comboBoxProvince(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                new PNotify({
                         title: "Có lỗi xảy ra!",
                         type: "dager",
                         text: data.status,
                         nonblock: {
                        nonblock: false
                     }
                 });
             }
            });            
        },
        refreshTable: function () {
            reload_table();
        },
        WindowLoad: function () {
            $(document).ready(function () {
                //trigger all controls load
                triggerControls();
                 ExportView.displayServerSide();;
                //ExportView.displayClientSide();
            })
        }
    }
})();

ExportView.WindowLoad();
