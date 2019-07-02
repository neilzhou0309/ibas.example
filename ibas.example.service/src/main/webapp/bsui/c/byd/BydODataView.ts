/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace ui {
        export namespace c {
            /** 列表视图-例子 */
            export class BydODataView extends ibas.View implements app.IBydODataView {
                private LastID: string;
                private searchValue: string;
                private sXsrfToken: string;
                // 控件声明
                private salesOrderTable: sap.ui.table.Table;
                private page: sap.m.Page;
                private dialog: sap.m.Dialog;
                private sHostInput: sap.m.Input;
                private sGetTokenModulePathInput: sap.m.Input;
                private serviceNameInput: sap.m.Input;
                private serviceMethodsInput: sap.m.Input;
                private bydServiceBasePathInput: sap.m.Input;
                private sUserInput: sap.m.Input;
                private sPasswordInput: sap.m.Input;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.salesOrderTable = new sap.ui.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: "ID",
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "ID",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: "Name",
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "Name",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: "TaxAmount",
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "TaxAmount",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: "TaxAmountCurrencyCode",
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "TaxAmountCurrencyCode",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: "GrossAmount",
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "GrossAmount",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: "GrossAmountCurrencyCode",
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "GrossAmountCurrencyCode",
                                })
                            }),
                        ]
                    });
                    that.dialog = new sap.m.Dialog("", {
                        title: "Byd 配置",
                        contentWidth: "300px",
                        contentHeight: "100%",
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretchOnPhone: true,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            new sap.ui.layout.form.SimpleForm("", {
                                editable: true,
                                content: [
                                    new sap.m.Label("", { text: "byd账套OData服务地址" }),
                                    this.sHostInput = new sap.m.Input("", {
                                        value: "https://b1i.avacloud.com.cn/",
                                    }),
                                    new sap.m.Label("", { text: "OData服务路径" }),
                                    this.bydServiceBasePathInput = new sap.m.Input("", {
                                        value: "sap/byd/odata/cust/v1",
                                    }),
                                    new sap.m.Label("", { text: "OData服务名称" }),
                                    this.serviceNameInput = new sap.m.Input("", {
                                        value: "khsalesorder",
                                    }),
                                    new sap.m.Label("", { text: "OData服务方法" }),
                                    this.serviceMethodsInput = new sap.m.Input("", {
                                        value: "SalesOrderCollection",
                                    }),
                                    new sap.m.Label("", { text: "byd登录服务路径" }),
                                    this.sGetTokenModulePathInput = new sap.m.Input("", {
                                        value: "sap/ap/ui/login",
                                    }),
                                    new sap.m.Label("", { text: "byd用户名" }),
                                    this.sUserInput = new sap.m.Input("", {
                                        value: "administration05",
                                    }),
                                    new sap.m.Label("", { text: "byd用户密码" }),
                                    this.sPasswordInput = new sap.m.Input("", {
                                        value: "Welcome05",
                                    }),
                                ]
                            })
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_close"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.dialog.close();
                                }
                            }),
                        ],
                    });
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.SearchField("", {
                                    search: function (oEvent: any): void {
                                        that.LastID = null;
                                        let aFilters: ibas.ArrayList<sap.ui.model.Filter> = new ibas.ArrayList();
                                        that.searchValue = oEvent.getSource().getValue();
                                        that.fetchSalesOrders();
                                    }
                                })
                            ]
                        }),
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: "配置",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.dialog.open();
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: "登录BYD",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.loginByd();
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "新建订单",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.saveSalesOrder();
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "上一页",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.fetchSalesOrders(false);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "下一页",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.fetchSalesOrders(true);
                                    }
                                }),
                            ]
                        }),
                        content: [this.salesOrderTable]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }
                // 查询byd销售订单
                fetchSalesOrders(nextPage?: boolean): void {
                    let that: this = this;
                    that.page.setBusy(true);
                    // $filter=ExternalReference eq '700' 过滤
                    // &$expand=Item 扩展子对象
                    // &$inlinecount=allpages  是否返回总页数
                    // &$top=100 一百条
                    // &$search=*对* 查询显示字段包括'对'
                    let parameter: string = "$format=json&$expand=Item&$inlinecount=allpages&$top=15&$orderby=ID desc";
                    if (!ibas.objects.isNull(that.searchValue)) {
                        if (!ibas.strings.isEmpty(that.searchValue)) {
                            parameter += "&$search=*" + that.searchValue + "*";
                        }
                    }
                    if (!ibas.objects.isNull(this.LastID)) {
                        if (nextPage) {
                            parameter += "&$filter=ID lt '" + this.LastID + "'";
                        } else {
                            parameter += "&$filter=ID gt '" + this.LastID + "'";
                        }
                    }
                    let columnfields: string = "&$select=ExternalReference,ObjectID,ID,Name," +
                        "ReleaseStatusCode,ReleaseStatusCodeText,ConsistencyStatusCode,ConsistencyStatusCodeText," +
                        "TaxAmount,TaxAmountCurrencyCode,GrossAmount,GrossAmountCurrencyCode,Item/ID,Item/ObjectID," +
                        "Item/ReleaseStatusCode,Item/ReleaseStatusCodeText,Item/ExecutionReleaseStatusCode,Item/ExecutionReleaseStatusCodeText";
                    let authorizationCode: string = this.getAuthorizationCode("administration05:Welcome05");
                    let JQryAjxSetting: JQueryAjaxSettings = {
                        type: "GET",
                        contentType: "application/json",
                        url: ibas.strings.format("{0}/{1}/{2}/{3}?{4}{5}",
                            this.sHostInput.getValue(), this.bydServiceBasePathInput.getValue(), this.serviceNameInput.getValue(),
                            this.serviceMethodsInput.getValue(), parameter, columnfields),
                        dataType: "json",
                        headers: {
                            "authorization": authorizationCode,
                        },
                        success: function (oData: any, textStatus: any, request: any): void {
                            let result: any = oData.d;
                            if (ibas.objects.isNull(result)) {
                                return;
                            }
                            let datas: ibas.ArrayList<any> = result.results;
                            that.showSalesOrderList(datas);
                            that.page.setBusy(false);
                        },
                        error: function (error: any): void {
                            that.page.setBusy(false);
                            jQuery.sap.log.debug("Something went wrong while retrieving the data");
                        },
                    };
                    $.get(JQryAjxSetting);
                }
                // 获取Authorization
                getAuthorizationCode(str: string): string {
                    return "Basic " + btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                        function (match: any, p1: any): string {
                            return String.fromCharCode(Number.parseInt(p1, 16));
                        }));
                }

                // 显示byd销售订单
                showSalesOrderList(datas: ibas.ArrayList<any>): void {
                    let sales: sap.byd.salesorder.SalesOrder = datas[0];
                    this.salesOrderTable.setBusy(false);
                    this.salesOrderTable.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    this.LastID = datas[datas.length - 1].ID;
                    // 带样式输出
                    console.log("%c带样式输出", "color:red;font-size:30px");
                    // console.error(); console.warn();
                    // 表格输出
                    console.table(datas);
                }

                // 登录byd，获取byd xsrf-Token
                loginByd(): void {
                    let that: this = this;
                    that.page.setBusy(true);
                    let authorizationCode: string = this.getAuthorizationCode("administration05:Welcome5");
                    let JQryAjxSetting: JQueryAjaxSettings = {
                        type: "POST",
                        url: this.sHostInput.getValue() + this.sGetTokenModulePathInput.getValue(),
                        beforeSend: function (xhr: any): void {
                            xhr.setRequestHeader("authorization", authorizationCode);
                            xhr.setRequestHeader("x-sap-request-xsrf", "X");
                            xhr.setRequestHeader("x-csrf-token", "fetch");
                        },
                        success: function (data: any, textStatus: any, XMLHttpRequest: any): void {
                            that.page.setBusy(false);
                            that.sXsrfToken = XMLHttpRequest.getResponseHeader("sap-xsrf");
                            if (XMLHttpRequest.responseText.indexOf("state=authenticated") === -1) {
                                let xmlDoc: any = $.parseXML(XMLHttpRequest.responseText);
                                $(xmlDoc).find("Data").each(function (): void {
                                    $(this).find("Element").each(function (): void {
                                        if (ibas.strings.equals($(this).attr("name"), "sap-login-XSRF")) {
                                            that.sXsrfToken = $(this).attr("value");
                                        }
                                    });
                                });
                                if (!ibas.objects.isNull(that.sXsrfToken)) {
                                    let JQryAjxSetting: JQueryAjaxSettings = {
                                        type: "POST",
                                        url: this.sHostInput.getValue() + that.sGetTokenModulePathInput.getValue(),
                                        beforeSend: function (xhr: any): void {
                                            xhr.setRequestHeader("authorization", authorizationCode);
                                            xhr.setRequestHeader("x-sap-request-xsrf", "X");
                                            xhr.setRequestHeader("x-csrf-token", "fetch");
                                        },
                                        data: {
                                            "sap-alias": that.sUserInput.getValue(),
                                            "sap-password": that.sPasswordInput.getValue(),
                                            "sap-login-XSRF": that.sXsrfToken
                                        },
                                        success: function (data: any, textStatus: any, XMLHttpRequest: any): void {
                                            that.sXsrfToken = XMLHttpRequest.getResponseHeader("sap-xsrf");
                                            let xmlDoc: any = $.parseXML(XMLHttpRequest.responseText);
                                            $(xmlDoc).find("Data").each(function (): void {
                                                $(this).find("Element").each(function (): void {
                                                    if (ibas.strings.equals($(this).attr("name"), "sap-xsrf")) {
                                                        that.sXsrfToken = $(this).attr("value");
                                                    }
                                                });
                                            });
                                            alert("byd登录成功[xsrf-token=" + that.sXsrfToken + "]");
                                            that.page.setBusy(false);
                                        },
                                        error: function (error: any): void {
                                            alert("byd已经登录[xsrf-token=" + that.sXsrfToken + "]");
                                            that.page.setBusy(false);
                                        }
                                    };
                                    $.ajax(JQryAjxSetting);
                                }
                            } else {
                                alert("byd已经登录[xsrf-token=" + that.sXsrfToken + "]");
                                that.page.setBusy(false);
                            }
                        },
                        error: function (): void {
                            alert("byd登录失败");
                            jQuery.sap.log.debug("Something went wrong while retrieving the data");
                        }
                    };
                    $.ajax(JQryAjxSetting);
                }
                // 保存订单
                saveSalesOrder(): void {
                    let that: this = this;
                    that.page.setBusy(true);
                    // byd对象转json字符串
                    let salesOrder: sap.byd.salesorder.SalesOrder = this.getBydSalesOrder();
                    let objectJsonStr: string = JSON.stringify(salesOrder);
                    console.log("%c" + objectJsonStr, "color:blue;");
                    // json对象转json字符串
                    let jsonStr: string = JSON.stringify({
                        "ExternalReference": "700",
                        "Name": "neil Sales Order date:" + ibas.dates.today() + "  " + ibas.dates.now(),
                        "DataOriginTypeCode": "4",
                        "PricingTerms": {
                            "CurrencyCode": "EUR",
                            "GrossAmountIndicator": false
                        },
                        "Item": [
                            {
                                "ID": "10",
                                "ProcessingTypeCode": "TAN",
                                "ItemProduct":
                                {
                                    "ProductID": "P120101"
                                },
                                "ItemScheduleLine":
                                    [
                                        {
                                            "Quantity": "2",
                                            "unitCode": "EA"
                                        }
                                    ]
                            }
                        ]
                    });
                    console.log("%c" + jsonStr, "color:green;");
                    let JQryAjxSetting: JQueryAjaxSettings = {
                        type: "POST",
                        contentType: "application/json",
                        dataType: "json",
                        url: ibas.strings.format("{0}/{1}/{2}/{3}",
                            this.sHostInput.getValue(), this.bydServiceBasePathInput.getValue(), this.serviceNameInput.getValue(), this.serviceMethodsInput.getValue()),
                        headers: {
                            "x-csrf-token": that.sXsrfToken,
                            "Content-Type": "application/json",
                        },
                        // password: that.sPassword,
                        // username: that.sUser,
                        data: objectJsonStr,
                        success: function (oData: any): void {
                            alert("保存完成");
                            that.page.setBusy(false);
                            let result: any = oData.d;
                            if (ibas.objects.isNull(result)) {
                                return;
                            }
                            let datas: ibas.ArrayList<any> = result.results;
                        },
                        error: function (error: any): void {
                            alert("保存失败");
                            that.page.setBusy(false);
                        },
                    };
                    $.ajax(JQryAjxSetting);
                }

                // 需要生成的byd类引用，没有需要注释
                getBydSalesOrder(): sap.byd.salesorder.SalesOrder {
                    let salesOrder: sap.byd.salesorder.SalesOrder = new Object();
                    salesOrder.ExternalReference = "700";
                    salesOrder.Name = "neil Sales Order date:" + ibas.dates.today() + "  " + ibas.dates.now();
                    salesOrder.DataOriginTypeCode = "4";
                    salesOrder.PricingTerms = new Object;
                    salesOrder.PricingTerms.CurrencyCode = "EUR";
                    salesOrder.PricingTerms.GrossAmountIndicator = false;
                    salesOrder.Item = new Array<object>();
                    let item: sap.byd.salesorder.Item = new Object();
                    item.ID = "10";
                    item.ProcessingTypeCode = "TAN";
                    item.ItemProduct = new Object();
                    item.ItemProduct.ProductID = "P120101";
                    item.ItemScheduleLine = new Array<object>();
                    let line: sap.byd.salesorder.ItemScheduleLine = new Object();
                    line.Quantity = "2";
                    line.unitCode = "EA";
                    item.ItemScheduleLine.push(line);
                    salesOrder.Item.push(item);
                    return salesOrder;
                }
            }
        }
    }
}
