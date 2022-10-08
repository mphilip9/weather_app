import React from "react"
import { useEffect, useState } from 'react'
import CityEntry from './CityEntry.js'

const Cities = ({ weatherData }) => {
  console.log(weatherData)
  return (
    <div id="cities">
      {weatherData.map((weatherDatum, index) => {
        return (
          <CityEntry weatherDatum={weatherDatum} key={index} />
        )
      })}
    </div>
  )
}
export default Cities;

