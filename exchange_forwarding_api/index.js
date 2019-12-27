const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const PORT = 10088;
const url1 = "http://192.168.1.253:8181/v1";
// returnOrderBook?base=0x0f7100fcf2d114ef199575f0651620001d210718c680fbe7568c72d6e0160731&quote=0x352ba42b3a2fb66bff15f08ea691b5b87eff0fe6a69b79cda364c4cdf787a0a2
const url = "http://18.220.66.235:38181/v1";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/v1/orderbook', async function (req, res) {
  let base = req.query.base;
  let quote = req.query.quote;
  let result = await axios.get(url + "/orderbook?base=" + base + "&quote=" + quote)
    .then(res => { return (res) })
    .catch(e => { console.log(e) })
  // console.log(result)
  // if (result){
  //     res.send({"balance":result.balance});
  // }else{
  //     res.send(result);
  // }
  res.send(result.data);
})

app.get('/v1/orders', async function (req, res) {
  let user = req.query.user;
  let quote = req.query.quote;
  let base = req.query.base;
  let result;
  let state = req.query.state;
  let version = req.query.version;
  let limit = req.query.limit;
  // result=await axios.get(url+" /returnOrders?user="+user+"&quote="+quote+"&base="+base+"&state="+state+"&version="+version+"&limit="+limit)
  // console.log(url + "/returnOrders?user=" + user + "&quote=" + quote + "&base=" + base)
  if (user) {
    if (quote && base) {
      result = await axios.get(url + "/orders?user=" + user + "&quote=" + quote + "&base=" + base)
        .then(res => { return res.data })
        .catch(e => { console.log(e) })
    } else {
      result = await axios.get(url + "/orders?user=" + user)
        .then(res => { return (res.data) })
        .catch(e => { console.log(e) })
    }
  } else {
    res.send('need user at least')
  }
  res.send(result);
})

app.get('/v1/prices', async (req, res) => {
  let result = await axios.get(url + '/prices')
    .then(res => { return ((res.data)) })
    .catch(e => { console.log(e) })
  res.send(result);
})

app.get('/v1/trades', async (req, res) => {
  let version = req.query.version;
  let result = await axios.get(url + '/trades?version=' + version)
    .then(res => { return res.data })
    .catch(e => console.log(e))
  res.send(result)
})

app.post('/v1/cancelOrder',async(req,res)=>{
  let result=await axios.post(url+'/cancelOrder',req.body,{Headers:{'Content-Type':'application/json'}})
  .then(res=>{return res.data})
  res.send(result);
})

// post /v1/cancelOrder
// #### Request body
// {
//     "version": xxx,
//     "signedtxn": "xxxxx"
// }
// #### Response
// {
//     "code":2000,
//     "message":"cancelling"
// }

app.listen(PORT, function () {
  console.log('CORS-enabled web server listening on port' + PORT)
})
