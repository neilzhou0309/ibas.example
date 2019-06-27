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
            export class TranslationView extends ibas.View implements app.ITranslationView {
                // 控件声明
                private table: sap.ui.table.Table;
                private page: sap.m.Page;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.ui.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: "标签",
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                    tooltip: "{desc}",
                                }).bindProperty("text", {
                                    path: "desc",
                                }),
                                filterProperty: "desc"
                            }),
                            new sap.ui.table.Column("", {
                                label: "汉语",
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                    tooltip: "{zh}",
                                }).bindProperty("text", {
                                    path: "zh",
                                }),
                                filterProperty: "zh"
                            }),
                            new sap.ui.table.Column("", {
                                label: "英语",
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                    tooltip: "{en}",
                                }).bindProperty("text", {
                                    path: "en",
                                }),
                                filterProperty: "en"
                            }),
                            new sap.ui.table.Column("", {
                                label: "德语",
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                    tooltip: "{de}",
                                }).bindProperty("text", {
                                    path: "de",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: "荷兰语",
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                    tooltip: "{nl}",
                                }).bindProperty("text", {
                                    path: "nl",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: "法语",
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                    tooltip: "{fr}",
                                }).bindProperty("text", {
                                    path: "fr",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: "日语",
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                    tooltip: "{ja}",
                                }).bindProperty("text", {
                                    path: "ja",
                                })
                            }),
                        ]
                    });
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: "翻译",
                                    type: sap.m.ButtonType.Transparent,
                                    press: function (): void {
                                        that.loadLanguages();
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
                    let moduleName: string = "shoppingclient";
                    let fileName: string = "shoppingclient.zh_CN"; // bos/模块名称.zh_CN
                    let languagesPath: string = ibas.strings.format("https://b1i.avacloud.com.cn/test/apps/{0}/resources/languages/{1}.json", moduleName, fileName);
                    $.getJSON(languagesPath, function (data: any): void {
                        if (!ibas.objects.isNull(data)) {
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
                    window.console.time("test");
                    if (ibas.objects.isNull(targetLanguages)) {
                        targetLanguages = [
                            // "en", // 英语
                            "de", // 德语
                            "nl", // 荷兰语
                            "fr", // 法语
                            "ja", // 日语
                            "zh", // 中文
                        ];
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
                            window.console.timeEnd("test");
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
                                        // 循环翻译结果，返回多种语言
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
                                    that.showTranslationResults(list);
                                }
                            }
                        }
                    });
                    xhr.open("POST", "https://sandbox.api.sap.com/translationhub/api/v1/translate");
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
            }
        }
    }
}
