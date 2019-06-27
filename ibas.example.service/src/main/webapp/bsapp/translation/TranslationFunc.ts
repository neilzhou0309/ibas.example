/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace app {
        export class TranslationFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "6206c34f-56ce-4688-b278-5f2c9a26038f";
            /** 功能名称 */
            static FUNCTION_NAME = "example_func_translation";
            /** 构造函数 */
            constructor() {
                super();
                this.id = TranslationFunc.FUNCTION_ID;
                this.name = TranslationFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: TranslationApp = new TranslationApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
