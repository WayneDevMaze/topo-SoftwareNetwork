package com.ltj.demo.utils;

import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;

import com.ltj.demo.pms.entity.MapData;
import com.ltj.demo.pms.entity.Work;
import com.ltj.demo.pms.service.IMapService;
import com.ltj.demo.pms.service.IWorkService;
import com.ltj.demo.vo.WorkExcel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * @program:fileUploadDemo
 * @description:
 * @author: Ltjack
 * @create:2020/04/06
 */
public class WorkExcelListener extends AnalysisEventListener<Work> {
    private static final Logger LOGGER = LoggerFactory.getLogger(WorkExcelListener.class);

    private IWorkService workService;
    private IMapService mapService;
    private String fileName;
    private int mapId = -1;
    private List<Work> list = new ArrayList<Work>();

    private Boolean firstTimeSave = true;

    public WorkExcelListener(IWorkService workService, IMapService mapService, String fileName) {
        this.workService = workService;
        this.mapService = mapService;
        this.fileName = fileName;
    }

    private static final int BATCH_COUNT = 20;


    @Override
    public void invoke(Work work, AnalysisContext analysisContext) {
        LOGGER.info("解析到一条数据:{}", work.toString());
        list.add(work);
        // 达到BATCH_COUNT了，需要去存储一次数据库，防止数据几万条数据在内存，容易OOM
        if (list.size() >= BATCH_COUNT) {
            saveData();
            firstTimeSave = false;
            // 存储完成清理 list
            list.clear();
        }
    }

    @Override
    public void doAfterAllAnalysed(AnalysisContext analysisContext) {
        saveData();

        LOGGER.info("所有数据解析完成！");

    }

    private void saveData() {
        LOGGER.info("{}条数据，开始存储数据库！", list.size());
        if (firstTimeSave) {
            MapData newMap = new MapData(this.fileName);
            mapService.save(newMap);
            mapId = newMap.getId();
            System.out.println(mapId);
        }
        if (this.mapId > 0) {
            for (Work item : this.list) {
                item.setMapId(this.mapId);
            }
        }
        workService.saveBatch(list);
        LOGGER.info("存储数据库成功！");
    }

    public List<Work> getList() {
        return list;
    }

    public void setList(List<Work> list) {
        this.list = list;
    }
}
