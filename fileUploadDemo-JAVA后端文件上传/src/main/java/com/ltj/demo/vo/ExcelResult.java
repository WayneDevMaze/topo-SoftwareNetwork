package com.ltj.demo.vo;

import lombok.Data;

import java.util.List;

/**
 * @program:fileUploadDemo
 * @description:
 * @author: Ltjack
 * @create:2020/04/07
 */
@Data
public class ExcelResult {
    private List<String> name;
    private List<Integer> good;
    private List<Integer> normal;
    private List<Integer> bad;
    private List<FromData> from;


    public ExcelResult(List<String> name, List<Integer> good, List<Integer> normal, List<Integer> bad, List<FromData> from) {
        this.name = name;
        this.good = good;
        this.normal = normal;
        this.bad = bad;
        this.from = from;
    }
}
