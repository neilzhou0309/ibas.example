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
        export class DataStructrueApp extends ibas.Application<IDataStructrueView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "49780e3d-22cf-4d02-8ca2-af16ba7c9521";
            /** 应用名称 */
            static APPLICATION_NAME: string = "example_app_example_datastructrue";
            /** 构造函数 */
            constructor() {
                super();
                this.id = DataStructrueApp.APPLICATION_ID;
                this.name = DataStructrueApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            protected viewShowed(): void {

            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                this.view.upLoadStructrueEvent = this.upLoadStructrue;
            }
            protected progressCount: number;
            protected total: number;
            protected uploadFileList: ibas.ArrayList<ibas.FileData>;
            async upLoadStructrue(files: File[]): Promise<void> {
                let that: this = this;
                try {
                    this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_uploading_file"));
                    this.busy(true);
                    this.progressCount = 0;
                    this.uploadFileList = new ibas.ArrayList<ibas.FileData>();
                    this.total = files.length;
                    for (let file of files) {
                        let formData: FormData = new FormData();
                        formData.append("file", file);
                        that.uploadFile(formData);
                    }
                } catch (error) {
                    that.busy(false);
                    that.messages(error);
                }
            }
            uploadFile(formData: FormData): void {
                let that: this = this;
                let boRepository: bo.BORepositoryExample = new bo.BORepositoryExample();
                boRepository.upload({
                    fileData: formData,
                    onCompleted(opRslt: ibas.IOperationResult<ibas.FileData>): void {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.view.updateStructrue(opRslt.resultObjects.firstOrDefault().fileName);
                            ++that.progressCount;
                            if (that.progressCount === that.total) {
                                that.busy(false);
                            }
                        } catch (error) {
                            that.busy(false);
                            that.messages(error);
                        }
                    }
                });
            }
        }
        /** 视图-例子 */
        export interface IDataStructrueView extends ibas.View {
            upLoadStructrueEvent: Function;
            updateStructrue(fileName: string): void;
        }
    }
}
