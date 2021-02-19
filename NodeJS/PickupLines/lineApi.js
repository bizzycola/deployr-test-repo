let lines = require('./data/pickupLines.json')
console.log('lines: ', lines.length)

let page_size = 10;
function getRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    getRandomPickupLine: () => {
        return lines[getRand(0, lines.length)]
    },
    getPickupLineById: (id) => {
        var line = null;
        lines.forEach(el => {
            if (el.id == id)
                line = el
        });
        return line;
    },
    getPickupLines: (page) => {
        return lines.slice((page = -1) * page_size, page * page_size);
    }
}