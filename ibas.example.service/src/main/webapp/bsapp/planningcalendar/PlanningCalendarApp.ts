/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace app {
        /** 查看应用-例子 */
        export class PlanningCalendarApp extends ibas.Application<IPlanningCalendarView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "0dfe68da-cb1c-44b2-a518-7f829c9815aa";
            /** 应用名称 */
            static APPLICATION_NAME: string = "example_app_planningcalendar_view";
            /** 构造函数 */
            constructor() {
                super();
                this.id = PlanningCalendarApp.APPLICATION_ID;
                this.name = PlanningCalendarApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
            }
            /** 视图显示后 */
            protected viewShowed(): void {
            }
        }
        /** 视图-例子 */
        export interface IPlanningCalendarView extends ibas.IBOViewView {

        }
    }
}
