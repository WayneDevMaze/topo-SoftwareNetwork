package com.ltj.demo.pms.controller;


import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.EasyExcelFactory;
import com.alibaba.excel.metadata.Sheet;
import com.alibaba.excel.read.builder.ExcelReaderBuilder;
import com.baomidou.mybatisplus.extension.handlers.GsonTypeHandler;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ltj.demo.common.enums.UnicomResponseEnums;
import com.ltj.demo.common.exception.UnicomRuntimeException;
import com.ltj.demo.common.response.ResponseBean;
import com.ltj.demo.pms.entity.MapData;
import com.ltj.demo.pms.entity.Work;
import com.ltj.demo.pms.service.IMapService;
import com.ltj.demo.pms.service.IWorkService;
import com.ltj.demo.utils.ExcelDataListener;
import com.ltj.demo.utils.ExcelUtil;
import com.ltj.demo.utils.UserExcelListener;
import com.ltj.demo.utils.WorkExcelListener;
import com.ltj.demo.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import static com.ltj.demo.utils.ExcelUtil.readLessThan1000Row;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author jack
 * @since 2020-04-06
 */
@RestController
@RequestMapping("/api/map")
public class MapController {

    String filePath = System.getProperty("user.dir");

    @Autowired
    private IWorkService workService;

    @Autowired
    private IMapService mapService;

    @GetMapping("testSQL")
    public String testSQL() {
        MapData map = new MapData("asd");
        mapService.save(map);
        Work work = new Work("a", 1, 2, 3, "b", map.getId());
        workService.save(work);
        return "done";
    }

    @GetMapping("/testExcel")
    public String testExcel() {
        String fileName = "F:\\workspace\\javaWorkSpace\\fileUploadDemo\\excel\\586186581134.xlsx";
        EasyExcel.read(fileName, WorkExcel.class, new ExcelDataListener()).sheet().doRead();
        return "done";
    }

    @PostMapping("/uploadExcel")
    public ResponseBean<String> loadExcel(@RequestParam("file") MultipartFile file) {
        if (file == null) {
            throw new UnicomRuntimeException(UnicomResponseEnums.ILLEGAL_ARGUMENT, "文件上传错误");
        }
        System.out.println(file.getName());
        String OriginalName = file.getOriginalFilename();
        System.out.println(OriginalName);
        String fileName = String.valueOf(System.currentTimeMillis());
        if (OriginalName.split("\\.")[1].equals("xlsx")) {
            System.out.println("07");
            fileName += ".xlsx";
        } else if (OriginalName.split("\\.")[1].equals("xls")) {
            System.out.println("03");
            fileName += ".xls";
        } else {
            throw new UnicomRuntimeException(UnicomResponseEnums.ILLEGAL_ARGUMENT, "文件不合法");
        }

        System.out.println(fileName);
        System.out.println(filePath);
        File dest = new File(filePath + "\\excel\\" + fileName);
        try {
            file.transferTo(dest);
            System.out.println("upload finish!");
            WorkExcelListener workExcelListener = new WorkExcelListener(workService, mapService, fileName);
            EasyExcel.read(dest, Work.class, workExcelListener).sheet().doRead();
            List<Work> workList = workExcelListener.getList();

            return new ResponseBean<>(true, transformJson(workList));
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
            return new ResponseBean<>(false, "error");
        }
    }


    @PostMapping("/upload3")
    public ResponseBean<String> upload(@RequestParam("file") MultipartFile file) {
        System.out.println(file.getName());
        String fileName = file.getOriginalFilename();
        System.out.println(fileName);
        File dest = new File(filePath + "\\" + fileName);
        try {
            file.transferTo(dest);
            System.out.println("upload done!");
            StringBuilder builder = new StringBuilder();
            BufferedReader br = new BufferedReader(new FileReader(dest));
            String s = null;
            while ((s = br.readLine()) != null) {//使用readLine方法，一次读一行
                builder.append(System.lineSeparator()).append(s);
            }
            br.close();
            String result = builder.toString();
            System.out.println(result);
            return new ResponseBean<>(true, result);
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
            return new ResponseBean<>(false, "error");
        }
    }

    @PostMapping("/upload2")
    public ResponseBean<String> uploadMap2(@RequestBody WholeJson param) throws IOException {
        System.out.println(param.getJson());
        String fileName = String.valueOf(System.currentTimeMillis());
        fileName += ".json";
        File file = new File(filePath + "\\" + fileName);
        if (!file.exists()) {
            file.createNewFile();
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(file, param);
        return new ResponseBean<>(true, param.getJson());
    }

    @PostMapping("/upload")
    public ResponseBean<String> uploadMap(@RequestBody String param) {
        System.out.println(param);
        String fileName = createJsonFile(param);
        return new ResponseBean<>(true, param);
    }

    public String createJsonFile(String json) {
        String fileName = String.valueOf(System.currentTimeMillis());
        fileName += ".json";
//        StringBuilder content = new StringBuilder();
        BufferedWriter writer;
        try {
            if (json != null) {
                File file = new File(filePath + "\\" + fileName);
//                创建文件夹
//                if (!file.exists()) {
//                    file.mkdirs();
//                }
                if (!file.exists()) {
                    file.createNewFile();
                }
                writer = new BufferedWriter(new FileWriter(file));
                //fileWriter 默认utf-8编码,中文注意!
//                writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), "GBK"));
                writer.write(json);
                writer.flush();
                writer.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "false";
        }
        return fileName;
    }

    public String transformJson(List<Work> workList) throws JsonProcessingException {
        List<String> name = new ArrayList<>();
        List<Integer> good = new ArrayList<>();
        List<Integer> normal = new ArrayList<>();
        List<Integer> bad = new ArrayList<>();
        List<FromData> from = new ArrayList<>();

        for (Work item : workList) {
            name.add(item.getName());
            good.add(item.getOptimisticTime());
            normal.add(item.getPossibleTime());
            bad.add(item.getPessimisticTime());
            if (item.getDepend() != null) {
            FromData fromData = new FromData(Arrays.asList(item.getDepend().split(",")));
            from.add(fromData);
            }else{
                List<String> temp = new ArrayList<>();
                from.add(new FromData(temp));
            }
        }
        ExcelResult result = new ExcelResult(name, good, normal, bad, from);
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(result);
    }


}

