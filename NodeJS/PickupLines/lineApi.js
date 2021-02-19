let lines = require('../data/pickupLines.json')

let page_size = 10;
function getRand(min, max) {
    return Math.random() * (max - min) + min;
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