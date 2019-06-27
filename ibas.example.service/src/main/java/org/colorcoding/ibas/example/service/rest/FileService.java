package org.colorcoding.ibas.example.service.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.FileData;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.repository.FileRepository;
import org.colorcoding.ibas.bobas.repository.jersey.FileRepositoryService;
import org.colorcoding.ibas.example.MyConfiguration;

@Path("file")
public class FileService extends FileRepositoryService {

    public final static String WORK_FOLDER = MyConfiguration.getConfigValue(
            MyConfiguration.CONFIG_ITEM_DOCUMENT_FOLDER,
            MyConfiguration.getDataFolder() + File.separator + "example_files");

    public FileService() {
        // 设置工作目录
        this.getRepository().setRepositoryFolder(FileService.WORK_FOLDER);
    }

    @POST
    @Path("upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public OperationResult<FileData> upload(FormDataMultiPart formData, @QueryParam("token") String token) {
        return super.save(formData.getField("file"), token);
    }

    @POST
    @Path("download")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public void download(Criteria criteria, @QueryParam("token") String token,
            @Context HttpServletResponse response) {
        try {
            // 获取文件
            IOperationResult<FileData> operationResult = this.fetch(criteria, token);
            if (operationResult.getError() != null) {
                throw operationResult.getError();
            }
            FileData fileData = operationResult.getResultObjects().firstOrDefault();
            if (fileData != null) {
                // 设置文件名
                response.setHeader("Content-Disposition", String.format("attachment;filename=%s", fileData.getFileName()));
                // 设置内容类型
                response.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                // 写入响应输出流
                OutputStream os = response.getOutputStream();
                os.write(fileData.getFileBytes());
                os.flush();
            } else {
                // 文件不存在
                throw new WebApplicationException(404);
            }
        } catch (WebApplicationException e) {
            throw e;
        } catch (Exception e) {
            throw new WebApplicationException(e);
        }
    }

    @GET
    @Path("{resource}")
    public void resource(@PathParam("resource") String resource, @QueryParam("token") String token,
                         @QueryParam("x") Integer x, @QueryParam("y") Integer y, @Context HttpServletResponse response) {
        FileInputStream inputStream = null;
        StringBuilder stringBuilder;
        File file;
        try {
                stringBuilder = new StringBuilder();
                stringBuilder.append(this.getRepository().getRepositoryFolder());
                stringBuilder.append(File.separator);
                stringBuilder.append(resource);
                file = new File(stringBuilder.toString());
                if (!file.exists() || !file.isFile()) {
                    // 文件不存在
                    throw new WebApplicationException(404);
                }
            if (file.isFile() && file.exists()) {
                // 设置内容类型
                response.setContentType(this.getContentType(file.getName()));
                if (file.getName().endsWith(".svg")) {
                    response.setContentType("image/svg+xml");
                }
                // 写入响应输出流
                OutputStream os = response.getOutputStream();
                long fileSize = file.length();
                if (fileSize > Integer.MAX_VALUE) {
                    throw new IOException(I18N.prop("msg_bobas_invalid_data"));
                }
                inputStream = new FileInputStream(file);
                byte[] buffer = new byte[(int) fileSize];
                int offset = 0;
                int numRead = 0;
                while (offset < buffer.length
                        && (numRead = inputStream.read(buffer, offset, buffer.length - offset)) >= 0) {
                    offset += numRead;
                }
                os.write(buffer);
                os.flush();
            } else {
                // 文件不存在
                throw new WebApplicationException(404);
            }
        } catch (WebApplicationException e) {
            throw e;
        } catch (Exception e) {
            throw new WebApplicationException(e);
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (Exception e2) {
                }
            }
        }
    }
}
