/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 * 报表控件
 */
namespace sap {
    export namespace extension {
        export namespace examples {
            let contextName: string = ibas.requires.naming(example.CONSOLE_NAME);
            let require: Require = ibas.requires.create({
                context: contextName
            });
            require([
                "bsui/components/echarts/echarts.min"
            ], function (echarts: any): void {
                /** 图表控件 */
                sap.ui.core.Control.extend("sap.extension.examples.ECharts", {
                    metadata: {
                        properties: {
                            option: { type: "object" },
                            height: { type: "sap.ui.core.CSSSize", defaultValue: "100%" },
                            width: { type: "sap.ui.core.CSSSize", defaultValue: "100%" }
                        }
                    },
                    renderer: {
                        /** 渲染 */
                        render(oRm: sap.ui.core.RenderManager, oECharts: sap.extension.examples.ECharts): void {
                            oRm.openStart("div");
                            oRm.attr("id", oECharts.getId());
                            oRm.style("width", oECharts.getWidth());
                            oRm.style("height", oECharts.getHeight());
                            oRm.writeControlData(oECharts);
                            oRm.writeClasses();
                            oRm.openEnd();
                            oRm.close("div");
                        }
                    },
                    /** 获取-设置 */
                    getOption(): any {
                        return this.getProperty("option");
                    },
                    /** 设置-设置 */
                    setOption(value: any): void {
                        this.setProperty("option", value);
                        if (!ibas.objects.isNull(this._chartRef)) {
                            this._chartRef.setOption(value);
                        }
                    },
                    /** 获取-高度 */
                    getHeight(): sap.ui.core.CSSSize {
                        return this.getProperty("height");
                    },
                    /** 设置-高度 */
                    setHeight(value: sap.ui.core.CSSSize): void {
                        this.setProperty("height", value);
                    },
                    /** 获取-宽度 */
                    getWidth(): sap.ui.core.CSSSize {
                        return this.getProperty("width");
                    },
                    /** 设置-宽度 */
                    setWidth(value: sap.ui.core.CSSSize): void {
                        this.setProperty("width", value);
                    }
                });
                /** 渲染后 */
                (<any>ECharts).prototype.onAfterRendering = function (this: ECharts): void {
                    // after render, dom existed
                    this._chartRef = echarts.init(document.getElementById(this.getId()));
                    // resize chart when the browser size changed
                    window.onresize = () => {
                        this._chartRef.resize();
                    };
                    // get option binding
                    let oBinding: ui.model.Binding = this.getBinding("option");
                    if (oBinding) {
                        oBinding.attachEvent("change", undefined, (e) => {
                            this._chartRef.setOption(e.getSource().getValue());
                        });
                    }
                    let oInitOption: any = this.getOption();
                    // with init option value
                    if (oInitOption) {
                        this._chartRef.setOption(oInitOption);
                    }
                };
            });
        }
    }
}