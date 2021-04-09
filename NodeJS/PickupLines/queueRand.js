function getRand(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = class QueueRand {
  constructor(data, idAttr, maxArrLen) {
    this.maxArrLen = maxArrLen || 10
    this.idAttr = idAttr || 'id'
    this.data = data

    var arr = new Array()
    arr.pushItem = function () {
      if (this.length >= maxArrLen) {
        this.shift()
      }
      return Array.prototype.push.apply(this, arguments)
    }

    this.queue = arr
  }

  getRandomItem() {
    var line = null
    var count = 0
    do {
      line = this.data[getRand(0, this.data.length)]

      count++
      if (count > 5)
        return {
          id: -1,
          line: "Sorry, we couldn't find any data! Perhaps something broke?",
        }
    } while (line == null)

    var id = line[this.idAttr]

    var inQueue = false
    for (var i = 0; i < this.queue.length; i++) {
      if (this.queue[i].id == id) {
        inQueue = true

        if (getRand(1, 2) == 1) {
          return this.getRandomItem()
        }
      }
    }

    if (!inQueue) {
      this.queue.pushItem({
        id: id,
        item: line,
      })
    }

    return line
  }
}
