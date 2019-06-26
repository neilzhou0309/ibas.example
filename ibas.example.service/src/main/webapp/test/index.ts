/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/ibas/index.d.ts" />
/// <reference path="../index.d.ts" />
/// <reference path="./case/TestExample.ts" />
namespace example {
    export namespace test {
        export function run(): void {
            let cases: ibas.TestCase[] = ibas.test.cases(example.test);
            for (let item of cases) {
                item.run();
            }
        }
    }
}
