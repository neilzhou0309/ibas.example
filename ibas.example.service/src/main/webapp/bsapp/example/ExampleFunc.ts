/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace app {
        export class ExampleFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "80578188-55de-4b8e-b20d-15125f577d52";
            /** 功能名称 */
            static FUNCTION_NAME = "example_func_example";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ExampleFunc.FUNCTION_ID;
                this.name = ExampleFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: ExampleListApp = new ExampleListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
