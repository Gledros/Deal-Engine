# DEAL ENGINE

## TECHNICAL ASSESMENT

### Docs

### Research

The solution is aimed to create an algorithm that obtains the weather data for the current day for all of the origin and destination endpoints of flights of a provided test dataset.

#### Context

ICAO the organization that coordinates international air navigation defines a series of formats for weather data reports and also the identification of airport through ICAO Airport Codes which are different from IATA Airport Codes, none of which is excempt of some caveats.

ICAO codes are separate and different from [IATA codes](https://en.wikipedia.org/wiki/IATA_airport_code "IATA airport code"), the latter of which have three letters and are generally used for [airline timetables](https://en.wikipedia.org/wiki/Airline_timetable "Airline timetable"), reservations, and [baggage](https://en.wikipedia.org/wiki/Baggage "Baggage") tags.

The best weather forecast data comes directly from METAR or TAF sources which typically come from [airports](https://en.wikipedia.org/wiki/Airport "Airport") or permanent [weather observation stations](https://en.wikipedia.org/wiki/Weather_station). Some METARs are encoded by [automated airport weather stations](https://en.wikipedia.org/wiki/Automated_airport_weather_station "Automated airport weather station") while others are encoded via software, and then reviewed by certified weather observers before being transmitted.

Other weather forecasts are approximations to the latitude and longitude when not being inside airports but near them, thus reducing the quality of the data provided.

#### Solutions

The first couple of ideas to approach the solution were:

- Map the IATA-ICAO Codes for easier use of METAR/TAF APIs.
- Just use the provided latitude/longitude for data retrieval on a public weather forecast API.

#### Constraints

Analyzing the data it presents 52 different airport locations from where the flights take off/land, so with this in mind the minimal required requests (per day) to a third party weather forecast API it's that quantity.

Due that the vast majority of data coming from METAR/TAF sources is mostly behind paywalls or with too greatly diminished features for the free tiers (making the use of it almost laughable), the first approach is being discarded as a solution.

And even on weather forecast APIs there are really few that provide the level of details (and the required quantity of requests per day in a free basis), usable for the current problem.

#### Glossary

- Latitude: In [geography](https://en.wikipedia.org/wiki/Geography "Geography"), is a [coordinate](https://en.wikipedia.org/wiki/Geographic_coordinate_system "Geographic coordinate system") that specifies the [north](https://en.wikipedia.org/wiki/North "North")–[south](https://en.wikipedia.org/wiki/South "South") position of a point on the surface of [the Earth](https://en.wikipedia.org/wiki/The_Earth "The Earth") or another celestial body.
- Longitude: Is a [geographic coordinate](https://en.wikipedia.org/wiki/Geographic_coordinate_system "Geographic coordinate system") that specifies the [east](https://en.wikipedia.org/wiki/East "East")–[west](https://en.wikipedia.org/wiki/West "West") position of a point on the surface of the [Earth](https://en.wikipedia.org/wiki/Earth "Earth"), or another [celestial](https://en.wikipedia.org/wiki/Celestial_navigation "Celestial navigation") body.
- IATA: ([International Air Transport Association](https://en.wikipedia.org/wiki/International_Air_Transport_Association "International Air Transport Association")) https://en.wikipedia.org/wiki/IATA_airport_code
- IATA Airport Code: also known as an **IATA location identifier** , **IATA station code** , or simply a **[location identifier](https://en.wikipedia.org/wiki/Location_identifier "Location identifier")** , is a three-letter [geocode](https://en.wikipedia.org/wiki/Geocode "Geocode") designating many [airports](https://en.wikipedia.org/wiki/Airport "Airport") and [metropolitan areas](https://en.wikipedia.org/wiki/Metropolitan_area "Metropolitan area") around the world, defined by IATA.
- ICAO: ([International Civil Aviation Organization](https://www.icao.int/Pages/default.aspx)) Is a [specialized agency](https://en.wikipedia.org/wiki/Specialized_agency "Specialized agency") of the [United Nations](https://en.wikipedia.org/wiki/United_Nations "United Nations") that coordinates the principles and techniques of international air navigation, and fosters the planning and development of international [air transport](https://en.wikipedia.org/wiki/Scheduled_air_transport "Scheduled air transport") to ensure safe and orderly growth.
- Weather: Is the state of the [atmosphere](https://en.wikipedia.org/wiki/Atmosphere "Atmosphere"), describing for example the degree to which it is hot or cold, wet or dry, calm or stormy, clear or [cloudy](https://en.wikipedia.org/wiki/Cloud_cover "Cloud cover").
- METAR: ([Meteorological Terminal Air Report](https://en.wikipedia.org/wiki/METAR)) The METAR format was introduced internationally on 1 January 1968 and is a format for reporting [weather](https://en.wikipedia.org/wiki/Weather "Weather") information. It's a highly practical way to transmit weather data that's primarily used by pilots. METAR Format: Place – Date and Time – Wind – Visibility – Phenomena – Clouds – Temperature – Pressure
- TAF: ([Terminal Aerodrome Forecast](https://en.wikipedia.org/wiki/Terminal_aerodrome_forecast)) In [meteorology](https://en.wikipedia.org/wiki/Meteorology "Meteorology") and [aviation](https://en.wikipedia.org/wiki/Aviation "Aviation"), **the term** is a format for reporting [weather forecast](https://en.wikipedia.org/wiki/Weather_forecast "Weather forecast") information, particularly as it relates to aviation. TAFs complement and use similar encoding to [METAR](https://en.wikipedia.org/wiki/METAR "METAR") reports.
- IWXXM: ([ICAO Meteorological Information Exchange Model](https://en.wikipedia.org/wiki/IWXXM)) Is a format for reporting [weather](https://en.wikipedia.org/wiki/Weather "Weather") information in [XML](https://en.wikipedia.org/wiki/XML "XML")/[GML](https://en.wikipedia.org/wiki/Geography_Markup_Language "Geography Markup Language"). IWXXM includes [XML](https://en.wikipedia.org/wiki/XML "XML")/[GML](https://en.wikipedia.org/wiki/Geography_Markup_Language "Geography Markup Language")-based representations for products standardized in [International Civil Aviation Organization](https://en.wikipedia.org/wiki/International_Civil_Aviation_Organization "International Civil Aviation Organization") (ICAO) Annex III, such as [METAR](https://en.wikipedia.org/wiki/METAR "METAR")/[SPECI](https://en.wikipedia.org/wiki/SPECI "SPECI"), [TAF](https://en.wikipedia.org/wiki/Terminal_Aerodrome_Forecast "Terminal Aerodrome Forecast"), [SIGMET](https://en.wikipedia.org/wiki/SIGMET "SIGMET"), [AIRMET](https://en.wikipedia.org/wiki/AIRMET), among others.

#### Sources

- https://www.flightradar24.com/blog/how-to-read-metar-weather-reports/
- https://en.wikipedia.org/wiki/International_Civil_Aviation_Organization
- https://en.wikipedia.org/wiki/METAR
- https://en.wikipedia.org/wiki/IWXXM
- https://en.wikipedia.org/wiki/Terminal_aerodrome_forecast
- https://en.wikipedia.org/wiki/Weather
- https://open-meteo.com/
- https://en.wikipedia.org/wiki/Latitude
- https://en.wikipedia.org/wiki/Longitude
- https://en.wikipedia.org/wiki/File:METAR_processing_machine_at_KBTP.jpg
- https://en.wikipedia.org/wiki/Automated_airport_weather_station
