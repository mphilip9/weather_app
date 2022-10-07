drop database if exists weather;

CREATE DATABASE weather;

use weather;

CREATE TABLE weatherData (
  id int not null auto_increment,
  -- location varchar(255),
  temperature int,
  description varchar(255),
  icon varchar(255),
  -- humidity int,
  -- windSpeed int,
  feelsLike int,
  -- sunrise varchar(255),
  -- sunset varchar(255),
  PRIMARY KEY (id)
)


-- use this to test queries
-- insert into weatherData (temperature) values (26)

