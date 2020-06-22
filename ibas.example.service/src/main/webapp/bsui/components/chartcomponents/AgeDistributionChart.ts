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
                // 会员年龄分布报表
                sap.extension.examples.employeeschartcomponents.ChartComponent.extend("sap.extension.examples.employeeschartcomponents.AgeDistrbutionChart", {
                    metadata: {
                        properties: {
                            group: { type: "int", defaultValue: example.bo.emAnalysisDimension.MEMBER },
                            ruleCode: { type: "string", defaultValue: componentid_employeesalarystatus },
                        },
                        events: {},
                    },
                    renderer: {
                    },
                    getTitle(): string {
                        return ibas.i18n.prop("example_chartcomponents_employeesalarystatus_title");
                    },
                    getJsonData(datas: any): object {
                        if (!(datas instanceof ibas.DataTable)) {
                            return null;
                        }
                        let chartData: PieChart = {
                            tooltip: {
                                trigger: "item",
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: "vertical",
                                left: 10,
                                top: 10,
                                data: [],
                            },
                            series: [
                                {
                                    name: ibas.i18n.prop("example_chartcomponents_employeesalarystatus"),
                                    type: "pie",
                                    radius: ["50%", "70%"],
                                    avoidLabelOverlap: true,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: "center"
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: "30",
                                                fontWeight: "bold"
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: []
                                }
                            ]
                        };
                        for (let item of datas.rows) {
                            chartData.legend.data.push(item.cells[0]);
                            chartData.series[0].data.push({
                                value: ibas.numbers.toInt(item.cells[1]),
                                name: item.cells[0]
                            });
                        }
                        return chartData;
                    },
                    getComponentID(): string {
                        return sap.extension.examples.employeeschartcomponents.componentid_employeesalarystatus;
                    }
                });
                sap.extension.examples.employeeschartcomponents.componentChartFactory.register({
                    id: sap.extension.examples.employeeschartcomponents.componentid_employeesalarystatus,
                    order: 1,
                    group: example.bo.emAnalysisDimension.MEMBER,
                    create(): ChartComponent {
                        return new sap.extension.examples.employeeschartcomponents.AgeDistrbutionChart();
                    }
                });
            }
        }
    }
}