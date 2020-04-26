//画布大小设置
var canvas = document.getElementById("topology-canvas");
canvas.width = document.documentElement.clientWidth - document.getElementById("sidebar").clientWidth;
canvas.height = document.documentElement.clientHeight - document.getElementById("topbar").clientHeight;

window.addEventListener('resize', function () {
    canvas.width = document.documentElement.clientWidth - document.getElementById("sidebar").clientWidth;
    canvas.height = document.documentElement.clientHeight - document.getElementById("topbar").clientHeight;
})
//结构体
//var 
//全局变量
var link_kind = {
    sleep: 0,
    link: 1,
    linkBack: 2,
    LinkBackTwice: 3,
}
var node_kind = {
    node: 1,
    circle: 2,
    text: 3,
}
var current_link_state = link_kind.sleep;
var current_node = null;

//单代号、双代号:0\1
var key_odd_even = 0;

//edit
var beginNode, link_line, tempNodeA, tempNodeZ;

//数字类型全局变量
var count_current_scene = 0;
var show_node_index_next = 1;
//设置舞台，总共只有一个舞台，每次清空的是scene
var stage = new JTopo.Stage(canvas);
var scene = new JTopo.Scene(stage);

//init设置全局变量的初始值
function initScene() {
    current_link_state = link_kind.sleep;
    choosen("link-none");

    scene.background = './img/grey_bg.jpg';

    beginNode = null;
    tempNodeA = new JTopo.Node('tempA');
    tempNodeA.setSize(1, 1);
    tempNodeZ = new JTopo.Node('tempZ');
    tempNodeZ.setSize(1, 1);

    link_line = new JTopo.Link(tempNodeA, tempNodeZ);
}
initScene();

scene.mouseup(function (e) {
    //右键
    if (e.button === 2) {
        scene.remove(link_line);
        beginNode = null;         
        if (current_link_state == link_kind.sleep) {
            
        } else if (current_link_state == link_kind.link) {
            
        } else if (current_link_state == link_kind.linkBack) {
            
        } else if (current_link_state == link_kind.LinkBackTwice) {
            
        }
    }
    //左键
    if (e.button === 0) {
        if (current_link_state == link_kind.sleep) {
            
        } else if (current_link_state == link_kind.link) {
            if (e.target && e.target instanceof JTopo.Node) {
                if (!beginNode) {
                    beginNode = e.target;
                    scene.add(link_line);
                    tempNodeA.setLocation(e.x, e.y);
                    tempNodeZ.setLocation(e.x, e.y);
                    console.log("选中起点");
                } else if (beginNode !== e.target) {
                    let endNode = e.target;
                    newLink(beginNode, e.target, 3, "Arrow");
                    console.log("创建箭头成功");
                    beginNode = null;
                    scene.remove(link_line);
                } else {
                    beginNode = null;
                }
            } else {
                scene.remove(link_line);   
            }
        } else if (current_link_state == link_kind.linkBack) {
            if (e.target && e.target instanceof JTopo.Node) {
                if (!beginNode) {
                    beginNode = e.target;
                    scene.add(link_line);
                    tempNodeA.setLocation(e.x, e.y);
                    tempNodeZ.setLocation(e.x, e.y);
                    console.log("选中起点");
                } else if (beginNode !== e.target) {
                    let endNode = e.target;
                    newFoldLink(beginNode, e.target, 3, "Fold");
                    console.log("创建折线箭头成果");
                    beginNode = null;
                    scene.remove(link_line);
                } else {
                    beginNode = null;
                }
            } else {
                scene.remove(link_line);
            }
        } else if (current_link_state == link_kind.LinkBackTwice) {
            if (e.target && e.target instanceof JTopo.Node) {
                if (!beginNode) {
                    beginNode = e.target;
                    scene.add(link_line);
                    tempNodeA.setLocation(e.x, e.y);
                    tempNodeZ.setLocation(e.x, e.y);
                    console.log("选中起点");
                } else if (beginNode !== e.target) {
                    let endNode = e.target;
                    newFlexionalLink(beginNode, e.target, 3, "FlexionalLink");
                    console.log("创建双折线箭头成功");
                    beginNode = null;
                    scene.remove(link_line);
                } else {
                    beginNode = null;
                }
            } else {
                scene.remove(link_line);   
            }
        }
    }
})
scene.mousedown(function (e) {
    
    //左键
    if (e.button === 0) {
        if (current_link_state == link_kind.sleep) {
            
        } else if (current_link_state == link_kind.link) {
            if (!e.target || e.target === beginNode || e.target === link_line) {
                scene.remove(link_line);
                beginNode = null;
            }
        } else if (current_link_state == link_kind.linkBack) {
            if (!e.target || e.target === beginNode || e.target === link_line) {
                scene.remove(link_line);
                beginNode = null;
            }
        } else if (current_link_state == link_kind.LinkBackTwice) {
            if (!e.target || e.target === beginNode || e.target === link_line) {
                scene.remove(link_line);
                beginNode = null;
            }
        }
    }
    current_node = e.target;
})
scene.mousemove(function (e) {
    if (current_link_state == link_kind.sleep) {
        
    } else if (current_link_state == link_kind.link) {
        tempNodeZ.setLocation(e.x, e.y);
    } else if (current_link_state == link_kind.linkBack) {
        tempNodeZ.setLocation(e.x, e.y);
    } else if (current_link_state == link_kind.LinkBackTwice) {
        tempNodeZ.setLocation(e.x, e.y);
    }
})

//topbar全局函数
//保存数据 - 画布的Json文件 & 网络的excel文件
function SaveData() {
    console.log(stage.find('node').length);
    console.log(stage.find('link').length);

    saveJson(json_str.ToString());
}
//相当于初始化，一切从头重来
function UpdateCanvas() {
    scene.clear();
    initScene();
}
function EditData() {
    UpdateCanvas();
    loadJson();
}
function Excel() {
    UpdateCanvas();
    loadExcel();
}

//sidebar全局函数
//line
function choosen(choose_id) {
    document.getElementById("link-none").style.opacity = "0.5";
    document.getElementById("link-line").style.opacity = "0.5";
    document.getElementById("link-foldline-h").style.opacity = "0.5";
    document.getElementById("link-flexline-h").style.opacity = "0.5";
    document.getElementById("node-add").style.opacity = "0.5";
    document.getElementById("circle-node-add").style.opacity = "0.5";
    //document.getElementById("text-node-add").style.opacity = "0.5";
    document.getElementById(choose_id).style.opacity = "1";
}
// link
function newLink(nodeA, nodeZ, linewidth, text, dashedPattern) {
    const link = new JTopo.Link(nodeA, nodeZ, text);

    link.lineWidth = linewidth;
    link.dashedPattern = dashedPattern;
    link.bundleOffset = 60;
    link.bundleGap = 20;
    link.textOffsetY = 3;
    link.strokeColor = '25,250,100';
    link.arrowsRadius = 20;
    link.layout = { type: 'link' ,task:text, start: '', stop: '', during: '' };

    scene.add(link);

    return link;
}
// foldLink
function newFoldLink(nodeA, nodeZ, linewidth, text, direction, dashedPattern) {
    const link = new JTopo.FoldLink(nodeA, nodeZ, text);

    link.direction = direction || 'horizontal';
    link.arrowsRadius = 20;
    link.lineWidth = linewidth;
    link.bundleGap = 20;
    link.bundleOffset = 60;
    link.textOffsetY = 3;
    link.strokeColor = '25,250,100';
    link.dashedPattern = dashedPattern;
    link.layout = { type: 'fold' ,task:text, start: '', stop: '', during: '' };

    scene.add(link);

    return link;
}
function newFlexionalLink(nodeA, nodeZ, linewidth, text, direction, dashedPattern) {
    const link = new JTopo.FlexionalLink(nodeA, nodeZ, text);

    link.direction = direction || 'horizontal';
    link.arrowsRadius = 20;
    link.lineWidth = linewidth;
    link.offsetGap = 35;
    link.bundleGap = 15;
    link.textOffsetY = 10;
    link.strokeColor = '25,250,100';
    link.dashedPattern = dashedPattern;
    link.layout = { type: 'flexional' ,task:text, start: '', stop: '', during: '' };

    scene.add(link);

    return link;
}

//取消画线
function sleep() {
    current_link_state = link_kind.sleep;
    beginNode = null;
    choosen("link-none");
    scene.mode = "select";
}
//箭头
function linkLine() {
    current_link_state = link_kind.link;
    beginNode = null;
    choosen("link-line");
    scene.mode = "normal";
}
//折线
function linkBack() {
    current_link_state = link_kind.linkBack;
    beginNode = null;
    choosen("link-foldline-h");
    scene.mode = "normal";
}
//两次折线
function LinkBackTwice() {
    current_link_state = link_kind.LinkBackTwice;
    beginNode = null;
    choosen("link-flexline-h");
    scene.mode = "normal";
}
//node
function newNode(x, y, w, h, kind) {
    if (kind == node_kind.node) {
        var node = new JTopo.Node(show_node_index_next);
        node.setLocation(x, y);
        if (w || h) node.setSize(w, h);
        node.fillColor = '0,255,255';
        node.layout = { type: 'node', task: show_node_index_next, start: '', stop: '', during: '' };
        scene.add(node);

        count_current_scene += 1;
        show_node_index_next += 1;
        return node;
    } else if (kind == node_kind.circle) {
        var node = new JTopo.CircleNode(show_node_index_next);
        node.setLocation(x, y);
        if (w || h) node.radius = w/2;
        node.fillColor = '0,0,255';
        node.alpha = 0.7;
        node.layout = { type: 'circle' ,task: show_node_index_next, start: '', stop: '', during: '' };
        scene.add(node);

        count_current_scene += 1;
        show_node_index_next += 1;
        return node;
    } else if (kind == node_kind.text) {
        
    }
}
//添加矩形结点
function addNode() {
    current_link_state = link_kind.sleep;
    choosen("node-add");
    newNode(canvas.width / 2, canvas.height / 2, 50, 50, node_kind.node);
}
//添加圆形结点
function addCircleNode() {
    current_link_state = link_kind.sleep;
    choosen("circle-node-add");
    newNode(canvas.width / 2, canvas.height / 2, 50, 50, node_kind.circle);
}
//添加文字结点
function addTextNode() {
    current_link_state = link_kind.sleep;
    choosen("text-node-add");
}

//属性面板
//手动修改位置有问题，应该废弃掉
function set_node_position() {
    var x = document.getElementById("node-position-x")
    var y = document.getElementById("node-position-y")
    console.log(x.value + "," + y.value + "set:" + current_node.text);
    if (x || y) {
        
    current_node.setLocation(x.value, y.value);
    }
}
function set_node_size() {
    var w = document.getElementById("node-size-w").value;
    var h = document.getElementById("node-size-h").value;
    console.log(w + "," + h + "set:" + current_node.text);
    if (w || h) {
        current_node.scaleX = w;
        current_node.scaleY = h;
    }
}
function set_arrow_lineWidth() {
    var line_width = document.getElementById("arrow-width");
    current_node.lineWidth = line_width.value;
}
function set_color() {
    var color = document.getElementById("node-change-color").value;
    current_node.fillColor = color;
    current_node.strokeColor = color;
}
function set_arrow_side() {
    var nodeB = current_node.nodeA;
    current_node.nodeA = current_node.nodeZ;
    current_node.nodeZ = nodeB;
}
function set_node_arrow_text() {
    current_node.layout["task"] = document.getElementById("node-arrow-text").value;
    update_node_link(current_node, current_node);
}
function set_task_during() {
    //current_node.layout["start"] = 
    //current_node.layout["stop"] = 
}


//模式切换
//单代号
function set_odd_net() {
    
}

//双代号
function set_even_net() {
    
}
