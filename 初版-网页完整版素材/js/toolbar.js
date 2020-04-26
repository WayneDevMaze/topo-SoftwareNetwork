// 页面工具栏
function showJTopoToobar(stage) {
  const toobarDiv = $('<div class="jtopo_toolbar" style="position: fixed; left: 100px; margin: 0 auto; background: #131427; color: #fff;">')
    .html(''
    + '<input type="radio" name="modeRadio" value="normal" checked id="r1"/>'
    + '<label for="r1"> 默认</label>'
    + '&nbsp;<input type="radio" name="modeRadio" value="select" id="r2"/><label for="r2"> 框选</label>'
    + '&nbsp;<input type="radio" name="modeRadio" value="drag" id="r3"/><label for="r3"> 平移</label>'
    + '&nbsp;<input type="radio" name="modeRadio" value="edit" id="r4"/><label for="r4"> 编辑</label>'
    + '&nbsp;&nbsp;<input type="button" id="centerButton" value="居中显示"/>'
    + '<input type="button" id="fullScreenButton" value="全屏显示"/>'
    + '<input type="button" id="zoomOutButton" value=" 放 大 " />'
    + '<input type="button" id="zoomInButton" value=" 缩 小 " />'
    + '&nbsp;&nbsp;<input type="checkbox" id="zoomCheckbox"/><label for="zoomCheckbox">鼠标缩放</label>'
    + '&nbsp;&nbsp;<input type="text" id="findText" value="" onkeydown="findButton.click()">'
    + '<input type="button" id="findButton" value=" 查 询 ">'
    + '&nbsp;&nbsp;<input type="button" id="exportButton" value="导出PNG">')

  $('#content').prepend(toobarDiv)

  // 工具栏按钮处理
  $("input[name='modeRadio']").click(function () {
    stage.mode = $("input[name='modeRadio']:checked").val()
  })
  $('#centerButton').click(function () {
    stage.centerAndZoom()
  })
  $('#zoomOutButton').click(function () {
    stage.zoomOut()
  })
  $('#zoomInButton').click(function () {
    stage.zoomIn()
  })
  $('#exportButton').click(function () {
    stage.saveImageInfo()
  })
  $('#zoomCheckbox').click(function () {
    if ($('#zoomCheckbox').attr('checked')) {
      stage.wheelZoom = 0.85 // 设置鼠标缩放比例
    } else {
      stage.wheelZoom = null // 取消鼠标缩放比例
    }
  })
  $('#fullScreenButton').click(function () {
    runPrefixMethod(stage.canvas, "RequestFullScreen")
  })

  // 查询
  $('#findButton').click(function () {
    const text = $('#findText').val().trim()
    const nodes = stage.find('node[text="' + text + '"]')
    console.log('nodes',nodes)
    if (nodes.length > 0) {
      const node = nodes[0]
      node.selected = true
      const location = node.getCenterLocation()
      // 查询到的节点居中显示
      stage.setCenter(location.x, location.y)

      function nodeFlash(node, n) {
        if (n === 0) {
          node.selected = false
          return
        }

        node.selected = !node.selected
        setTimeout(function () {
          nodeFlash(node, n - 1)
        }, 300)
      }

      // 闪烁几下
      nodeFlash(node, 6)
    }
  })
}

const runPrefixMethod = function (element, method) {
  let usablePrefixMethod

  if (usablePrefixMethod) return

  const typePrefixMethod = typeof element['webkit' + method]

  if (typePrefixMethod + "" !== "undefined") {
    if (typePrefixMethod === "function") {
      usablePrefixMethod = element['webkit' + method]()
    }
    else {
      usablePrefixMethod = element['webkit' + method]
    }
  }

  return usablePrefixMethod
}
