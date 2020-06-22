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
            sap.ui.core.Control.extend("sap.extension.examples.ChartGroupGrid", {
                metadata: {
                    properties: {
                        group: { type: "string", defaultValue: "" },
                        random: { type: "string", defaultValue: null },
                        _random: { type: "string", defaultValue: null },
                        uiData: { type: "object", defaultValue: null },
                    },
                    aggregations: {
                        /**
                         * The hidden aggregation for the CSSGrid.
                         */
                        _grid: { type: "sap.ui.layout.cssgrid.CSSGrid", multiple: false, visibility: "hidden" }
                    },
                    events: {},
                },
                renderer: {
                    render(oRm: sap.ui.core.RenderManager, chartGroupGrid: sap.extension.examples.ChartGroupGrid): void {
                        oRm.openStart("div", chartGroupGrid);
                        oRm.addStyle("margin", "1rem");
                        oRm.openEnd();
                        let grid: sap.ui.layout.cssgrid.CSSGrid = (<any>chartGroupGrid).getAggregation("_grid", null);
                        if (grid.getItems().length === 0) {
                            for (let item of sap.extension.examples.employeeschartcomponents.componentChartFactory.all(chartGroupGrid.getGroup()).sort(
                                function (a: employeeschartcomponents.IChartComponnt, b: employeeschartcomponents.IChartComponnt): number {
                                    return a.order - b.order;
                                })) {
                                let chart: sap.extension.examples.employeeschartcomponents.ChartComponent = item.create();
                                chart.setHeight("300px");
                                // if (!ibas.objects.isNull(chartGroupGrid.getUiData())) {
                                chart.setUiData(chartGroupGrid.getUiData(), item.order.toString());
                                // }
                                grid.addItem(chart);
                            }
                        }
                        oRm.renderControl(grid);
                        oRm.close("div");
                    },
                },
                /**
                 * 设置控件数据源
                 * @param previewCode 显示/预览 code
                 * @param uiData 页面绑定对象
                 */
                setUiData(this: ChartGroupGrid, uiData: object): any {
                    this.setProperty("random", ibas.uuids.random());
                    return this.setProperty("uiData", uiData);
                }
            });
            /** 渲染前 */
            (<any>ChartGroupGrid).prototype.onBeforeRendering = function (this: ChartGroupGrid): void {
                let grid: sap.ui.layout.cssgrid.CSSGrid = <any>this.getAggregation("_grid", null);
                if (!grid) {
                    grid = new sap.ui.layout.cssgrid.CSSGrid("", {
                        width: "calc(100% - 1rem)",
                        gridTemplateRows: "2fr",
                        gridTemplateColumns: "50% 50%",
                        gridGap: "1rem",
                    });
                    this.setAggregation("_grid", grid);
                }
            };
            /** 重绘 */
            (<any>ChartGroupGrid).prototype.rerender = function (this: ChartGroupGrid): void {
                let grid: sap.ui.layout.cssgrid.CSSGrid = <any>this.getAggregation("_grid", null);
                if (!ibas.strings.equals(this.getProperty("random"), this.getProperty("_random"))) {
                    for (let chart of grid.getItems()) {
                        if (chart instanceof sap.extension.examples.employeeschartcomponents.ChartComponent) {
                            chart.setUiData(this.getUiData(), "1");
                        }
                    }
                    this.setProperty("_random", this.getProperty("random"));
                }
                (<any>grid).rerender();
            };
        }
    }
}