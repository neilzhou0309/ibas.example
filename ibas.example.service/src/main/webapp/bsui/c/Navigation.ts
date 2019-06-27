/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../index.d.ts" />
/// <reference path="./example/index.ts" />
/// <reference path="./byd/index.ts" />
/// <reference path="./translation/index.ts" />
/// <reference path="./datastructrue/index.ts" />
namespace example {
    export namespace ui {
        /** 视图导航 */
        export class Navigation extends ibas.ViewNavigation {
            /**
             * 创建实例
             * @param id 应用id
             */
            protected newView(id: string): ibas.IView {
                let view: ibas.IView = null;
                switch (id) {
                    case app.ExampleListApp.APPLICATION_ID:
                        view = new c.ExampleListView();
                        break;
                    case app.ExampleChooseApp.APPLICATION_ID:
                        view = new c.ExampleChooseView();
                        break;
                    case app.ExampleViewApp.APPLICATION_ID:
                        view = new c.ExampleViewView();
                        break;
                    case app.ExampleEditApp.APPLICATION_ID:
                        view = new c.ExampleEditView();
                        break;
                    case app.BydODataApp.APPLICATION_ID:
                        view = new c.BydODataView();
                        break;
                    case app.TranslationApp.APPLICATION_ID:
                        view = new c.TranslationView();
                        break;
                    case app.DataStructrueApp.APPLICATION_ID:
                        view = new c.DataStructrueView();
                        break;
                    default:
                        break;
                }
                return view;
            }
        }
    }
}
