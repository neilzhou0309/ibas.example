package org.colorcoding.ibas.example.bo.example;

import java.math.*;
import javax.xml.bind.annotation.*;

import org.colorcoding.ibas.bobas.core.*;
import org.colorcoding.ibas.bobas.mapping.*;
import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.bobas.data.*;
import org.colorcoding.ibas.example.MyConfiguration;

/**
* 例子
* 
*/
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = Example.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = Example.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BusinessObjectUnit(code = Example.BUSINESS_OBJECT_CODE)
public class Example extends BusinessObject<Example> implements IExample {

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 2799703173064557305L;

    /**
    * 当前类型
    */
    private static final Class<?> MY_CLASS = Example.class;

    /**
    * 数据库表
    */
    public static final String DB_TABLE_NAME = "AVA_EX_EXLE";

    /**
    * 业务对象编码
    */
    public static final String BUSINESS_OBJECT_CODE = "AVA_EX_EXAMPLE";

    /**
    * 业务对象名称
    */
    public static final String BUSINESS_OBJECT_NAME = "Example";

    /**
    * 属性名称-编码
    */
    private static final String PROPERTY_CODE_NAME = "Code";

    /**
    * 编码 属性
    */
    @DbField(name = "Code", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<String> PROPERTY_CODE = registerProperty(PROPERTY_CODE_NAME, String.class, MY_CLASS);

    /**
    * 获取-编码
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_CODE_NAME)
    public final String getCode() {
        return this.getProperty(PROPERTY_CODE);
    }

    /**
    * 设置-编码
    * 
    * @param value 值
    */
    public final void setCode(String value) {
        this.setProperty(PROPERTY_CODE, value);
    }


    /**
    * 属性名称-名称
    */
    private static final String PROPERTY_NAME_NAME = "Name";

    /**
    * 名称 属性
    */
    @DbField(name = "Name", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<String> PROPERTY_NAME = registerProperty(PROPERTY_NAME_NAME, String.class, MY_CLASS);

    /**
    * 获取-名称
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_NAME_NAME)
    public final String getName() {
        return this.getProperty(PROPERTY_NAME);
    }

    /**
    * 设置-名称
    * 
    * @param value 值
    */
    public final void setName(String value) {
        this.setProperty(PROPERTY_NAME, value);
    }


    /**
    * 属性名称-凭证编号
    */
    private static final String PROPERTY_DOCENTRY_NAME = "DocEntry";

    /**
    * 凭证编号 属性
    */
    @DbField(name = "DocEntry", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
    public static final IPropertyInfo<Integer> PROPERTY_DOCENTRY = registerProperty(PROPERTY_DOCENTRY_NAME, Integer.class, MY_CLASS);

    /**
    * 获取-凭证编号
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_DOCENTRY_NAME)
    public final Integer getDocEntry() {
        return this.getProperty(PROPERTY_DOCENTRY);
    }

    /**
    * 设置-凭证编号
    * 
    * @param value 值
    */
    public final void setDocEntry(Integer value) {
        this.setProperty(PROPERTY_DOCENTRY, value);
    }


    /**
    * 属性名称-类型
    */
    private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

    /**
    * 类型 属性
    */
    @DbField(name = "Object", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME, String.class, MY_CLASS);

    /**
    * 获取-类型
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_OBJECTCODE_NAME)
    public final String getObjectCode() {
        return this.getProperty(PROPERTY_OBJECTCODE);
    }

    /**
    * 设置-类型
    * 
    * @param value 值
    */
    public final void setObjectCode(String value) {
        this.setProperty(PROPERTY_OBJECTCODE, value);
    }


    /**
    * 属性名称-编号系列
    */
    private static final String PROPERTY_SERIES_NAME = "Series";

    /**
    * 编号系列 属性
    */
    @DbField(name = "Series", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<Integer> PROPERTY_SERIES = registerProperty(PROPERTY_SERIES_NAME, Integer.class, MY_CLASS);

    /**
    * 获取-编号系列
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_SERIES_NAME)
    public final Integer getSeries() {
        return this.getProperty(PROPERTY_SERIES);
    }

    /**
    * 设置-编号系列
    * 
    * @param value 值
    */
    public final void setSeries(Integer value) {
        this.setProperty(PROPERTY_SERIES, value);
    }


    /**
    * 属性名称-实例号（版本）
    */
    private static final String PROPERTY_LOGINST_NAME = "LogInst";

    /**
    * 实例号（版本） 属性
    */
    @DbField(name = "LogInst", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<Integer> PROPERTY_LOGINST = registerProperty(PROPERTY_LOGINST_NAME, Integer.class, MY_CLASS);

    /**
    * 获取-实例号（版本）
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_LOGINST_NAME)
    public final Integer getLogInst() {
        return this.getProperty(PROPERTY_LOGINST);
    }

    /**
    * 设置-实例号（版本）
    * 
    * @param value 值
    */
    public final void setLogInst(Integer value) {
        this.setProperty(PROPERTY_LOGINST, value);
    }


    /**
    * 属性名称-数据源
    */
    private static final String PROPERTY_DATASOURCE_NAME = "DataSource";

    /**
    * 数据源 属性
    */
    @DbField(name = "DataSource", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<String> PROPERTY_DATASOURCE = registerProperty(PROPERTY_DATASOURCE_NAME, String.class, MY_CLASS);

    /**
    * 获取-数据源
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_DATASOURCE_NAME)
    public final String getDataSource() {
        return this.getProperty(PROPERTY_DATASOURCE);
    }

    /**
    * 设置-数据源
    * 
    * @param value 值
    */
    public final void setDataSource(String value) {
        this.setProperty(PROPERTY_DATASOURCE, value);
    }


    /**
    * 属性名称-创建日期
    */
    private static final String PROPERTY_CREATEDATE_NAME = "CreateDate";

    /**
    * 创建日期 属性
    */
    @DbField(name = "CreateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<DateTime> PROPERTY_CREATEDATE = registerProperty(PROPERTY_CREATEDATE_NAME, DateTime.class, MY_CLASS);

    /**
    * 获取-创建日期
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_CREATEDATE_NAME)
    public final DateTime getCreateDate() {
        return this.getProperty(PROPERTY_CREATEDATE);
    }

    /**
    * 设置-创建日期
    * 
    * @param value 值
    */
    public final void setCreateDate(DateTime value) {
        this.setProperty(PROPERTY_CREATEDATE, value);
    }


    /**
    * 属性名称-创建时间
    */
    private static final String PROPERTY_CREATETIME_NAME = "CreateTime";

    /**
    * 创建时间 属性
    */
    @DbField(name = "CreateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<Short> PROPERTY_CREATETIME = registerProperty(PROPERTY_CREATETIME_NAME, Short.class, MY_CLASS);

    /**
    * 获取-创建时间
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_CREATETIME_NAME)
    public final Short getCreateTime() {
        return this.getProperty(PROPERTY_CREATETIME);
    }

    /**
    * 设置-创建时间
    * 
    * @param value 值
    */
    public final void setCreateTime(Short value) {
        this.setProperty(PROPERTY_CREATETIME, value);
    }


    /**
    * 属性名称-修改日期
    */
    private static final String PROPERTY_UPDATEDATE_NAME = "UpdateDate";

    /**
    * 修改日期 属性
    */
    @DbField(name = "UpdateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<DateTime> PROPERTY_UPDATEDATE = registerProperty(PROPERTY_UPDATEDATE_NAME, DateTime.class, MY_CLASS);

    /**
    * 获取-修改日期
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_UPDATEDATE_NAME)
    public final DateTime getUpdateDate() {
        return this.getProperty(PROPERTY_UPDATEDATE);
    }

    /**
    * 设置-修改日期
    * 
    * @param value 值
    */
    public final void setUpdateDate(DateTime value) {
        this.setProperty(PROPERTY_UPDATEDATE, value);
    }


    /**
    * 属性名称-修改时间
    */
    private static final String PROPERTY_UPDATETIME_NAME = "UpdateTime";

    /**
    * 修改时间 属性
    */
    @DbField(name = "UpdateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<Short> PROPERTY_UPDATETIME = registerProperty(PROPERTY_UPDATETIME_NAME, Short.class, MY_CLASS);

    /**
    * 获取-修改时间
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_UPDATETIME_NAME)
    public final Short getUpdateTime() {
        return this.getProperty(PROPERTY_UPDATETIME);
    }

    /**
    * 设置-修改时间
    * 
    * @param value 值
    */
    public final void setUpdateTime(Short value) {
        this.setProperty(PROPERTY_UPDATETIME, value);
    }


    /**
    * 属性名称-创建用户
    */
    private static final String PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";

    /**
    * 创建用户 属性
    */
    @DbField(name = "Creator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<Integer> PROPERTY_CREATEUSERSIGN = registerProperty(PROPERTY_CREATEUSERSIGN_NAME, Integer.class, MY_CLASS);

    /**
    * 获取-创建用户
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_CREATEUSERSIGN_NAME)
    public final Integer getCreateUserSign() {
        return this.getProperty(PROPERTY_CREATEUSERSIGN);
    }

    /**
    * 设置-创建用户
    * 
    * @param value 值
    */
    public final void setCreateUserSign(Integer value) {
        this.setProperty(PROPERTY_CREATEUSERSIGN, value);
    }


    /**
    * 属性名称-修改用户
    */
    private static final String PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";

    /**
    * 修改用户 属性
    */
    @DbField(name = "Updator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<Integer> PROPERTY_UPDATEUSERSIGN = registerProperty(PROPERTY_UPDATEUSERSIGN_NAME, Integer.class, MY_CLASS);

    /**
    * 获取-修改用户
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_UPDATEUSERSIGN_NAME)
    public final Integer getUpdateUserSign() {
        return this.getProperty(PROPERTY_UPDATEUSERSIGN);
    }

    /**
    * 设置-修改用户
    * 
    * @param value 值
    */
    public final void setUpdateUserSign(Integer value) {
        this.setProperty(PROPERTY_UPDATEUSERSIGN, value);
    }


    /**
    * 属性名称-创建动作标识
    */
    private static final String PROPERTY_CREATEACTIONID_NAME = "CreateActionId";

    /**
    * 创建动作标识 属性
    */
    @DbField(name = "CreateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<String> PROPERTY_CREATEACTIONID = registerProperty(PROPERTY_CREATEACTIONID_NAME, String.class, MY_CLASS);

    /**
    * 获取-创建动作标识
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_CREATEACTIONID_NAME)
    public final String getCreateActionId() {
        return this.getProperty(PROPERTY_CREATEACTIONID);
    }

    /**
    * 设置-创建动作标识
    * 
    * @param value 值
    */
    public final void setCreateActionId(String value) {
        this.setProperty(PROPERTY_CREATEACTIONID, value);
    }


    /**
    * 属性名称-更新动作标识
    */
    private static final String PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";

    /**
    * 更新动作标识 属性
    */
    @DbField(name = "UpdateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<String> PROPERTY_UPDATEACTIONID = registerProperty(PROPERTY_UPDATEACTIONID_NAME, String.class, MY_CLASS);

    /**
    * 获取-更新动作标识
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_UPDATEACTIONID_NAME)
    public final String getUpdateActionId() {
        return this.getProperty(PROPERTY_UPDATEACTIONID);
    }

    /**
    * 设置-更新动作标识
    * 
    * @param value 值
    */
    public final void setUpdateActionId(String value) {
        this.setProperty(PROPERTY_UPDATEACTIONID, value);
    }


    /**
    * 属性名称-数据所有者
    */
    private static final String PROPERTY_DATAOWNER_NAME = "DataOwner";

    /**
    * 数据所有者 属性
    */
    @DbField(name = "DataOwner", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<Integer> PROPERTY_DATAOWNER = registerProperty(PROPERTY_DATAOWNER_NAME, Integer.class, MY_CLASS);

    /**
    * 获取-数据所有者
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_DATAOWNER_NAME)
    public final Integer getDataOwner() {
        return this.getProperty(PROPERTY_DATAOWNER);
    }

    /**
    * 设置-数据所有者
    * 
    * @param value 值
    */
    public final void setDataOwner(Integer value) {
        this.setProperty(PROPERTY_DATAOWNER, value);
    }


    /**
    * 属性名称-团队成员
    */
    private static final String PROPERTY_TEAMMEMBERS_NAME = "TeamMembers";

    /**
    * 团队成员 属性
    */
    @DbField(name = "TeamMembers", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<String> PROPERTY_TEAMMEMBERS = registerProperty(PROPERTY_TEAMMEMBERS_NAME, String.class, MY_CLASS);

    /**
    * 获取-团队成员
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_TEAMMEMBERS_NAME)
    public final String getTeamMembers() {
        return this.getProperty(PROPERTY_TEAMMEMBERS);
    }

    /**
    * 设置-团队成员
    * 
    * @param value 值
    */
    public final void setTeamMembers(String value) {
        this.setProperty(PROPERTY_TEAMMEMBERS, value);
    }


    /**
    * 属性名称-数据所属组织
    */
    private static final String PROPERTY_ORGANIZATION_NAME = "Organization";

    /**
    * 数据所属组织 属性
    */
    @DbField(name = "OrgCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<String> PROPERTY_ORGANIZATION = registerProperty(PROPERTY_ORGANIZATION_NAME, String.class, MY_CLASS);

    /**
    * 获取-数据所属组织
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_ORGANIZATION_NAME)
    public final String getOrganization() {
        return this.getProperty(PROPERTY_ORGANIZATION);
    }

    /**
    * 设置-数据所属组织
    * 
    * @param value 值
    */
    public final void setOrganization(String value) {
        this.setProperty(PROPERTY_ORGANIZATION, value);
    }


    /**
    * 属性名称-已激活的
    */
    private static final String PROPERTY_ACTIVATED_NAME = "Activated";

    /**
    * 已激活的 属性
    */
    @DbField(name = "Activated", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<emYesNo> PROPERTY_ACTIVATED = registerProperty(PROPERTY_ACTIVATED_NAME, emYesNo.class, MY_CLASS);

    /**
    * 获取-已激活的
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_ACTIVATED_NAME)
    public final emYesNo getActivated() {
        return this.getProperty(PROPERTY_ACTIVATED);
    }

    /**
    * 设置-已激活的
    * 
    * @param value 值
    */
    public final void setActivated(emYesNo value) {
        this.setProperty(PROPERTY_ACTIVATED, value);
    }


    /**
    * 属性名称-备注
    */
    private static final String PROPERTY_REMARKS_NAME = "Remarks";

    /**
    * 备注 属性
    */
    @DbField(name = "Remarks", type = DbFieldType.MEMO, table = DB_TABLE_NAME, primaryKey = false)
    public static final IPropertyInfo<String> PROPERTY_REMARKS = registerProperty(PROPERTY_REMARKS_NAME, String.class, MY_CLASS);

    /**
    * 获取-备注
    * 
    * @return 值
    */
    @XmlElement(name = PROPERTY_REMARKS_NAME)
    public final String getRemarks() {
        return this.getProperty(PROPERTY_REMARKS);
    }

    /**
    * 设置-备注
    * 
    * @param value 值
    */
    public final void setRemarks(String value) {
        this.setProperty(PROPERTY_REMARKS, value);
    }




    /**
    * 初始化数据
    */
    @Override
    protected void initialize() {
        super.initialize();// 基类初始化，不可去除
        this.setObjectCode(BUSINESS_OBJECT_CODE);
        this.setActivated(emYesNo.YES);

    }

}
