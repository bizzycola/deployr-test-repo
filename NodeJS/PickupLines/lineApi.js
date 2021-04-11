let lines = require('./data/pickupLines.json')
let negLines = require('./data/putdownLines.json');
let facts = require('./data/weirdFacts.json');
let QueueRand = require('./queueRand.js')
//import { QueueRand } from './queueRand';

var pickupQueue = new QueueRand(lines, "id", 15);
var putdownQueue = new QueueRand(negLines);
var factQueue = new QueueRand(facts);

let page_size = 10;
function getRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    getPickupLineCount: () => {
        return lines.length;
    },
    getPutdownLineCount: () => {
        return negLines.length;
    },

    getRandomFact: () => {
        return factQueue.getRandomItem();
    },

    getRandomPickupLine: () => {
        return pickupQueue.getRandomItem();
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

    getPutdownLines: (page) => {
        return negLines.slice((page = -1) * page_size, page * page_size);
    },

    getRandomPutdownLine: () => {
        /*var line = null;
        var count = 0;
        do {
            line = negLines[getRand(0, negLines.length)];

            count++;
            if(count > 5)
                return {id: -1, line: "Sorry, we couldn't find you a pickup line! Perhaps something broke?"};
        } while(line == null);
        return line;*/

        return putdownQueue.getRandomItem();
    }
} 