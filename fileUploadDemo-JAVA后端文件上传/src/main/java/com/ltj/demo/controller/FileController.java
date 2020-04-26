package com.ltj.demo.controller;

import com.ltj.demo.common.response.ResponseBean;
import com.ltj.demo.utils.ExcelUtil;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

/**
 * @program:fileUploadDemo
 * @description:文件上传下载
 * @author: Ltjack
 * @create:2020/03/28
 */
@RestController
@RequestMapping("/file")
public class FileController {

    String filePath = System.getProperty("user.dir");

    @GetMapping("/testGet")
    public ResponseBean<String> testGet() {
//        File file = new File("filePath" + "\\data_json.json");
        File file = new File("C:\\download" + "\\data_json.json");
        StringBuilder builder = new StringBuilder();
        try {
            BufferedReader br = new BufferedReader(new FileReader(file));
            String s = null;
            while ((s = br.readLine()) != null) {//使用readLine方法，一次读一行
                builder.append(System.lineSeparator()).append(s);
            }
            br.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        String result = builder.toString();
        System.out.println(result);
        return new ResponseBean<String>(true, result);
    }

    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file) {
        System.out.println(file.getName());
        String fileName = file.getOriginalFilename();
        System.out.println(fileName);

        System.out.println(filePath);
        File dest = new File(filePath + "\\json\\" + fileName);
        try {
            file.transferTo(dest);
            System.out.println("done!");
            return "upload done";
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
            return "false";
        }
    }

    @GetMapping("/download")
    public String download(HttpServletResponse response) throws UnsupportedEncodingException {
        String filePath = System.getProperty("user.dir");
        String fileName = "rfc4033.txt";
        File file = new File(filePath + "\\" + fileName);
        if (file.exists()) { //判断文件父目录是否存在
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setCharacterEncoding("UTF-8");
            // response.setContentType("application/force-download");
            response.setHeader("Content-Disposition", "attachment;fileName=" + java.net.URLEncoder.encode(fileName, "UTF-8"));
            byte[] buffer = new byte[1024];
            FileInputStream fis = null; //文件输入流
            BufferedInputStream bis = null;

            OutputStream os = null; //输出流
            try {
                os = response.getOutputStream();
                fis = new FileInputStream(file);
                bis = new BufferedInputStream(fis);
                int i = bis.read(buffer);
                while (i != -1) {
                    os.write(buffer);
                    i = bis.read(buffer);
                }

            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            System.out.println("----------file download---");
            try {
                bis.close();
                fis.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return null;
    }

    @GetMapping("/read")
    public String readExcel() {
        String filePath = "C:\\Users\\Ltjack\\Desktop\\数据库设计表.xlsx";
        List<Object> objectList = ExcelUtil.readLessThan1000Row(filePath);
        for (Object o : objectList) {
            System.out.println(o);
        }
        return "done!";
    }

    @GetMapping("/hi")
    public String helloWorld() {
        return "hi";
    }


}