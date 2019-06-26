package org.colorcoding.ibas.example.service.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.example.repository.*;
import org.colorcoding.ibas.example.bo.example.*;

/**
* Example 数据服务JSON
*/
@Path("data")
public class DataService extends BORepositoryExample {

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-例子
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("fetchExample")
    public OperationResult<Example> fetchExample(Criteria criteria, @QueryParam("token") String token) {
        return super.fetchExample(criteria, token);
    }

    /**
     * 保存-例子
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("saveExample")
    public OperationResult<Example> saveExample(Example bo, @QueryParam("token") String token) {
        return super.saveExample(bo, token);
    }

    //--------------------------------------------------------------------------------------------//

}
