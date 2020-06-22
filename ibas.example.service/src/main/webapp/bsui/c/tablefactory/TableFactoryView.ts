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
            export class TableFactorySource {
                type: bo.emTableRowsType;
                name: string;
            }
            /** 列表视图-例子 */
            export class TableFactoryView extends ibas.View implements app.ITranslationView {
                callPdmEvent: Function;
                private page: sap.m.Page;
                private table: sap.m.Table;
                private bindingList: ibas.ArrayList<TableFactorySource>;
                private typeSelect: sap.extension.m.EnumSelect;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.bindingList = new ibas.ArrayList<TableFactorySource>();
                    let item: TableFactorySource = new TableFactorySource();
                    item.type = bo.emTableRowsType.BUTTONTYPE;
                    item.name = "button";
                    this.bindingList.add(item);
                    item = new TableFactorySource();
                    item.type = bo.emTableRowsType.INPUTTYPE;
                    item.name = "input";
                    this.bindingList.add(item);
                    item = new TableFactorySource();
                    item.type = bo.emTableRowsType.TEXTTYPE;
                    item.name = "text";
                    this.bindingList.add(item);
                    item = new TableFactorySource();
                    item.type = bo.emTableRowsType.SELECTTYPE;
                    item.name = "2";
                    this.bindingList.add(item);
                    that.table = new sap.m.Table("", {
                        inset: true,
                        growing: false,
                        growingThreshold: 15,
                        growingScrollToLoad: true,
                        mode: sap.m.ListMode.SingleSelectMaster,
                        columns: [
                            new sap.m.Column("", {
                                demandPopin: true,
                                hAlign: "Center",
                                header: new sap.m.Text("", {
                                    text: "类型"
                                })
                            }),
                            new sap.m.Column("", {
                                demandPopin: true,
                                hAlign: "Center",
                                header: new sap.m.Text("", {
                                    text: "组件"
                                })
                            }),
                        ],
                    });
                    this.table.bindItems({
                        path: "/rows",
                        factory: function (sId: any, oContext: any): any {
                            let data: TableFactorySource = oContext.getObject();
                            switch (data.type) {
                                case bo.emTableRowsType.INPUTTYPE:
                                    return new sap.m.ColumnListItem("", {
                                        cells: [
                                            new sap.m.Text("", {
                                                text: {
                                                    path: "type"
                                                }
                                            }),
                                            new sap.m.Input("", {
                                                value: {
                                                    path: "name"
                                                }
                                            }),
                                        ]
                                    });
                                case bo.emTableRowsType.TEXTTYPE:
                                    return new sap.m.ColumnListItem("", {
                                        cells: [
                                            new sap.m.Text("", {
                                                text: {
                                                    path: "type"
                                                }
                                            }),
                                            new sap.m.Text("", {
                                                text: {
                                                    path: "name"
                                                }
                                            }),
                                        ]
                                    });
                                case bo.emTableRowsType.SELECTTYPE:
                                    return new sap.m.ColumnListItem("", {
                                        cells: [
                                            new sap.m.Text("", {
                                                text: {
                                                    path: "type"
                                                }
                                            }),
                                            new sap.extension.m.EnumSelect("", {
                                                enumValue: bo.emTableRowsType,
                                                bindingValue: {
                                                    path: "name",
                                                    type: "sap.ui.model.type.Integer"
                                                }
                                            })
                                        ]
                                    });
                                case bo.emTableRowsType.BUTTONTYPE:
                                    return new sap.m.ColumnListItem("", {
                                        cells: [
                                            new sap.m.Text("", {
                                                text: {
                                                    path: "type"
                                                }
                                            }),
                                            new sap.m.Button("", {
                                                text: {
                                                    path: "name"
                                                }
                                            }),
                                        ]
                                    });
                                default:
                                    break;
                            }
                            return new sap.m.ColumnListItem("", {
                                cells: [
                                    new sap.m.Text("", {
                                        text: {
                                            path: "type"
                                        }
                                    }),
                                    new sap.m.Text("", {
                                        text: {
                                            path: "name"
                                        }
                                    }),
                                ]
                            });
                        }
                    });
                    let cssGrid: sap.ui.layout.cssgrid.CSSGrid = new sap.ui.layout.cssgrid.CSSGrid("", {
                        width: "98%",
                        gridTemplateColumns: "repeat(4, minmax(15rem, 1fr))",
                        gridTemplateRows: "15rem",
                        gridGap: "0.5rem 0.5rem",
                        gridAutoFlow: sap.ui.layout.cssgrid.CSSGridAutoFlow.RowDense,
                    });
                    cssGrid.bindAggregation("items", {
                        templateShareable: false,
                        path: "/",
                        factory: function (sId: any, oContext: any): any {
                            let data: any = oContext.getObject();
                            if (ibas.objects.isNull(data.title) || ibas.strings.isEmpty(data.title)) {
                                return new sap.f.Card("", {
                                    headerPosition: sap.f.cards.HeaderPosition.Bottom,
                                    layoutData: new sap.ui.layout.cssgrid.GridItemLayoutData("", {
                                        gridColumn: {
                                            path: "gridColumn"
                                        },
                                        gridRow: {
                                            path: "gridRow"
                                        },
                                    }),
                                    content: new sap.m.Image("", {
                                        densityAware: false,
                                        src: {
                                            path: "previewSrc"
                                        },
                                        width: "100%",
                                        height: "100%",
                                        press: function (): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (!ibas.objects.isNull(data)) {
                                                that.showDialog(data);
                                            }
                                        }
                                    }),
                                }).addStyleClass("commmodityImageCell");
                            } else {
                                return new sap.f.Card("", {
                                    headerPosition: sap.f.cards.HeaderPosition.Bottom,
                                    layoutData: new sap.ui.layout.cssgrid.GridItemLayoutData("", {
                                        gridColumn: {
                                            path: "gridColumn"
                                        },
                                        gridRow: {
                                            path: "gridRow"
                                        },
                                    }),
                                    header: new sap.f.cards.Header("", {
                                        title: {
                                            path: "title"
                                        },
                                        // subtitle: {
                                        //     path: "desc"
                                        // },
                                    }),
                                    content: new sap.m.Image("", {
                                        densityAware: false,
                                        src: {
                                            path: "previewSrc"
                                        },
                                        width: "100%",
                                        height: "100%",
                                        press: function (): void {
                                            let data: any = this.getBindingContext().getObject();
                                            if (!ibas.objects.isNull(data)) {
                                                that.showDialog(data);
                                            }
                                        }
                                    }),
                                }).addStyleClass("commmodityImageCell");
                            }
                        }
                    });
                    let datas: any = [
                        {
                            title: "标题",
                            desc: "描述",
                            previewSrc: "http://localhost:8081/homedesign/services/rest/file/f0fdb253-d3c0-4fe6-ac70-2e6c6dad00a9.jpg",
                            gridColumn: "span 3",
                            gridRow: "span 2",
                        },
                        {
                            title: "标题",
                            desc: "描述",
                            previewSrc: "http://localhost:8081/homedesign/services/rest/file/testgif.gif",
                            gridColumn: "span 1",
                            gridRow: "span 1"
                        },
                        {
                            previewSrc: "http://localhost:8081/homedesign/services/rest/file/91630e37-171d-4a56-b55f-ead014945f0a.jpg",
                            gridColumn: "span 1",
                            gridRow: "span 1"
                        },
                        {
                            previewSrc: "http://localhost:8081/homedesign/services/rest/file/1adf2fe4-7c9d-4224-b132-797adeec7e3c.jpg",
                            gridColumn: "span 1",
                            gridRow: "span 1"
                        },
                        {
                            previewSrc: "http://localhost:8081/homedesign/services/rest/file/6b1fb5dc-732c-4e2d-8b47-d3a5b9c25e06.jpg",
                            gridColumn: "span 2",
                            gridRow: "span 2"
                        },
                        {
                            previewSrc: "http://localhost:8081/homedesign/services/rest/file/ddf0b5fc-757c-44ce-ae94-d95613b9bef7.jpg",
                            gridColumn: "span 1",
                            gridRow: "span 1"
                        },
                        {
                            previewSrc: "http://localhost:8081/homedesign/services/rest/file/300107bd-a3a1-4177-977e-435fb0302307.jpg",
                            gridColumn: "span 4",
                            gridRow: "span 2"
                        },
                        {
                            previewSrc: "http://localhost:8081/homedesign/services/rest/file/bbcf2888-0e49-49a0-b91f-5eb24b7e2bd6.jpg",
                            gridColumn: "span 2",
                            gridRow: "span 2"
                        },
                        {
                            previewSrc: "http://localhost:8081/homedesign/services/rest/file/37add3d3-13b7-4f92-8b55-e4f2bc740765.jpg",
                            gridColumn: "span 2",
                            gridRow: "span 2"
                        },
                        {
                            previewSrc: "http://localhost:8081/homedesign/services/rest/file/f0fdb253-d3c0-4fe6-ac70-2e6c6dad00a9.jpg",
                            gridColumn: "span 1",
                            gridRow: "span 1"
                        },
                        {
                            previewSrc: "http://localhost:8081/homedesign/services/rest/file/c18dbfde-ec2e-43dd-9b9e-c5cae8b33912.jpg",
                            gridColumn: "span 1",
                            gridRow: "span 1"
                        }
                    ];
                    cssGrid.setModel(new sap.ui.model.json.JSONModel(datas));
                    cssGrid.bindObject("/");
                    let floatingLayer: sap.extension.m1.FloatingLayer = new sap.extension.m1.FloatingLayer("", {
                        // width: "500px", 弹出宽度默认300px
                        // speed: 10,  弹出速度默认5
                        items: [
                            new sap.m.VBox("", {
                                items: [
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                    new sap.m.Button("", {
                                        text: "zhoulei",
                                    }),
                                ]
                            })
                        ]
                    });
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: "GridList",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.showGridListDemo();
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "比价",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.showContrastDialog();
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "调用pdm",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.fireViewEvents(that.callPdmEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "tree",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.showTreeTable();
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                that.typeSelect = new sap.extension.m.EnumSelect("", {
                                    enumType: bo.emTableRowsType,
                                    bindingValue: {
                                        path: "name",
                                        type: new sap.extension.data.Enum({
                                            enumType: bo.emTableRowsType
                                        })
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "添加行",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        let data: TableFactorySource = new TableFactorySource();
                                        switch (that.typeSelect.getSelectedKey()) {
                                            case bo.emTableRowsType.INPUTTYPE.toString():
                                                data.type = bo.emTableRowsType.INPUTTYPE;
                                                data.name = "inpupt";
                                                break;
                                            case bo.emTableRowsType.TEXTTYPE.toString():
                                                data.type = bo.emTableRowsType.TEXTTYPE;
                                                data.name = "text";
                                                break;
                                            case bo.emTableRowsType.SELECTTYPE.toString():
                                                data.type = bo.emTableRowsType.SELECTTYPE;
                                                data.name = "2";
                                                break;
                                            case bo.emTableRowsType.BUTTONTYPE.toString():
                                                data.type = bo.emTableRowsType.BUTTONTYPE;
                                                data.name = "button";
                                                break;
                                            default:
                                                break;
                                        }
                                        that.bindingList.add(data);
                                        that.showList(that.bindingList);
                                    }
                                }),
                            ]
                        }),
                        content: [
                            new sap.m.VBox("", {
                                items: [
                                    floatingLayer,
                                    new sap.m.Button("", {
                                        text: "open",
                                        press: function (): void {
                                            floatingLayer.open();
                                        }
                                    }),
                                ]
                            }),
                            new sap.m.FlexBox("", {
                                width: "100%",
                                // alignContent: sap.m.FlexAlignContent.Center,
                                // alignItems: sap.m.FlexAlignItems.Center,
                                justifyContent: sap.m.FlexJustifyContent.Center,
                                renderType: sap.m.FlexRendertype.Bare,
                                items: [
                                    cssGrid,
                                ]
                            }),
                            that.table,

                        ]
                    });
                    this.showList(this.bindingList);
                    this.id = this.page.getId();
                    return this.page;
                }

                showDialog(data: any): void {
                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        showHeader: false,
                        content: [
                            new sap.m.Image("", {
                                densityAware: false,
                                src: {
                                    path: "previewSrc"
                                },
                            })
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://inspect-down",
                                press: function (): void {
                                    dialog.close();
                                }
                            }),
                        ]
                    });
                    dialog.addStyleClass("sapUiSizeCompact");
                    dialog.setModel(new sap.ui.model.json.JSONModel(data));
                    dialog.bindObject("/");
                    dialog.open();
                }

                showList(datas: ibas.ArrayList<TableFactorySource>): void {
                    this.table.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }

                showGridListDemo(): void {
                    let gridList: sap.f.GridList = new sap.f.GridList("", {
                        width: "100%"
                    });
                    gridList.bindAggregation("items", {
                        templateShareable: false,
                        path: "/rows",
                        template: new sap.f.GridListItem("", {
                            content: [
                                new sap.m.FlexBox("", {
                                    width: "25rem",
                                    // height: "25rem"
                                }).addStyleClass("sapUiSmallMargin")
                            ]
                        })
                    });
                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                        contentWidth: "80%",
                        contentHeight: "80%",
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: false,
                        verticalScrolling: true,
                        showHeader: false,
                        content: [
                            gridList
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://inspect-down",
                                press: function (): void {
                                    dialog.close();
                                }
                            }),
                        ]
                    });
                    let datas: ibas.ArrayList<string> = new ibas.ArrayList<string>();
                    for (let n: number = 0; n < 100; n++) {
                        datas.add("1");
                    }
                    dialog.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    dialog.open();
                }
                showContrastDialog(): void {
                    let oStyle: any = document.createElement("STYLE");
                    oStyle.innerText = ".red {color:red !important;size:14px !important;} .green{color :green!important;size:16px;!important}";
                    oStyle.setAttribute("type", "text/css");
                    document.getElementsByTagName("HEAD")[0].appendChild(oStyle);
                    let carousel: sap.m.Carousel = new sap.m.Carousel("", {
                        height: "100%",
                        customLayout: {
                            visiblePagesCount: 4
                        },
                        pages: {
                            path: "/rows",
                            template: new sap.f.Card("", {
                                header: new sap.f.cards.Header("", {
                                    title: "{name}",
                                    statusText: "总计:{total}",
                                    iconDisplayShape: "Square"
                                }),
                                content: [
                                    new sap.m.VBox("", {
                                        width: "100%",
                                        items: {
                                            path: "items",
                                            template: new sap.m.FlexBox("", {
                                                width: "100%",
                                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                                alignContent: sap.m.FlexAlignContent.SpaceBetween,
                                                alignItems: sap.m.FlexAlignItems.Start,
                                                items: [
                                                    new sap.m.Text("", {
                                                        text: "{itemName}"
                                                    }),
                                                    new sap.m.Text("", {
                                                        text: {
                                                            path: "quantity",
                                                            formatter: function (value: any): any {
                                                                if (value > 300) {
                                                                    this.addStyleClass("green");
                                                                    this.removeStyleClass("red");
                                                                } else {
                                                                    this.addStyleClass("red");
                                                                    this.removeStyleClass("green");
                                                                }
                                                                return value;
                                                            },
                                                        }
                                                    })
                                                ]
                                            })
                                        }
                                    }),
                                ],
                            })
                        }
                    });
                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                        contentWidth: "80%",
                        contentHeight: "80%",
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        showHeader: false,
                        content: [
                            carousel
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://inspect-down",
                                press: function (): void {
                                    dialog.close();
                                }
                            }),
                        ]
                    });
                    let orders: ibas.ArrayList<{
                        name: string;
                        total: number;
                        items: {
                            itemName: string;
                            quantity: number;
                        }[]
                    }> = new ibas.ArrayList<{
                        name: string;
                        total: number;
                        items: {
                            itemName: string;
                            quantity: number;
                        }[]
                    }>();
                    orders.add({
                        name: "客户一",
                        total: 550,
                        items: [
                            {
                                itemName: "物料一",
                                quantity: 220
                            },
                            {
                                itemName: "物料二",
                                quantity: 330
                            }
                        ]
                    });
                    orders.add({
                        name: "客户二",
                        total: 570,
                        items: [
                            {
                                itemName: "物料一",
                                quantity: 230
                            },
                            {
                                itemName: "物料二",
                                quantity: 340
                            }
                        ]
                    });
                    orders.add({
                        name: "客户三",
                        total: 8550,
                        items: [
                            {
                                itemName: "物料一",
                                quantity: 4220
                            },
                            {
                                itemName: "物料二",
                                quantity: 4330
                            }
                        ]
                    });
                    orders.add({
                        name: "客户四",
                        total: 6570,
                        items: [
                            {
                                itemName: "物料一",
                                quantity: 3230
                            },
                            {
                                itemName: "物料二",
                                quantity: 3340
                            }
                        ]
                    });
                    orders.add({
                        name: "客户五",
                        total: 4550,
                        items: [
                            {
                                itemName: "物料一",
                                quantity: 2220
                            },
                            {
                                itemName: "物料二",
                                quantity: 2330
                            }
                        ]
                    });
                    orders.add({
                        name: "客户六",
                        total: 2570,
                        items: [
                            {
                                itemName: "物料一",
                                quantity: 1230
                            },
                            {
                                itemName: "物料二",
                                quantity: 1340
                            }
                        ]
                    });
                    carousel.setModel(new sap.ui.model.json.JSONModel({ rows: orders }));
                    dialog.open();
                }
                showDateTable(table: ibas.DataTable): void {
                    let tableResult: sap.ui.table.Table = new sap.ui.table.Table("", {
                        enableSelectAll: true,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        editable: false,
                        rows: "{/rows}",
                    });
                    for (let index: number = 0; index < table.columns.length; index++) {
                        let col: ibas.DataTableColumn = table.columns[index];
                        if (ibas.strings.isEmpty(col.description)) {
                            col.description = ibas.i18n.prop(col.name);
                            if (col.description.startsWith("[") && col.description.endsWith("]")) {
                                col.description = col.name;
                            }
                        } else {
                            let value: string = col.description;
                            col.description = ibas.i18n.prop(col.description);
                            if (col.description.startsWith("[") && col.description.endsWith("]")) {
                                col.description = value;
                            }
                        }
                        if (col.definedDataType() === ibas.emTableDataType.DATE) {
                            tableResult.addColumn(
                                new sap.ui.table.Column("", {
                                    label: ibas.strings.isEmpty(col.description) ? col.name : col.description,
                                    width: "100px",
                                    autoResizable: true,
                                    sortProperty: index.toString(),
                                    filterProperty: index.toString(),
                                    template: new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: index.toString(),
                                        formatter(data: any): any {
                                            return ibas.dates.toString(data);
                                        }
                                    })
                                })
                            );
                        } else {
                            tableResult.addColumn(
                                new sap.ui.table.Column("", {
                                    label: ibas.strings.isEmpty(col.description) ? col.name : col.description,
                                    width: "100px",
                                    autoResizable: true,
                                    sortProperty: index.toString(),
                                    filterProperty: index.toString(),
                                    template: new sap.m.Text("", {
                                        wrapping: false
                                    }).bindProperty("text", {
                                        path: index.toString(),
                                    })
                                })
                            );
                        }
                    }
                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                        contentWidth: "80%",
                        contentHeight: "80%",
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: false,
                        verticalScrolling: true,
                        showHeader: false,
                        content: [
                            tableResult
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://inspect-down",
                                press: function (): void {
                                    dialog.close();
                                }
                            }),
                        ]
                    });
                    tableResult.setModel(new sap.ui.model.json.JSONModel({ rows: table.convert({ format: true, nameAs: "index" }) }));
                    dialog.open();
                }
                showTreeTable(): void {
                    let datas: any = [
                        {
                            "NodeID": 1,
                            "HierarchyLevel": 0,
                            "Description": "1",
                            "ParentNodeID": null,
                            "DrillState": "expanded"
                        },
                        {
                            "NodeID": 2,
                            "HierarchyLevel": 0,
                            "Description": "2",
                            "ParentNodeID": null,
                            "DrillState": "expanded"
                        },
                        {
                            "NodeID": 3,
                            "HierarchyLevel": 0,
                            "Description": "3",
                            "ParentNodeID": null,
                            "DrillState": "expanded"
                        },
                        {
                            "NodeID": 4,
                            "HierarchyLevel": 1,
                            "Description": "1.1",
                            "ParentNodeID": 1,
                            "DrillState": "leaf"
                        },
                        {
                            "NodeID": 5,
                            "HierarchyLevel": 1,
                            "Description": "1.2",
                            "ParentNodeID": 1,
                            "DrillState": "expanded"
                        },
                        {
                            "NodeID": 6,
                            "HierarchyLevel": 2,
                            "Description": "1.2.1",
                            "ParentNodeID": 5,
                            "DrillState": "leaf"
                        },
                        {
                            "NodeID": 7,
                            "HierarchyLevel": 2,
                            "Description": "1.2.2",
                            "ParentNodeID": 5,
                            "DrillState": "leaf"
                        },
                        {
                            "NodeID": 8,
                            "HierarchyLevel": 1,
                            "Description": "2.1",
                            "ParentNodeID": 2,
                            "DrillState": "leaf"
                        },
                        {
                            "NodeID": 9,
                            "HierarchyLevel": 1,
                            "Description": "2.2",
                            "ParentNodeID": 2,
                            "DrillState": "leaf"
                        },
                        {
                            "NodeID": 10,
                            "HierarchyLevel": 1,
                            "Description": "2.3",
                            "ParentNodeID": 2,
                            "DrillState": "leaf"
                        },
                        {
                            "NodeID": 11,
                            "HierarchyLevel": 1,
                            "Description": "3.1",
                            "ParentNodeID": 3,
                            "DrillState": "expanded"
                        },
                        {
                            "NodeID": 12,
                            "HierarchyLevel": 2,
                            "Description": "3.1.1",
                            "ParentNodeID": 11,
                            "DrillState": "expanded"
                        },
                        {
                            "NodeID": 13,
                            "HierarchyLevel": 3,
                            "Description": "3.1.1.1",
                            "ParentNodeID": 12,
                            "DrillState": "leaf"
                        },
                        {
                            "NodeID": 14,
                            "HierarchyLevel": 3,
                            "Description": "3.1.1.2",
                            "ParentNodeID": 12,
                            "DrillState": "leaf"
                        },
                        {
                            "NodeID": 15,
                            "HierarchyLevel": 3,
                            "Description": "3.1.1.3",
                            "ParentNodeID": 12,
                            "DrillState": "leaf"
                        },
                        {
                            "NodeID": 16,
                            "HierarchyLevel": 3,
                            "Description": "3.1.1.4",
                            "ParentNodeID": 12,
                            "DrillState": "leaf"
                        }
                    ];
                    let treeTable: sap.ui.table.TreeTable = new sap.ui.table.TreeTable("", {
                        selectionMode: "Single",
                        enableColumnReordering: false,
                        expandFirstLevel: false,
                        rows: {
                            path: "/rows",
                            parameters: {
                                countMode: "Inline",
                                treeAnnotationProperties: {
                                    hierarchyLevelFor: "HierarchyLevel",
                                    hierarchyNodeFor: "NodeID",
                                    hierarchyParentNodeFor: "ParentNodeID",
                                    hierarchyDrillStateFor: "DrillState"
                                }
                            }
                        },
                        columns: [
                            new sap.ui.table.Column("", {
                                label: "Description",
                                template: new sap.m.Text("", {
                                    text: "{Description}",
                                    wrapping: false
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: "HierarchyLevel",
                                template: new sap.m.Text("", {
                                    text: "{HierarchyLevel}",
                                    wrapping: false
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: "NodeID",
                                template: new sap.m.Text("", {
                                    text: "{NodeID}",
                                    wrapping: false
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: "ParentNodeID",
                                template: new sap.m.Text("", {
                                    text: "{ParentNodeID}",
                                    wrapping: false
                                })
                            }),
                        ]
                    });
                    treeTable.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                        contentWidth: "80%",
                        contentHeight: "80%",
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: false,
                        verticalScrolling: true,
                        showHeader: false,
                        content: [
                            treeTable
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://inspect-down",
                                press: function (): void {
                                    dialog.close();
                                }
                            }),
                        ]
                    });
                    dialog.open();
                }
            }
        }
    }
}

namespace sap {
    export namespace extension {
        export namespace m1 {
            let layerTimer: any;
            let layerWidth: string = "300px";
            sap.m.FlexBox.extend("sap.extension.m1.FloatingLayer", {
                metadata: {
                    properties: {
                        /** 层是否打开 */
                        open: { type: "boolean", defaultValue: false },
                        /** 层打开速度 */
                        speed: { type: "Number", defaultValue: 5 },
                    },
                    events: {},
                },
                renderer: {
                    /** 渲染 */
                    render(oRm: sap.ui.core.RenderManager, floatingLayer: sap.extension.m1.FloatingLayer): void {
                        let height: string = "100%";
                        if (!ibas.strings.isEmpty(floatingLayer.getWidth())) {
                            layerWidth = floatingLayer.getWidth();
                        }
                        if (!ibas.strings.isEmpty(floatingLayer.getHeight())) {
                            height = floatingLayer.getHeight();
                        }
                        oRm.write("<div id='" + floatingLayer.getId() + "-view'");
                        oRm.addStyle("width", "100%");
                        oRm.addStyle("height", "100%");
                        oRm.addStyle("top", "0%");
                        oRm.addStyle("left", "0%");
                        oRm.addStyle("position", "absolute");
                        oRm.addStyle("display", "none");
                        oRm.addStyle("z-index", "9997");
                        oRm.writeStyles();
                        oRm.write(">");

                        oRm.write("<div id='" + floatingLayer.getId() + "-opacity'");
                        oRm.addStyle("width", "100%");
                        oRm.addStyle("height", "100%");
                        oRm.addStyle("filter", "alpha(Opacity = 20)");
                        oRm.addStyle("-moz - opacity", "0.6");
                        oRm.addStyle("opacity", "0.4");
                        oRm.addStyle("z-index", "9998");
                        oRm.addStyle("position", "fixed");
                        oRm.addStyle("top", "0%");
                        oRm.addStyle("left", "0%");
                        oRm.addStyle("background-color", "rgba(0,0,0)");
                        oRm.writeStyles();
                        oRm.write(">");
                        oRm.write("</div>");

                        oRm.write("<div class='sapFCardContent sapFCard'");
                        oRm.addStyle("z-index", "9999");
                        oRm.addStyle("opacity", "1");
                        oRm.addStyle("overflow", "scroll");
                        oRm.addStyle("width", layerWidth);
                        oRm.addStyle("height", height);
                        oRm.addStyle("right", -parseFloat(layerWidth) + "px");
                        oRm.addStyle("top", "0px");
                        oRm.addStyle("position", "absolute");
                        oRm.writeStyles();
                        oRm.writeControlData(floatingLayer);
                        oRm.write(">");
                        oRm.write("<section id='" + floatingLayer.getId() + "-cont'");
                        oRm.write(">");
                        let aContent: any = floatingLayer.getItems();
                        let len: any = aContent.length;
                        for (let i: any = 0; i < len; i++) {
                            oRm.renderControl(aContent[i]);
                        }
                        oRm.write("</section>");
                        oRm.write("</div>");
                        oRm.write("</div>");
                    },
                },
                setSpeed(value: number): void {
                    this.setProperty("speed", value);
                },
                getSpeed(): number {
                    return this.getProperty("speed");
                },
                setOpen(value: boolean): void {
                    this.setProperty("open", value);
                },
                getOpen(): boolean {
                    return this.getProperty("open");
                }
            });
            (<any>FloatingLayer).prototype.rerender = function (this: any): void {

            };
            FloatingLayer.prototype.open = function (): void {
                let that: any = this;
                let viewDiv: any = document.getElementById(this.getId() + "-view");
                viewDiv.style.display = "block";
                document.getElementById(this.getId() + "-opacity").onclick = function (): void {
                    that.close();
                };
                // 禁用父page滚动条
                let scroll: Function = function (control: any): void {
                    if (control instanceof sap.m.Page) {
                        document.getElementById(control.getId() + "-cont").style.cssText = "overflow:hidden !important";
                    } else {
                        scroll(control.oParent);
                    }
                };
                scroll(this);
                let oDiv: any = document.getElementById(this.getId());
                let speed: number = this.getSpeed();
                this.setOpen(true);
                window.clearInterval(layerTimer);
                layerTimer = setInterval(function (): void {
                    oDiv.style.right = parseFloat(oDiv.style.right) + speed + "px";
                    if (parseFloat(oDiv.style.right) >= 0) {
                        oDiv.style.right = "0px";
                        window.clearInterval(layerTimer);
                    }
                }, 2);
            };
            FloatingLayer.prototype.close = function (): void {
                let viewDiv: any = document.getElementById(this.getId() + "-view");
                // 恢复父page滚动条
                let scroll: Function = function (control: any): void {
                    if (control instanceof sap.m.Page) {
                        document.getElementById(control.getId() + "-cont").style.cssText = "overflow:hidden auto !important";
                    } else {
                        scroll(control.oParent);
                    }
                };
                scroll(this);
                let oDiv: any = document.getElementById(this.getId());
                let speed: number = this.getSpeed();
                this.setOpen(false);
                window.clearInterval(layerTimer);
                layerTimer = setInterval(function (): void {
                    oDiv.style.right = parseFloat(oDiv.style.right) - speed + "px";
                    if (parseFloat(oDiv.style.right) <= -parseFloat(layerWidth)) {
                        oDiv.style.right = -parseFloat(layerWidth);
                        window.clearInterval(layerTimer);
                        viewDiv.style.display = "none";
                    }
                }, 2);
            };
        }
    }
}
declare namespace sap {
    export namespace extension {
        export namespace m1 {
            export class FloatingLayer extends sap.m.FlexBox {
                /** 获取-弹出速度 */
                getSpeed(): number;
                /** 设置-弹出速度 */
                setSpeed(value: number): void;
                /** 打开侧边层 */
                open(): void;
                /** 关闭侧边层 */
                close(): void;
            }
        }
    }
}
