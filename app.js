const express = require('express');
const app = express();
const request = require('request');
const chalk = require('chalk');
const beep = require('beepbeep')

/**
  @refreshDuration -> Set the millisecond duration for ETH pricing refresh.
  @beepWhenAboveAmount -> Set the amount when ETH price crosses the given price console start to beep with system sound.
**/
let refreshDuration = '2000';
let beepWhenAboveAmount = '463';

app.get('/', (req, res) => res.send('Please see console for latest ETH price!'));

setInterval(function(){

  request('https://cex.io/api/last_price/ETH/USD', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const res_data = JSON.parse(body);
      const ETHPrice = res_data['lprice'];
      console.log(chalk.bgBlack.redBright(ETHPrice));
      if(ETHPrice > beepWhenAboveAmount) {
        beep(2);
      }
    }
  });

}, refreshDuration);

app.listen(3000, () => console.log('ETH Price against USD, Price refresh rate can be set form main app(app running on port 3000!)'));
