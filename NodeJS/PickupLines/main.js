const express = require('express')
const lineApi = require('./lineApi');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send({success: true, endpoints: [
    {
      "Path": "/line/random",
      "Description": "Returns a random pickup line"
    },
    {
      "Path": "/line/{id}",
      "Description": "Return a specific pickup line by ID"
    }, {
      "Path": "/lines",
      "Description": "Return list of pickup lines. Use ?page=.. for more"
    }
  ],
  message: "Deployment test 2!"})
})

app.get('/line/random', (req, res) => {
  res.send({
    success: true,
    line: lineApi.getRandomPickupLine()
  })
});

app.get('/line/:id', (req, res) => {
  res.send({
    success: true,
    line: lineApi.getPickupLineById(req.params.id)
  })
});

app.get('/lines', (req, res) => {
  let page = (req.query.page) ? req.query.page: 1;
  res.send({
    success: true,
    lines: lineApi.getPickupLines(page)
  })
});

app.listen(port, () => {
  console.log(`Pickup line API listening at http://localhost:${port}`)
})