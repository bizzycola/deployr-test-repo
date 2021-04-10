const express = require('express')
const lineApi = require('./lineApi')
const axios = require('axios')
const jsoning = require("jsoning");
const path = require('path');

const app = express();
const port = 3000;

const db = new jsoning("/dbdata/db.json");

async function updateKeyCount(key) {
  try {
    if(db.has(key))
      db.math(key, 'add', 1);
    else
      db.set(key, 1);
  } catch(err){ console.log(err); }
}

async function getKeyCount(key) {
  var count = 0;

  if(await db.has(key))
    count = parseInt(await db.get(key));

  return count;
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/stats', async (req, res) => {
  res.send({
    success: true,
    pickupRequests: await getKeyCount('pickupLineRequests'),
    putdownRequests: await getKeyCount('putdownLineRequests')
  })
})

app.get('/viewInitial', async (req, res) => {
  res.send({
    success: true,
    line: lineApi.getRandomPickupLine(),
    numPickupLines: lineApi.getPickupLineCount(),
    numPutdownLines: lineApi.getPutdownLineCount(),
    pickupRequests: await getKeyCount('pickupLineRequests'),
    putdownRequests: await getKeyCount('putdownLineRequests')
  })
})

app.get('/dadjoke', async (req, res) => {
  try {
    var joke = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        "accept": 'text/plain',
      },
    })
    
    res.send(joke.data)
  } catch (err) {
    console.log(err)
    return res.send(false)
  }
})

app.get('/line/random', (req, res) => {
  updateKeyCount('pickupLineRequests');

  res.send({
    success: true,
    line: lineApi.getRandomPickupLine(),
  });
})
app.get('/nline/random', (req, res) => {
  updateKeyCount('putdownLineRequests');

  res.send({
    success: true,
    line: lineApi.getRandomPutdownLine(),
  })
})

app.get('/text/line/random', (req, res) => {
  updateKeyCount('pickupLineRequests');

  res.send(lineApi.getRandomPickupLine().line)
})
app.get('/text/nline/random', (req, res) => {
  updateKeyCount('putdownLineRequests');

  res.send(lineApi.getRandomPutdownLine().line)
})

app.get('/line/:id', (req, res) => {
  res.send({
    success: true,
    line: lineApi.getPickupLineById(req.params.id),
  })
})

app.get('/lines', (req, res) => {
  let page = req.query.page ? req.query.page : 1
  res.send({
    success: true,
    lines: lineApi.getPickupLines(page),
  })
})

app.get('/nlines', (req, res) => {
  let page = req.query.page ? req.query.page : 1
  res.send({
    success: true,
    lines: lineApi.getPutdownLines(page),
  })
})

app.listen(port, () => {
  console.log(`Pickup line API listening at http://localhost:${port}`)
})
