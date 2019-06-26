package org.colorcoding.ibas.example.test;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.repository.*;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.example.bo.example.*;
import org.colorcoding.ibas.example.repository.*;

/**
* 例子 测试
* 
*/
public class TestExample extends TestCase {
    /**
     * 获取连接口令
    */
    String getToken() {
        return OrganizationFactory.SYSTEM_USER.getToken();
    }
    
    /**
     * 基本项目测试
     * @throws Exception 
    */
    public void testBasicItems() throws Exception {
        Example example = new Example();
        System.out.println(String.format("new bo: %s", example.toString()));
        // 测试属性赋值


        // 测试对象的保存和查询
        IOperationResult<?> operationResult = null;
        ICriteria criteria = null;
        IBORepositoryExampleApp boRepository = new BORepositoryExample();
        //设置用户口令
        boRepository.setUserToken(this.getToken());

        // 测试保存
        operationResult = boRepository.saveExample(example);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
        Example boSaved = (Example)operationResult.getResultObjects().firstOrDefault();


        // 测试查询
        criteria = boSaved.getCriteria();
        criteria.setResultCount(10);
        operationResult = boRepository.fetchExample(criteria);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);


    }

}
