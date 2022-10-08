import React from "react"
import { useEffect, useState } from 'react'
import CityEntry from './CityEntry.js'

const Cities = ({ weatherData, deleteLocation }) => {
  console.log(weatherData)
  return (
    <div id="cities">
      {weatherData.map((weatherDatum, index) => {
        return (
          <CityEntry weatherDatum={weatherDatum} key={index} deleteLocation={deleteLocation} />
        )
      })}
    </div>
  )
}
export default Cities;

