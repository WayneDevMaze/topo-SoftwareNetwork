package com.ltj.demo.vo;

import com.alibaba.excel.annotation.ExcelProperty;
import lombok.Data;

/**
 * @program:fileUploadDemo
 * @description:test
 * @author: Ltjack
 * @create:2020/04/06
 */
@Data
public class User {

    /**
     * 姓名
     */
    @ExcelProperty(index = 0)
    private String name;

    /**
     * 年龄
     */
    @ExcelProperty(index = 1)
    private Integer age;
}