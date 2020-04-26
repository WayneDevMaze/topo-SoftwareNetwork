package com.ltj.demo.vo;

import lombok.Data;

import java.util.List;

/**
 * @program:fileUploadDemo
 * @description:from
 * @author: Ltjack
 * @create:2020/04/07
 */
@Data
public class FromData {

    private List<String> name;

    public FromData(List<String> name) {
        this.name = name;
    }
}
