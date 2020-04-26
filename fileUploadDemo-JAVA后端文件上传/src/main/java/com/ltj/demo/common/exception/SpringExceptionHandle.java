package com.ltj.demo.common.exception;

import com.ltj.demo.common.enums.UnicomResponseEnums;
import com.ltj.demo.common.response.ResponseBean;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.http.HttpServletRequest;
import java.net.ConnectException;
import java.sql.SQLException;
import java.sql.SQLNonTransientConnectionException;

/**
 * @program:demo4-1-server
 * @description:全局异常统一处理类
 * @author: Ltjack
 * @create:2020/03/21
 */
//@RestControllerAdvice(annotations = {RestController.class, Controller.class})
public class SpringExceptionHandle {
    private static final Logger logger = LoggerFactory.getLogger(SpringExceptionHandle.class);

    /**
     * 请求参数类型错误异常的捕获
     *
     * @param e
     * @return
     */
    @ExceptionHandler(value = {BindException.class})
    @ResponseBody
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseBean<String> badRequest(BindException e) {
        logger.error("occurs error when execute method ,message {}", e.getMessage());
        return new ResponseBean<>(false, UnicomResponseEnums.BAD_REQUEST);
    }

    /**
     * 404错误异常的捕获
     *
     * @param e
     * @return
     */
    @ExceptionHandler(value = {NoHandlerFoundException.class})
    @ResponseBody
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ResponseBean<String> badRequestNotFound(BindException e) {
        logger.error("occurs error when execute method ,message {}", e.getMessage());
        return new ResponseBean<>(false, null, UnicomResponseEnums.NOT_FOUND);
    }

    /**
     * mybatis未绑定异常
     *
     * @param e
     * @return
     */
//    @ExceptionHandler(BindingException.class)
//    @ResponseBody
//    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
//    public ResponseBean<String> mybatis(Exception e) {
//        logger.error("occurs error when execute method ,message: {}", e.getMessage());
//        return new ResponseBean<>(false, UnicomResponseEnums.BOUND_STATEMENT_NOT_FOUNT);
//    }

    /**
     * 自定义异常的捕获
     * 自定义抛出异常。统一的在这里捕获返回JSON格式的友好提示。
     *
     * @param exception
     * @param request
     * @return
     */
    @ExceptionHandler(value = {UnicomRuntimeException.class})
    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public <T> ResponseBean<T> sendError(UnicomRuntimeException exception, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        if (exception.getMessage() != null) {
            logger.error("occurs error when execute url ={} ,message: {}", requestURI, exception.getMessage());
            return new ResponseBean<>(false, exception.getCode(), exception.getMessage());
        }
        logger.error("occurs error when execute url ={} ,message: {}", requestURI, exception.getMsg());
        return new ResponseBean<>(false, exception.getCode(), exception.getMsg());
    }

    /**
     * 数据库操作出现异常
     *
     * @param e
     * @return
     */
//    @ExceptionHandler(value = {SQLException.class, DataAccessException.class})
//    @ResponseBody
//    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
//    public ResponseBean<String> systemError(Exception e) {
//        logger.error("occurs error when execute method ,message: {}", e.getMessage());
//        return new ResponseBean<>(false, UnicomResponseEnums.DATABASE_ERROR);
//    }

    /**
     * 网络连接失败！
     *
     * @param e
     * @return
     */
    @ExceptionHandler(value = {ConnectException.class})
    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseBean<String> connect(Exception e) {
        logger.error("occurs error when execute method ,message {}", e.getMessage());
        return new ResponseBean<>(false, UnicomResponseEnums.CONNECTION_ERROR);
    }

    @ExceptionHandler(value = {Exception.class})
    @ResponseBody
    @ResponseStatus(value = HttpStatus.METHOD_NOT_ALLOWED)
    public ResponseBean<String> notAllowed(Exception e) {
        logger.error("occurs error when execute method ,message {}", e.getMessage());
        return new ResponseBean<>(false, UnicomResponseEnums.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(value = {SQLNonTransientConnectionException.class})
    @ResponseBody
    @ResponseStatus(value = HttpStatus.REQUEST_TIMEOUT)
    public ResponseBean<String> sqlConnect(Exception e) {
        logger.error("occurs error when execute method ,message {}", e.getMessage());
        return new ResponseBean<>(false, UnicomResponseEnums.DATABASE_ERROR);
    }
}