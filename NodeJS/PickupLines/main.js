const express = require('express')
const lineApi = require('./lineApi')
const axios = require('axios')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('got /')
  res.send({
    success: true,
    endpoints: [
      {
        Path: '/line/random',
        Description: 'Returns a random pickup line',
      },
      {
        Path: '/line/{id}',
        Description: 'Return a specific pickup line by ID',
      },
      {
        Path: '/lines',
        Description: 'Return list of pickup lines. Use ?page=.. for more',
      },
    ],
    message: 'Deployment test 6!',
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
  res.send({
    success: true,
    line: lineApi.getRandomPickupLine(),
  })
})
app.get('/nline/random', (req, res) => {
  res.send({
    success: true,
    line: lineApi.getRandomPutdownLine(),
  })
})

app.get('/text/line/random', (req, res) => {
  res.send(lineApi.getRandomPickupLine().line)
})
app.get('/text/nline/random', (req, res) => {
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
