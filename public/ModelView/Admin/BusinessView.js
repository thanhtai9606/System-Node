
var ExportView = (function () {      
     var save_method; //for save method string
     var table;

     var reload_table= function() {
         table.ajax.reload(null, false); //reload datatable ajax  
     }
     var triggerControls = function () {
         $('#btnCreate').click(function () { ExportView.voidAdd(); }); // onClick to load addNew items
         $('#btnRefreshTable').click(function () { ExportView.refreshTable(); }); // onClick to load refresh datatable
         $('#btnSave').click(function () { ExportView.voidSave(); }); // onClick to load for save database
     }
    return {
        
        displayClientSide: function () {          
           table = $("#tableData").DataTable({
               processing: true,
               serverSide: false,
                fixedHeader: true,
                dom: "Bflrtip",
                ajax: {
                    "url": "/Business/GetEntities/",
                    "type": "POST",
                    "dataSrc": ""
                },
                columns: [
                    { "data": "BusinessId" },
                    { "data": "BusinessName" },
                    { "data": "DateModified" },
                    {
                        "data": null,
                        "mRender": function (data, type, full) {
                            //console.log(JSON.stringify(data.BusinessId));
                            return "<button type='button' class='btn btn-round btn-info' href='javascript:void(0)' title='Edit' onclick='ExportView.voidEdit(" + '"' + data.BusinessId + '"' + ")'><i class='glyphicon glyphicon-pencil'></i></button>"
                                + "<button type='button' class='btn btn-round btn-danger' href='javascript:void(0)' title='Delete' onclick='ExportView.voidRemoveById(" + '"' + data.BusinessId + '"' + ")'><i class='glyphicon glyphicon-trash'></i></button>";
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
                    message: 'Múa lửa nào các bạn!'
                }],
                //Set column definition initialisation properties.
                "columnDefs": [
                    {
                        "targets": [-1], //last column
                        "orderable": 2, //set not orderable
                    },
                ],
                responsive: 0,
                keys: true
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

        },
        voidAdd: function () {
            // ajax adding data to database
            $.ajax({
                url: "/Business/UpdateBusiness/",
                type: "GET",
                dataType: "JSON",
                success: function (data) {
                    if (data.status) //if success close modal and reload ajax table
                    {
                        $.toaster({ message: data.status, title: 'Thông báo!', priority: 'success' });
                        reload_table();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Error adding / update data ' + textStatus);
                }
            });
        },
        voidSave: function () {
            var obj = $('#form').serialize();
            $('#btnSave').text('Đang lưu...'); //change button text
            $('#btnSave').attr('disabled', true); //set button disable 
            var url;
            if (save_method === 'add') {
                url = "/Business/Create/";
            } else {
                url = "/Business/Edit/";
            }
            // ajax adding data to database
            $.ajax({
                url: url,
                type: "POST",
                data: obj,
                dataType: "JSON",
                success: function (data) {
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
                                }
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

            //Ajax Load data from ajax
            $.ajax({
                url: "/Business/GetID/" + id,
                type: "GET",
                dataType: "JSON",
                success: function (data) {
                    // console.log(JSON.stringify(data));
                    $('[name="BusinessId"]').val(data.BusinessId);
                    $('[name="BusinessName"]').val(data.BusinessName);                   
                    $('[name="BusinessId"]').val(data.BusinessId);
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
                        url: "/Business/Remove/" + id,
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
        WindowLoad: function () {
            $(document).ready(function () {
                //trigger all controls load
                triggerControls();
                ExportView.displayClientSide();
            })
        }
    }
})();

ExportView.WindowLoad();

