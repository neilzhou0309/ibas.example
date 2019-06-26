package org.colorcoding.ibas.example.service.soap;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.cxf.WebServicePath;
import org.colorcoding.ibas.example.repository.*;
import org.colorcoding.ibas.example.bo.example.*;

/**
* Example 数据服务JSON
*/
@WebService
@WebServicePath("data")
public class DataService extends BORepositoryExample {

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-例子
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<Example> fetchExample(@WebParam(name = "criteria") Criteria criteria, @WebParam(name = "token") String token) {
        return super.fetchExample(criteria, token);
    }

    /**
     * 保存-例子
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @WebMethod
    public OperationResult<Example> saveExample(@WebParam(name = "bo") Example bo, @WebParam(name = "token") String token) {
        return super.saveExample(bo, token);
    }

    //--------------------------------------------------------------------------------------------//

}
