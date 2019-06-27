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
        export class TranslationApp extends ibas.Application<ITranslationView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "dd3a96cc-d7c0-4acd-8cfa-16f548ba69b5";
            /** 应用名称 */
            static APPLICATION_NAME: string = "example_app_example_translation";
            /** 构造函数 */
            constructor() {
                super();
                this.id = TranslationApp.APPLICATION_ID;
                this.name = TranslationApp.APPLICATION_NAME;
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
        export interface ITranslationView extends ibas.View {
        }
    }
}
