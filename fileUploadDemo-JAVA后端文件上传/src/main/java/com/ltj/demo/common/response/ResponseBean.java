package com.ltj.demo.common.response;


import com.ltj.demo.common.enums.UnicomResponseEnums;

/**
 * @program:demo4-1-server
 * @description:全局统一响应类
 * @author: Ltjack
 * @create:2020/03/21
 */
public class ResponseBean<T> {
    private boolean status;
    private T data;
    private String code;
    private String msg;

    public ResponseBean(){}

    @Override
    public String toString() {
        return "ResponseBean{" +
                "status=" + status +
                ", data=" + data +
                ", code='" + code + '\'' +
                ", msg='" + msg + '\'' +
                '}';
    }
    public ResponseBean(boolean success, T data, String errCode, String errMsg) {
        super();
        this.status = success;
        this.data = data;
        this.code = errCode;
        this.msg = errMsg;
    }

    public ResponseBean(boolean success, T data) {
        this.status = success;
        this.data = data;
    }

    public ResponseBean(boolean success, String errCode, String errMsg) {
        this.status = success;
        this.code = errCode;
        this.msg = errMsg;
    }
    public ResponseBean(boolean success, UnicomResponseEnums enums){
        this.status=success;
        this.code=enums.getCode();
        this.msg=enums.getMsg();
    }
    public ResponseBean(boolean success,T data,UnicomResponseEnums enums){
        this.status=success;
        this.data=data;
        this.code=enums.getCode();
        this.msg=enums.getMsg();
    }
    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
