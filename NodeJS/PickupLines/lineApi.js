let lines = require('./data/pickupLines.json')
let negLines = releaseEvents('./data/putdownLines.json');

let page_size = 10;
function getRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    getRandomPickupLine: () => {
        var line = null;
        var count = 0;
        do {
            line = lines[getRand(0, lines.length)];

            count++;
            if(count > 5)
                return {id: -1, line: "Sorry, we couldn't find you a pickup line! Perhas something broke?"};
        } while(line == null);
        return line;
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
    },

    getRandomPutdownLine: () => {
        var line = null;
        var count = 0;
        do {
            line = lines[getRand(0, negLines.length)];

            count++;
            if(count > 5)
                return {id: -1, line: "Sorry, we couldn't find you a pickup line! Perhas something broke?"};
        } while(line == null);
        return line;
    }
}