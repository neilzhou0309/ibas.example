package org.colorcoding.ibas.example.repository;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.repository.*;
import org.colorcoding.ibas.example.bo.example.*;

/**
* Example仓库
*/
public class BORepositoryExample extends BORepositoryServiceApplication implements IBORepositoryExampleSvc, IBORepositoryExampleApp {

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-例子
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<Example> fetchExample(ICriteria criteria, String token) {
        return super.fetch(criteria, token, Example.class);
    }

    /**
     * 查询-例子（提前设置用户口令）
     * @param criteria 查询
     * @return 操作结果
     */
    public IOperationResult<IExample> fetchExample(ICriteria criteria) {
        return new OperationResult<IExample>(this.fetchExample(criteria, this.getUserToken()));
    }

    /**
     * 保存-例子
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    public OperationResult<Example> saveExample(Example bo, String token) {
        return super.save(bo, token);
    }

    /**
     * 保存-例子（提前设置用户口令）
     * @param bo 对象实例
     * @return 操作结果
     */
    public IOperationResult<IExample> saveExample(IExample bo) {
        return new OperationResult<IExample>(this.saveExample((Example) bo, this.getUserToken()));
    }

    //--------------------------------------------------------------------------------------------//

}
