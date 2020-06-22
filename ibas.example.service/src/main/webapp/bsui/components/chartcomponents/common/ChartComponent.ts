/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace sap {
    export namespace extension {
        export namespace examples {
            export namespace employeeschartcomponents {
                export const componentid_employeesalarystatus: string = "EmployeeSalaryStatus";
                const defaultOpeion: any = {
                    legend: {
                        orient: "vertical",
                        left: 10,
                        data: [ibas.i18n.prop("example_chartcomponents_not_data_source")]
                    },
                    series: [
                        {
                            type: "pie",
                            data: [
                                { value: 0, name: ibas.i18n.prop("example_chartcomponents_not_data_source") },
                            ]
                        }
                    ]
                };
                sap.ui.core.Control.extend("sap.extension.examples.employeeschartcomponents.ChartComponent", {
                    metadata: {
                        properties: {
                            uiData: { type: "object", defaultValue: null },
                            componentID: { type: "string", defaultValue: "" },
                            group: { type: "int", defaultValue: null },
                            ruleCode: { type: "string", defaultValue: null },
                            option: { type: "object", defaultValue: null },
                            title: { type: "string", defaultValue: "" },
                            height: { type: "sap.ui.core.CSSSize", defaultValue: "100%" },
                            width: { type: "sap.ui.core.CSSSize", defaultValue: "100%" }
                        },
                        aggregations: {
                            /**
                             * The hidden aggregation for the ECharts.
                             */
                            _chart: { type: "sap.extension.examples.ECharts", multiple: false, visibility: "hidden" }
                        },
                        events: {},
                    },
                    renderer: {
                        render(oRm: sap.ui.core.RenderManager, chartComponent: sap.extension.examples.employeeschartcomponents.ChartComponent): void {
                            oRm.openStart("div", chartComponent);
                            oRm.openEnd();

                            let card: sap.f.Card = new sap.f.Card();
                            let header: sap.f.cards.Header = new sap.f.cards.Header("", {
                                title: chartComponent.getTitle()
                            });
                            card.setHeader(header);
                            let chart: sap.extension.examples.ECharts = (<any>chartComponent).getAggregation("_chart", null);
                            card.setContent(chart);
                            oRm.renderControl(card);
                            oRm.close("div");
                        },
                    },
                    getOption(): any {
                        if (ibas.objects.isNull(this.getProperty("option"))) {
                            return defaultOpeion;
                        }
                        return this.getProperty("option");
                    },
                    setOption(this: ChartComponent, data: any): any {
                        let chart: sap.extension.examples.ECharts = <any>this.getAggregation("_chart", null);
                        if (!!chart) {
                            chart.setOption(data);
                        }
                        return this.setProperty("option", data);
                    },
                    /** 设置- ui绑定对象(数据枚举规则UI对象) */
                    setUiData(this: ChartComponent, reportID: string): any {
                        let that: ChartComponent = this;
                        let criteria: ibas.Criteria = new ibas.Criteria();
                        let con: ibas.ICondition = criteria.conditions.create();
                        con.alias = reportanalysis.bo.Report.PROPERTY_OBJECTKEY_NAME;
                        con.value = "1";
                        let boRepository: reportanalysis.bo.BORepositoryReportAnalysis = new reportanalysis.bo.BORepositoryReportAnalysis();
                        boRepository.fetchReport({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<reportanalysis.bo.Report>): void {
                                try {
                                    if (opRslt.resultCode !== 0) {
                                        throw new Error(opRslt.message);
                                    }
                                    let report: reportanalysis.bo.Report = opRslt.resultObjects.firstOrDefault();
                                    boRepository.runUserReport({
                                        report: reportanalysis.bo.UserReport.create(report),
                                        onCompleted(opRslt: ibas.IOperationResult<ibas.DataTable>): void {
                                            try {
                                                if (opRslt.resultCode !== 0) {
                                                    throw new Error(opRslt.message);
                                                }
                                                let table: ibas.DataTable = opRslt.resultObjects.firstOrDefault();
                                                // 如果过滤后结果集无数据，应用原数据
                                                if (table.rows.length === 0) {
                                                    table = table.clone();
                                                }
                                                let data: object = that.getJsonData(table);
                                                that.setOption(data);
                                            } catch (error) {
                                            }
                                        }
                                    });
                                } catch (error) {
                                }
                            }
                        });
                        return this.setProperty("uiData", data);
                    },
                    // 各子控件需要重写此方法
                    getJsonData(data: any): object {
                        return null;
                    }
                });
                /** 渲染前 */
                (<any>ChartComponent).prototype.onBeforeRendering = function (this: ChartComponent): void {
                    let chart: sap.extension.examples.ECharts = <any>this.getAggregation("_chart", null);
                    if (!chart) {
                        chart = new sap.extension.examples.ECharts("", {
                            height: this.getHeight(),
                            option: this.getOption(),
                        });
                        this.setAggregation("_chart", chart);
                    }
                    chart.setHeight(this.getHeight());
                    chart.setOption(this.getOption());
                };
            }
        }
    }
}