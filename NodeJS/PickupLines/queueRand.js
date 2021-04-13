function getRand(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
/**
 * Random item selection with reduced repeats
 */
module.exports = class QueueRand {
  /**
   *
   * @param {Array of identifiable objects to pick from} data
   * @param {Name of the ID field for each item} idAttr
   * @param {Number of items to hold on to for repeat reduction} maxArrLen
   */
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

    this.queue = this.shuffle(arr)
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  /**
   * Returns a random item from 'data' with reduced likelyhood of repeating from last 'maxArrLen' items
   * @returns Object from 'data'
   */
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

        var rnd = Math.random() * 100
        if (rnd <= 25) {
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
