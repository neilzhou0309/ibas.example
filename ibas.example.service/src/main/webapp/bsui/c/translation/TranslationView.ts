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
            const LANGUAGE_BO_FILE_NAMINGRULES: string = "bos.{0}.json";
            const LANGUAGE_MODULE_FILE_NAMINGRULES: string = "{0}.{1}.json";
            /** 列表视图-例子 */
            export class TranslationView extends ibas.View implements app.ITranslationView {

                private vstroeServiceAddress: string = ibas.strings.format("{0}//{1}/{2}", window.location.protocol, window.location.host, "test/apps");
                private sapTranslationServiceAddress: string = "https://sandbox.api.sap.com/translationhub/api/v1/translate";
                private currentLanguageFile: any;
                private translationList: any;
                // 控件声明
                private table: sap.ui.table.Table;
                private page: sap.m.Page;
                private targetLanguagesCombobox: sap.m.MultiComboBox;
                private moduleSelect: sap.m.Select;
                private vstoreServiceAddressInput: sap.m.Input;
                private sapTranslationServiceAddressInput: sap.m.Input;
                private languageTypeSelect: sap.m.Select;
                private downLoadLanguageFileBtn: sap.m.Button;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.initTargetLanguages();
                    this.initModule();
                    this.initLanguagesType();
                    this.table = new sap.ui.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        rows: "{/rows}",
                    });
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                this.sapTranslationServiceAddressInput = new sap.m.Input("", {
                                    value: this.sapTranslationServiceAddress,
                                    tooltip: "sap翻译服务地址"
                                }),
                                this.vstoreServiceAddressInput = new sap.m.Input("", {
                                    value: this.vstroeServiceAddress,
                                    tooltip: "vstore模块语言文件地址,运行方式不同请替换[test/apps]"
                                })
                            ]
                        }),
                        footer: new sap.m.Toolbar("", {
                            content: [
                                this.moduleSelect,
                                this.languageTypeSelect,
                                this.targetLanguagesCombobox,
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: "翻译",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.loadLanguages();
                                    }
                                }),
                                this.downLoadLanguageFileBtn = new sap.m.Button("", {
                                    visible: false,
                                    text: "下载",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.downLoadLanguageFile(that.translationList);
                                    }
                                }),
                            ]
                        }),
                        content: [this.table]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }

                // 读取语言文件
                loadLanguages(): void {
                    let that: this = this;
                    that.page.setBusy(true);
                    let langLists: ibas.ArrayList<any> = new ibas.ArrayList<any>();
                    let moduleName: string = this.moduleSelect.getSelectedKey();
                    let fileName: string = "bos.zh_CN"; // bos/模块名称.zh_CN
                    if (this.languageTypeSelect.getSelectedKey() === "1") {
                        fileName = moduleName + ".zh_CN";
                    }
                    let languagesPath: string = ibas.strings.format("{0}/{1}/resources/languages/{2}.json", this.vstoreServiceAddressInput.getValue(), moduleName, fileName);
                    $.getJSON(languagesPath, function (data: any): void {
                        if (!ibas.objects.isNull(data)) {
                            that.currentLanguageFile = data;
                            if (data instanceof Array) {
                                for (let item of data) {
                                    jQuery.each(item, function (name: any, value: any): void {
                                        langLists.add({
                                            "key": name,
                                            "value": value,
                                            "maxLength": "100",
                                        });
                                    });
                                }
                            } else {
                                jQuery.each(data, function (name: any, value: any): void {
                                    langLists.add({
                                        "key": name,
                                        "value": value,
                                        "maxLength": "100",
                                    });
                                });
                            }
                            that.callBydTranslation(langLists, ["en"]);
                        }
                    });
                }
                // 调用sap翻译接口
                callBydTranslation(units: ibas.ArrayList<any>, targetLanguages?: Array<string>, sourceLanguage?: string): void {
                    let that: this = this;
                    // window.console.time("test");
                    if (ibas.objects.isNull(targetLanguages)) {
                        targetLanguages = [];
                        for (let item of this.targetLanguagesCombobox.getSelectedItems()) {
                            targetLanguages.push(item.getKey());
                        }
                        this.resetTableColumns();
                    }
                    if (ibas.objects.isNull(sourceLanguage)) {
                        sourceLanguage = "zh";
                    }
                    let data: string = JSON.stringify({
                        // 目标语言,可一次返回多种语言
                        "targetLanguages": targetLanguages,
                        // 数据源语言
                        "sourceLanguage": sourceLanguage,
                        "enableMT": true,
                        "enableTranslationQualityEstimation": true,
                        "domain": "BC",
                        "companyMLTRId": "string",
                        // 传入需要翻译的值对象集合
                        "units": units
                    });
                    let xhr: XMLHttpRequest = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.addEventListener("readystatechange", function (oData: any): void {
                        if (this.readyState === this.DONE) {
                            // window.console.timeEnd("test");
                            let list: ibas.ArrayList<any> = new ibas.ArrayList<any>();
                            let langLists: ibas.ArrayList<any> = new ibas.ArrayList<any>();
                            let jsonData: any = JSON.parse(this.responseText);
                            if (!ibas.objects.isNull(jsonData)) {
                                for (let item of jsonData.units) {
                                    // sap翻译接口中文翻译其它语言不全，需要用英语翻译
                                    if (targetLanguages[0] === "en" && targetLanguages.length === 1) {
                                        let data: any = {
                                            "key": item.key,
                                            "value": item.value,
                                            "maxLength": "100",
                                        };
                                        // 循环翻译结果，返回一种语言
                                        for (let translation of item.translations) {
                                            data.value = translation.value;
                                        }
                                        langLists.add(data);
                                    } else {
                                        let data: any = {
                                            desc: item.key,
                                            en: item.value,
                                            zh: "",
                                            de: "",
                                            nl: "",
                                            fr: "",
                                            ja: ""
                                        };
                                        // 循环翻译结果，返回多种语言
                                        for (let translation of item.translations) {
                                            switch (translation.language) {
                                                case "zh":
                                                    data.zh = translation.value;
                                                    break;
                                                case "en":
                                                    data.en = translation.value;
                                                    break;
                                                case "de":
                                                    data.de = translation.value;
                                                    break;
                                                case "nl":
                                                    data.nl = translation.value;
                                                    break;
                                                case "fr":
                                                    data.fr = translation.value;
                                                    break;
                                                case "ja":
                                                    data.ja = translation.value;
                                                    break;
                                                default:
                                                    break;
                                            }
                                            // data.translation += ibas.strings.format("[{0}:{1}]", translation.language, translation.value);
                                        }
                                        list.add(data);
                                    }
                                }
                                if (targetLanguages[0] === "en" && targetLanguages.length === 1) {
                                    that.callBydTranslation(langLists, null, "en");
                                } else {
                                    that.translationList = list;
                                    that.downLoadLanguageFileBtn.setVisible(true);
                                    that.showTranslationResults(list);
                                    that.application.viewShower.messages({
                                        type: ibas.emMessageType.QUESTION,
                                        title: "是否生成语言文件",
                                        message: "是否生成语言文件?",
                                        actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                                        onCompleted(action: ibas.emMessageAction): void {
                                            if (action === ibas.emMessageAction.YES) {
                                                that.downLoadLanguageFile(list);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                    xhr.open("POST", this.sapTranslationServiceAddressInput.getValue());
                    xhr.setRequestHeader("Content-Type", "string");
                    xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
                    xhr.setRequestHeader("APIKey", "uWPLYP1X7Yq9RmM2rE5LHiHhtyY8tm7k");
                    // xhr.setRequestHeader("Authorization", this.getAuthorizationCode("neil.zhou@avatech.com.cn:zhou_0311"));
                    xhr.send(data);
                }
                // 显示翻译后结果
                showTranslationResults(datas: ibas.ArrayList<any>): void {
                    this.table.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    this.page.setBusy(false);
                }
                // 列重置
                resetTableColumns(): void {
                    this.table.removeAllColumns();
                    this.table.addColumn(new sap.ui.table.Column("", {
                        label: "标签",
                        template: new sap.m.Text("", {
                            wrapping: false,
                            tooltip: "{desc}",
                        }).bindProperty("text", {
                            path: "desc",
                        }),
                        filterProperty: "desc"
                    }));
                    for (let item of this.targetLanguagesCombobox.getSelectedItems()) {
                        this.table.addColumn(new sap.ui.table.Column("", {
                            label: item.getText(),
                            template: new sap.m.Text("", {
                                wrapping: false,
                                tooltip: "{" + item.getKey() + "}",
                            }).bindProperty("text", {
                                path: item.getKey(),
                            }),
                            filterProperty: item.getKey()
                        }));
                    }
                }
                // 初始化目标语言选择控件
                initTargetLanguages(): void {
                    this.targetLanguagesCombobox = new sap.m.MultiComboBox("", {
                        showSecondaryValues: true
                    });
                    let map: Map<string, string> = new Map<string, string>();
                    map = openui5.utils.getEnumMap(emTargetLanguages);
                    for (let item of map) {
                        let comItem: sap.ui.core.ListItem = new sap.ui.core.ListItem("", {
                            key: ibas.enums.describe(emTargetLanguages, item[1]),
                            text: ibas.i18n.prop(ibas.strings.format("example_em_targetlanguages_{0}", ibas.enums.describe(emTargetLanguages, item[1]))),
                            additionalText: ibas.enums.describe(emTargetLanguages, item[1])
                        });
                        let fileSpecification: string = "";
                        switch (item[1]) {
                            case "zh":
                                fileSpecification = "zh_CN";
                                break;
                            case "en":
                                fileSpecification = "en_US";
                                break;
                            case "de":
                                fileSpecification = "de_DE";
                                break;
                            case "nl":
                                fileSpecification = "nl_NL";
                                break;
                            case "fr":
                                fileSpecification = "fr_FR";
                                break;
                            case "ja":
                                fileSpecification = "ja_JP";
                                break;
                            default:
                                break;
                        }
                        comItem.setAdditionalText(fileSpecification);
                        this.targetLanguagesCombobox.addItem(comItem);
                        this.targetLanguagesCombobox.addSelectedItem(comItem);
                    }
                }
                // 初始化模块选择
                initModule(): void {
                    let that: this = this;
                    that.moduleSelect = new sap.m.Select("", {
                        tooltip: "此处加载当前系统加载的所有模块名称",
                        change: function (): void {
                            that.downLoadLanguageFileBtn.setVisible(false);
                        }
                    });
                    shell.app.modules.forEach((module) => {
                        let existing: boolean = false;
                        for (let item of that.moduleSelect.getItems()) {
                            if (item.getKey() === (<any>module).module.toLocaleLowerCase()) {
                                existing = true;
                                break;
                            }
                        }
                        if (!existing) {
                            that.moduleSelect.addItem(new sap.ui.core.ListItem("", {
                                key: (<any>module).module.toLocaleLowerCase(),
                                text: module.description,
                                additionalText: (<any>module).module.toLocaleLowerCase()
                            }));
                        }
                    });
                }
                // 初始化语言文件类型控件
                initLanguagesType(): void {
                    let that: this = this;
                    this.languageTypeSelect = new sap.m.Select("", {
                        tooltip: "对象:bos.json;模块:模块名称.json",
                        change: function (): void {
                            that.downLoadLanguageFileBtn.setVisible(false);
                        }
                    });
                    this.languageTypeSelect.addItem(new sap.ui.core.ListItem("", {
                        key: "0",
                        text: "对象"
                    }));
                    this.languageTypeSelect.addItem(new sap.ui.core.ListItem("", {
                        key: "1",
                        text: "模块"
                    }));
                }
                // 获取Authorization
                getAuthorizationCode(str: string): string {
                    return "Basic " + btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                        function (match: any, p1: any): string {
                            return String.fromCharCode(Number.parseInt(p1, 16));
                        }));
                }
                // 下载翻译后语言文件
                downLoadLanguageFile(list: ibas.ArrayList<any>): void {
                    for (let lang of this.targetLanguagesCombobox.getSelectedItems()) {
                        if (this.currentLanguageFile instanceof Array) {
                            for (let item of this.currentLanguageFile) {
                                for (const key in item) {
                                    if (item.hasOwnProperty(key)) {
                                        for (let iterator of list) {
                                            if (iterator.desc === key) {
                                                item[key] = this.getLanguageValue(lang.getKey(), iterator);
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            for (const key in this.currentLanguageFile) {
                                if (this.currentLanguageFile.hasOwnProperty(key)) {
                                    for (let iterator of list) {
                                        if (iterator.desc === key) {
                                            this.currentLanguageFile[key] = this.getLanguageValue(lang.getKey(), iterator);
                                        }
                                    }
                                }
                            }
                        }
                        let blob: Blob = new Blob([JSON.stringify(this.currentLanguageFile)], { type: "text/plain;charset=utf-8" });
                        let languageFileName: string = ibas.strings.format(LANGUAGE_BO_FILE_NAMINGRULES, (<sap.ui.core.ListItem>lang).getAdditionalText());
                        if (this.languageTypeSelect.getSelectedKey() === "1") {
                            languageFileName = ibas.strings.format(
                                LANGUAGE_MODULE_FILE_NAMINGRULES, this.moduleSelect.getSelectedKey(), (<sap.ui.core.ListItem>lang).getAdditionalText());
                        }
                        ibas.files.save(blob, languageFileName);
                    }
                }
                // 获取相应语种的值
                getLanguageValue(lang: any, iterator: any): string {
                    let value: any = "";
                    switch (lang) {
                        case "zh":
                            value = iterator.zh;
                            break;
                        case "en":
                            value = iterator.en;
                            break;
                        case "de":
                            value = iterator.de;
                            break;
                        case "nl":
                            value = iterator.nl;
                            break;
                        case "fr":
                            value = iterator.fr;
                            break;
                        case "ja":
                            value = iterator.ja;
                            break;
                        default:
                            break;
                    }
                    return value;
                }
            }
        }
        export enum emTargetLanguages {
            /** 中文 */
            zh,
            /** 英语 */
            en,
            /** 德语 */
            de,
            /** 荷兰语 */
            nl,
            /** 法语 */
            fr,
            /** 日语 */
            ja
        }
    }
}
