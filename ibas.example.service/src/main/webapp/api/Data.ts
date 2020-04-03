/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    /** 模块-标识 */
    export const CONSOLE_ID: string = "89081a60-a1a4-4023-8d2a-6311ef323586";
    /** 模块-名称 */
    export const CONSOLE_NAME: string = "Example";
    /** 模块-版本 */
    export const CONSOLE_VERSION: string = "0.1.0";

    export namespace bo {
        /** 业务仓库名称 */
        export const BO_REPOSITORY_EXAMPLE: string = ibas.strings.format(ibas.MODULE_REPOSITORY_NAME_TEMPLATE, CONSOLE_NAME);
        /** 业务对象编码-例子 */
        export const BO_CODE_EXAMPLE: string = "AVA_EX_EXAMPLE";
        export enum emTableRowsType {
            INPUTTYPE,
            TEXTTYPE,
            SELECTTYPE,
            BUTTONTYPE
        }
    }

    export namespace app {

    }
}
