/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./sap.extension.as.d.ts" />
/// <reference path="./echarts/ECharts.ts" />
/// <reference path="./chartcomponents/index.ts" />
/// <reference path="./ChartGroupGrid.ts" />
namespace sap {
    export namespace extension {
        export namespace as {
            let contextName: string = ibas.requires.naming(example.CONSOLE_NAME);
            let require: Require = ibas.requires.create({
                context: contextName
            });
            require([
                "css!bsui/components/sap.extension.as",
            ], function (data: any): void {

            });
        }
    }
}