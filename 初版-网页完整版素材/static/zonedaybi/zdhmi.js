/*
  zoneday可视化软件 2019.4.10创世纪
  zonedayBI
  zonedayBI.HMI       组态软件
  zonedayBI.Report    报表软件
  zonedayBI.GISLayer  GIS图层
  zonedayBI.Visualize 可视化
  zonedayBI.GL        3D可视化
  zonedayBI.Video     视频播放
  zonedayBI.Net       网络通信
  zonedayBI.Data      数据模型
  zonedayBI.View      视图（构思中)
  zonedayBI.Mobile

*/

!
//GTopo工厂类--Factory   liuxf 2019.09.05
function TopoFactory(JTopo){
    //初始化连接线
    function createLink (beginNode, endNode) {

        link = new JTopo.FoldLink(beginNode, endNode);

        //--link增加属性 begin_node,end_node 开始节点  结束节点         liuxf 2019.4.11
        if (beginNode.uuid) {
            link.begin_node = beginNode.uuid;
            var c = "begin_node".split(",");
            link.serializedProperties = link.serializedProperties.concat(c);//序列化标记
        }
        if (endNode.uuid) {
            link.end_node = endNode.uuid;
            var c = "end_node".split(",");
            link.serializedProperties = link.serializedProperties.concat(c);//序列化标记
        }
        return link;
    }
    //初始化连接线
    function createPolyLine(beginNode, endNode, polyPoints,poly_points_str) {

        if(beginNode==null) {
            beginNode = new JTopo.Node('tempA');
            beginNode.setSize(1, 1);
            beginNode.setLocation(polyPoints[0].x,polyPoints[0].y);
            beginNode.uuid="0";
        }
        if (endNode != null && endNode instanceof JTopo.Node === false)
            endNode=null;
        if(endNode==null){
            endNode = new JTopo.Node('tempZ');
            endNode.setSize(1, 1);
            endNode.uuid="0";
            i=polyPoints.length-1;
            endNode.setLocation(polyPoints[i].x,polyPoints[i].y);
        }
        link = new JTopo.PolyLine(beginNode, endNode,"",polyPoints);

        //--link增加属性 begin_node,end_node 开始节点  结束节点 轨迹        liuxf 2019.4.11
        link.begin_node = beginNode.uuid;
        link.end_node = endNode.uuid;
        link.poly_points_str=poly_points_str;//json字符串
        var c = "begin_node,end_node,poly_points_str".split(",");
        link.serializedProperties = link.serializedProperties.concat(c);//序列化标记
        return link;
    }
    //添加节点
    function dragNodeToScene (config,hmi) {
        var node = createNode(config.img,hmi);
        node.text = config.nodeOrder;
        node.x_id = config.id;
        node.fontColor = "0,0,0";
        node.font = "18px Consolas";
        node.setLocation(config.x, config.y);
        scene.add(node);
    }
    function createNode (img_path,uuid,nodeType, hmi) {

        var node = null;

        if(nodeType==="CIRCLE")
            node=new JTopo.CircleNode();
        else
            node=new JTopo.Node();

        //----------------------增加新属性---------------------by liuxf 2019.4.11
        //1-新属性，img_path-------图片路径
        node.img_path = img_path;
        var c = "img_path".split(",");
        node.serializedProperties = node.serializedProperties.concat(c);//序列化标记
        node.setImage(img_path);
        var image = new Image();
        image.src = img_path;
        image.onload = function () {
            console.log('width:' + image.width + ',height:' + image.height); // 打印
        };
        var width = image.width;
        var height = image.height;
        var minLen = width < height ? width : height;
        if (minLen > 50) {
            width = width * 50 / minLen;
            height = height * 50 / minLen;
        }

        //2-新属性 UUID------唯一标识
        function generateUUID() {
            var d = new Date().getTime(),
                uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            return uuid;
        };
        if (uuid == null)
            node.uuid = generateUUID();
        else node.uuid = uuid;
        var c = "uuid".split(",");
        node.serializedProperties = node.serializedProperties.concat(c);//序列化标记

        //3-新属性data_source
        node.data_source = "";
        var c = "data_source".split(",");
        node.serializedProperties = node.serializedProperties.concat(c);//序列化标记

        //------------------------------------end --------------------------------------

        node.setSize(width, height);
        if(hmi){
            node.mouseup(function (event) {
                hmi.currentNode = this;
                if (event.button == 2) {// 右键
                   /* hmi.nodeMenu.css({// 当前位置弹出菜单（div）
                        top: event.pageY,
                        left: event.pageX
                    }).show();
                    $("#txt_dataSource").val(hmi.currentNode.data_source);*/
                }
            });

            node.mousedown(function (event) {
                if (event.button == 2) {//right key

                } else if (event.button == 1) {
                    // node.text = "middle key ";
                } else if (event.button == 0) {
                    // node.text = "left key";
                }

            });
            node.click(function (event) {
                console.log("click");

            });
            node.dbclick(function (event) {
                console.log("double click");
            });
        }
        return node;
    }
    function createElementFromJson(ele,mapNode,hmi){
        var c = null;
        if ("node" == ele.elementType ||"CircleNode" == ele.elementType) {
            c = createNode(ele["img_path"],ele["uuid"],hmi);
            mapNode.set(ele["uuid"], c);
        }
        else if ("link" == ele.elementType) {

            beginNode = mapNode.get(ele["begin_node"]);
            endNode = mapNode.get(ele["end_node"]);
            c = null;
            poly_points_str = ele["poly_points_str"];
            var paraPolyPoints = [];
            if (poly_points_str) {//折线
                poly_points_str.split(";").forEach(function (item) {
                    arrPoint = item.split("-");
                    paraPolyPoints.push({
                        x: arrPoint[0],
                        y: arrPoint[1]
                    });
                });
                c = createPolyLine(beginNode, endNode, paraPolyPoints, poly_points_str);
            } else
                c = createLink(beginNode, endNode);
        }
        for (e in ele)
            c[e] = ele[e];
        return c;
    }
    JTopo.Factory= {
        createLink: createLink,
        createPolyLine: createPolyLine,
        dragNodeToScene:  dragNodeToScene,
        createNode:createNode,
        createElementFromJson: createElementFromJson
    }
}(JTopo),

//GTopo图元组合类--Group  liuxf 2019.09.04
function (JTopo) {
        function b(c,json) {
            this.initialize = function (c,json) {// c text; json文件信息
                b.prototype.initialize.apply(this, arguments),
                    this.elementType = "GroupNode",
                    this.groupJson=json; //子元的json文件
                this.zIndex = JTopo.zIndex_Node,
                    this.text = c,
                    this.font = "12px Consolas",
                    this.fontColor = "255,255,255",
                    this.borderWidth = 0,
                    this.borderColor = "255,255,255",
                    this.borderRadius = null,
                    this.dragable = !0,
                    this.textPosition = "Bottom_Center",
                    this.textOffsetX = 0,
                    this.textOffsetY = 0,
                    this.transformAble = !0,
                    this.inLinks = null,
                    this.outLinks = null;

                    this.childPostion=[];//子元的相对位置 [[x,y],[x,y],......]
                    this.zoom=1;

                    this.jsonObj=eval(this.groupJson);


                 //相对位置
                child_postion_str = this.jsonObj&&this.jsonObj["child_postion_str"];
                var childPostion = this.childPostion;
                if (child_postion_str) {
                    child_postion_str.split(";").forEach(function (item) {
                        arrPoint = item.split("-");
                        childPostion.push({
                            x: arrPoint[0],
                            y: arrPoint[1]
                        });
                    });
                }

                this.mapChildEle = new Map();//各个子图元
                var mapChildEle=this.mapChildEle;
                //获取所有的子元进行绘制  json文件
                //添加Node
                this.jsonObj&&this.jsonObj.childs.forEach(function (ele) {

                    if ("link" == ele.elementType) return;

                    var c = JTopo.Factory.createElementFromJson(ele,mapChildEle);
                    scene.add(c);
                });
                //--添加link------------------------------
                this.jsonObj&&this.jsonObj.childs.forEach(function (ele) {

                    if ("link" == ele.elementType) {
                        var c = JTopo.Factory.createElementFromJson(ele,mapChildEle);
                        scene.add(c);
                    }
                });
                var d = "text,font,fontColor,textPosition,textOffsetX,textOffsetY,borderRadius".split(",");
                this.serializedProperties = this.serializedProperties.concat(d)
            },
                this.initialize(c,json),
                this.paint = function (a) {
                    a.beginPath(),
                        a.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")",
                        null == this.borderRadius || 0 == this.borderRadius ?
                            a.rect(-this.width / 2, -this.height / 2, this.width, this.height) :
                            a.JTopoRoundRect(-this.width / 2, -this.height / 2, this.width, this.height,
                                this.borderRadius),
                        a.fill(),
                        a.closePath();
                    var index=0;

                    var childPostion = this.childPostion;
                    var groupParent=this;
                    this.mapChildEle.forEach(function(ele){
                        //设置相对位置
                        ele.x=childPostion[index].x+groupParent.x;
                        ele.y=childPostion[index].y+groupParent.y;
                        ele.paint();
                    });

                    this.paintText(a),
                        this.paintBorder(a),
                        this.paintCtrl(a),
                        this.paintAlarmText(a)
                },
                this.paintAlarmText = function (a) {
                    if (null != this.alarm && "" != this.alarm) {
                        var b = this.alarmColor || "255,0,0",
                            c = this.alarmAlpha || .5;
                        a.beginPath(),
                            a.font = this.alarmFont || "10px 微软雅黑";
                        var d = a.measureText(this.alarm).width + 6,
                            e = a.measureText("田").width + 6,
                            f = this.width / 2 - d / 2,
                            g = -this.height / 2 - e - 8;
                        a.strokeStyle = "rgba(" + b + ", " + c + ")",
                            a.fillStyle = "rgba(" + b + ", " + c + ")",
                            a.lineCap = "round",
                            a.lineWidth = 1,
                            a.moveTo(f, g),
                            a.lineTo(f + d, g),
                            a.lineTo(f + d, g + e),
                            a.lineTo(f + d / 2 + 6, g + e),
                            a.lineTo(f + d / 2, g + e + 8),
                            a.lineTo(f + d / 2 - 6, g + e),
                            a.lineTo(f, g + e),
                            a.lineTo(f, g),
                            a.fill(),
                            a.stroke(),
                            a.closePath(),
                            a.beginPath(),
                            a.strokeStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")",
                            a.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")",
                            a.fillText(this.alarm, f + 2, g + e - 4),
                            a.closePath()
                    }
                },
                this.paintText = function (a) {
                    var b = this.text;
                    if (null != b && "" != b) {
                        a.beginPath(),
                            a.font = this.font;
                        var c = a.measureText(b).width,
                            d = a.measureText("田").width;
                        a.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
                        var e = this.getTextPostion(this.textPosition, c, d);
                        a.fillText(b, e.x, e.y),
                            a.closePath()
                    }
                },
                this.paintBorder = function (a) {
                    if (0 != this.borderWidth) {
                        a.beginPath(),
                            a.lineWidth = this.borderWidth,
                            a.strokeStyle = "rgba(" + this.borderColor + "," + this.alpha + ")";
                        var b = this.borderWidth / 2;
                        null == this.borderRadius || 0 == this.borderRadius ? a.rect(-this.width / 2 - b, -this.height / 2 - b, this.width + this.borderWidth, this.height + this.borderWidth) : a.JTopoRoundRect(-this.width / 2 - b, -this.height / 2 - b, this.width + this.borderWidth, this.height + this.borderWidth, this.borderRadius),
                            a.stroke(),
                            a.closePath()
                    }
                },
                this.getTextPostion = function (a, b, c) {
                    var d = null;
                    return null == a || "Bottom_Center" == a ? d = {
                        x: -this.width / 2 + (this.width - b) / 2,
                        y: this.height / 2 + c
                    } : "Top_Center" == a ? d = {
                        x: -this.width / 2 + (this.width - b) / 2,
                        y: -this.height / 2 - c / 2
                    } : "Top_Right" == a ? d = {
                        x: this.width / 2,
                        y: -this.height / 2 - c / 2
                    } : "Top_Left" == a ? d = {
                        x: -this.width / 2 - b,
                        y: -this.height / 2 - c / 2
                    } : "Bottom_Right" == a ? d = {
                        x: this.width / 2,
                        y: this.height / 2 + c
                    } : "Bottom_Left" == a ? d = {
                        x: -this.width / 2 - b,
                        y: this.height / 2 + c
                    } : "Middle_Center" == a ? d = {
                        x: -this.width / 2 + (this.width - b) / 2,
                        y: c / 2
                    } : "Middle_Right" == a ? d = {
                        x: this.width / 2,
                        y: c / 2
                    } : "Middle_Left" == a && (d = {
                        x: -this.width / 2 - b,
                        y: c / 2
                    }),
                    null != this.textOffsetX && (d.x += this.textOffsetX),
                    null != this.textOffsetY && (d.y += this.textOffsetY),
                        d
                },
                this.setImage = function (b, c) {
                    if (null == b) throw new Error("Node.setImage(): 参数Image对象为空!");
                    var d = this;
                    if ("string" == typeof b) {
                        var e = j[b];
                        null == e ? (e = new Image, e.src = b, e.onload = function () {
                            j[b] = e,
                            1 == c && d.setSize(e.width, e.height);
                            var f = a.util.genImageAlarm(e);
                            f && (e.alarm = f),
                                d.image = e
                        }) : (c && this.setSize(e.width, e.height), this.image = e)
                    } else this.image = b,
                    1 == c && this.setSize(b.width, b.height)
                },
                this.removeHandler = function (a) {
                    var b = this;
                    this.outLinks && (this.outLinks.forEach(function (c) {
                        c.nodeA === b && a.remove(c)
                    }), this.outLinks = null),
                    this.inLinks && (this.inLinks.forEach(function (c) {
                        c.nodeZ === b && a.remove(c)
                    }), this.inLinks = null)
                }
        }
        function GenerateGroup(c,childs) {
            this.initialize = function (c,childs) {// c text; json文件信息
                b.prototype.initialize.apply(this, arguments),
                    this.elementType = "GroupNode",

                this.zIndex = JTopo.zIndex_Node,
                    this.text = c,
                    this.font = "12px Consolas",
                    this.fontColor = "255,255,255",
                    this.borderWidth = 0,
                    this.borderColor = "255,255,255",
                    this.borderRadius = null,
                    this.dragable = !0,
                    this.textPosition = "Bottom_Center",
                    this.textOffsetX = 0,
                    this.textOffsetY = 0,
                    this.transformAble = !0,
                    this.inLinks = null,
                    this.outLinks = null;
                this.childPosition=[];//子元的相对位置 [[x,y],[x,y],......]
                this.childs=childs;

                var x=10000;
                var y=10000;
                var maxX=0;
                var maxY=0;
                this.childs.forEach(function (a, d) {//a child ;  d index;

                    if(a.x<x) x=a.x;
                    if(a.y<y) y=a.y;
                    if(maxX< a.x+a.width) maxX=a.x+a.width;
                    if(maxY< a.y+a.height) maxY=a.y+a.height;

                });
                this.x=x;
                this.y=y;
                this.width=maxX-this.x;
                this.height=maxY-this.y;

                var childPosition=this.childPosition;
                this.childs.forEach(function (a, d) {//a child ;  d index;

                    childPosition.push({
                            x:  a.x-x,
                            y:  a.y-y
                        });

                });
                var child_position_str="";
                this.childPosition.forEach(function(item){
                    child_position_str=child_position_str+item.x+"-"+item.y+";";

                });
                this.child_position_str=child_position_str;

                this.zoom=1;
                var d = "text,font,fontColor,textPosition,textOffsetX,textOffsetY,borderRadius,child_position_str".split(",");
                this.serializedProperties = this.serializedProperties.concat(d)
            },
                this.initialize(c,childs),
                this.saveAsEle = function () {//group 用来进行Group图元的存储
                    {
                        var a = this,
                            b = "{";
                        this.serializedProperties.length
                    }
                    this.serializedProperties.forEach(function (c) {
                        var d = a[c];

                        "string" == typeof d && (d = '"' + d + '"'),
                            b += '"' + c + '":' + d + ","
                    }),
                        b += '"childs":[';
                    var c = this.childs.length;
                    return this.childs.forEach(function (a, d) {
                        b += a.toJson(),
                        c > d + 1 && (b += ",")
                    }),
                        b += "]",
                        b += "}"
                }
        }
        function c() {
            c.prototype.initialize.apply(this, arguments)//调用自己的原型 b   this标识c 本身
        }
        b.prototype = new JTopo.EditableElement,
            c.prototype = new b,
            JTopo.GroupNode = c,
            GenerateGroup.prototype= new JTopo.EditableElement,
            JTopo.GenerateGroup=GenerateGroup
    }(JTopo),

//"前端可视化配置软件"
function (window){ 
    zonedayBI = {
        version: "0.2.2",
        desciption: "前端可视化配置软件"
    }, 
    window.zonedayBI = zonedayBI
}(window)

function HMI2() {
    // 绘图参数
    this.config = {
        // Stage属性
        stageFrames: 500,                       // 舞台播放的帧数/秒
        defaultScal: 0.95,                      // 鼠标滚轮缩放比例
        eagleEyeVsibleDefault: false,         // 是否显示鹰眼对象
        // Node属性
        nodeAlpha: 1,                           // 节点透明度,取值范围[0-1]
        nodeStrokeColor: '22,124,255',        // 节点描边的颜色
        nodeFillColor: '22,124,255',          // 节点填充颜色
        nodeShadow: false,                     // 节点是否显示阴影
        nodeShadowColor: 'rgba(0,0,0,0.5)',  // 节点阴影的颜色
        nodeFont: '12px Consolas',            // 节点字体
        nodeFontColor: 'black',               // 节点文字颜色,如"255,255,0"
        nodeDefaultWidth: 64,                 // 新建节点默认宽
        nodeDefaultHeight: 64,                // 新建节点默认高
        nodeBorderColor: 'black',            // 节点容器边框颜色,如"255,255,0"
        nodeBorderRadius: 30,                // 节点半径，非圆节点有此属性会变形
        nodeRotateValue: 0.5,                // 节点旋转的角度(弧度)
        nodeScale: 0.2,                       // 节点缩放幅度(此处保证X和Y均等缩放)
        // Link属性
        linkAlpha: 1,                         // 连线透明度,取值范围[0-1]
        linkStrokeColor: '123,165,241',     // 连线的颜色
        linkFillColor: '123,165,241',
        linkShadow: false,                   // 是否显示连线阴影
        linkShadowColor: 'rgba(0,0,0,0.5)',
        linkFont: '12px Consolas',           // 节点字体
        linkFontColor: 'black',              // 连线文字颜色,如"255,255,0"
        linkArrowsRadius: 0,                 // 线条箭头半径
        linkDefaultWidth: 3,                 // 连线宽度
        linkOffsetGap: 40,                   // 折线拐角处的长度
        linkDirection: 'horizontal',        // 折线的方向
        // Container属性
        containerAlpha: 1,
        containerStrokeColor: '22,124,255',
        containerFillColor: '22,124,255',
        containerShadow: false,
        containerShadowColor: 'rgba(0,0,0,0.5)',
        containerFont: '12px Consolas',
        containerFontColor: 'black',
        containerBorderColor: 'black',
        containerBorderRadius: 30
    }
    // 布局参数
    this.layout = {}
    // 绘图区属性
    this.stage = null
    this.scene = null
    // 当前模式
    this.stageMode = 'edit'

    // 默认连线类型
    this.lineType = 'noneline'

    // 当前选择的节点对象
    this.currentNode = null;
    // 当前选择的连线对象
    this.currentLink = null;
    this.textfield = $("#jtopo_textfield");

    // 节点右键菜单DOM对象
    this.nodeMenu = $('#node-menu')
    // 连线右键菜单DOM对象
    this.lineMenu = $('#line-menu')
    // 全局右键菜单
    this.mainMenu = $('#main-menu')
    // 布局管理菜单
    this.layoutMenu = $('#layout-menu')
    // 节点文字方向
    this.nodeTextPosMenu = $('#node-text-pos-menu')
    // 节点分组菜单
    this.groupMangeMenu = $('#group-mange-menu')
    // 节点对齐菜单
    this.groupAlignMenu = $('#group-align-menu')
    this.alignGroup = $('#align-group')
    // 分组的容器管理菜单
    this.containerMangeMenu = $('#container-mange-menu')




}
//初始化场景
HMI2.prototype.initScene=function(canvas, textfield,
                         jsonToplogy) {

    if (jsonToplogy != null) {
        this.stage = this.createStageFromJson(jsonToplogy, canvas);
        this.scene=this.stage.childs[0];
    }
    else {
        this.stage = new JTopo.Stage(canvas); // 创建舞台对象
        this.scene = new JTopo.Scene(this.stage); // 创建场景对象
        this.scene.background = './images/bg.jpg';
        this.scene.alpha = 0.1;
    }
    // 滚轮缩放
    this.stage.frames = this.config.stageFrames       // 设置当前舞台播放的帧数/秒
    this.stage.wheelZoom = this.config.defaultScal    // 鼠标滚轮缩放操作比例
    this.stage.eagleEye.visible = this.config.eagleEyeVsibleDefault    // 是否开启鹰眼
    this.stage.mode = this.stageMode;

    this.textfield=textfield;

    let self=this;
    function addDataSource(){
        $("#myModalLabel").text("编辑数据源");
        $('#myModal').modal();
    }
    self.scene.dbclick(function (event) {
        if (event.target == null) return;
        var e = event.target;
        self.textfield.css({
            top: event.pageY,
            left: event.pageX - e.width / 2
        }).show().attr('value', e.text).focus().select();
        e.text = "";
        self.textfield[0].JTopoNode = e;
    });
    self.textfield.blur(function () {
        self.textfield[0].JTopoNode.text = self.textfield.hide().val();
    });

    //初始化线路
    var beginNode = null;
    var tempNodeA = new JTopo.Node('tempA');;
    tempNodeA.setSize(1, 1);
    var tempNodeZ = new JTopo.Node('tempZ');;
    tempNodeZ.setSize(1, 1);
    var polyPoints = [];//折线
    var link = new JTopo.Link(tempNodeA, tempNodeZ);
    //创建连接线
    function mouseupLink(e){

        if (e.button == 2) { //e.buttuon  0	规定鼠标左键。 1 规定鼠标中键。  2 规定鼠标右键。
            self.scene.remove(link);
            link.clear();
            return;
        }
        if (e.target != null && e.target instanceof JTopo.Node) {
            if (beginNode == null) {
                beginNode = e.target;

                self.scene.add(link);
                tempNodeA.setLocation(e.x, e.y);
                tempNodeZ.setLocation(e.x, e.y);
            }
            else if (beginNode !== e.target) {
                var endNode = e.target;
                var l =JTopo.Factory.createLink(beginNode, endNode);
                self.scene.add(l);
                beginNode = null;
                self.scene.remove(link);
                link.clear();
            }
            else {
                beginNode = null;
            }
        } else {
            self.scene.remove(link);
            link.clear();
        }
    }
    //鼠标放开创建折线
    function mouseUpPolyLine(e){
        polyPoints.push({
            x: e.x,
            y: e.y
        });
        link.setCurrentPoint({
            x: e.x,
            y: e.y
        })
        if (e.button == 2) {//鼠标右键，完成绘制

            if (polyPoints.length == 1){//只有一个位置，删除
                polyPoints=[];
                self.scene.remove(link);
                link.clear();
                return;
            }
            else{//结束画图，生成Line

                var endNode = e.target;
                var point_str="";
                polyPoints.forEach(function(item){
                    point_str=point_str+item.x+"-"+item.y+";";

                });

                var l =JTopo.Factory.createPolyLine(beginNode, endNode, polyPoints,point_str);
                self.scene.add(l);
                beginNode = null;
                polyPoints=[];
                self.scene.remove(link);
                link.clear();
            }
            return;
        }

        //-------第一次mouseup
        if (polyPoints.length == 1) {//设置开始节点

            beginNode = e.target;
            self.scene.add(link);
            tempNodeA.setLocation(e.x, e.y);
            tempNodeZ.setLocation(e.x, e.y);
            return;
        }

        //-------第n次mouseup
        if (e.target != null && e.target instanceof JTopo.Node) { //有目标节点,结束画图
            var endNode = e.target;
            var point_str="";
            polyPoints.forEach(function(item){
                point_str=point_str+item.x+"-"+item.y+";";

            });
            var l =JTopo.Factory.createPolyLine(beginNode, endNode, polyPoints,point_str);
            self.scene.add(l);
            beginNode = null;
            polyPoints=[];
            self.scene.remove(link);
            link.clear();

        } else {
            tempNodeZ.setLocation(e.x, e.y);
        }
    }

    // 监听鼠标松开事件
    // 处理右键菜单、左键连线
    // event.button: 0-左键 1-中键 2-右键
    self.scene.mouseup(function (event) {

        if (event.button === 2) {                      // 右键菜单

            if(self.lineType == "polyLine"){
                mouseUpPolyLine(event);
                return;
            }

            $('div[id$=\'-menu\']').hide()
            let menuY = event.layerY ? event.layerY : event.offsetY
            let menuX = event.layerX ? event.layerX : event.offsetX
            // 记录鼠标触发位置在canvas中的相对位置
            self.xInCanvas = menuX
            self.yInCanvas = menuY
            if (event.target) {
                if (event.target instanceof JTopo.Node) {          // 处理节点右键菜单事件
                    let selectedNodes = self.utils.getSelectedNodes()
                    // 如果是节点多选状态弹出分组菜单
                    if (selectedNodes && selectedNodes.length > 1) {
                        // 判断边界出是否能完整显示弹出菜单
                        if (menuX + self.groupMangeMenu.width() >= self.stage.width) {
                            menuX -= self.groupMangeMenu.width()
                        }
                        if (menuY + self.groupMangeMenu.height() >= self.stage.height) {
                            menuY -= self.groupMangeMenu.height()
                        }
                        self.groupMangeMenu.css({
                            top: menuY,
                            left: menuX
                        }).show()
                    } else {
                        // 判断边界出是否能完整显示弹出菜单
                        if (menuX + self.nodeMenu.width() >= self.stage.width) {
                            menuX -= self.nodeMenu.width()
                        }
                        if (menuY + self.nodeMenu.height() >= self.stage.height) {
                            menuY -= self.nodeMenu.height()
                        }
                        self.nodeMenu.css({
                            top: menuY,
                            left: menuX
                        }).show()
                    }
                } else if (event.target instanceof JTopo.Link) {     // 连线右键菜单
                    self.lineMenu.css({
                        top: event.layerY ? event.layerY : event.offsetY,
                        left: event.layerX ? event.layerX : event.offsetX
                    }).show()
                } else if (event.target instanceof JTopo.Container) {        // 容器右键菜单
                    self.containerMangeMenu.css({
                        top: event.layerY ? event.layerY : event.offsetY,
                        left: event.layerX ? event.layerX : event.offsetX
                    }).show()
                }

            } else {
                // 判断边界出是否能完整显示弹出菜单
                if (menuX + self.mainMenu.width() >= self.stage.width) {
                    menuX -= self.mainMenu.width()
                }
                if (menuY + self.mainMenu.height() >= self.stage.height) {
                    menuY -= self.mainMenu.height()
                }
                self.mainMenu.css({
                    top: menuY,
                    left: menuX
                }).show()

                // 关闭弹出菜单（div）
                contextMenu.hide();
            }
        }
        else if (event.button === 0) {
            if (self.lineType === "line")
                mouseupLink(event);
            else if (self.lineType === "polyLine")
                mouseUpPolyLine(event);


        }

    });
    self.scene.mousedown(function (e) {
        if(self.lineType==="line") {
            if (e.target == null || e.target === beginNode || e.target === link) {
                self.scene.remove(link);
            }
        }else{

        }
    });
    self.scene.mousemove(function (e) {
        tempNodeZ.setLocation(e.x, e.y);
    });
    // 鼠标进入事件
    this.scene.mouseover(function (event) {
        Timer.start()
        // 进入某个节点
        if (event.target != null && event.target instanceof JTopo.Node) {
            $('#node-name').html(event.target.text)
            $('#current-time').html(new Date().toLocaleString())
            $('.link-tooltip').css('display', 'none')
            $('.node-tooltip').css({
                'display': 'block',
                'cursor': 'pointer'
            })
            // 进入某个连线
        } else if (event.target != null && event.target instanceof JTopo.Link && event.target.linkTooltip && editor.stageMode !== 'edit') {
            $('.link-tooltip span').html(event.target.linkTooltip)
            // 记录鼠标触发位置在canvas中的相对位置
            let menuY = event.layerY ? event.layerY : event.offsetY
            let menuX = event.layerX ? event.layerX : event.offsetX
            // 判断边界出是否能完整显示弹出菜单
            if (menuX + $('.link-tooltip').width() >= self.stage.width) {
                menuX -= $('.link-tooltip').width()
            }
            if (menuY + $('.link-tooltip').height() >= self.stage.height) {
                menuY -= $('.link-tooltip').height()
            }
            $('.node-tooltip').css('display', 'none')
            $('.link-tooltip').css({
                'display': 'block',
                'margin-top': menuY,
                'margin-left': menuX,
                'cursor': 'pointer'
            })
        } else {
            $('#node-name').html('（鼠标悬浮节点查看）')
            $('#current-time').html('（鼠标悬浮节点查看）')
            // 鼠标进入别的地方
        }
    })
    // 鼠标离开事件
    this.scene.mouseout(function (event) {
        let timeSpan = Timer.pause()
        // 消抖
        if (timeSpan > 100) {
            $('#node-name').html('（鼠标悬浮节点查看）')
            $('#current-time').html('（鼠标悬浮节点查看）')
            $('.node-tooltip').css('display', 'none')
            $('.link-tooltip').css('display', 'none')
            Timer.stop()
        }
    })

    this.initMenus();
    return this.scene;
}
/**
 * 菜单初始化
 */
HMI2.prototype.initMenus = function () {
    let self = this;

    // 右键菜单事件处理(右键一级菜单)
    self.nodeMenu.on('click', function (event) {
        // 菜单文字对应事件
        let text = $.trim($(event.target).text())
        if (text === '删除节点(Delete)') {
            hmi.utils.deleteSelectedNodes()
        } else if (text === '复制节点(Shift+C)') {
            self.utils.cloneSelectedNodes()
        } else if (text === '撤销(Shift+Z)') {
            self.utils.cancleNodeAction()
        } else if (text === '重做(Shift+R)') {
            self.utils.reMakeNodeAction()
        } else {
            hmi.utils.saveNodeInitState()
        }
        switch (text) {
            case '放大(Shift+)':
                self.utils.scalingBig()
                self.utils.saveNodeNewState()
                break
            case '缩小(Shift-)':
                self.utils.scalingSmall()
                self.utils.saveNodeNewState()
                break
            case '顺时针旋转(Shift+U)':
                self.utils.rotateAdd()
                self.utils.saveNodeNewState()
                break
            case '逆时针旋转(Shift+I)':
                self.utils.rotateSub()
                self.utils.saveNodeNewState()
                break
            case '节点文字':
                return
            default :

        }
        // 关闭菜单
        $(this).hide()
    })

    self.nodeMenu.on('mouseover', function (event) {
        // 菜单文字
        let text = $.trim($(event.target).text())
        let menuX = parseInt(this.style.left) + $(document.getElementById('change-node-text-pos')).width()
        // 边界判断
        if (menuX + self.nodeTextPosMenu.width() * 2 >= self.stage.width) {
            menuX -= (self.nodeTextPosMenu.width() + self.nodeMenu.width())
        }
        if (text === '文字位置') {
            self.layoutMenu.hide()
            self.nodeTextPosMenu.css({
                top: parseInt(this.style.top) + $(document.getElementById('change-node-text-pos')).height(),
                left: menuX
            }).show()
        } else if (text === '应用布局') {
            self.nodeTextPosMenu.hide()
            self.layoutMenu.css({
                top: parseInt(this.style.top),
                left: menuX
            }).show()
        } else {
            self.layoutMenu.hide()
            self.nodeTextPosMenu.hide()
        }
    })


    // 修改节点文字位置菜单
    self.nodeTextPosMenu.on('click', function (event) {
        // 菜单文字
        let text = $.trim($(event.target).text())
        if (self.currentNode && self.currentNode instanceof JTopo.Node) {
            self.utils.saveNodeInitState()
            switch (text) {
                case '顶部居左':
                    self.currentNode.textPosition = 'Top_Left'
                    self.utils.saveNodeNewState()
                    break
                case '顶部居中':
                    self.currentNode.textPosition = 'Top_Center'
                    self.utils.saveNodeNewState()
                    break
                case '顶部居右':
                    self.currentNode.textPosition = 'Top_Right'
                    self.utils.saveNodeNewState()
                    break
                case '中间居左':
                    self.currentNode.textPosition = 'Middle_Left'
                    self.utils.saveNodeNewState()
                    break
                case '居中':
                    self.currentNode.textPosition = 'Middle_Center'
                    self.utils.saveNodeNewState()
                    break
                case '中间居右':
                    self.currentNode.textPosition = 'Middle_Right'
                    self.utils.saveNodeNewState()
                    break
                case '底部居左':
                    self.currentNode.textPosition = 'Bottom_Left'
                    self.utils.saveNodeNewState()
                    break
                case '底部居中':
                    self.currentNode.textPosition = 'Bottom_Center'
                    self.utils.saveNodeNewState()
                    break
                case '底部居右':
                    self.currentNode.textPosition = 'Bottom_Right'
                    self.utils.saveNodeNewState()
                    break
                default :
            }
            $('div[id$=\'-menu\']').hide()
        }
    })
    // 连线菜单
    self.lineMenu.on('click', function (event) {
        // 关闭菜单
        $(this).hide()
        let text = $.trim($(event.target).text())
        switch (text) {
            case '连线设置':
                // alert('连线设置')
                break
            case '删除连线':
                hmi.utils.deleteLine()
                break
            default :
        }
    })

    // 系统设置菜单
    self.mainMenu.on('click', function (event) {
        // 关闭菜单
        $(this).hide()
    })

    // 节点分组菜单
    self.groupMangeMenu.on('click', function (event) {
        $(this).hide()
        let text = $.trim($(event.target).text())
        if (text === '新建分组') {
            self.utils.toMerge()
        }
    })
    // 对齐
    self.groupAlignMenu.on('click', function (event) {
        let currNode = self.currentNode
        let selectedNodes = self.utils.getSelectedNodes()
        if (!currNode || !selectedNodes || selectedNodes.length === 0) return
        $(this).hide()
        let text = $.trim($(event.target).text())
        selectedNodes.forEach(function (n) {
            if (n.nodeId === currNode.nodeId) return true
            if (text === '水平对齐') {
                n.y = currNode.y
            } else if (text === '垂直对齐') {
                n.x = currNode.x
            } else {

            }
        })
    })
    self.groupMangeMenu.on('mouseover', function (event) {
        let text = $.trim($(event.target).text())
        if (text === '对齐方式') {
            // 节点对齐
            let menuX = parseInt(this.style.left) + $(document.getElementById('align-group')).width()
            if (menuX + self.alignGroup.width() * 2 >= self.stage.width) {
                menuX -= (self.alignGroup.width() + self.groupMangeMenu.width())
            }
            self.groupAlignMenu.css({
                top: parseInt(this.style.top) + $(document.getElementById('align-group')).height(),
                left: menuX
            }).show()
        } else {
            self.groupAlignMenu.hide()
        }
    })
    // 容器管理菜单
    self.containerMangeMenu.on('click', function (event) {
        let cNode = hmi.currentNode
        if (!(cNode instanceof JTopo.Container)) {
            return
        }
        $(this).hide()
        let text = $.trim($(event.target).text())
        if (text === '拆分') {
            self.utils.toSplit()
            self.utils.deleteNode(cNode)
        }
    })

    // 容器管理菜单
    self.layoutMenu.on('click', function (event) {
        hmi.currentNode.layout = {}
        $('div[id$=\'-menu\']').hide()
        let text = $.trim($(event.target).text())
        if (text === '取消布局') {
            hmi.currentNode.layout.on = false
        } else if (text === '分组布局') {
            hmi.currentNode.layout.on = true
            hmi.currentNode.layout.type = 'auto'
        } else if (text === '树形布局') {
            hmi.currentNode.layout.on = true
            hmi.currentNode.layout.type = 'tree'
            hmi.currentNode.layout.direction = 'bottom'
            hmi.currentNode.layout.width = 80
            hmi.currentNode.layout.height = 100
            JTopo.layout.layoutNode(self.scene, self.currentNode, true)
        } else if (text === '圆形布局') {
            hmi.currentNode.layout.on = true
            hmi.currentNode.layout.type = 'circle'
            hmi.currentNode.layout.radius = 200
            JTopo.layout.layoutNode(self.scene, self.currentNode, true)
        }
    })
}

//从json加载文件
HMI2.prototype.createStageFromJson= function (jsonStr, canvas) {
    var jsonObj = eval("(" + jsonStr + ")");
    var stage = new JTopo.Stage(canvas);
    for (var k in jsonObj) "childs" != k && (stage[k] = jsonObj[k]);
    var scenes = jsonObj.childs;
    let self=this;
    scenes.forEach(function (jsonScene) {
        scene = new JTopo.Scene(stage);
        for (var c in jsonScene)
            "childs" != c && (scene[c] = jsonScene[c]), "background" == c && (scene.background = jsonScene[c]);
        if (jsonScene.childs) {

            //添加Node
            var mapNode = new Map();
            jsonScene.childs.forEach(function (ele) {

                if ("link" == ele.elementType) return;

                var c = JTopo.Factory.createElementFromJson(ele,mapNode,self);
                scene.add(c);
            });
            //--添加link------------------------------
            jsonScene.childs.forEach(function (ele) {

                if ("link" == ele.elementType) {
                    var c = JTopo.Factory.createElementFromJson(ele,mapNode,self);
                    scene.add(c);
                }
            });
        }
    });
    return stage
}

HMI2.prototype.saveDataSource=function(){
    this.currentNode.data_source = $("#txt_dataSource").val();
    return "保存成功";
}

//保存拓扑信息
HMI2.prototype.saveTopology=function () {
    var jsonStr = this.stage.toJson();

    //此处有严重错误，不是存为文本，而是保存为json格式文件。2019.9.15
    //var blob = new Blob([jsonStr], {type: "text/plain;charset=utf-8"});
    //saveAs(blob, "dataRouteTable.json");

    var blob = new Blob([JSON.stringify(jsonStr)], { type: "" });
    saveAs(blob, "topology.json");

    url=rootPath+"data/";
     $.ajax({
         type: 'POST',
         url: url,
         async: false,
         data: JSON.stringify({'topology_json': jsonStr}),
         contentType: 'application/json',
         dataType: 'json',
         error: function () {
             // alert('服务器异常，请稍后重试..')
         },
         success: function (response) {
             // 错误处理
             if (response.code !== 200) {
                 console.error(response.msg)
             } else {

             }
         }
     })

    function showmsg(msg, s) {
        $("#msg").css("display", "block");
        $("#msgTextArea").text(msg);
        if(s != 0)
            setTimeout(function() {
                $("#msg").css("display", "none");
            }, s * 1000)
    }
    showmsg(jsonStr, 0);


    return jsonStr;
}

//保存Group图元信息
HMI2.prototype.saveGroupEle=function (groupName) {
    childs=this.scene.childs;
    GenerateGroup=new JTopo.GenerateGroup("group",childs);
    jsonStr= GenerateGroup.saveAsEle();""
    blob = new Blob([jsonStr], {type: "text/plain;charset=utf-8"});
    saveAs(blob, groupName + ".json");
    return jsonStr;
}

/**
 * 图元拖放功能实现
 * @param modeDiv 备选列表中的元素(各种样式的节点)
 * @param drawArea 舞台区域
 */
HMI2.prototype.drag = function (modeDiv, drawArea, text) {
    if (!text) text = ''
    let self = this
    // 拖拽开始,携带必要的参数
    modeDiv.ondragstart = function (event) {
        event = event || window.event
        let dragSrc = this
        let backImg = $(dragSrc).find('img').eq(0).attr('src')
        backImg = backImg.substring(backImg.lastIndexOf('/') + 1)
        let nodeType = $(this).attr('topo-nodetype')
        try {
            // IE只允许KEY为text和URL
            event.dataTransfer.setData('text', backImg + ';' + text + ';' + nodeType)
        } catch (ex) {
            console.log(ex)
        }
    }
    // 阻止默认事件
    drawArea.ondragover = function (event) {
        event.preventDefault()
        return false
    }
    // 创建节点
    drawArea.ondrop = function (event) {
        event = event || window.event
        let data = event.dataTransfer.getData('text')
        let img, text, nodeType
        if (data) {


            let datas = data.split(';')
            if (datas && datas.length === 3) {
                img = datas[0]
                text = datas[1]
                nodeType = datas[2]

                let node = JTopo.Factory.createNode(topoImgPath + img,null,nodeType,self);
                node.text = text;
                node.font =self.config.nodeFont;
                node.fontColor = self.config.nodeFontColor
                // 节点坐标
                node.setBound((event.layerX ? event.layerX : event.offsetX) - self.scene.translateX - self.config.nodeDefaultWidth / 2, (event.layerY ? event.layerY : event.offsetY) - self.scene.translateY - self.config.nodeDefaultHeight / 2, self.config.nodeDefaultWidth, self.config.nodeDefaultHeight)

                node.nodeType = nodeType

                self.scene.add(node)
                self.currentNode = node
            }
        }
    }
}
/**
 * 加载指定id的拓扑图JSON数据结构
 * @param topologyGuid 拓扑 表记录ID
 * @param backImg 拓扑图的背景图片
 */
HMI2.prototype.loadTopology = function (url, canvas,textField) {
    let self=this;
    $.ajax({
        type: 'get',
        url: url,
        async: false,

        error: function () {
             alert('服务器异常，请稍后重试..'+url)
        },
        success: function (response) {

            if ($.isEmptyObject(response)) {
                // 拓扑不存在,创建一个空白的拓扑图
                let initTopologyJson = {
                    'version': '0.4.8',
                    'wheelZoom': 0.95,
                    'width': 972,
                    'height': 569,
                    'id': 'ST172.19.105.52015100809430700001',
                    'childs': [
                        {
                            'elementType': 'scene',
                            'id': 'S172.19.105.52015100809430700002',
                            'translateX': -121.82,
                            'translateY': 306.72,
                            'scaleX': 1.26,
                            'scaleY': 1.26,
                            'childs': []
                        }
                    ]
                }
                self.initScene(canvas,textField,initTopologyJson);
            } else {
                // 拓扑存在,渲染拓扑图
                let topologyJson = response;
                self.initScene(canvas,textField,topologyJson);
            }
        }
    })
}
var hmi=new HMI2();
var editor=hmi;
// 工具方法
hmi.utils = {
    // 获取所有分组
    getAllContainers: function () {
        return hmi.stage.find('container')
    },
    // 获取所有节点
    getAllNodes: function () {
        return hmi.stage.find('node')
    },
    // 获取所有连线
    getAllLinks: function () {
        return hmi.stage.find('link')
    },
    // 获取所有选择的节点实例
    getSelectedNodes: function () {
        let selectedNodes = []
        let nodes = hmi.scene.selectedElements
        nodes.forEach(function (n) {
            if (n.elementType === 'node') {
                selectedNodes.push(n)
            }
        })
        return selectedNodes
    },
    // 节点分组合并
    toMerge: function () {
        let selectedNodes = this.getSelectedNodes()
        // 不指定布局的时候,容器的布局为自动(容器边界随元素变化）
        let container = new JTopo.Container()
        container.textPosition = 'Top_Center'
        container.fontColor = hmi.config.nodeFontColor
        container.borderColor = hmi.config.nodeBorderColor
        container.borderRadius = hmi.config.nodeBorderRadius
        hmi.scene.add(container)
        selectedNodes.forEach(function (n) {
            container.add(n)
        })
    },
    // 分组拆除
    toSplit: function () {
        if (hmi.currentNode instanceof JTopo.Container) {
            hmi.currentNode.removeAll()
            hmi.scene.remove(hmi.currentNode)
        }
    },
    // 删除连线
    deleteLine: function () {
        if (hmi.currentLink instanceof JTopo.Link) {
            hmi.scene.remove(hmi.currentNode)
            // if (hmi.currentNode.id)
            //     hmi.deleteNodeById(hmi.currentNode.id, "link");
            hmi.currentLink = null
            hmi.lineMenu.hide()
        }
    },
    // 删除节点
    deleteNode: function (n) {
        hmi.scene.remove(n)
        // if (n.id)
        //     hmi.deleteNodeById(n.id, n.elementType, n.dataType);
        hmi.currentNode = null
        // 连线重置
        hmi.beginNode = null
        if (hmi.link) {
            hmi.scene.remove(hmi.link)
        }
        hmi.link = null
    },
    // 删除选择的节点
    deleteSelectedNodes: function () {
        if (hmi.stageMode !== 'edit') {
            return false
        }
        let self = this
        let nodes = hmi.scene.selectedElements
        if (nodes && nodes.length > 0) {
            for (let i = 0; i < nodes.length; i++) {
                self.deleteNode(nodes[i])
            }
        }
    },
    // 放大
    scalingBig: function () {
        if (hmi.currentNode instanceof JTopo.Node) {
            hmi.currentNode.scaleX += hmi.config.nodeScale
            hmi.currentNode.scaleY += hmi.config.nodeScale
        } else {
            hmi.stage.zoomOut(hmi.stage.wheelZoom)
        }
    },
    // 缩小
    scalingSmall: function () {
        if (hmi.currentNode instanceof JTopo.Node) {
            hmi.currentNode.scaleX -= hmi.config.nodeScale
            hmi.currentNode.scaleY -= hmi.config.nodeScale
        } else {
            hmi.stage.zoomIn(hmi.stage.wheelZoom)
        }
    },
    // 顺时针旋转
    rotateAdd: function () {
        if (hmi.currentNode instanceof JTopo.Node) {
            hmi.currentNode.rotate += hmi.config.nodeRotateValue
        }
    },
    // 逆时针旋转
    rotateSub: function () {
        if (hmi.currentNode instanceof JTopo.Node) {
            hmi.currentNode.rotate -= hmi.config.nodeRotateValue
        }
    },
    // 清空编辑器
    horizontalclearTopology: function () {
        // 删除节点表对应的节点记录
        hmi.deleteAllNodes()
    },
    // 拓扑图预览
    showPic: function () {
        hmi.stage.saveImageInfo()
    },
    exportAsImage: function () {
        hmi.stage.exportAsImage()
    },
    setEditMode: function () {
        hmi.stageMode = 'edit'
    },
    setNormalMode: function () {
        hmi.stageMode = 'normal'
    },
    // 复制节点
    cloneNode: function (n) {
        if (n instanceof JTopo.Node) {
            let newNode = new JTopo.Node()
            n.serializedProperties.forEach(function (i) {
                // 只复制虚拟机的模板属性
                // if (i == "templateId" && n.dataType != "VM") return true;
                newNode[i] = n[i]
            })
            newNode.nodeId = generateUUID()
            newNode.alpha = hmi.config.nodeAlpha
            newNode.strokeColor = hmi.config.nodeStrokeColor
            newNode.fillColor = hmi.config.nodeFillColor
            newNode.shadow = hmi.config.nodeShadow
            newNode.shadowColor = hmi.config.nodeShadowColor
            newNode.font = hmi.config.nodeFont
            newNode.fontColor = hmi.config.nodeFontColor
            newNode.borderRadius = null
            newNode.layout = n.layout
            newNode.selected = false
            // var deviceNum = ++hmi.modeIdIndex;
            // newNode.deviceId = "device" + deviceNum;
            newNode.setLocation(n.x + n.width, n.y + n.height)
            newNode.text = n.text
            newNode.setImage(n.image)
            hmi.scene.add(newNode)
        }
    },
    // 复制选择的节点
    cloneSelectedNodes: function () {
        let self = this
        let nodes = hmi.scene.selectedElements
        nodes.forEach(function (n) {
            if (n.elementType === 'node') {
                self.cloneNode(n)
            }
        })
    },
    // 全屏显示
    showInFullScreen: function (element, method) {
        let usablePrefixMethod;
        ['webkit', 'moz', 'ms', 'o', ''].forEach(function (prefix) {
                if (usablePrefixMethod) {
                    return
                }
                if (prefix === '') {
                    // 无前缀，方法首字母小写
                    // method = method.slice(0, 1).toLowerCase() + method.slice(1)
                }
                let typePrefixMethod = typeof element[prefix + method]
                if (typePrefixMethod + '' !== 'undefined') {
                    if (typePrefixMethod === 'function') {
                        usablePrefixMethod = element[prefix + method]()
                    } else {
                        usablePrefixMethod = element[prefix + method]
                    }
                }
            }
        )
        return usablePrefixMethod
    },
    // 居中显示
    showInCenter: function () {
        hmi.stage.centerAndZoom()
    },
    // 获取所有的容器对象
    getContainers: function () {
        let containers = []
        hmi.stage.childs.forEach(function (s) {
            s.childs.forEach(function (n) {
                if (n.elementType === 'container') {
                    containers.push(n)
                }
            })
        })
        return containers
    },
    // 根据指定的key返回节点实例
    getNodeByKey: function (key, value) {
        let node = null
        hmi.stage.childs.forEach(function (s) {
            s.childs.forEach(function (n) {
                if (n.elementType === 'node' && n[key] === value) {
                    node = n
                    return node
                }
            })
        })
        return node
    },
    // 撤销对节点的操作
    cancleNodeAction: function () {
        if (hmi.currentNode.currStep <= 0) {
            return
        }
        --hmi.currentNode.currStep
        for (let p in hmi.currentNode) {
            if (p !== 'currStep') {
                hmi.currentNode[p] = (hmi.currentNode.historyStack[hmi.currentNode.currStep])[p]
            }
        }
    },
    // 重做节点操作
    reMakeNodeAction: function () {
        if (hmi.currentNode.currStep >= hmi.currentNode.maxHistoryStep ||
            hmi.currentNode.currStep >= hmi.currentNode.historyStack.length - 1) {
            return
        }
        hmi.currentNode.currStep++
        for (let q in hmi.currentNode) {
            if (q !== 'currStep') {
                hmi.currentNode[q] = (hmi.currentNode.historyStack[hmi.currentNode.currStep])[q]
            }
        }
    },
    // 保存节点新的状态
    saveNodeNewState: function () {
        return;
        // 如果历史栈超过最大可记录历史长度，丢弃第一个元素
        if (hmi.currentNode.historyStack.length >= hmi.currentNode.maxHistoryStep + 1) {
            hmi.currentNode.historyStack.shift()
        }
        hmi.currentNode.historyStack.push(JTopo.util.clone(hmi.currentNode))
        hmi.currentNode.currStep = hmi.currentNode.historyStack.length - 1
    },
    // 保存节点初始状态,便于回退
    saveNodeInitState: function () {
        return;
        if (!hmi.currentNode.hasInitStateSaved) {
            hmi.currentNode.historyStack.push(JTopo.util.clone(hmi.currentNode))
            hmi.currentNode.hasInitStateSaved = true
        }
    },
    // 查找节点,便居中闪动显示
    findNodeAndFlash: function (text) {
        if (!text) return
        // var self = this
        text = text.trim()
        let nodes = hmi.stage.find('node[text="' + text + '"]')
        if (nodes.length > 0) {
            let node = nodes[0]
            this.unSelectAllNodeExcept(node)
            node.selected = true
            let location = node.getCenterLocation()
            // 查询到的节点居中显示
            hmi.stage.setCenter(location.x, location.y)

            function nodeFlash(node, n) {
                if (n === 0) {
                    hmi.utils.unSelectAllNodeExcept(node)
                    return
                }
                node.selected = !node.selected
                setTimeout(function () {
                    nodeFlash(node, n - 1)
                }, 300)
            }

            // 闪烁几下
            nodeFlash(node, 10)
        } else {
            // alert('没有找到该节点,请输入完整的节点名称!')
        }
    },
    // 取消出参数节点外所有节点的选中状态
    unSelectAllNodeExcept: function (node) {
        hmi.stage.childs.forEach(function (s) {
            s.childs.forEach(function (n) {
                // id属性无有效值，说明该节点没有保存到数据库
                if (n.nodeId !== node.nodeId) {
                    n.selected = false
                }
            })
        })
    }
}








   
