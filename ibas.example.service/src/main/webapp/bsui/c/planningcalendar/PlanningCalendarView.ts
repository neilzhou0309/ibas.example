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
            /** 查看视图-例子 */
            export class PlanningCalendarView extends ibas.BOViewView implements app.IExampleViewView {
                private page: sap.m.Page;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: "日",
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {

                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "星期",
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {

                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "月",
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {

                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "年",
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {

                                    }
                                }),
                            ]
                        }),
                        content: [
                        ]
                    });
                }

                /** 显示数据 */
                showExample(data: bo.Example): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                }
            }
        }
    }
}
