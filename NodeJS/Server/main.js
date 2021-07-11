#!/usr/bin/env node

const axios = require('axios')
const prompt = require('prompt')
prompt.start()

const greeting = `This is the bad dad joke command line app! Send h e l p`
console.log(greeting)

async function run() {
  const { val } = await prompt.get('Would you like to 1. Random Dad Joke, or 2. Search for a dad joke(enter number):')
  
  var url = '';
  switch(val) {
    case '1':
      url = 'https://icanhazdadjoke.com/';
    break;
    case '2':
      url = `https://icanhazdadjoke.com/search?term=${escape(options.search)}`;
    break;

    default: 
      console.log("Invalid option(1 or 2).");
      run();
      return;
  }

  if (url == 'https://icanhazdadjoke.com/') {
    console.log("Here's a random joke for you:")
  } else {
    console.log(`Searching for jokes about ${options.search}...`)
  }

  axios.get(url, { headers: { Accept: 'application/json' } }).then((res) => {
    if (url != 'https://icanhazdadjoke.com/') {
      // if searching for jokes, loop over the results
      if (res.data.results.length === 0) {
        console.log("no jokes found :'(")
      }
      for(var i = 0; i < res.data.results.length; i++) {
        var j = res.data.results[i];
        console.log('\n' + j.joke)
      }

      run();
    } else {
      console.log(res.data.joke)
      run();
    }
  })
}
run(); // Test commit 7