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
        export class TableFactoryApp extends ibas.Application<ITableFactoryView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "09f71d0a-d782-402e-82bd-4d0a7825257f";
            /** 应用名称 */
            static APPLICATION_NAME: string = "example_app_example_tablefactory";
            /** 构造函数 */
            constructor() {
                super();
                this.id = TableFactoryApp.APPLICATION_ID;
                this.name = TableFactoryApp.APPLICATION_NAME;
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
        export interface ITableFactoryView extends ibas.View {
        }
    }
}
