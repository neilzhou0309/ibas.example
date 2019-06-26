package org.colorcoding.ibas.example.repository;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.repository.*;
import org.colorcoding.ibas.example.bo.example.*;

/**
* Example仓库应用
*/
public interface IBORepositoryExampleApp extends IBORepositoryApplication {

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-例子
     * @param criteria 查询
     * @return 操作结果
     */
    IOperationResult<IExample> fetchExample(ICriteria criteria);

    /**
     * 保存-例子
     * @param bo 对象实例
     * @return 操作结果
     */
    IOperationResult<IExample> saveExample(IExample bo);

    //--------------------------------------------------------------------------------------------//

}
