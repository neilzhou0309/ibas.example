/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace app {
        /** 列表应用-例子 */
        export class BydODataApp extends ibas.Application<IBydODataView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "9c48fb9f-edfd-40b6-973c-10f3b6e9b112";
            /** 应用名称 */
            static APPLICATION_NAME: string = "example_app_example_bydodata";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BydODataApp.APPLICATION_ID;
                this.name = BydODataApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            protected viewShowed(): void {

            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
            }
        }
        /** 视图-例子 */
        export interface IBydODataView extends ibas.View {
        }
    }
}
