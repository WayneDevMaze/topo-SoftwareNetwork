package com.ltj.demo.pms.entity;

import com.alibaba.excel.annotation.ExcelIgnore;
import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.metadata.BaseRowModel;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 *
 * </p>
 *
 * @author jack
 * @since 2020-04-06
 */
@Data
public class Work implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 工作id
     */

    @TableId(value = "id", type = IdType.AUTO)
    @ExcelIgnore
    @JsonIgnore
    private Integer id;

    /**
     * 名称
     */
    @ExcelProperty( index = 0)
    private String name;

    /**
     * 乐观时间
     */
    @ExcelProperty(index = 1)
    private Integer optimisticTime;

    /**
     * 可能时间
     */
    @ExcelProperty( index = 2)
    private Integer possibleTime;

    /**
     * 悲观时间
     */
    @ExcelProperty( index = 3)
    private Integer pessimisticTime;

    /**
     * 依赖
     */
    @ExcelProperty(index = 4)
    private String depend;

    /**
     * 所属图id
     */
    @ExcelIgnore
    @JsonIgnore
    private Integer mapId;

    public Work() {
    }

    public Work(String name, Integer optimisticTime, Integer possibleTime, Integer pessimisticTime, String depend) {
        this.name = name;
        this.optimisticTime = optimisticTime;
        this.possibleTime = possibleTime;
        this.pessimisticTime = pessimisticTime;
        this.depend = depend;
    }

    public Work(String name, Integer optimisticTime, Integer possibleTime, Integer pessimisticTime, String depend, Integer mapId) {
        this.name = name;
        this.optimisticTime = optimisticTime;
        this.possibleTime = possibleTime;
        this.pessimisticTime = pessimisticTime;
        this.depend = depend;
        this.mapId = mapId;
    }

    public Work(Integer id, String name, Integer optimisticTime, Integer possibleTime, Integer pessimisticTime, String depend, Integer mapId) {
        this.id = id;
        this.name = name;
        this.optimisticTime = optimisticTime;
        this.possibleTime = possibleTime;
        this.pessimisticTime = pessimisticTime;
        this.depend = depend;
        this.mapId = mapId;
    }
}
