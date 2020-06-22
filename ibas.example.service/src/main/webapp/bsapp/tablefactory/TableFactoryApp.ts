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
                this.view.callPdmEvent = this.callPdm;
            }
            protected callPdm(): void {
                let that: this = this;
                let boRepository: pdm.bo.BORepositoryPdm = new pdm.bo.BORepositoryPdm();
                let variables: ibas.ArrayList<ibas.KeyText> = new ibas.ArrayList<ibas.KeyText>();
                // let item: ibas.KeyText = new ibas.KeyText();
                // item.key = "DocEntry";
                // item.text = "19";
                // variables.add(item);
                boRepository.fetchPdmData({
                    sqlName: "select_OITT_ITT1",
                    variables: variables,
                    onCompleted(opRslt: ibas.IOperationResult<ibas.DataTable>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            let orders: ibas.ArrayList<sales.bo.SalesOrder> = new ibas.ArrayList<sales.bo.SalesOrder>();
                            let dataTable: ibas.DataTable = opRslt.resultObjects.firstOrDefault();
                            // for (let row of dataTable.rows) {
                            //     let order: sales.bo.SalesOrder = new sales.bo.SalesOrder();
                            //     for (let index: number = 0; index < dataTable.columns.length; index++) {
                            //         let col: ibas.DataTableColumn = dataTable.columns[index];
                            //         let value: any = row.cells[index];
                            //         order[col.name] = value;
                            //     }
                            //     orders.add(order);
                            // }
                            that.view.showDateTable(dataTable);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
        }
        /** 视图-例子 */
        export interface ITableFactoryView extends ibas.View {
            callPdmEvent: Function;
            showDateTable(datas: ibas.DataTable): void;
        }
    }
}
