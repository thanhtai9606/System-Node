var ExportView = (function () {
    return {
        
        displayClientSide: function () {
            table = $("#tableData").DataTable({
                processing: false,
                serverSide: false,
                fixedHeader: true,
                dom: "Bflrtip",
                ajax: {
                    "url": "../data/contact.js",
                    "type": "GET",
                    "dataSrc": ""                                    
                },
                columns: [
                    { "data": "ProvinceID" },
                    { "data": "ProvinceName" },
                    { "data": "EnglishName" },
                    { "data": "Level" },
                    {
                        "data": null,
                        "mRender": function (data, type, full) {
                            return "<button type='button' class='btn btn-round btn-info' href='javascript:void(0)' title='Edit' onclick='ExportView.voidEdit(" + '"' + data.ProvinceID + '"' + ")'><i class='glyphicon glyphicon-pencil'></i></button>"
                                + "<button type='button' class='btn btn-round btn-danger' href='javascript:void(0)' title='Delete' onclick='ExportView.voidRemoveById(" + '"' + data.ProvinceID + '"' + ")'><i class='glyphicon glyphicon-trash'></i></button>";
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
                    message: 'Province!'
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
                    "url": "/Province/getDataServerSide/",
                    "type": "POST",
                    "dataSrc": "",
                    "dataType": "JSON",
                    "contentType": 'application/json; charset=utf-8',
                    'data': function (data) { 
                       // console.log(data);
                        return data = JSON.stringify(data); 
                    }                   
                },
                columns: [
                    { "data": "ProvinceID" },
                    { "data": "ProvinceName" },
                    { "data": "EnglishName" },
                    { "data": "Level" },
                    {
                        "data": null,
                        "mRender": function (data, type, full) {
                            return "<button type='button' class='btn btn-round btn-info' href='javascript:void(0)' title='Edit' onclick='ExportView.voidEdit(" + '"' + data.ProvinceID + '"' + ")'><i class='glyphicon glyphicon-pencil'></i></button>"
                                + "<button type='button' class='btn btn-round btn-danger' href='javascript:void(0)' title='Delete' onclick='ExportView.voidRemoveById(" + '"' + data.ProvinceID + '"' + ")'><i class='glyphicon glyphicon-trash'></i></button>";
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
                    message: 'Province!'
                }],
                //Set column definition initialisation properties.
                "columnDefs": [
                    { "width": "5%", "targets": [0] },
                    { "className": "text-center custom-middle-align", "targets": [0, 1, 2, 3] },
                ],
                "language":
                {
                    "processing": "<div class='overlay custom-loader-background'> Đang xử lý...<i class='fa fa-cog fa-spin custom-loader-color'></i></div>"
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
        WindowLoad: function () {
            $(document).ready(function () {
                //trigger all controls load
                triggerControls();
                ExportView.displayServerSide();
               //ExportView.displayClientSide();
            })
        }
    }
})();

ExportView.WindowLoad();
