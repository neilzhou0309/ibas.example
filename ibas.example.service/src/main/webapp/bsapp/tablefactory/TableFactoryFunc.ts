/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace app {
        export class TableFactoryFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "e8e68c1c-09af-45eb-9d3d-7d3e6e91732e";
            /** 功能名称 */
            static FUNCTION_NAME = "example_func_tablefactory";
            /** 构造函数 */
            constructor() {
                super();
                this.id = TableFactoryFunc.FUNCTION_ID;
                this.name = TableFactoryFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: TableFactoryApp = new TableFactoryApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
