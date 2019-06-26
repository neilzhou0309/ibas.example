/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace app {
        /** 选择应用-例子 */
        export class ExampleChooseApp extends ibas.BOChooseService<IExampleChooseView, bo.Example> {
            /** 应用标识 */
            static APPLICATION_ID: string = "7ccaa038-3559-4d36-97ef-887f015b4772";
            /** 应用名称 */
            static APPLICATION_NAME: string = "example_app_example_choose";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Example.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = ExampleChooseApp.APPLICATION_ID;
                this.name = ExampleChooseApp.APPLICATION_NAME;
                this.boCode = ExampleChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryExample = new bo.BORepositoryExample();
                boRepository.fetchExample({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Example>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 1
                                && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true) && !that.isViewShowed()) {
                                // 仅一条数据，直接选择
                                that.chooseData(opRslt.resultObjects);
                            } else {
                                if (!that.isViewShowed()) {
                                    // 没显示视图，先显示
                                    that.show();
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                                }
                                that.view.showData(opRslt.resultObjects);
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
                // 关闭自身
                this.destroy();
                // 调用编辑应用
                let app: ExampleEditApp = new ExampleEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
        }
        /** 视图-例子 */
        export interface IExampleChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Example[]): void;
        }
        /** 例子选择服务映射 */
        export class ExampleChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = ExampleChooseApp.APPLICATION_ID;
                this.name = ExampleChooseApp.APPLICATION_NAME;
                this.boCode = ExampleChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.Example> {
                return new ExampleChooseApp();
            }
        }
    }
}
