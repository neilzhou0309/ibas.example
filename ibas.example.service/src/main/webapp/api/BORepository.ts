/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace bo {
        /** 业务仓库 */
        export interface IBORepositoryExample extends ibas.IBORepositoryApplication {
            /**
             * 上传文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void;
            /**
             * 下载文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            /**
             * 查询 例子
             * @param fetcher 查询者
             */
            fetchExample(fetcher: ibas.IFetchCaller<bo.IExample>): void;
            /**
             * 保存 例子
             * @param saver 保存者
             */
            saveExample(saver: ibas.ISaveCaller<bo.IExample>): void;

        }
    }
}
