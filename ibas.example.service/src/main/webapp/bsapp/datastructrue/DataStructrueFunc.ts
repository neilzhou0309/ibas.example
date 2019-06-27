/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace app {
        export class DataStructrueFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "31f4a75b-e9cf-4c96-98b3-ffb1984e1581";
            /** 功能名称 */
            static FUNCTION_NAME = "example_func_datastructrue";
            /** 构造函数 */
            constructor() {
                super();
                this.id = DataStructrueFunc.FUNCTION_ID;
                this.name = DataStructrueFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: DataStructrueApp = new DataStructrueApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
