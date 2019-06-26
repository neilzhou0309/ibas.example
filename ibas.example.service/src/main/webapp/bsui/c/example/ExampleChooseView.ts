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
            /** 选择视图-例子 */
            export class ExampleChooseView extends ibas.BOChooseView implements app.IExampleChooseView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Example;
                }
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.table.DataTable("", {
                        chooseType: this.chooseType,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        dataInfo: this.queryTarget,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_code"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "code",
                type: new sap.extension.data.Alphanumeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_name"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "name",
                type: new sap.extension.data.Alphanumeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_docentry"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "docEntry",
                type: new sap.extension.data.Numeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_objectcode"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "objectCode",
                type: new sap.extension.data.Alphanumeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_series"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "series",
                type: new sap.extension.data.Numeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_loginst"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "logInst",
                type: new sap.extension.data.Numeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_datasource"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "dataSource",
                type: new sap.extension.data.Alphanumeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_createdate"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "createDate",
                type: new sap.extension.data.Date()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_createtime"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "createTime",
                type: new sap.extension.data.Time()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_updatedate"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "updateDate",
                type: new sap.extension.data.Date()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_updatetime"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "updateTime",
                type: new sap.extension.data.Time()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_createusersign"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "createUserSign",
                type: new sap.extension.data.Numeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_updateusersign"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "updateUserSign",
                type: new sap.extension.data.Numeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_createactionid"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "createActionId",
                type: new sap.extension.data.Alphanumeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_updateactionid"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "updateActionId",
                type: new sap.extension.data.Alphanumeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_dataowner"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "dataOwner",
                type: new sap.extension.data.Numeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_teammembers"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "teamMembers",
                type: new sap.extension.data.Alphanumeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_organization"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "organization",
                type: new sap.extension.data.Alphanumeric()
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_activated"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "activated",
                type: new sap.extension.data.YesNo(true)
            }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_example_remarks"),
                                template: new sap.extension.m.Text("", {
            }).bindProperty("bindingValue", {
                path: "remarks",
                type: new sap.extension.data.Alphanumeric()
            }),
                            }),
                        ],
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        }
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.table
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_new"),
                                type: sap.m.ButtonType.Transparent,
                                visible: this.mode === ibas.emViewMode.VIEW ? false : true,
                                press: function (): void {
                                    that.fireViewEvents(that.newDataEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_choose"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.chooseDataEvent, that.table.getSelecteds());
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ],
                    });
                }
                private table: sap.extension.table.Table;
                /** 显示数据 */
                showData(datas: bo.Example[]): void {
                    let model: sap.ui.model.Model = this.table.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.table.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.table.setBusy(true);
                        this.table.setFirstVisibleRow(0);
                        this.table.setModel(null);
                    }
                }
            }
        }
    }
}
