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
                export interface IChartComponnt {
                    id: string;
                    /** 序号 */
                    order: number;
                    group: example.bo.emAnalysisDimension;
                    /** 创建组件应用 */
                    create(): sap.extension.examples.employeeschartcomponents.ChartComponent;
                }
                const _components: Map<string, IChartComponnt> = new Map<string, IChartComponnt>();
                export class ComponentChartFactory {
                    constructor() {
                    }
                    register(element: IChartComponnt): void {
                        if (ibas.objects.isNull(element)) {
                            return;
                        }
                        _components.set(element.id, element);
                    }
                    create(id: string): sap.extension.examples.employeeschartcomponents.ChartComponent {
                        let element: IChartComponnt = _components.get(id);
                        if (ibas.objects.isNull(element)) {
                            return;
                        }
                        return element.create();
                    }
                    all(group?: example.bo.emAnalysisDimension): IChartComponnt[] {
                        let elements: ibas.IList<IChartComponnt> = new ibas.ArrayList<IChartComponnt>();
                        for (let item of _components.values()) {
                            if (ibas.objects.isNull(group) || ibas.strings.isEmpty(group)) {
                                elements.add(item);
                            } else {
                                if (item.group.toString() === group.toString()) {
                                    elements.add(item);
                                }
                            }
                        }
                        return elements;
                    }
                }
                /**
                 * 组件工厂
                 */
                export const componentChartFactory: ComponentChartFactory = new ComponentChartFactory();

                // 饼状图对象
                export class PieChart {
                    tooltip?: {
                        trigger?: string;
                        formatter?: string;
                    };
                    legend?: {
                        orient?: string;
                        left?: number;
                        right?: number;
                        top?: number;
                        bottom?: number;
                        data?: string[];
                    };
                    series?: [{
                        name?: string;
                        type?: string;
                        radius?: string[];
                        width?: string;
                        avoidLabelOverlap: boolean;
                        label?: {
                            normal?: {
                                show?: boolean;
                                position?: string;
                            };
                            emphasis?: {
                                show?: boolean;
                                textStyle?: {
                                    fontSize?: string;
                                    fontWeight?: string;
                                }
                            }
                        };
                        labelLine?: {
                            normal?: {
                                show?: boolean;
                            }
                        };
                        data?: { value?: number, name?: string }[];
                    }];
                }
                // 柱状图对象
                export class AxisChart {
                    color?: string[];
                    tooltip?: {
                        trigger?: string,
                        axisPointer?: {            // 坐标轴指示器，坐标轴触发有效
                            type?: string     // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter?: string;
                    };
                    grid?: {
                        left?: string,
                        right?: string,
                        bottom?: string,
                        top?: string,
                        containLabel?: boolean
                    };
                    xAxis?: {
                        type: string;
                        data?: string[];
                        axisTick?: {
                            alignWithLabel?: boolean
                        }
                    }[];
                    yAxis?: {
                        type?: string;
                        data?: string[];
                        axisTick?: {
                            alignWithLabel: boolean;
                        }
                    }[];
                    series?: {
                        name?: string,
                        type?: string,
                        barWidth?: string,
                        data?: number[];
                    }[];
                }
            }
        }
    }
}