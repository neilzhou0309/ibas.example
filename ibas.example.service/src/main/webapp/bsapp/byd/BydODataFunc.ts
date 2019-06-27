/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace app {
        export class BydODataFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "85bcfeba-0895-4e75-96fd-9175c405bce7";
            /** 功能名称 */
            static FUNCTION_NAME = "example_func_bydodata";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BydODataFunc.FUNCTION_ID;
                this.name = BydODataFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: BydODataApp = new BydODataApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
