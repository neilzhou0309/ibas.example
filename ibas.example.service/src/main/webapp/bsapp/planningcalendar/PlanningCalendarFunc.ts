/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace app {
        export class PlanningCalendarFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "d2168659-b6b7-4c4c-a6aa-ac0c68cb245d";
            /** 功能名称 */
            static FUNCTION_NAME = "example_app_planningcalendar_view";
            /** 构造函数 */
            constructor() {
                super();
                this.id = PlanningCalendarFunc.FUNCTION_ID;
                this.name = PlanningCalendarFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: PlanningCalendarApp = new PlanningCalendarApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
