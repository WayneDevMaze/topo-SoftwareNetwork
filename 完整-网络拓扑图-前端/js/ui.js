function checkValue(obj,tipText){
    $(obj).focus(function(){
        if( obj.text()== tipText ){
            obj.text("");
        }
    });
    $(obj).blur(function(){
        if( obj.text()=="" ){
            obj.text(tipText);
        }
    });
    if( $.trim( obj.text() )=="" ){
        obj.text(tipText);
    }
}
checkValue($(".options-input"),'');

//返回的是结点
function find_node(taskName) {
    var _nodes = stage.find('node');
    for (let i = 0; i < _nodes.length; i++) {
        const element = _nodes[i];
        if (element.layout["task"] == taskName) {
            return element;
        }
    }
    console.log("not found this node");
    return null;
}
//刷新页面的展示
function update_node_link(node,link) {
    if (node) {
        node.text = node.layout["task"];
    }
    if (link) {
        link.text = link.layout["task"];
    }
}
//json data
function _Node_DATA() {
    this.taskName = "";
    this.taskStartTime = -1;
    this.taskStopTime = -1;
    this.taskDuringTime = 0;

    this.color = '25,255,50';
    this.width = 1;
    this.height = 1;
    this.x = 0;
    this.y = 0;

    this.type = "node";

    this.ToJson = function () {
        var json_str = '{';
        json_str += '"positionX":"' + this.x + '",';
        json_str += '"positionY":"' + this.y + '",';
        json_str += '"width":"' + this.width + '",';
        json_str += '"height":"' + this.height + '",';
        json_str += '"color":"' + this.color + '",';
        json_str += '"taskName":"' + this.taskName + '",';
        json_str += '"taskStart":"' + this.taskStartTime + '",';
        json_str += '"taskStop":"' + this.taskStopTime + '",';
        json_str += '"taskDuring":"' + this.taskDuringTime + '",';
        json_str += '"type":"' + this.type + '"';
        json_str += '}';
        return json_str;
    }
}
function _LINK_DATA() {
    this.taskName = "";
    this.taskStartTime = -1;
    this.taskStopTime = -1;
    this.taskDuringTime = 0;

    this.color = '25,255,50';
    this.fromNode = "";
    this.toNode = "";

    this.linkWidth = 3;
    this.type = "link";

    this.ToJson = function(){
        var json_str = '{';
        json_str += '"from":"' + this.fromNode + '",';
        json_str += '"to":"' + this.toNode + '",';
        json_str += '"width":"' + this.linkWidth + '",';
        json_str += '"color":"' + this.color + '",';
        json_str += '"taskName":"' + this.taskName + '",';
        json_str += '"taskStart":"' + this.taskStartTime + '",';
        json_str += '"taskStop":"' + this.taskStopTime + '",';
        json_str += '"taskDuring":"' + this.taskDuringTime + '",';
        json_str += '"type":"' + this.type + '"';
        json_str += '}';
        return json_str;
    }
}
function _JSON_DATA() {
    this.nodes = new Array();
    this.links = new Array();
    this.addNode = function () {
        var _nodes = stage.find('node');
        for (let i = 0; i < _nodes.length; i++) {
            const element = _nodes[i];
            var node = new _Node_DATA();
            node.taskName = element.layout["task"];
            node.taskStartTime = element.layout["start"];
            node.taskStopTime = element.layout["stop"];
            node.taskDuringTime = element.layout["during"];
        
            node.color = element.fillColor;
            node.width = element.width;
            node.height = element.height;
            node.x = element.x;
            node.y = element.y;
        
            node.type = element.layout["type"];
            this.nodes[i] = node;
        }
    }
    this.addLink = function () {
        var _links = stage.find('link');
        for (let i = 0; i < _links.length; i++) {
            const element = _links[i];
            var link = new _LINK_DATA();
            link.taskName = element.layout["task"];
            link.taskStartTime = element.layout["start"];
            link.taskStopTime = element.layout["stop"];
            link.taskDuringTime = element.layout["during"];
            
            link.color = element.strokeColor;
            link.fromNode = element.nodeA.layout["task"];
            link.toNode = element.nodeZ.layout["task"];

            link.linkWidth = element.lineWidth;
            link.type = element.layout["type"];

            this.links[i] = link;
        }
    }
    this.ToString = function () {
        this.nodes = [];
        this.links = [];
        this.addNode();
        this.addLink();
        var json_str = '{"nodes":[';
        for (let i = 0; i < this.nodes.length; i++) {
            const element = this.nodes[i];
            json_str += element.ToJson();
            if (i != this.nodes.length - 1) json_str += ',';
        }
        json_str += '],"links":[';
        for (let i = 0; i < this.links.length; i++) {
            const element = this.links[i];
            json_str += element.ToJson();
            if (i != this.links.length - 1) json_str += ',';
        }
        json_str += ']}';
        return json_str;
    }
    this.LoadString = function (_json_str) {
        this.nodes = [];
        this.links = [];
        var json_data = JSON.parse(_json_str);
        var _nodes = json_data["nodes"];
        var _links = json_data["links"];
        for (let i = 0; i < _nodes.length; i++) {
            const element = _nodes[i];
            var nodeadd = null;
            if (element["type"] == 'node') {
                nodeadd = newNode(Number(element["positionX"]), Number(element["positionY"]), Number(element["width"]), Number(element["height"]), node_kind.node);
                nodeadd.fillColor = element["color"];
                nodeadd.layout = { type: element["type"], task: element["taskName"], start: element["taskStart"], stop: element["taskStop"], during: element["taskDuring"] };
                console.log("create:" + element["taskName"]);
            } else if (element["type"] == 'circle') {
                nodeadd = newNode(Number(element["positionX"]), Number(element["positionY"]), Number(element["width"]), Number(element["height"]), node_kind.circle);
                nodeadd.fillColor = element["color"];
                nodeadd.layout = { type: element["type"], task: element["taskName"], start: element["taskStart"], stop: element["taskStop"], during: element["taskDuring"] };
                console.log("create:"+element["taskName"]);
            }
            update_node_link(nodeadd);
        }
        for (let i = 0; i < _links.length; i++) {
            const element = _links[i];
            var linkadd = null;
            if (element["type"] == 'link') {
                linkadd = newLink(find_node(element["from"]), find_node(element["to"]), element["width"], element["taskName"]);
                linkadd.strokeColor = element["color"];
                linkadd.layout = { type: element["type"], task: element["taskName"], start: element["taskStart"], stop: element["taskStop"], during: element["taskDuring"] };
                console.log("create:"+element["taskName"]);
            } else if (element["type"] == 'fold') {
                linkadd = newFoldLink(find_node(element["from"]), find_node(element["to"]), element["width"], element["taskName"]);
                linkadd.strokeColor = element["color"];
                linkadd.layout = { type: element["type"], task: element["taskName"], start: element["taskStart"], stop: element["taskStop"], during: element["taskDuring"] };
                console.log("create:"+element["taskName"]);
            } else if (element["type"] == 'flexional') {
                linkadd = newFlexionalLink(find_node(element["from"]), find_node(element["to"]), element["width"], element["taskName"]);
                linkadd.strokeColor = element["color"];
                linkadd.layout = { type: element["type"], task: element["taskName"], start: element["taskStart"], stop: element["taskStop"], during: element["taskDuring"] };
                console.log("create:"+element["taskName"]);
            }
            update_node_link(linkadd);
        }
    }
    this.loadExcelJson = function (_json_str) {
        this.nodes = [];
        this.links = [];
        var json_data = JSON.parse(_json_str);
        const node_length = json_data["name"].length;
        for (let i = 0; i < node_length; i++) {
            const element = json_data["name"][i];
            var _node = newNode(50, 50, 50, 50, node_kind.node);
            _node.layout["task"] = element;
            update_node_link(_node);
        }
        for (let i = 0; i < node_length; i++) {
            const from_elements = json_data["from"][i];
            const current_element = json_data["name"][i];
            for (let j = 0; j < from_elements["name"].length; j++){
                const _from_node = from_elements["name"][j];
                if (find_node(_from_node)) {
                    if (j == 0) {
                        find_node(current_element).setLocation(find_node(_from_node).x + 200, find_node(_from_node).y);
                    } else {
                        find_node(_from_node).setLocation(find_node(_from_node).x, find_node(from_elements["name"][0]).y + 200);
                        find_node(current_element).setLocation(find_node(current_element).x, (find_node(from_elements["name"][0]).y+find_node(_from_node).y)/2);
                    }
                }
            }
            for (let j = 0; j < from_elements["name"].length; j++) {
                const _from_node = from_elements["name"][j];
                if (find_node(_from_node)) {
                    newLink(find_node(_from_node), find_node(current_element), 3, _from_node + '->' + current_element);
                }
            }
        }
    }
}
var json_str = new _JSON_DATA();

function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}

function download(name, data) {
    var urlObject = window.URL || window.webkitURL || window;

    var downloadData = new Blob([data]);

    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(downloadData);
    save_link.download = name;
    fake_click(save_link);
}
function saveJson(_json_str) {
    //将_json_str,内容保存到json文件中即可，下载功能
    console.log(_json_str);
    download("data_json_" + Date.parse(new Date()) + ".json", _json_str);
}
function loadJson() {
   //实现读取文件，让_json_str变成文件里的json字符串即可
}
layui.use('upload', function () {
    //upload&download

    var $ = layui.jquery
        , upload = layui.upload;

    var uploadInst = upload.render({
        elem: '#uploadJson' //绑定页面的<i>元素
        , url: 'http://localhost:8848/api/map/upload3/' //改成您自己的上传接口
        , accept: 'file' //不加这个默认只允许上传图片,加了这个才可以传文件
        , exts: 'json|xlsx' //允许上传的文件后缀
        // , before: function (obj) {
        //     //预读本地文件示例，不支持ie8
        //     obj.preview(function (index, file, result) {
        //         $('#demo1').attr('src', result); //图片链接（base64）
        //     });
        // }
        , done: function (res) {
            //如果上传失败
            if (res.status != true) {
                return layer.msg('上传失败');
            }
            //上传成功
            layer.msg('读取成功');
            json_str.LoadString(res.data);
        }
        , error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">读取失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });

    var uploadExcelfunc = upload.render({
        elem: '#uploadExcel' //绑定页面的<i>元素
        , url: 'http://localhost:8848/api/map/uploadExcel' //改成您自己的上传接口
        , accept: 'file' //不加这个默认只允许上传图片,加了这个才可以传文件
        , exts: 'xlsx' //允许上传的文件后缀
        // , before: function (obj) {
        //     //预读本地文件示例，不支持ie8
        //     obj.preview(function (index, file, result) {
        //         $('#demo1').attr('src', result); //图片链接（base64）
        //     });
        // }
        , done: function (res) {
            //如果上传失败
            if (res.status != true) {
                return layer.msg('上传失败');
            }
            //上传成功
            layer.msg('读取成功');
            console.log(res.data);
            json_str.loadExcelJson(res.data);
        }
        , error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">读取失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadExcelfunc.upload();
            });
        }
    });
});
function loadExcel() {
    //var _json_str = '{"name":["A","B","C","D"],"good":[],"normal":[],"bad":[],"from":[{"name":[]},{"name":["A"]},{"name":["A","B"]},{"name":["B","C","A"]}]}';
    //实现读取excel文件，让_json_str变成文件里的json字符串即可，上面是json串的测试
    
    //json_str.loadExcelJson(_json_str);
}





//
//json文件返回
//'{"nodes":[{"positionX":"394","positionY":"294.5","width":"50","height":"50","color":"0,255,255","taskName":"1","taskStart":"","taskStop":"","taskDuring":"","type":"node"},{"positionX":"195","positionY":"167.5","width":"50","height":"50","color":"0,0,255","taskName":"2","taskStart":"","taskStop":"","taskDuring":"","type":"circle"},{"positionX":"493","positionY":"130.5","width":"50","height":"50","color":"0,0,255","taskName":"3","taskStart":"","taskStop":"","taskDuring":"","type":"circle"},{"positionX":"99","positionY":"395.5","width":"50","height":"50","color":"0,255,255","taskName":"16","taskStart":"","taskStop":"","taskDuring":"","type":"node"},{"positionX":"586","positionY":"266.5","width":"50","height":"50","color":"0,0,255","taskName":"17","taskStart":"","taskStop":"","taskDuring":"","type":"circle"},{"positionX":"410","positionY":"423.5","width":"50","height":"50","color":"0,255,255","taskName":"上班地方 ","taskStart":"","taskStop":"","taskDuring":"","type":"node"}],"links":[{"from":"2","to":"1","width":"3","color":"25,250,100","taskName":"435吗","taskStart":"","taskStop":"","taskDuring":"","type":"link"}]}'
//excel返回
//'{"name":["A","B","C","D"],"good":[],"normal":[],"bad":[],"from":[{"name":[]},{"name":["A"]},{"name":["A","B"]},{"name":["B","C","A"]}]}'