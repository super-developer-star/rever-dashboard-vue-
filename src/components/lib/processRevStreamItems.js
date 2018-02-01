
var processRevStreamItems = function (revs) {
  var items = revs.map((item) => {
    var titleSize = item.name.length
    var linesSize = Math.round((titleSize / 12) * 8)
    try {
      if (item.cycle.relatePhoto.metadata.orientation) {
        switch (item.cycle.relatePhoto.metadata.orientation) {
          case 'portrait':
            item.height = 275 + linesSize
            item.width = 200
            break

          case 'landscape':
            item.height = 325 + linesSize
            item.width = 300
            break

          case 'squared':
            item.height = 400 + linesSize
            item.width = 300
            break

          default:
            item.height = 400
            item.width = 300
            break
        }
      }
    }
    catch (e) {
      item.height = 400
      item.width = 300
    }

    return item
  })

  return items
}

export default processRevStreamItems
