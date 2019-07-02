/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace ui {
        export namespace c {
            /** 列表视图-例子 */
            export class DataStructrueView extends ibas.View implements app.IDataStructrueView {
                // 控件声明
                private page: sap.m.Page;
                upLoadStructrueEvent: Function;
                private metadataUrl: string;
                private fileName: string;
                private localServicePathInput: sap.m.Input;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.ui.unified.FileUploader("", {
                                    style: "Emphasized",
                                    width: "100%",
                                    multiple: true,
                                    uploadOnChange: false,
                                    buttonOnly: false,
                                    icon: "sap-icon://upload-to-cloud",
                                    iconOnly: false,
                                    fileType: ["xml"],
                                    mimeType: ["text/xml"],
                                    typeMissmatch: function (oEvent: sap.ui.base.Event): void {
                                        let sType: string[] = this.getFileType();
                                        let caller: ibas.IMessgesCaller = {
                                            title: ibas.i18n.prop(that.application.name),
                                            type: ibas.emMessageType.WARNING,
                                            message:
                                                ibas.i18n.prop("commodityeditsenoinor_msg_upload_type_miss_match", sType)
                                        };
                                        that.application.viewShower.messages(caller);
                                    },
                                    change: function (oEvent: sap.ui.base.Event): void {
                                        let files: File[] = oEvent.getParameter("files");
                                        if (ibas.objects.isNull(files) || files.length === 0) {
                                            return;
                                        }
                                        setTimeout(() => {
                                            that.fireViewEvents(that.upLoadStructrueEvent,
                                                files
                                            );
                                        }, 10);
                                    },
                                }),
                                this.localServicePathInput = new sap.m.Input("", {
                                    value: "http://localhost:8081/",
                                    tooltip: "本地服务地址"
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: "读取数据结构",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.readDataStructure(false);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: "下载数据结构",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.readDataStructure(true);
                                    }
                                }),
                            ]
                        }),
                        content: []
                    });
                    this.id = this.page.getId();
                    return this.page;
                }

                // 加载byd接口数据结构
                readDataStructure(download: boolean): void {
                    let that: this = this;
                    this.metadataUrl = "http://localhost:8081/";
                    if (!ibas.strings.isEmpty(this.localServicePathInput.getValue())) {
                        this.metadataUrl = this.localServicePathInput.getValue();
                    }
                    let oMockServer: any = (<any>sap.ui).requireSync("sap/ui/core/util/MockServer");
                    let MkService: sap.ui.core.util.MockServer = new oMockServer({
                        rootUri: this.metadataUrl,
                        requests: [
                            {
                                method: "'GET' | 'POST' | 'DELETE'|'PUT'|'OPTIONS'",
                                path: "/",
                                allowedOrigins: "*",
                                allowedMethods: "GET, POST, PUT, DELETE, OPTIONS",
                                allowedHeaders: "Content-Type",
                                allowCredentials: false,
                            },
                        ]
                    });
                    sap.ui.core.util.MockServer.config({
                        autoRespondAfter: 2000
                    });
                    MkService.simulate(this.metadataUrl + "example/services/rest/file/" + this.fileName, {
                        bGenerateMissingMockData: true
                    });
                    MkService.start();
                    let oDataModel: any = new sap.ui.model.odata.v2.ODataModel(this.metadataUrl);
                    oDataModel.getMetaModel().loaded().then(() => {
                        if (download) {
                            that.downLoadStructure(oDataModel.getMetaModel());
                            that.downLoadBOExtendClass(oDataModel.getMetaModel());
                        } else {
                            that.openStructureDialog(oDataModel.getMetaModel());
                        }
                        MkService.stop();
                    });
                }
                // 下载对象辅助类
                downLoadBOExtendClass(mode: any): void {
                    let entityTypes: any = mode.oMetadata.oMetadata.dataServices.schema[0].entityType;
                    let boAttributestr: string = "";
                    let entityType: any = entityTypes[0];
                    boAttributestr += this.getBoAttribute(entityType);
                    for (let item of entityType.navigationProperty) {
                        for (let entity of entityTypes) {
                            if (entity.name === item.name && item.name !== mode.oMetadata.oMetadata.dataServices.schema[0].entityType[0].name) {
                                boAttributestr += this.getBoChildAttribute(entity);
                                break;
                            }
                        }
                    }
                    boAttributestr = boAttributestr.substring(0, boAttributestr.lastIndexOf(","));
                    // for (let entityType of entityTypes) {
                    //     str += this.getBoAttribute(entityType);
                    //     if (ibas.objects.isNull(entityType.navigationProperty)) {
                    //         continue;
                    //     }
                    //     for (let item of entityType.navigationProperty) {
                    //         for (let entity of entityTypes) {
                    //             if (entity.name === item.name && item.name !== mode.oMetadata.oMetadata.dataServices.schema[0].entityType[0].name) {
                    //                 str += this.getBoChildAttribute(entity);
                    //                 break;
                    //             }
                    //         }
                    //     }
                    // }
                    let boNamespace: string = entityType.name;
                    if (ibas.strings.isEmpty(boNamespace)) {
                        boNamespace = mode.oMetadata.oMetadata.dataServices.schema[0].entityContainer[0].name;
                    }
                    let blob: Blob = new Blob([ibas.strings.format(
                        "namespace sap {\n    export namespace byd {\n        export namespace {0} " +
                        "{\n            export class {1}Extend {\n                getBOAttributeString(): string{\n                    " +
                        "return \"{2}\";\n                }\n            }\n        }\n    }\n}",
                        boNamespace.toLocaleLowerCase(), entityType.name, boAttributestr)], { type: "text/plain;charset=utf-8" });
                    ibas.files.save(blob, ibas.strings.format("{0}Extend.ts", entityType.name));
                }
                getBoAttribute(entity: any): string {
                    let attributeStr: string = "";
                    for (let item of entity.property) {
                        attributeStr += ibas.strings.format("{0},", item.name);
                    }
                    return attributeStr;
                }
                getBoChildAttribute(entity: any): string {
                    let attributeStr: string = "";
                    for (let item of entity.property) {
                        attributeStr += ibas.strings.format("{0}/{1},", entity.name, item.name);
                    }
                    return attributeStr;
                }
                // 打开接口数据结构显示dialog
                openStructureDialog(mode: any): void {
                    let structureBox: sap.m.VBox = new sap.m.VBox();
                    for (let entity of mode.oMetadata.oMetadata.dataServices.schema[0].entityType) {
                        structureBox.addItem(new sap.m.Text("", { text: entity.name }));
                        let textArea: sap.m.TextArea = new sap.m.TextArea("", { width: "100%", height: "180px" });
                        for (let item of entity.property) {
                            textArea.setValue(textArea.getValue() + item.name + ":" + this.dataTypeConversion(item.type) + ";     ");
                        }
                        if (!ibas.objects.isNull(entity.navigationProperty)) {
                            for (let item of entity.navigationProperty) {
                                textArea.setValue(textArea.getValue() + item.name + ":" + item.toRole + ";     ");
                            }
                        }
                        structureBox.addItem(textArea);
                    }
                    this.page.removeAllContent();
                    this.page.addContent(structureBox);
                }
                // 下载数据结构
                downLoadStructure(mode: any): void {
                    let that: this = this;
                    let entityType: any = mode.oMetadata.oMetadata.dataServices.schema[0].entityType;
                    let length: number = entityType.length;
                    let downNum: number = 0;
                    this.page.setBusy(true);
                    // 解决下载不全
                    let downLoad: any = setInterval(() => {
                        if (downNum < length) {
                            that.downLoadBoStructure(entityType[downNum], mode);
                            downNum++;
                        } else {
                            clearInterval(downLoad);
                            that.page.setBusy(false);
                        }
                    }, 1000);
                }
                downLoadBoStructure(entity: any, mode: any): void {
                    let attributeStr: string = "";
                    let boNamespace: string = mode.oMetadata.oMetadata.dataServices.schema[0].entityType[0].name;
                    if (ibas.strings.isEmpty(boNamespace)) {
                        boNamespace = mode.oMetadata.oMetadata.dataServices.schema[0].entityContainer[0].name;
                    }
                    for (let item of entity.property) {
                        attributeStr += this.getBasisAttribute(item.name, item.type);
                    }
                    if (!ibas.objects.isNull(entity.navigationProperty)) {
                        for (let item of entity.navigationProperty) {
                            attributeStr += this.getChildObjectAttribute(item.name, mode.oMetadata.oMetadata.dataServices.schema[0].association);
                        }
                    }
                    let blob: Blob = new Blob([ibas.strings.format(
                        "declare namespace sap {\n    export namespace byd {\n        export namespace {0} " +
                        "{\n            export class {1} {\n{2}            }\n        }\n    }\n}",
                        boNamespace.toLocaleLowerCase(), entity.name, attributeStr)], { type: "text/plain;charset=utf-8" });
                    ibas.files.save(blob, ibas.strings.format("{0}.d.ts", entity.name));
                }
                // 获取基础属性
                getBasisAttribute(name: string, type: string): string {
                    return ibas.strings.format("                {0}?: {1};\n", name, this.dataTypeConversion(type));
                }
                // 获取子对象属性
                getChildObjectAttribute(name: string, association: any): string {
                    let childObjectAttribute: string = ibas.strings.format("                {0}?: {1}[];\n", name, name);
                    for (let item of association) {
                        let end: any = item.end[1];
                        if (end.type === "cust." + name) {
                            if (end.multiplicity === "1") {
                                childObjectAttribute = ibas.strings.format("                {0}?: {1};\n", name, name);
                            }
                        }
                    }
                    return childObjectAttribute;
                }
                // byd数据类型转换ibas数据类型
                dataTypeConversion(type: string): string {
                    let ibasType: string = "string";
                    switch (type) {
                        case "Edm.Boolean":
                            ibasType = "boolean";
                            break;
                        // byd中对象转成json字符串后数值类型值需要加双引号，做字符串处理
                        // case "Edm.Decimal":
                        //     ibasType = "number";
                        //     break;
                        default:
                            break;
                    }
                    return ibasType;
                }

                updateStructrue(fileName: string): void {
                    this.fileName = fileName;
                    this.readDataStructure(true);
                }
            }
        }
    }
}
