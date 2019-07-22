const express = require('express')
const router = express.Router()
const request = require('request')
const reqPromise = require('request-promise')
const City = require('../model/City')


const weatherAPI = "http://api.apixu.com/v1/current.json?key=0dea3d7e81b04108a98140229191707&q" 

//////////////////////////////////////////////

const getCityData  = async function(req, res){
 
  let cityName = req.params.cityName
  
  let data = await reqPromise(`${weatherAPI}=${cityName}`)
    data = JSON.parse(data)
    console.log(data)
    let city = ({
                name: data.location.name,
                updatedAt: data.current.last_updated,
                temperature: data.current.temp_c,
                condition: data.current.condition.text,
                conditionPic: data.current.condition.icon 
              })
    res.send(city)
    console.log(body)
    
  
  // .catch(() => console.log("error"))
}
router.get('/city/:cityName', getCityData) 

///////////////////////////////////////////////////////////////

const gerCitiesData = async function(req, res){
    let cities = await City.find({})
    res.send(cities)
}
router.get('/cities', gerCitiesData)

///////////////////////////////////////////////////////////////

const saveNewCity = function(req, res){
  let newCity = req.body
  
  let city = new City ({
    name: newCity.name,
    updatedAt: newCity.updatedAt,
    temperature: newCity.temperature,
    condition: newCity.condition,
    conditionPic: newCity.conditionPic 
  })
  city.save()
  console.log(`add ${city.name}`)  
  res.end()
}
router.post('/city', saveNewCity)

///////////////////////////////////////////////////////////////

const deleteCity = async function(req, res){
  let cityName = req.params.cityName
  await City.deleteOne({name: cityName})
  .then( console.log(`remove ${cityName}`) )
  res.end()
}
router.delete('/city/:cityName', deleteCity)

///////////////////////////////////////////////////////////////


module.exports = router