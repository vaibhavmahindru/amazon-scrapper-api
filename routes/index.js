var express = require('express');
var router = express.Router();
const request = require('request-promise')
//const apiKey = "20a50ce29a32d37c53686f3c65f5a8b2"

//const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
const amazonUrl = `https://www.amazon.in/`

const generateUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazon Data Scrapper' });
});
router.get('/products/:productId', async function(req, res, next) {
  const {productId} = req.params;
  const {api_key} = req.query
  try{
    const response = await request(`${generateUrl(api_key)}&url=${amazonUrl}dp/${productId}`)
    res.json(JSON.parse(response))//to send the response in json format
  }catch(error){
    res.json(error)
  }
});
router.get('/products/:productId/offers', async function(req, res, next) {
  const {productId} = req.params;

  try{
    const response = await request(`${generateUrl(api_key)}&url=${amazonUrl}gp/offer-listing/${productId}`)
    res.json(JSON.parse(response))//to send the response in json format
  }catch(error){
    res.json(error)
  }
});
router.get('/search/:searchQuery', async function(req, res, next) {
  const {searchQuery} = req.params;

  try{
    const response = await request(`${generateUrl(api_key)}&url=${amazonUrl}s?k=${searchQuery}`)
    res.json(JSON.parse(response))//to send the response in json format
  }catch(error){
    res.json(error)
  }
});
module.exports = router;
