package com.ltj.demo.vo;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.metadata.BaseRowModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @program:fileUploadDemo
 * @description:work execl 实体类
 * @author: Ltjack
 * @create:2020/04/06
 */
@Data
public class WorkExcel implements Serializable {
    private static final long serialVersionUID = 7419522089476760749L;
    /**
     * 名称
     */
    @ExcelProperty(index = 0)
    private String name;

    /**
     * 乐观时间
     */
    @ExcelProperty(index = 1)
    private String optimisticTime;

    /**
     * 可能时间
     */
    @ExcelProperty(index = 2)
    private String possibleTime;

    /**
     * 悲观时间
     */
    @ExcelProperty(index = 3)
    private String pessimisticTime;

    /**
     * 依赖
     */
    @ExcelProperty( index = 4)
    private String depend;

}
