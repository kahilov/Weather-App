const express = require('express')
const router = express.Router()
const request = require('request')
const city = require('../model/City')
const requestPromise = require('request-promise')
const mongoose = require('mongoose')
const parseString = require('xml2js').parseString;
const moment = require('moment');


router.get('/city/:city', async function(req, res) {
    const qCity = req.params.city
    let time = await requestPromise("https://api.openweathermap.org/data/2.5/weather?q=" + qCity + "&mode=xml&units=metric&appid=7c93907a79eab21327f846a552b5c770")
    parseString(time, (err, result) => {
        time = result.current
        time = [time]
        const relevantData = time.map(t => {
            return {
                name: t.city[0].$.name,
                temperature: Math.round(t.temperature[0].$.value),
                condition: t.weather[0].$.value,
                conditionPic: t.weather[0].$.icon,
                updatedAt: moment(t.lastupdate[0].$.value).format("LLLL")
            }
        })
        res.send(relevantData[0])
    })
})

router.get('/cities', async function(req, res) {
    const cities = await city.find({})
    res.send(cities)
})

router.post('/city', function(req, res) {
    const c = new city(req.body)
    c.save()
    res.send(c)
})

router.delete('/city/:city', function(req, res) {
    const cityName = req.params.city
    city.deleteOne({ name: cityName }, function(err, person) {
        console.log(err)
    })
    res.end()
})
router.put('/city/:city', async function(req, res) {
    const qCity = req.params.city
    let time = await requestPromise("https://api.openweathermap.org/data/2.5/weather?q=" + qCity + "&mode=xml&units=metric&appid=7c93907a79eab21327f846a552b5c770")
    parseString(time, (err, result) => {
        time = result.current
        time = [time]
        const relevantData = time.map(t => {
            return {
                name: t.city[0].$.name,
                temperature: Math.round(t.temperature[0].$.value),
                condition: t.weather[0].$.value,
                conditionPic: t.weather[0].$.icon,
                updatedAt: moment(t.lastupdate[0].$.value).format("LLLL")
            }
        })
        res.send(relevantData[0])
    })
})







module.exports = router