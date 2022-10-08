import React from "react"
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CityEntry = ({ weatherDatum, deleteLocation }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleClick = () => {
    deleteLocation(weatherDatum.id)
  }

  return (
    <div className="city">
      <p className="location flex-item">{capitalizeFirstLetter(weatherDatum.location)} </p>
      <p className="temp flex-item">{weatherDatum.temperature}  &#x2109;</p>
      <p className="feels-like flex-item">Feels like: {weatherDatum.feelsLike}</p>
      <p className="description flex-item">{capitalizeFirstLetter(weatherDatum.description)}</p>
      <p><img className="icon flex-item" src={`https://openweathermap.org/img/w/${weatherDatum.icon}.png`}></img></p>
      <button className="delete" onClick={handleClick}>Delete</button>
    </div>
  )
}

export default CityEntry;