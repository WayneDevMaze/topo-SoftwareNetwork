package com.ltj.demo.pms.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableName;
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
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("map")
public class MapData implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 图id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 图名称
     */
    private String name;

    public MapData() {
    }

    public MapData(String name) {
        this.name = name;
    }

    public MapData(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}
