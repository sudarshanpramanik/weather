import { useEffect, useRef, useState, useCallback } from "react";
import "./Home.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaCompass } from "react-icons/fa";
import {
  WiDayCloudy, WiDaySunny, WiRain, WiThunderstorm,
  WiDaySunnyOvercast, WiCloudy, WiShowers, WiDust,
  WiStrongWind, WiDayHaze, WiSnowflakeCold, WiDaySprinkle,
  WiSunrise, WiSunset, WiSolarEclipse, WiDayWindy,
  WiHumidity, WiBarometer,
} from "react-icons/wi";
import {
  FaTemperatureHigh, FaTemperatureLow, FaWind, FaSearch,
  FaTimes, FaMoon, FaSun, FaMask, FaThermometerHalf,
  FaUser, FaEnvelope, FaPhone, FaSignOutAlt, FaBell,
  FaCamera, FaMapMarkerAlt, FaShieldAlt, FaExclamationTriangle,
  FaTshirt, FaRunning, FaUmbrella, FaStar, FaRegStar,
  FaRobot, FaSunrise, FaTint,
} from "react-icons/fa";
import { MdOutlineWaterDrop, MdAir, MdWbSunny } from "react-icons/md";

/* ─── India States & Capitals ─────────────────────────────────────── */
const INDIA_STATES = [
  { state: "Andhra Pradesh",    capital: "Amaravati",           utcOffset: 5.5, sunriseM: 5*60+20, sunsetM: 18*60+40 },
  { state: "Arunachal Pradesh", capital: "Itanagar",            utcOffset: 5.5, sunriseM: 4*60+40, sunsetM: 18*60+10 },
  { state: "Assam",             capital: "Dispur",              utcOffset: 5.5, sunriseM: 4*60+50, sunsetM: 18*60+20 },
  { state: "Bihar",             capital: "Patna",               utcOffset: 5.5, sunriseM: 5*60+10, sunsetM: 18*60+30 },
  { state: "Chhattisgarh",      capital: "Raipur",              utcOffset: 5.5, sunriseM: 5*60+30, sunsetM: 18*60+40 },
  { state: "Goa",               capital: "Panaji",              utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 19*60+5  },
  { state: "Gujarat",           capital: "Gandhinagar",         utcOffset: 5.5, sunriseM: 6*60+20, sunsetM: 19*60+20 },
  { state: "Haryana",           capital: "Chandigarh",          utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 19*60+10 },
  { state: "Himachal Pradesh",  capital: "Shimla",              utcOffset: 5.5, sunriseM: 5*60+35, sunsetM: 19*60+5  },
  { state: "Jharkhand",         capital: "Ranchi",              utcOffset: 5.5, sunriseM: 5*60+15, sunsetM: 18*60+25 },
  { state: "Karnataka",         capital: "Bengaluru",           utcOffset: 5.5, sunriseM: 6*60+0,  sunsetM: 18*60+50 },
  { state: "Kerala",            capital: "Thiruvananthapuram",  utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 18*60+45 },
  { state: "Madhya Pradesh",    capital: "Bhopal",              utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 18*60+55 },
  { state: "Maharashtra",       capital: "Mumbai",              utcOffset: 5.5, sunriseM: 6*60+5,  sunsetM: 19*60+0  },
  { state: "Manipur",           capital: "Imphal",              utcOffset: 5.5, sunriseM: 4*60+55, sunsetM: 18*60+15 },
  { state: "Meghalaya",         capital: "Shillong",            utcOffset: 5.5, sunriseM: 4*60+58, sunsetM: 18*60+18 },
  { state: "Mizoram",           capital: "Aizawl",              utcOffset: 5.5, sunriseM: 5*60+0,  sunsetM: 18*60+20 },
  { state: "Nagaland",          capital: "Kohima",              utcOffset: 5.5, sunriseM: 4*60+52, sunsetM: 18*60+12 },
  { state: "Odisha",            capital: "Bhubaneswar",         utcOffset: 5.5, sunriseM: 5*60+18, sunsetM: 18*60+28 },
  { state: "Punjab",            capital: "Chandigarh",          utcOffset: 5.5, sunriseM: 5*60+42, sunsetM: 19*60+12 },
  { state: "Rajasthan",         capital: "Jaipur",              utcOffset: 5.5, sunriseM: 6*60+0,  sunsetM: 19*60+20 },
  { state: "Sikkim",            capital: "Gangtok",             utcOffset: 5.5, sunriseM: 4*60+48, sunsetM: 18*60+8  },
  { state: "Tamil Nadu",        capital: "Chennai",             utcOffset: 5.5, sunriseM: 5*60+58, sunsetM: 18*60+38 },
  { state: "Telangana",         capital: "Hyderabad",           utcOffset: 5.5, sunriseM: 5*60+45, sunsetM: 18*60+45 },
  { state: "Tripura",           capital: "Agartala",            utcOffset: 5.5, sunriseM: 5*60+2,  sunsetM: 18*60+22 },
  { state: "Uttar Pradesh",     capital: "Lucknow",             utcOffset: 5.5, sunriseM: 5*60+25, sunsetM: 18*60+40 },
  { state: "Uttarakhand",       capital: "Dehradun",            utcOffset: 5.5, sunriseM: 5*60+38, sunsetM: 19*60+2  },
  { state: "West Bengal",       capital: "Kolkata",             utcOffset: 5.5, sunriseM: 5*60+3,  sunsetM: 18*60+18 },
  { state: "Delhi (NCT)",       capital: "New Delhi",           utcOffset: 5.5, sunriseM: 5*60+38, sunsetM: 19*60+8  },
  { state: "Jammu & Kashmir",   capital: "Srinagar",            utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 19*60+20 },
  { state: "Ladakh",            capital: "Leh",                 utcOffset: 5.5, sunriseM: 5*60+55, sunsetM: 19*60+25 },
  { state: "Andaman & Nicobar", capital: "Port Blair",          utcOffset: 5.5, sunriseM: 5*60+22, sunsetM: 18*60+32 },
  { state: "Chandigarh (UT)",   capital: "Chandigarh",          utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 19*60+10 },
  { state: "Puducherry",        capital: "Puducherry",          utcOffset: 5.5, sunriseM: 5*60+55, sunsetM: 18*60+35 },
  { state: "Lakshadweep",       capital: "Kavaratti",           utcOffset: 5.5, sunriseM: 6*60+15, sunsetM: 18*60+50 },
];

/* ─── City Weather Data ─────────────────────────────────────────── */
const CITIES = [
  /* Andhra Pradesh */
  { name: "Vijayawada",   region: "Andhra Pradesh, India",   flag: "🇮🇳", temp: "28°C", icon: "mostlyclear",  h: 40, l: 29, humidity: "52%", wind: "12 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 20, uvIndex: 9,  rainDesc: "Hot and hazy over the Krishna delta; brief shower unlikely.", aqi: 95,  desc: "Scorching conditions along the Krishna river banks.", utcOffset: 5.5, sunriseM: 5*60+46, sunsetM: 18*60+40 },
  { name: "Guntur",       region: "Andhra Pradesh, India",   flag: "🇮🇳", temp: "37°C", icon: "sunny",         h: 39, l: 28, humidity: "50%", wind: "11 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 15, uvIndex: 10, rainDesc: "Dry conditions persist over the chilli belt.",               aqi: 90,  desc: "Intense heat across the Krishna-Godavari delta plains.",    utcOffset: 5.5, sunriseM: 5*60+48, sunsetM: 18*60+38 },
  { name: "Tirupati",     region: "Andhra Pradesh, India",   flag: "🇮🇳", temp: "34°C", icon: "partlycloudy",  h: 36, l: 26, humidity: "65%", wind: "10 km/h E",  windDir: 90,  windLabel: "E",  windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 40, uvIndex: 7,  rainDesc: "Afternoon showers from the Eastern Ghats possible.",       aqi: 60,  desc: "Warm and partly cloudy at the Tirumala hills.",             utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 18*60+40 },
  { name: "Nellore",      region: "Andhra Pradesh, India",   flag: "🇮🇳", temp: "36°C", icon: "partlycloudy",  h: 38, l: 28, humidity: "68%", wind: "14 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 35, uvIndex: 8,  rainDesc: "Coastal moisture increasing; showers possible by evening.", aqi: 70,  desc: "Warm coastal weather with building sea-breeze activity.",   utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 18*60+38 },
  /* West Bengal */
  { name: "Kolkata",      region: "West Bengal, India",      flag: "🇮🇳", temp: "34°C", icon: "rain",          h: 35, l: 27, humidity: "85%", wind: "18 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 80, uvIndex: 4,  rainDesc: "Heavy monsoon showers expected throughout the day.",        aqi: 130, desc: "Muggy and wet; typical peak-monsoon conditions.",           utcOffset: 5.5, sunriseM: 5*60+3,  sunsetM: 18*60+18 },
  { name: "Darjeeling",   region: "West Bengal, India",      flag: "🇮🇳", temp: "14°C", icon: "foggy",         h: 16, l: 10, humidity: "92%", wind: "8 km/h NE",  windDir: 45,  windLabel: "NE", windSpeed: "8 km/h",  windGust: "12 km/h", rainChance: 60, uvIndex: 3,  rainDesc: "Dense cloud cover; drizzle likely in the morning.",         aqi: 25,  desc: "Cool and misty in the tea gardens of the hills.",          utcOffset: 5.5, sunriseM: 4*60+58, sunsetM: 18*60+10 },
  { name: "Siliguri",     region: "West Bengal, India",      flag: "🇮🇳", temp: "28°C", icon: "showers",       h: 30, l: 23, humidity: "80%", wind: "12 km/h S",  windDir: 180, windLabel: "S",  windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 65, uvIndex: 5,  rainDesc: "Intermittent showers from the foothills moisture.",         aqi: 55,  desc: "Warm and cloudy at the Himalayan foothills gateway.",       utcOffset: 5.5, sunriseM: 5*60+0,  sunsetM: 18*60+15 },
  /* Maharashtra */
  { name: "Mumbai",       region: "Maharashtra, India",      flag: "🇮🇳", temp: "30°C", icon: "rain",          h: 32, l: 26, humidity: "88%", wind: "22 km/h W",  windDir: 270, windLabel: "W",  windSpeed: "22 km/h", windGust: "35 km/h", rainChance:  5, uvIndex: 3,  rainDesc: "Heavy monsoon rain; flooding possible in low-lying areas.", aqi: 85,  desc: "Intense monsoon hits the city; travel disruptions likely.",  utcOffset: 5.5, sunriseM: 6*60+5,  sunsetM: 19*60+0  },
  { name: "Pune",         region: "Maharashtra, India",      flag: "🇮🇳", temp: "26°C", icon: "showers",       h: 28, l: 21, humidity: "72%", wind: "14 km/h W",  windDir: 270, windLabel: "W",  windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 55, uvIndex: 6,  rainDesc: "Pleasant monsoon showers cooling the deccan plateau.",      aqi: 50,  desc: "Refreshingly cool for the season; light rain in afternoon.", utcOffset: 5.5, sunriseM: 6*60+8,  sunsetM: 19*60+2  },
  { name: "Nagpur",       region: "Maharashtra, India",      flag: "🇮🇳", temp: "33°C", icon: "thunderstorm",  h: 35, l: 25, humidity: "70%", wind: "20 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "20 km/h", windGust: "45 km/h", rainChance: 75, uvIndex: 5,  rainDesc: "Severe thunderstorm warning; lightning risk is high.",      aqi: 75,  desc: "Stormy skies over the orange city; stay indoors.", stormAlert: true, utcOffset: 5.5, sunriseM: 5*60+55, sunsetM: 18*60+55 },
  /* Delhi */
  { name: "New Delhi",    region: "Delhi (NCT), India",      flag: "🇮🇳", temp: "39°C", icon: "dust",          h: 41, l: 30, humidity: "38%", wind: "25 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "25 km/h", windGust: "40 km/h", rainChance: 10, uvIndex: 11, rainDesc: "Dust storm alert; near-zero visibility on outer roads.",     aqi: 220, desc: "Severe dust storm rolling in from Rajasthan; masks advised.", utcOffset: 5.5, sunriseM: 5*60+38, sunsetM: 19*60+8  },
  /* Karnataka */
  { name: "Bengaluru",    region: "Karnataka, India",        flag: "🇮🇳", temp: "24°C", icon: "partlycloudy",  h: 26, l: 19, humidity: "68%", wind: "10 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 35, uvIndex: 6,  rainDesc: "Classic Bangalore weather; brief evening showers likely.",  aqi: 55,  desc: "Pleasant and breezy — perfect weather in the garden city.",  utcOffset: 5.5, sunriseM: 6*60+0,  sunsetM: 18*60+50 },
  { name: "Mysuru",       region: "Karnataka, India",        flag: "🇮🇳", temp: "27°C", icon: "sunny",         h: 29, l: 20, humidity: "55%", wind: "8 km/h E",   windDir: 90,  windLabel: "E",  windSpeed: "8 km/h",  windGust: "12 km/h", rainChance: 20, uvIndex: 8,  rainDesc: "Clear and sunny; good visibility across the Chamundi hills.", aqi: 35,  desc: "Warm and calm in the city of palaces.",                     utcOffset: 5.5, sunriseM: 6*60+2,  sunsetM: 18*60+52 },
  /* Tamil Nadu */
  { name: "Chennai",      region: "Tamil Nadu, India",       flag: "🇮🇳", temp: "36°C", icon: "mostlyclear",   h: 38, l: 28, humidity: "72%", wind: "16 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "16 km/h", windGust: "24 km/h", rainChance: 25, uvIndex: 9,  rainDesc: "Humid and hazy; isolated evening showers on the coast.",    aqi: 80,  desc: "Sweltering heat along the Marina coast with sea breeze.",   utcOffset: 5.5, sunriseM: 5*60+58, sunsetM: 18*60+38 },
  /* Rajasthan */
  { name: "Jaipur",       region: "Rajasthan, India",        flag: "🇮🇳", temp: "42°C", icon: "sunny",         h: 44, l: 31, humidity: "22%", wind: "18 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 5,  uvIndex: 12, rainDesc: "Blazing desert sun; no rain expected for several days.",    aqi: 100, desc: "Extreme heat in the pink city; stay hydrated.",             utcOffset: 5.5, sunriseM: 6*60+0,  sunsetM: 19*60+20 },
  /* Himachal Pradesh */
  { name: "Shimla",       region: "Himachal Pradesh, India", flag: "🇮🇳", temp: "16°C", icon: "partlycloudy",  h: 18, l: 11, humidity: "75%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 45, uvIndex: 6,  rainDesc: "Partly cloudy; hill showers possible in the afternoon.",    aqi: 20,  desc: "Cool and refreshing at 2200m in the former summer capital.",  utcOffset: 5.5, sunriseM: 5*60+35, sunsetM: 19*60+5  },
  /* Jammu & Kashmir */
  { name: "Srinagar",     region: "Jammu & Kashmir, India",  flag: "🇮🇳", temp: "22°C", icon: "partlycloudy",  h: 24, l: 14, humidity: "65%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 30, uvIndex: 7,  rainDesc: "Mild showers possible; pleasant for Dal Lake excursions.",  aqi: 30,  desc: "Beautiful summer day in the Kashmir valley.",               utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 19*60+20 },
  /* Ladakh */
  { name: "Leh",          region: "Ladakh, India",           flag: "🇮🇳", temp: "8°C",  icon: "sunny",         h: 12, l: 2,  humidity: "28%", wind: "15 km/h W",  windDir: 270, windLabel: "W",  windSpeed: "15 km/h", windGust: "22 km/h", rainChance: 5,  uvIndex: 13, rainDesc: "Bone-dry at high altitude; extreme UV — use SPF 50+.",    aqi: 15,  desc: "Crystal clear skies above 3500m in the cold desert.",       utcOffset: 5.5, sunriseM: 5*60+55, sunsetM: 19*60+25 },
  /* Kerala */
  { name: "Kochi",        region: "Kerala, India",           flag: "🇮🇳", temp: "29°C", icon: "rain",          h: 31, l: 24, humidity: "90%", wind: "20 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 88, uvIndex: 3,  rainDesc: "Heavy southwest monsoon rainfall; flooding in low areas.", aqi: 40,  desc: "Peak monsoon drenches God's Own Country; canals brimming.",  utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 18*60+45 },
  /* Gujarat */
  { name: "Ahmedabad",    region: "Gujarat, India",          flag: "🇮🇳", temp: "40°C", icon: "sunny",         h: 43, l: 30, humidity: "30%", wind: "16 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 8,  uvIndex: 11, rainDesc: "Searing heat; pre-monsoon dry spell continues.",          aqi: 120, desc: "Intense dry heat on the textile city; peak summer conditions.", utcOffset: 5.5, sunriseM: 6*60+20, sunsetM: 19*60+20 },
  /* Goa */
  { name: "Panaji",       region: "Goa, India",              flag: "🇮🇳", temp: "28°C", icon: "showers",       h: 30, l: 24, humidity: "82%", wind: "24 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "24 km/h", windGust: "38 km/h", rainChance: 70, uvIndex: 4,  rainDesc: "Monsoon showers rolling in from the Arabian Sea.",          aqi: 30,  desc: "Lush monsoon greenery; beaches closed for rough seas.",      utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 19*60+5  },
  { name: "Warangal", region: "Andhra Pradesh, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 37, l: 26, humidity: "55%", wind: "10 km/h W", windDir: 270, windLabel: "W", windSpeed: "10 km/h", windGust: "17 km/h", rainChance: 25, rainDesc: "Partly cloudy with afternoon thunder development possible.", aqi: 88, desc: "Warm day with moderate humidity in the fortress city.", utcOffset: 5.5, sunriseM: 5*60+48, sunsetM: 18*60+52 },
  { name: "Kurnool", region: "Andhra Pradesh, India", flag: "🇮🇳", temp: "36°C", icon: "sunny", h: 39, l: 27, humidity: "45%", wind: "11 km/h W", windDir: 270, windLabel: "W", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 12, rainDesc: "Hot and dry over the Kurnool plateau.", aqi: 85, desc: "Scorching heat in the Tungabhadra basin.", utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 18*60+44 },
  { name: "Rajahmundry", region: "Andhra Pradesh, India", flag: "🇮🇳", temp: "35°C", icon: "partlycloudy", h: 37, l: 27, humidity: "68%", wind: "13 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "13 km/h", windGust: "21 km/h", rainChance: 42, rainDesc: "Godavari delta moisture; afternoon showers possible.", aqi: 72, desc: "Warm and humid along the Godavari river.", utcOffset: 5.5, sunriseM: 5*60+18, sunsetM: 18*60+42 },
  { name: "Kakinada", region: "Andhra Pradesh, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 36, l: 26, humidity: "72%", wind: "16 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 48, rainDesc: "Bay moisture building; showers likely in the evening.", aqi: 65, desc: "Coastal port city with rising humidity.", utcOffset: 5.5, sunriseM: 5*60+16, sunsetM: 18*60+42 },
  { name: "Amaravati", region: "Andhra Pradesh, India", flag: "🇮🇳", temp: "37°C", icon: "mostlyclear", h: 40, l: 28, humidity: "50%", wind: "11 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 18, rainDesc: "Hot day at the new capital; light showers unlikely.", aqi: 78, desc: "Warm and sunny at the planned capital city site.", utcOffset: 5.5, sunriseM: 5*60+46, sunsetM: 18*60+40 },
  { name: "Ongole", region: "Andhra Pradesh, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 36, l: 27, humidity: "65%", wind: "15 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 40, rainDesc: "Sea breeze showers possible along the Prakasam coast.", aqi: 68, desc: "Warm coastal weather in the Brahman cattle country.", utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 18*60+38 },

  // Arunachal Pradesh
  { name: "Itanagar", region: "Arunachal Pradesh, India", flag: "🇮🇳", temp: "27°C", icon: "thunderstorm", h: 30, l: 20, humidity: "84%", wind: "7 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "7 km/h", windGust: "12 km/h", rainChance: 70, rainDesc: "Intense downpours triggered by Eastern Himalayan weather systems.", aqi: 35, desc: "Humid foothill climate with heavy afternoon thunderhead clouds.", utcOffset: 5.5, sunriseM: 4*60+40, sunsetM: 17*60+58 },
  { name: "Naharlagun", region: "Arunachal Pradesh, India", flag: "🇮🇳", temp: "28°C", icon: "rain", h: 31, l: 21, humidity: "83%", wind: "8 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 72, rainDesc: "Arunachal monsoon rains drenching the foothills.", aqi: 32, desc: "Heavy rain over the twin city of Itanagar.", utcOffset: 5.5, sunriseM: 4*60+42, sunsetM: 18*60+0 },
  { name: "Pasighat", region: "Arunachal Pradesh, India", flag: "🇮🇳", temp: "28°C", icon: "thunderstorm", h: 31, l: 21, humidity: "85%", wind: "7 km/h E", windDir: 90, windLabel: "E", windSpeed: "7 km/h", windGust: "12 km/h", rainChance: 75, rainDesc: "Siang valley storms lashing the oldest town in Arunachal.", aqi: 30, desc: "Tropical storms at the oldest town in Arunachal Pradesh.", utcOffset: 5.5, sunriseM: 4*60+38, sunsetM: 17*60+56 },
  { name: "Tawang", region: "Arunachal Pradesh, India", flag: "🇮🇳", temp: "10°C", icon: "rain", h: 13, l: 4, humidity: "80%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 60, rainDesc: "High altitude Buddhist town receiving Himalayan showers.", aqi: 18, desc: "Cold and misty near the Himalayan border monastery.", utcOffset: 5.5, sunriseM: 4*60+50, sunsetM: 18*60+5 },

  // Assam
  { name: "Guwahati", region: "Assam, India", flag: "🇮🇳", temp: "29°C", icon: "rain", h: 31, l: 23, humidity: "85%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 90, rainDesc: "Full monsoon rainfall; heavy rain will continue all day and night.", aqi: 55, desc: "Monsoon season in full swing with continuous moderate rainfall.", utcOffset: 5.5, sunriseM: 4*60+44, sunsetM: 18*60+5 },
  { name: "Silchar", region: "Assam, India", flag: "🇮🇳", temp: "29°C", icon: "rain", h: 31, l: 23, humidity: "88%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 82, rainDesc: "Barak valley receiving heavy monsoon rainfall.", aqi: 48, desc: "Heavy monsoon rain over the southern Assam tea belt.", utcOffset: 5.5, sunriseM: 4*60+48, sunsetM: 18*60+8 },
  { name: "Dibrugarh", region: "Assam, India", flag: "🇮🇳", temp: "28°C", icon: "thunderstorm", h: 30, l: 22, humidity: "86%", wind: "13 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "13 km/h", windGust: "21 km/h", rainChance: 85, rainDesc: "Upper Assam receiving intense monsoon thunderstorms.", aqi: 45, desc: "Monsoon storms lashing the tea and oil city.", utcOffset: 5.5, sunriseM: 4*60+42, sunsetM: 18*60+2 },
  { name: "Jorhat", region: "Assam, India", flag: "🇮🇳", temp: "28°C", icon: "thunderstorm", h: 30, l: 22, humidity: "85%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 82, rainDesc: "Thunderstorm cells active over the upper Brahmaputra valley.", aqi: 48, desc: "Wet and stormy in the heart of Assam's tea country.", utcOffset: 5.5, sunriseM: 4*60+42, sunsetM: 18*60+2 },
  { name: "Tezpur", region: "Assam, India", flag: "🇮🇳", temp: "28°C", icon: "rain", h: 30, l: 22, humidity: "84%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 80, rainDesc: "Brahmaputra valley floods at risk; heavy rainfall today.", aqi: 50, desc: "Heavy monsoon rain near the Brahmaputra river banks.", utcOffset: 5.5, sunriseM: 4*60+44, sunsetM: 18*60+4 },
  { name: "Nagaon", region: "Assam, India", flag: "🇮🇳", temp: "29°C", icon: "rain", h: 31, l: 23, humidity: "83%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 78, rainDesc: "Moderate to heavy rainfall in central Assam.", aqi: 50, desc: "Wet monsoon conditions over the central Assam plains.", utcOffset: 5.5, sunriseM: 4*60+44, sunsetM: 18*60+4 },
  { name: "Bongaigaon", region: "Assam, India", flag: "🇮🇳", temp: "29°C", icon: "rain", h: 31, l: 22, humidity: "84%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 78, rainDesc: "Assam monsoon rains continuing over western region.", aqi: 52, desc: "Steady monsoon rainfall over the rail junction town.", utcOffset: 5.5, sunriseM: 4*60+48, sunsetM: 18*60+6 },
  { name: "Dhubri", region: "Assam, India", flag: "🇮🇳", temp: "30°C", icon: "thunderstorm", h: 32, l: 24, humidity: "86%", wind: "13 km/h S", windDir: 180, windLabel: "S", windSpeed: "13 km/h", windGust: "21 km/h", rainChance: 82, rainDesc: "Brahmaputra floodplain receiving intense monsoon rains.", aqi: 55, desc: "Tropical storms over the Bangladesh border district.", utcOffset: 5.5, sunriseM: 4*60+50, sunsetM: 18*60+8 },

  // Bihar
  { name: "Patna", region: "Bihar, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 37, l: 26, humidity: "62%", wind: "13 km/h E", windDir: 90, windLabel: "E", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 45, rainDesc: "Clouds building up; scattered afternoon showers likely over the Gangetic plain.", aqi: 140, desc: "Warm and partly cloudy with scattered clouds in the afternoon.", utcOffset: 5.5, sunriseM: 5*60+10, sunsetM: 18*60+40 },
  { name: "Gaya", region: "Bihar, India", flag: "🇮🇳", temp: "36°C", icon: "mostlyclear", h: 39, l: 27, humidity: "55%", wind: "10 km/h E", windDir: 90, windLabel: "E", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 25, rainDesc: "Hot and partly cloudy; light pre-monsoon showers possible.", aqi: 145, desc: "Warm at the Buddhist pilgrimage town with hazy skies.", utcOffset: 5.5, sunriseM: 5*60+10, sunsetM: 18*60+38 },
  { name: "Muzaffarpur", region: "Bihar, India", flag: "🇮🇳", temp: "33°C", icon: "partlycloudy", h: 36, l: 25, humidity: "65%", wind: "11 km/h E", windDir: 90, windLabel: "E", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 40, rainDesc: "Humid north Bihar plains; showers possible from Nepal moisture.", aqi: 142, desc: "Warm and humid with gathering clouds over litchi country.", utcOffset: 5.5, sunriseM: 5*60+8, sunsetM: 18*60+40 },
  { name: "Bhagalpur", region: "Bihar, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 37, l: 25, humidity: "60%", wind: "12 km/h E", windDir: 90, windLabel: "E", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 38, rainDesc: "Pre-monsoon moisture building along the Ganga.", aqi: 138, desc: "Warm and partly cloudy in the silk city.", utcOffset: 5.5, sunriseM: 5*60+8, sunsetM: 18*60+40 },
  { name: "Darbhanga", region: "Bihar, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 36, l: 26, humidity: "63%", wind: "11 km/h E", windDir: 90, windLabel: "E", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 40, rainDesc: "Mithila plains receiving pre-monsoon shower buildup.", aqi: 140, desc: "Warm and humid over the Mithila cultural heartland.", utcOffset: 5.5, sunriseM: 5*60+8, sunsetM: 18*60+40 },
  { name: "Purnia", region: "Bihar, India", flag: "🇮🇳", temp: "32°C", icon: "rain", h: 34, l: 24, humidity: "75%", wind: "14 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 65, rainDesc: "Northeast Bihar receiving heavy monsoon rains.", aqi: 132, desc: "Heavy rainfall over the Kosi river basin.", utcOffset: 5.5, sunriseM: 5*60+6, sunsetM: 18*60+38 },
  { name: "Begusarai", region: "Bihar, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 37, l: 26, humidity: "62%", wind: "11 km/h E", windDir: 90, windLabel: "E", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 40, rainDesc: "Ganga plains moisture building; showers possible.", aqi: 148, desc: "Hot and humid in the industrial centre of Bihar.", utcOffset: 5.5, sunriseM: 5*60+10, sunsetM: 18*60+40 },
  { name: "Arrah", region: "Bihar, India", flag: "🇮🇳", temp: "36°C", icon: "mostlyclear", h: 39, l: 28, humidity: "50%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 20, rainDesc: "Hot and slightly hazy; isolated shower possible in evening.", aqi: 142, desc: "Warm over the fertile Son river plains.", utcOffset: 5.5, sunriseM: 5*60+14, sunsetM: 18*60+42 },

  // Chhattisgarh
  { name: "Raipur", region: "Chhattisgarh, India", flag: "🇮🇳", temp: "39°C", icon: "sunny", h: 42, l: 29, humidity: "35%", wind: "11 km/h W", windDir: 270, windLabel: "W", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 10, rainDesc: "Dry heatwave conditions persisting across the plains.", aqi: 135, desc: "Intensely hot and dry with strong afternoon solar glare.", utcOffset: 5.5, sunriseM: 5*60+30, sunsetM: 18*60+50 },
  { name: "Bilaspur", region: "Chhattisgarh, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 41, l: 28, humidity: "38%", wind: "10 km/h W", windDir: 270, windLabel: "W", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 12, rainDesc: "Dry heat in the Chhattisgarh plains; isolated shower unlikely.", aqi: 118, desc: "Blazing summer heat over the Chhattisgarh heartland.", utcOffset: 5.5, sunriseM: 5*60+28, sunsetM: 18*60+50 },
  { name: "Korba", region: "Chhattisgarh, India", flag: "🇮🇳", temp: "37°C", icon: "sunny", h: 40, l: 28, humidity: "40%", wind: "9 km/h W", windDir: 270, windLabel: "W", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 10, rainDesc: "Power city heatwave; dry conditions continue.", aqi: 185, desc: "Extremely hot with heavy industrial air pollution.", utcOffset: 5.5, sunriseM: 5*60+28, sunsetM: 18*60+50 },
  { name: "Durg", region: "Chhattisgarh, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 41, l: 28, humidity: "36%", wind: "10 km/h W", windDir: 270, windLabel: "W", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 10, rainDesc: "Dry and hot in the steel city's twin.", aqi: 128, desc: "Scorching heat over the steel city satellite.", utcOffset: 5.5, sunriseM: 5*60+30, sunsetM: 18*60+50 },
  { name: "Jagdalpur", region: "Chhattisgarh, India", flag: "🇮🇳", temp: "30°C", icon: "showers", h: 33, l: 22, humidity: "72%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 55, rainDesc: "Bastar plateau receiving heavy monsoon showers.", aqi: 45, desc: "Cool and wet in the tribal heartland of Bastar.", utcOffset: 5.5, sunriseM: 5*60+36, sunsetM: 18*60+52 },
  { name: "Raigarh", region: "Chhattisgarh, India", flag: "🇮🇳", temp: "36°C", icon: "partlycloudy", h: 39, l: 27, humidity: "48%", wind: "10 km/h E", windDir: 90, windLabel: "E", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 28, rainDesc: "Hot and partly cloudy; afternoon shower possible.", aqi: 155, desc: "Warm in the coal and power hub of Chhattisgarh.", utcOffset: 5.5, sunriseM: 5*60+24, sunsetM: 18*60+46 },

  // Dadra & Nagar Haveli and Daman & Diu
  { name: "Silvassa", region: "Dadra & Nagar Haveli, India", flag: "🇮🇳", temp: "30°C", icon: "rain", h: 32, l: 24, humidity: "82%", wind: "16 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 70, rainDesc: "Ghats-influenced rain drenching the union territory.", aqi: 58, desc: "Monsoon showers over the forested union territory.", utcOffset: 5.5, sunriseM: 6*60+12, sunsetM: 19*60+20 },
  { name: "Daman", region: "Daman & Diu, India", flag: "🇮🇳", temp: "32°C", icon: "rain", h: 34, l: 26, humidity: "80%", wind: "18 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 65, rainDesc: "Coastal monsoon showers lashing the union territory.", aqi: 62, desc: "Rainy and windy along the Gujarat-Maharashtra coast.", utcOffset: 5.5, sunriseM: 6*60+12, sunsetM: 19*60+22 },
  { name: "Diu", region: "Daman & Diu, India", flag: "🇮🇳", temp: "32°C", icon: "partlycloudy", h: 34, l: 26, humidity: "74%", wind: "20 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 40, rainDesc: "Sea breezes keeping showers at bay on the island.", aqi: 40, desc: "Warm coastal conditions on the Gujarat island.", utcOffset: 5.5, sunriseM: 6*60+14, sunsetM: 19*60+24 },

  // Delhi
  { name: "Delhi", region: "Delhi, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 42, l: 30, humidity: "35%", wind: "8 km/h N", windDir: 0, windLabel: "N", windSpeed: "8 km/h", windGust: "14 km/h", rainChance: 10, rainDesc: "Very low rain chance; dry and hazy conditions will persist.", aqi: 320, desc: "Scorching heat with hazy skies and very poor air quality across the city.", utcOffset: 5.5, sunriseM: 5*60+28, sunsetM: 19*60+18 },
  { name: "New Delhi", region: "Delhi, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 42, l: 30, humidity: "35%", wind: "8 km/h N", windDir: 0, windLabel: "N", windSpeed: "8 km/h", windGust: "14 km/h", rainChance: 10, rainDesc: "Scorching pre-monsoon heat over Lutyens Delhi.", aqi: 315, desc: "Extreme summer heat in the national capital area.", utcOffset: 5.5, sunriseM: 5*60+28, sunsetM: 19*60+18 },

  // Goa
  { name: "Panaji", region: "Goa, India", flag: "🇮🇳", temp: "31°C", icon: "thunderstorm", h: 33, l: 26, humidity: "82%", wind: "22 km/h W", windDir: 270, windLabel: "W", windSpeed: "22 km/h", windGust: "35 km/h", rainChance: 75, rainDesc: "Strong maritime winds driving in coastal rain squalls.", aqi: 45, desc: "Tropical humidity with stormy seas and heavy downpours.", utcOffset: 5.5, sunriseM: 6*60+18, sunsetM: 19*60+10 },
  { name: "Margao", region: "Goa, India", flag: "🇮🇳", temp: "30°C", icon: "rain", h: 32, l: 25, humidity: "84%", wind: "20 km/h W", windDir: 270, windLabel: "W", windSpeed: "20 km/h", windGust: "33 km/h", rainChance: 72, rainDesc: "South Goa coast receiving heavy monsoon showers.", aqi: 42, desc: "Heavy rain battered the commercial capital of Goa.", utcOffset: 5.5, sunriseM: 6*60+18, sunsetM: 19*60+10 },
  { name: "Vasco da Gama", region: "Goa, India", flag: "🇮🇳", temp: "30°C", icon: "thunderstorm", h: 32, l: 25, humidity: "83%", wind: "21 km/h W", windDir: 270, windLabel: "W", windSpeed: "21 km/h", windGust: "34 km/h", rainChance: 73, rainDesc: "Coastal storms rolling off the Arabian Sea.", aqi: 44, desc: "Monsoon thunderstorms near Mormugao port.", utcOffset: 5.5, sunriseM: 6*60+19, sunsetM: 19*60+10 },

  // Gujarat
  { name: "Ahmedabad", region: "Gujarat, India", flag: "🇮🇳", temp: "40°C", icon: "sunny", h: 43, l: 32, humidity: "28%", wind: "11 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 5, rainDesc: "Extremely dry desert air; virtually no rain expected today.", aqi: 130, desc: "Very hot and dry with dust haze reducing visibility.", utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 19*60+25 },
  { name: "Surat", region: "Gujarat, India", flag: "🇮🇳", temp: "38°C", icon: "sunny", h: 41, l: 30, humidity: "36%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 8, rainDesc: "Pre-monsoon heat dome keeps conditions very dry.", aqi: 120, desc: "Hot and dry in the diamond and textile city.", utcOffset: 5.5, sunriseM: 6*60+12, sunsetM: 19*60+22 },
  { name: "Vadodara", region: "Gujarat, India", flag: "🇮🇳", temp: "39°C", icon: "sunny", h: 42, l: 30, humidity: "30%", wind: "10 km/h N", windDir: 0, windLabel: "N", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 7, rainDesc: "Intense dry heat; negligible rain probability.", aqi: 125, desc: "Searing heat over Baroda with very low humidity.", utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 19*60+24 },
  { name: "Rajkot", region: "Gujarat, India", flag: "🇮🇳", temp: "41°C", icon: "sunny", h: 44, l: 32, humidity: "25%", wind: "13 km/h W", windDir: 270, windLabel: "W", windSpeed: "13 km/h", windGust: "21 km/h", rainChance: 5, rainDesc: "Dry and extremely hot Saurashtra weather.", aqi: 135, desc: "Punishing heat in Gujarat's Saurashtra region.", utcOffset: 5.5, sunriseM: 6*60+14, sunsetM: 19*60+26 },
  { name: "Gandhinagar", region: "Gujarat, India", flag: "🇮🇳", temp: "40°C", icon: "sunny", h: 43, l: 31, humidity: "29%", wind: "11 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 5, rainDesc: "Capital city of Gujarat baking under relentless summer sun.", aqi: 130, desc: "Hot and dry in the planned capital city.", utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 19*60+25 },
  { name: "Bhavnagar", region: "Gujarat, India", flag: "🇮🇳", temp: "40°C", icon: "sunny", h: 43, l: 31, humidity: "28%", wind: "15 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 6, rainDesc: "Gulf of Khambhat moisture not enough for rain today.", aqi: 128, desc: "Very hot conditions near the shipbreaking coast.", utcOffset: 5.5, sunriseM: 6*60+12, sunsetM: 19*60+24 },
  { name: "Jamnagar", region: "Gujarat, India", flag: "🇮🇳", temp: "39°C", icon: "sunny", h: 42, l: 30, humidity: "32%", wind: "17 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "17 km/h", windGust: "27 km/h", rainChance: 7, rainDesc: "Arabian Sea breezes not bringing rain today.", aqi: 115, desc: "Hot and dry in the brass capital of India.", utcOffset: 5.5, sunriseM: 6*60+15, sunsetM: 19*60+27 },
  { name: "Junagadh", region: "Gujarat, India", flag: "🇮🇳", temp: "38°C", icon: "sunny", h: 41, l: 29, humidity: "30%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 6, rainDesc: "Near the Gir forest; hot and dry today.", aqi: 112, desc: "Scorching heat near the Asiatic lion sanctuary.", utcOffset: 5.5, sunriseM: 6*60+14, sunsetM: 19*60+26 },
  { name: "Anand", region: "Gujarat, India", flag: "🇮🇳", temp: "39°C", icon: "sunny", h: 42, l: 30, humidity: "28%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 6, rainDesc: "Dry Anand district summer heat; no rain today.", aqi: 122, desc: "Hot and sunny in the milk capital of India.", utcOffset: 5.5, sunriseM: 6*60+11, sunsetM: 19*60+24 },
  { name: "Navsari", region: "Gujarat, India", flag: "🇮🇳", temp: "35°C", icon: "partlycloudy", h: 38, l: 27, humidity: "52%", wind: "16 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 30, rainDesc: "Coastal south Gujarat getting pre-monsoon showers.", aqi: 82, desc: "Warm with building coastal humidity near Surat.", utcOffset: 5.5, sunriseM: 6*60+12, sunsetM: 19*60+22 },

  // Haryana
  { name: "Chandigarh", region: "Punjab & Haryana, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 41, l: 27, humidity: "38%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 15, rainDesc: "Hazy, dry conditions typical of pre-monsoon northern plains.", aqi: 160, desc: "Hot summer day with clear skies and moderate dust suspension.", utcOffset: 5.5, sunriseM: 5*60+32, sunsetM: 19*60+22 },
  { name: "Faridabad", region: "Haryana, India", flag: "🇮🇳", temp: "40°C", icon: "mostlyclear", h: 43, l: 30, humidity: "34%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 8, rainDesc: "Delhi NCR heatwave extending; very dry and hazy.", aqi: 195, desc: "Smoggy industrial city on the Delhi border sweltering in heat.", utcOffset: 5.5, sunriseM: 5*60+28, sunsetM: 19*60+18 },
  { name: "Gurgaon", region: "Haryana, India", flag: "🇮🇳", temp: "40°C", icon: "mostlyclear", h: 43, l: 30, humidity: "33%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 8, rainDesc: "Tech hub baking in Delhi NCR peak summer heat.", aqi: 192, desc: "Millennium City sweltering with haze and extreme heat.", utcOffset: 5.5, sunriseM: 5*60+28, sunsetM: 19*60+18 },
  { name: "Ambala", region: "Haryana, India", flag: "🇮🇳", temp: "39°C", icon: "mostlyclear", h: 42, l: 28, humidity: "36%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 12, rainDesc: "Hot and dry cantonment city; minimal shower risk.", aqi: 152, desc: "Scorching heat in the historic military cantonment.", utcOffset: 5.5, sunriseM: 5*60+34, sunsetM: 19*60+24 },
  { name: "Hisar", region: "Haryana, India", flag: "🇮🇳", temp: "43°C", icon: "dust", h: 46, l: 33, humidity: "20%", wind: "20 km/h W", windDir: 270, windLabel: "W", windSpeed: "20 km/h", windGust: "35 km/h", rainChance: 4, rainDesc: "Severe heatwave and dust storm advisory in effect.", aqi: 198, desc: "Extreme Haryana heat with dust storm conditions.", utcOffset: 5.5, sunriseM: 5*60+36, sunsetM: 19*60+26 },
  { name: "Rohtak", region: "Haryana, India", flag: "🇮🇳", temp: "41°C", icon: "sunny", h: 44, l: 31, humidity: "26%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 6, rainDesc: "Hot and very dry over central Haryana plains.", aqi: 172, desc: "Intense summer heat in the heart of Haryana.", utcOffset: 5.5, sunriseM: 5*60+32, sunsetM: 19*60+22 },
  { name: "Karnal", region: "Haryana, India", flag: "🇮🇳", temp: "39°C", icon: "mostlyclear", h: 42, l: 28, humidity: "38%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 12, rainDesc: "Pre-monsoon dry heat over the rice bowl of India.", aqi: 158, desc: "Hot summer day in the scenic Karnal plains.", utcOffset: 5.5, sunriseM: 5*60+33, sunsetM: 19*60+23 },
  { name: "Panipat", region: "Haryana, India", flag: "🇮🇳", temp: "40°C", icon: "mostlyclear", h: 43, l: 29, humidity: "34%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 9, rainDesc: "Scorching plains heat at the city of historic battles.", aqi: 170, desc: "Hot and hazy over the historic battlefield plains.", utcOffset: 5.5, sunriseM: 5*60+30, sunsetM: 19*60+20 },
  { name: "Sonipat", region: "Haryana, India", flag: "🇮🇳", temp: "40°C", icon: "mostlyclear", h: 43, l: 29, humidity: "33%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 8, rainDesc: "Hot and dry near the Delhi NCR periphery.", aqi: 188, desc: "Sweltering heat just north of the national capital.", utcOffset: 5.5, sunriseM: 5*60+29, sunsetM: 19*60+19 },

  // Himachal Pradesh
  { name: "Shimla", region: "Himachal Pradesh, India", flag: "🇮🇳", temp: "14°C", icon: "rain", h: 17, l: 9, humidity: "75%", wind: "12 km/h W", windDir: 270, windLabel: "W", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 65, rainDesc: "Misty hill station; rain showers and fog expected through the morning.", aqi: 22, desc: "Cool and misty with overcast skies and mountain drizzle.", utcOffset: 5.5, sunriseM: 5*60+42, sunsetM: 19*60+28 },
  { name: "Dharamsala", region: "Himachal Pradesh, India", flag: "🇮🇳", temp: "22°C", icon: "rain", h: 25, l: 14, humidity: "80%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "17 km/h", rainChance: 60, rainDesc: "Monsoon rains sweeping the Dhauladhar ranges.", aqi: 28, desc: "Cool Tibetan town with misty Himalayan shower conditions.", utcOffset: 5.5, sunriseM: 5*60+44, sunsetM: 19*60+30 },
  { name: "Manali", region: "Himachal Pradesh, India", flag: "🇮🇳", temp: "12°C", icon: "showers", h: 15, l: 6, humidity: "70%", wind: "11 km/h N", windDir: 0, windLabel: "N", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 50, rainDesc: "Cool mountain valley showers; snow above 3000m.", aqi: 18, desc: "Cool and partly cloudy in the Kullu Valley mountain resort.", utcOffset: 5.5, sunriseM: 5*60+46, sunsetM: 19*60+34 },
  { name: "Kullu", region: "Himachal Pradesh, India", flag: "🇮🇳", temp: "22°C", icon: "showers", h: 25, l: 14, humidity: "68%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "15 km/h", rainChance: 48, rainDesc: "Valley showers expected; Beas river may rise.", aqi: 20, desc: "Warm and partly cloudy in the apple valley.", utcOffset: 5.5, sunriseM: 5*60+44, sunsetM: 19*60+32 },
  { name: "Mandi", region: "Himachal Pradesh, India", flag: "🇮🇳", temp: "26°C", icon: "showers", h: 29, l: 18, humidity: "65%", wind: "8 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 45, rainDesc: "Monsoon building over the Beas valley; showers likely.", aqi: 25, desc: "Pleasant weather with afternoon hill showers.", utcOffset: 5.5, sunriseM: 5*60+43, sunsetM: 19*60+29 },
  { name: "Solan", region: "Himachal Pradesh, India", flag: "🇮🇳", temp: "20°C", icon: "partlycloudy", h: 23, l: 13, humidity: "62%", wind: "9 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 35, rainDesc: "Moderate shower possible in the mushroom city hills.", aqi: 28, desc: "Pleasant hill station weather above the smog line.", utcOffset: 5.5, sunriseM: 5*60+44, sunsetM: 19*60+28 },
  { name: "Bilaspur", region: "Himachal Pradesh, India", flag: "🇮🇳", temp: "30°C", icon: "showers", h: 33, l: 22, humidity: "60%", wind: "8 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 40, rainDesc: "Gobind Sagar lake district receiving monsoon showers.", aqi: 38, desc: "Warm with afternoon showers near the Gobind Sagar reservoir.", utcOffset: 5.5, sunriseM: 5*60+42, sunsetM: 19*60+27 },

  // Jammu & Kashmir / Ladakh
  { name: "Srinagar", region: "Jammu & Kashmir, India", flag: "🇮🇳", temp: "18°C", icon: "partlycloudy", h: 21, l: 12, humidity: "58%", wind: "10 km/h N", windDir: 0, windLabel: "N", windSpeed: "10 km/h", windGust: "15 km/h", rainChance: 30, rainDesc: "Cool valley air; a light shower may drift in from the mountains.", aqi: 30, desc: "Cool and pleasant in the valley with partly cloudy skies.", utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 19*60+38 },
  { name: "Jammu", region: "Jammu & Kashmir, India", flag: "🇮🇳", temp: "36°C", icon: "sunny", h: 38, l: 26, humidity: "45%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 15, rainDesc: "Hot Shiwalik foothills; a brief shower is possible in the evening.", aqi: 80, desc: "Hot summer in the winter capital at the Himalayan foothills.", utcOffset: 5.5, sunriseM: 5*60+52, sunsetM: 19*60+36 },
  { name: "Leh", region: "Ladakh, India", flag: "🇮🇳", temp: "8°C", icon: "mostlyclear", h: 18, l: 2, humidity: "30%", wind: "8 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "8 km/h", windGust: "14 km/h", rainChance: 5, rainDesc: "High altitude desert; virtually no precipitation expected.", aqi: 12, desc: "Cold clear alpine skies in the Himalayan high desert.", utcOffset: 5.5, sunriseM: 5*60+48, sunsetM: 19*60+42 },
  { name: "Kargil", region: "Ladakh, India", flag: "🇮🇳", temp: "6°C", icon: "mostlyclear", h: 16, l: 0, humidity: "28%", wind: "9 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "9 km/h", windGust: "15 km/h", rainChance: 4, rainDesc: "Cold and crisp Himalayan desert; rain extremely rare.", aqi: 10, desc: "Cold and sunny in the remote high-altitude border town.", utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 19*60+40 },
  { name: "Anantnag", region: "Jammu & Kashmir, India", flag: "🇮🇳", temp: "16°C", icon: "showers", h: 19, l: 10, humidity: "65%", wind: "9 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 45, rainDesc: "Kashmir valley showers expected in the afternoon.", aqi: 28, desc: "Cool and green Kashmir valley south of Srinagar.", utcOffset: 5.5, sunriseM: 5*60+52, sunsetM: 19*60+38 },
  { name: "Baramulla", region: "Jammu & Kashmir, India", flag: "🇮🇳", temp: "17°C", icon: "partlycloudy", h: 20, l: 11, humidity: "60%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 32, rainDesc: "Jhelum valley weather; light shower possible.", aqi: 25, desc: "Cool and pleasant in the northwest Kashmir valley.", utcOffset: 5.5, sunriseM: 5*60+52, sunsetM: 19*60+40 },
  { name: "Kupwara", region: "Jammu & Kashmir, India", flag: "🇮🇳", temp: "14°C", icon: "rain", h: 17, l: 8, humidity: "70%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 55, rainDesc: "Valley showers from Himalayan moisture.", aqi: 20, desc: "Cool and partly cloudy near the LOC forests.", utcOffset: 5.5, sunriseM: 5*60+53, sunsetM: 19*60+41 },
  { name: "Udhampur", region: "Jammu & Kashmir, India", flag: "🇮🇳", temp: "28°C", icon: "partlycloudy", h: 31, l: 20, humidity: "55%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 28, rainDesc: "Patnitop hills shower possible in afternoon.", aqi: 45, desc: "Pleasant weather at the Jammu mid-hill station.", utcOffset: 5.5, sunriseM: 5*60+52, sunsetM: 19*60+36 },

  // Jharkhand
  { name: "Ranchi", region: "Jharkhand, India", flag: "🇮🇳", temp: "32°C", icon: "thunderstorm", h: 35, l: 24, humidity: "70%", wind: "14 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 60, rainDesc: "Plateau heating triggering sudden evening thundershowers.", aqi: 75, desc: "Warm afternoon giving way to cool gusty winds and rain.", utcOffset: 5.5, sunriseM: 5*60+12, sunsetM: 18*60+38 },
  { name: "Jamshedpur", region: "Jharkhand, India", flag: "🇮🇳", temp: "32°C", icon: "partlycloudy", h: 35, l: 24, humidity: "65%", wind: "12 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 45, rainDesc: "Steel city humidity rising; afternoon showers likely.", aqi: 158, desc: "Warm industrial city with high humidity and cloud build-up.", utcOffset: 5.5, sunriseM: 5*60+12, sunsetM: 18*60+38 },
  { name: "Dhanbad", region: "Jharkhand, India", flag: "🇮🇳", temp: "33°C", icon: "partlycloudy", h: 36, l: 25, humidity: "62%", wind: "11 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 42, rainDesc: "Coalfield plateau moisture triggering afternoon showers.", aqi: 180, desc: "Warm with hazy mining-area pollution and building rain clouds.", utcOffset: 5.5, sunriseM: 5*60+12, sunsetM: 18*60+38 },
  { name: "Bokaro", region: "Jharkhand, India", flag: "🇮🇳", temp: "33°C", icon: "partlycloudy", h: 36, l: 24, humidity: "64%", wind: "12 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 45, rainDesc: "Steel city plateau moisture building; showers likely.", aqi: 162, desc: "Warm and humid in the Bokaro Steel City.", utcOffset: 5.5, sunriseM: 5*60+12, sunsetM: 18*60+38 },
  { name: "Deoghar", region: "Jharkhand, India", flag: "🇮🇳", temp: "32°C", icon: "partlycloudy", h: 35, l: 24, humidity: "65%", wind: "11 km/h E", windDir: 90, windLabel: "E", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 42, rainDesc: "Pre-monsoon clouds building over the pilgrimage town.", aqi: 90, desc: "Warm and humid near the sacred Baidyanath temple.", utcOffset: 5.5, sunriseM: 5*60+10, sunsetM: 18*60+38 },
  { name: "Hazaribagh", region: "Jharkhand, India", flag: "🇮🇳", temp: "31°C", icon: "showers", h: 34, l: 23, humidity: "68%", wind: "11 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 50, rainDesc: "Plateau showers moving over the tea gardens.", aqi: 72, desc: "Pleasant plateau weather with afternoon showers.", utcOffset: 5.5, sunriseM: 5*60+14, sunsetM: 18*60+40 },

  // Karnataka
  { name: "Bengaluru", region: "Karnataka, India", flag: "🇮🇳", temp: "26°C", icon: "showers", h: 28, l: 20, humidity: "65%", wind: "12 km/h E", windDir: 90, windLabel: "E", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 60, rainDesc: "Light to moderate showers expected in the evening. Keep an umbrella handy.", aqi: 80, desc: "Pleasant weather with light showers expected in the evening hours.", utcOffset: 5.5, sunriseM: 6*60+8, sunsetM: 18*60+48 },
  { name: "Mysuru", region: "Karnataka, India", flag: "🇮🇳", temp: "27°C", icon: "mostlyclear", h: 29, l: 19, humidity: "58%", wind: "11 km/h E", windDir: 90, windLabel: "E", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 20, rainDesc: "Mostly pleasant; isolated evening shower can't be ruled out.", aqi: 55, desc: "Comfortable weather in the Palace City with clear morning skies.", utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 18*60+46 },
  { name: "Mangaluru", region: "Karnataka, India", flag: "🇮🇳", temp: "30°C", icon: "rain", h: 32, l: 25, humidity: "86%", wind: "18 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 75, rainDesc: "Southwest monsoon rains pounding the coastal ghats.", aqi: 40, desc: "Heavy monsoon rainfall along the Karnataka coastline.", utcOffset: 5.5, sunriseM: 6*60+14, sunsetM: 18*60+44 },
  { name: "Hubli", region: "Karnataka, India", flag: "🇮🇳", temp: "28°C", icon: "showers", h: 31, l: 21, humidity: "62%", wind: "12 km/h W", windDir: 270, windLabel: "W", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 45, rainDesc: "Inland Karnataka receiving pre-monsoon showers.", aqi: 72, desc: "Warm and partly cloudy with scattered showers possible.", utcOffset: 5.5, sunriseM: 6*60+8, sunsetM: 18*60+50 },
  { name: "Belagavi", region: "Karnataka, India", flag: "🇮🇳", temp: "25°C", icon: "showers", h: 28, l: 18, humidity: "70%", wind: "13 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 55, rainDesc: "Western Ghats moisture reaching the plateau city.", aqi: 60, desc: "Cool and showery in the gateway to north Karnataka.", utcOffset: 5.5, sunriseM: 6*60+9, sunsetM: 18*60+50 },
  { name: "Davanagere", region: "Karnataka, India", flag: "🇮🇳", temp: "28°C", icon: "partlycloudy", h: 31, l: 20, humidity: "55%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 30, rainDesc: "Central Karnataka showers possible in evening.", aqi: 68, desc: "Warm and partly cloudy in the cotton metropolis.", utcOffset: 5.5, sunriseM: 6*60+9, sunsetM: 18*60+49 },
  { name: "Shivamogga", region: "Karnataka, India", flag: "🇮🇳", temp: "26°C", icon: "rain", h: 29, l: 19, humidity: "80%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 70, rainDesc: "Malnad region drenched in heavy monsoon showers.", aqi: 38, desc: "Very wet and green as the Western Ghats get soaked.", utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 18*60+48 },
  { name: "Tumkur", region: "Karnataka, India", flag: "🇮🇳", temp: "27°C", icon: "partlycloudy", h: 30, l: 19, humidity: "60%", wind: "10 km/h E", windDir: 90, windLabel: "E", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 35, rainDesc: "Deccan plateau shower possible by evening.", aqi: 65, desc: "Warm and pleasant near the coconut grove country.", utcOffset: 5.5, sunriseM: 6*60+8, sunsetM: 18*60+48 },
  { name: "Bidar", region: "Karnataka, India", flag: "🇮🇳", temp: "30°C", icon: "partlycloudy", h: 33, l: 22, humidity: "52%", wind: "11 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 25, rainDesc: "North Karnataka plateau receiving pre-monsoon showers.", aqi: 72, desc: "Warm and partly cloudy at the historical fortress city.", utcOffset: 5.5, sunriseM: 5*60+58, sunsetM: 18*60+54 },
  { name: "Vijayapura", region: "Karnataka, India", flag: "🇮🇳", temp: "30°C", icon: "partlycloudy", h: 33, l: 22, humidity: "48%", wind: "12 km/h W", windDir: 270, windLabel: "W", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 20, rainDesc: "Dry Deccan plateau; limited rain activity.", aqi: 75, desc: "Warm and partly cloudy at the Gol Gumbaz city.", utcOffset: 5.5, sunriseM: 6*60+0, sunsetM: 18*60+54 },

  // Kerala
  { name: "Thiruvananthapuram", region: "Kerala, India", flag: "🇮🇳", temp: "30°C", icon: "rain", h: 32, l: 25, humidity: "88%", wind: "22 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "22 km/h", windGust: "35 km/h", rainChance: 80, rainDesc: "Southwest monsoon active; heavy rainfall and strong gusty winds.", aqi: 48, desc: "Tropical monsoon rains lashing the coast with strong south-westerlies.", utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 18*60+28 },
  { name: "Kochi", region: "Kerala, India", flag: "🇮🇳", temp: "29°C", icon: "thunderstorm", h: 31, l: 24, humidity: "90%", wind: "20 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "20 km/h", windGust: "34 km/h", rainChance: 85, rainDesc: "Intense monsoon showers; rough seas expected along the backwaters.", aqi: 42, desc: "Heavy monsoon downpours with thunderstorms along the Kerala coast.", utcOffset: 5.5, sunriseM: 6*60+12, sunsetM: 18*60+30 },
  { name: "Kozhikode", region: "Kerala, India", flag: "🇮🇳", temp: "29°C", icon: "rain", h: 31, l: 24, humidity: "88%", wind: "19 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "19 km/h", windGust: "30 km/h", rainChance: 82, rainDesc: "Heavy monsoon rain drenching the Malabar coast.", aqi: 44, desc: "Continuous monsoon showers at Calicut with rough sea conditions.", utcOffset: 5.5, sunriseM: 6*60+12, sunsetM: 18*60+28 },
  { name: "Thrissur", region: "Kerala, India", flag: "🇮🇳", temp: "29°C", icon: "thunderstorm", h: 31, l: 24, humidity: "89%", wind: "17 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "17 km/h", windGust: "28 km/h", rainChance: 80, rainDesc: "Active thunderstorm cells rolling in from the Arabian Sea.", aqi: 45, desc: "Stormy monsoon conditions with frequent lightning and heavy rain.", utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 18*60+30 },
  { name: "Kollam", region: "Kerala, India", flag: "🇮🇳", temp: "30°C", icon: "rain", h: 32, l: 25, humidity: "87%", wind: "20 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 78, rainDesc: "Monsoon bands sweeping across the Kollam coast.", aqi: 46, desc: "Monsoon rains lashing the cashew coast with strong winds.", utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 18*60+28 },
  { name: "Kannur", region: "Kerala, India", flag: "🇮🇳", temp: "29°C", icon: "thunderstorm", h: 31, l: 24, humidity: "87%", wind: "18 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "18 km/h", windGust: "29 km/h", rainChance: 80, rainDesc: "North Malabar receiving heavy monsoon showers.", aqi: 43, desc: "Heavy monsoon rainfall in the land of looms and lores.", utcOffset: 5.5, sunriseM: 6*60+11, sunsetM: 18*60+29 },
  { name: "Palakkad", region: "Kerala, India", flag: "🇮🇳", temp: "31°C", icon: "rain", h: 33, l: 25, humidity: "78%", wind: "16 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 65, rainDesc: "Palakkad gap channeling monsoon rains into Kerala.", aqi: 55, desc: "Heavy monsoon rains through the famous Palakkad gap.", utcOffset: 5.5, sunriseM: 6*60+9, sunsetM: 18*60+29 },
  { name: "Alappuzha", region: "Kerala, India", flag: "🇮🇳", temp: "29°C", icon: "thunderstorm", h: 31, l: 24, humidity: "91%", wind: "19 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "19 km/h", windGust: "31 km/h", rainChance: 82, rainDesc: "Backwater town receiving heavy monsoon downpours.", aqi: 40, desc: "Stormy monsoon over the Venice of the East.", utcOffset: 5.5, sunriseM: 6*60+11, sunsetM: 18*60+28 },
  { name: "Malappuram", region: "Kerala, India", flag: "🇮🇳", temp: "29°C", icon: "rain", h: 31, l: 24, humidity: "88%", wind: "17 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "17 km/h", windGust: "27 km/h", rainChance: 78, rainDesc: "Malabar interior receiving continuous monsoon showers.", aqi: 46, desc: "Steady monsoon rainfall over the Malabar inland region.", utcOffset: 5.5, sunriseM: 6*60+11, sunsetM: 18*60+29 },
  { name: "Kottayam", region: "Kerala, India", flag: "🇮🇳", temp: "28°C", icon: "thunderstorm", h: 30, l: 23, humidity: "90%", wind: "16 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 82, rainDesc: "Rubber plantation hills receiving heavy monsoon downpours.", aqi: 38, desc: "Heavy monsoon storms in the land of letters, latex and lakes.", utcOffset: 5.5, sunriseM: 6*60+11, sunsetM: 18*60+29 },
  { name: "Idukki", region: "Kerala, India", flag: "🇮🇳", temp: "20°C", icon: "rain", h: 23, l: 14, humidity: "92%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 85, rainDesc: "High altitude tea garden district drenched in monsoon rains.", aqi: 18, desc: "Very wet and cool in the Munnar hill district.", utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 18*60+28 },
  { name: "Kasaragod", region: "Kerala, India", flag: "🇮🇳", temp: "29°C", icon: "thunderstorm", h: 31, l: 24, humidity: "87%", wind: "19 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "19 km/h", windGust: "30 km/h", rainChance: 80, rainDesc: "Northernmost Kerala receiving strong monsoon showers.", aqi: 42, desc: "Heavy monsoon rains in the land of seven languages.", utcOffset: 5.5, sunriseM: 6*60+12, sunsetM: 18*60+29 },

  // Lakshadweep
  { name: "Kavaratti", region: "Lakshadweep, India", flag: "🇮🇳", temp: "29°C", icon: "thunderstorm", h: 31, l: 24, humidity: "86%", wind: "20 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 78, rainDesc: "Arabian Sea monsoon waves bringing heavy rain to the atoll.", aqi: 20, desc: "Tropical monsoon storm over the coral island capital.", utcOffset: 5.5, sunriseM: 6*60+14, sunsetM: 18*60+32 },

  // Madhya Pradesh
  { name: "Bhopal", region: "Madhya Pradesh, India", flag: "🇮🇳", temp: "33°C", icon: "mostlyclear", h: 36, l: 25, humidity: "52%", wind: "11 km/h W", windDir: 270, windLabel: "W", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 25, rainDesc: "Warm and sunny; a brief evening shower is possible near the lakes.", aqi: 90, desc: "Warm and sunny with a gentle breeze over the city of lakes.", utcOffset: 5.5, sunriseM: 5*60+55, sunsetM: 19*60+5 },
  { name: "Indore", region: "Madhya Pradesh, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 37, l: 26, humidity: "48%", wind: "13 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 28, rainDesc: "Pre-monsoon clouds gathering; a brief shower possible late afternoon.", aqi: 100, desc: "Warm and partly cloudy with pre-monsoon humidity building.", utcOffset: 5.5, sunriseM: 5*60+58, sunsetM: 19*60+8 },
  { name: "Gwalior", region: "Madhya Pradesh, India", flag: "🇮🇳", temp: "40°C", icon: "mostlyclear", h: 43, l: 30, humidity: "30%", wind: "10 km/h N", windDir: 0, windLabel: "N", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 8, rainDesc: "Blazing heat over the fortress city; very little moisture in the air.", aqi: 150, desc: "Scorching conditions at the historic Gwalior fort.", utcOffset: 5.5, sunriseM: 5*60+30, sunsetM: 18*60+58 },
  { name: "Jabalpur", region: "Madhya Pradesh, India", flag: "🇮🇳", temp: "36°C", icon: "partlycloudy", h: 39, l: 27, humidity: "50%", wind: "11 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 30, rainDesc: "Clouds drifting over the Narmada valley; afternoon shower chance.", aqi: 85, desc: "Warm and partly cloudy over the marble rocks country.", utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 18*60+55 },
  { name: "Ujjain", region: "Madhya Pradesh, India", flag: "🇮🇳", temp: "36°C", icon: "sunny", h: 39, l: 27, humidity: "38%", wind: "11 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 10, rainDesc: "Hot pilgrimage city; dry conditions before monsoon.", aqi: 108, desc: "Blistering heat at the holy city of Mahakal.", utcOffset: 5.5, sunriseM: 5*60+56, sunsetM: 19*60+6 },
  { name: "Sagar", region: "Madhya Pradesh, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 37, l: 26, humidity: "50%", wind: "11 km/h W", windDir: 270, windLabel: "W", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 28, rainDesc: "Pre-monsoon clouds over central MP; afternoon shower chance.", aqi: 92, desc: "Warm and partly cloudy in the heart of Madhya Pradesh.", utcOffset: 5.5, sunriseM: 5*60+52, sunsetM: 19*60+0 },
  { name: "Satna", region: "Madhya Pradesh, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 41, l: 28, humidity: "35%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 8, rainDesc: "Hot and dry near the Maikal hills; rain unlikely.", aqi: 115, desc: "Intense heat in the Vindhya plateau region.", utcOffset: 5.5, sunriseM: 5*60+44, sunsetM: 18*60+56 },
  { name: "Rewa", region: "Madhya Pradesh, India", flag: "🇮🇳", temp: "39°C", icon: "sunny", h: 42, l: 29, humidity: "32%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 6, rainDesc: "Northern MP heatwave; very dry conditions.", aqi: 120, desc: "Scorching Vindhyan plateau heat in the solar city.", utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 18*60+54 },
  { name: "Chhindwara", region: "Madhya Pradesh, India", flag: "🇮🇳", temp: "31°C", icon: "partlycloudy", h: 34, l: 23, humidity: "55%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 35, rainDesc: "Satpura range showers expected in the afternoon.", aqi: 78, desc: "Moderate heat with pleasant Satpura breeze.", utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 18*60+58 },

  // Maharashtra
  { name: "Mumbai", region: "Maharashtra, India", flag: "🇮🇳", temp: "32°C", icon: "partlycloudy", h: 35, l: 28, humidity: "72%", wind: "20 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 35, rainDesc: "Partly cloudy skies; brief coastal showers possible in the evening.", aqi: 110, desc: "Hot and humid with partly cloudy skies and a pleasant coastal breeze.", utcOffset: 5.5, sunriseM: 6*60+9, sunsetM: 19*60+20 },
  { name: "Pune", region: "Maharashtra, India", flag: "🇮🇳", temp: "28°C", icon: "mostlyclear", h: 31, l: 22, humidity: "60%", wind: "14 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 30, rainDesc: "Mild overcast conditions; a brief shower may pass in the afternoon.", aqi: 70, desc: "Mild and comfortable with occasional clouds passing through.", utcOffset: 5.5, sunriseM: 6*60+5, sunsetM: 19*60+10 },
  { name: "Nagpur", region: "Maharashtra, India", flag: "🇮🇳", temp: "36°C", icon: "mostlyclear", h: 39, l: 28, humidity: "44%", wind: "9 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 15, rainDesc: "Hot and dry in Central India; slight pre-monsoon build-up possible.", aqi: 115, desc: "Scorching central Indian heat with hazy skies.", utcOffset: 5.5, sunriseM: 5*60+48, sunsetM: 18*60+55 },
  { name: "Nashik", region: "Maharashtra, India", flag: "🇮🇳", temp: "32°C", icon: "partlycloudy", h: 35, l: 24, humidity: "55%", wind: "13 km/h W", windDir: 270, windLabel: "W", windSpeed: "13 km/h", windGust: "21 km/h", rainChance: 35, rainDesc: "Ghats moisture bringing cloudy spells; afternoon shower likely.", aqi: 75, desc: "Warm weather with grape-vineyard breezes and building clouds.", utcOffset: 5.5, sunriseM: 6*60+8, sunsetM: 19*60+12 },
  { name: "Aurangabad", region: "Maharashtra, India", flag: "🇮🇳", temp: "34°C", icon: "mostlyclear", h: 37, l: 25, humidity: "45%", wind: "11 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 15, rainDesc: "Hot dry interiors near the Ajanta caves; very little rain today.", aqi: 95, desc: "Warm and sunny with a light dry breeze near the historic caves.", utcOffset: 5.5, sunriseM: 6*60+4, sunsetM: 19*60+2 },
  { name: "Solapur", region: "Maharashtra, India", flag: "🇮🇳", temp: "35°C", icon: "sunny", h: 38, l: 27, humidity: "40%", wind: "12 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 10, rainDesc: "Dry Deccan plateau conditions; very little rain expected.", aqi: 98, desc: "Hot and sunny over the textile city.", utcOffset: 5.5, sunriseM: 6*60+4, sunsetM: 19*60+6 },
  { name: "Kolhapur", region: "Maharashtra, India", flag: "🇮🇳", temp: "29°C", icon: "showers", h: 32, l: 22, humidity: "68%", wind: "15 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 55, rainDesc: "Western Ghats showers reaching the city in the afternoon.", aqi: 60, desc: "Comfortable with occasional Western Ghats cloud bursts.", utcOffset: 5.5, sunriseM: 6*60+10, sunsetM: 19*60+10 },
  { name: "Thane", region: "Maharashtra, India", flag: "🇮🇳", temp: "31°C", icon: "rain", h: 33, l: 26, humidity: "82%", wind: "16 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 68, rainDesc: "Heavy rain expected as Mumbai's twin city gets the monsoon full-force.", aqi: 105, desc: "Humid satellite city with continuous monsoon rain bands.", utcOffset: 5.5, sunriseM: 6*60+8, sunsetM: 19*60+20 },
  { name: "Navi Mumbai", region: "Maharashtra, India", flag: "🇮🇳", temp: "30°C", icon: "thunderstorm", h: 33, l: 25, humidity: "83%", wind: "18 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 72, rainDesc: "Coastal thunderstorm system pushing inland with heavy bursts.", aqi: 100, desc: "Stormy monsoon weather along the planned city's creek-shores.", utcOffset: 5.5, sunriseM: 6*60+9, sunsetM: 19*60+20 },
  { name: "Amravati", region: "Maharashtra, India", flag: "🇮🇳", temp: "36°C", icon: "mostlyclear", h: 39, l: 27, humidity: "42%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 12, rainDesc: "Hot Vidarbha conditions; dry weather prevailing.", aqi: 108, desc: "Scorching heat in the Vidarbha orange belt.", utcOffset: 5.5, sunriseM: 5*60+48, sunsetM: 18*60+57 },
  { name: "Latur", region: "Maharashtra, India", flag: "🇮🇳", temp: "34°C", icon: "sunny", h: 37, l: 25, humidity: "38%", wind: "11 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 10, rainDesc: "Dry Marathwada conditions.", aqi: 95, desc: "Hot and sunny over the drought-prone Marathwada region.", utcOffset: 5.5, sunriseM: 6*60+2, sunsetM: 19*60+3 },
  { name: "Akola", region: "Maharashtra, India", flag: "🇮🇳", temp: "37°C", icon: "mostlyclear", h: 40, l: 27, humidity: "36%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "15 km/h", rainChance: 10, rainDesc: "Vidarbha heat; dry conditions in the cotton city.", aqi: 110, desc: "Intense heat in the cotton growing heartland.", utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 18*60+58 },

  // Manipur
  { name: "Imphal", region: "Manipur, India", flag: "🇮🇳", temp: "26°C", icon: "thunderstorm", h: 29, l: 18, humidity: "80%", wind: "8 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "8 km/h", windGust: "14 km/h", rainChance: 70, rainDesc: "Convective thundershowers breaking out across the valley.", aqi: 42, desc: "Warm and humid valley weather broken by evening storms.", utcOffset: 5.5, sunriseM: 4*60+52, sunsetM: 18*60+5 },
  { name: "Thoubal", region: "Manipur, India", flag: "🇮🇳", temp: "25°C", icon: "rain", h: 28, l: 17, humidity: "82%", wind: "8 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 68, rainDesc: "Valley showers drenching the Thoubal district.", aqi: 40, desc: "Wet and warm in the valley southeast of Imphal.", utcOffset: 5.5, sunriseM: 4*60+52, sunsetM: 18*60+4 },
  { name: "Bishnupur", region: "Manipur, India", flag: "🇮🇳", temp: "25°C", icon: "thunderstorm", h: 28, l: 18, humidity: "81%", wind: "7 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "7 km/h", windGust: "12 km/h", rainChance: 65, rainDesc: "Ancient temple town receiving valley thunderstorms.", aqi: 38, desc: "Humid temple valley weather with afternoon storms.", utcOffset: 5.5, sunriseM: 4*60+53, sunsetM: 18*60+5 },
  { name: "Senapati", region: "Manipur, India", flag: "🇮🇳", temp: "22°C", icon: "rain", h: 24, l: 15, humidity: "85%", wind: "9 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "9 km/h", windGust: "15 km/h", rainChance: 75, rainDesc: "Hilly Manipur district receiving steady hill rains.", aqi: 35, desc: "Cool hill district weather with persistent drizzle.", utcOffset: 5.5, sunriseM: 4*60+54, sunsetM: 18*60+6 },

  // Meghalaya
  { name: "Shillong", region: "Meghalaya, India", flag: "🇮🇳", temp: "20°C", icon: "rain", h: 22, l: 15, humidity: "90%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 85, rainDesc: "Dense orographic fog and constant light to moderate rain.", aqi: 20, desc: "Cool, misty, and highly humid highland environment.", utcOffset: 5.5, sunriseM: 4*60+55, sunsetM: 18*60+8 },
  { name: "Tura", region: "Meghalaya, India", flag: "🇮🇳", temp: "25°C", icon: "rain", h: 27, l: 18, humidity: "88%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "17 km/h", rainChance: 80, rainDesc: "Western Meghalaya plateau receiving heavy orographic rain.", aqi: 22, desc: "Cool and very wet in the Garo Hills.", utcOffset: 5.5, sunriseM: 5*60+0, sunsetM: 18*60+10 },
  { name: "Cherrapunji", region: "Meghalaya, India", flag: "🇮🇳", temp: "17°C", icon: "rain", h: 19, l: 12, humidity: "94%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 95, rainDesc: "World's wettest place living up to its legend; torrential rain.", aqi: 12, desc: "Continuous rain in the wettest place on Earth.", utcOffset: 5.5, sunriseM: 4*60+56, sunsetM: 18*60+8 },

  // Mizoram
  { name: "Aizawl", region: "Mizoram, India", flag: "🇮🇳", temp: "23°C", icon: "rain", h: 25, l: 16, humidity: "88%", wind: "11 km/h S", windDir: 180, windLabel: "S", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 75, rainDesc: "Steady precipitation over the ridge lines with low clouds.", aqi: 30, desc: "Cool, rainy, and breezy mountain atmosphere.", utcOffset: 5.5, sunriseM: 5*60+0, sunsetM: 18*60+15 },
  { name: "Lunglei", region: "Mizoram, India", flag: "🇮🇳", temp: "22°C", icon: "rain", h: 24, l: 15, humidity: "87%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 75, rainDesc: "Southern Mizoram receiving consistent monsoon rain.", aqi: 28, desc: "Cool and very wet in the Tlawng river valley.", utcOffset: 5.5, sunriseM: 5*60+1, sunsetM: 18*60+14 },

  // Nagaland
  { name: "Kohima", region: "Nagaland, India", flag: "🇮🇳", temp: "21°C", icon: "showers", h: 23, l: 14, humidity: "82%", wind: "9 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "9 km/h", windGust: "15 km/h", rainChance: 65, rainDesc: "Scattered highland showers with damp, misty conditions.", aqi: 25, desc: "Crisp and overcast mountain weather with periodic drizzle.", utcOffset: 5.5, sunriseM: 4*60+58, sunsetM: 18*60+10 },
  { name: "Dimapur", region: "Nagaland, India", flag: "🇮🇳", temp: "29°C", icon: "rain", h: 31, l: 23, humidity: "82%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 72, rainDesc: "Gateway to Nagaland receiving monsoon showers.", aqi: 45, desc: "Humid and showery at the Nagaland plains entry point.", utcOffset: 5.5, sunriseM: 4*60+56, sunsetM: 18*60+10 },
  { name: "Mokokchung", region: "Nagaland, India", flag: "🇮🇳", temp: "20°C", icon: "showers", h: 22, l: 13, humidity: "80%", wind: "8 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 62, rainDesc: "Naga hill village receiving scattered highland showers.", aqi: 22, desc: "Cool and partly cloudy in the Ao Naga heartland.", utcOffset: 5.5, sunriseM: 4*60+57, sunsetM: 18*60+9 },

  // Odisha
  { name: "Bhubaneswar", region: "Odisha, India", flag: "🇮🇳", temp: "39°C", icon: "thunderstorm", h: 36, l: 27, humidity: "74%", wind: "16 km/h S", windDir: 180, windLabel: "S", windSpeed: "16 km/h", windGust: "30 km/h", rainChance: 75, rainDesc: "Bay of Bengal moisture fueling intense evening thunderstorms.", aqi: 75, desc: "Humid and warm with evening thunderstorms approaching from the bay.", utcOffset: 5.5, sunriseM: 5*60+5, sunsetM: 18*60+35 },
  { name: "Cuttack", region: "Odisha, India", flag: "🇮🇳", temp: "37°C", icon: "partlycloudy", h: 39, l: 28, humidity: "70%", wind: "14 km/h S", windDir: 180, windLabel: "S", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 48, rainDesc: "Humid Mahanadi delta; afternoon showers likely.", aqi: 80, desc: "Warm and humid in the Millenium City of Odisha.", utcOffset: 5.5, sunriseM: 5*60+5, sunsetM: 18*60+35 },
  { name: "Puri", region: "Odisha, India", flag: "🇮🇳", temp: "33°C", icon: "thunderstorm", h: 35, l: 27, humidity: "80%", wind: "18 km/h S", windDir: 180, windLabel: "S", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 70, rainDesc: "Bay of Bengal waves and pre-monsoon storms at the pilgrim beach.", aqi: 55, desc: "Stormy conditions at the Jagannath temple town.", utcOffset: 5.5, sunriseM: 5*60+5, sunsetM: 18*60+35 },
  { name: "Rourkela", region: "Odisha, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 37, l: 26, humidity: "55%", wind: "11 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 35, rainDesc: "Steel city heating; afternoon showers possible.", aqi: 130, desc: "Warm industrial city with moderate humidity.", utcOffset: 5.5, sunriseM: 5*60+10, sunsetM: 18*60+40 },
  { name: "Sambalpur", region: "Odisha, India", flag: "🇮🇳", temp: "36°C", icon: "sunny", h: 39, l: 27, humidity: "45%", wind: "10 km/h W", windDir: 270, windLabel: "W", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 15, rainDesc: "Hot interior Odisha; dry conditions persist.", aqi: 85, desc: "Hot and dry at the Hirakud dam vicinity.", utcOffset: 5.5, sunriseM: 5*60+10, sunsetM: 18*60+40 },
  { name: "Berhampur", region: "Odisha, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 36, l: 27, humidity: "70%", wind: "15 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 50, rainDesc: "Bay of Bengal moisture reaching the coastal silk city.", aqi: 65, desc: "Warm and humid in the silk city of Odisha.", utcOffset: 5.5, sunriseM: 5*60+6, sunsetM: 18*60+36 },

  // Puducherry
  { name: "Puducherry", region: "Puducherry, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 36, l: 28, humidity: "78%", wind: "18 km/h E", windDir: 90, windLabel: "E", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 30, rainDesc: "Sticky coastal atmosphere with light passing maritime clouds.", aqi: 70, desc: "Hot and humid coastal day with a steady sea breeze.", utcOffset: 5.5, sunriseM: 5*60+58, sunsetM: 18*60+42 },

  // Punjab
  { name: "Amritsar", region: "Punjab, India", flag: "🇮🇳", temp: "40°C", icon: "sunny", h: 43, l: 31, humidity: "32%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "17 km/h", rainChance: 8, rainDesc: "Hot and mostly dry; minimal rain probability this time of year.", aqi: 145, desc: "Scorching summer heat at the Golden Temple with clear skies.", utcOffset: 5.5, sunriseM: 5*60+30, sunsetM: 19*60+28 },
  { name: "Ludhiana", region: "Punjab, India", flag: "🇮🇳", temp: "39°C", icon: "mostlyclear", h: 42, l: 28, humidity: "36%", wind: "12 km/h W", windDir: 270, windLabel: "W", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 10, rainDesc: "Dry and hazy Punjab plains; distant thunder possible at night.", aqi: 155, desc: "Hot industrial city with dusty haze and relentless sunshine.", utcOffset: 5.5, sunriseM: 5*60+32, sunsetM: 19*60+26 },
  { name: "Jalandhar", region: "Punjab, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 41, l: 27, humidity: "38%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 12, rainDesc: "Pre-monsoon dryness; very slim chance of late-night showers.", aqi: 148, desc: "Hot and dusty summer day over the Punjab heartland.", utcOffset: 5.5, sunriseM: 5*60+34, sunsetM: 19*60+24 },
  { name: "Patiala", region: "Punjab, India", flag: "🇮🇳", temp: "39°C", icon: "mostlyclear", h: 42, l: 28, humidity: "34%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 8, rainDesc: "Dry summer heat in the royal city.", aqi: 152, desc: "Scorching heat in the royal Punjab city.", utcOffset: 5.5, sunriseM: 5*60+32, sunsetM: 19*60+24 },
  { name: "Bathinda", region: "Punjab, India", flag: "🇮🇳", temp: "41°C", icon: "sunny", h: 44, l: 30, humidity: "28%", wind: "12 km/h W", windDir: 270, windLabel: "W", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 5, rainDesc: "Desert-like conditions in southwest Punjab.", aqi: 158, desc: "Very hot and dry in the thermal power city.", utcOffset: 5.5, sunriseM: 5*60+34, sunsetM: 19*60+26 },
  { name: "Pathankot", region: "Punjab, India", flag: "🇮🇳", temp: "37°C", icon: "partlycloudy", h: 40, l: 26, humidity: "42%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 18, rainDesc: "Foothills of Himachal receiving pre-monsoon cloud buildup.", aqi: 105, desc: "Warm gateway to the Himalayas with some cloud cover.", utcOffset: 5.5, sunriseM: 5*60+35, sunsetM: 19*60+28 },
  { name: "Gurdaspur", region: "Punjab, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 41, l: 27, humidity: "38%", wind: "9 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 10, rainDesc: "Hot north Punjab summer; dry conditions prevail.", aqi: 142, desc: "Hot and hazy near the Ravi river plains.", utcOffset: 5.5, sunriseM: 5*60+33, sunsetM: 19*60+27 },

  // Rajasthan
  { name: "Jaipur", region: "Rajasthan, India", flag: "🇮🇳", temp: "42°C", icon: "dust", h: 45, l: 34, humidity: "22%", wind: "22 km/h W", windDir: 270, windLabel: "W", windSpeed: "22 km/h", windGust: "38 km/h", rainChance: 8, rainDesc: "Hot dry winds with sandstorm risk; negligible rain probability.", aqi: 160, desc: "Extremely hot desert conditions with sandstorm risk in the afternoon.", utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 19*60+20 },
  { name: "Jodhpur", region: "Rajasthan, India", flag: "🇮🇳", temp: "43°C", icon: "dust", h: 46, l: 35, humidity: "18%", wind: "25 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "25 km/h", windGust: "42 km/h", rainChance: 5, rainDesc: "Intense desert winds bringing dust clouds; no rain today.", aqi: 185, desc: "Extreme desert heat with blowing sand reducing visibility in the Blue City.", utcOffset: 5.5, sunriseM: 5*60+44, sunsetM: 19*60+18 },
  { name: "Udaipur", region: "Rajasthan, India", flag: "🇮🇳", temp: "38°C", icon: "sunny", h: 41, l: 29, humidity: "30%", wind: "9 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 10, rainDesc: "Hot and dry around the lakes; brief pre-monsoon shower unlikely.", aqi: 95, desc: "Shimmering heat over the City of Lakes with clear blue skies.", utcOffset: 5.5, sunriseM: 5*60+46, sunsetM: 19*60+16 },
  { name: "Ajmer", region: "Rajasthan, India", flag: "🇮🇳", temp: "41°C", icon: "sunny", h: 44, l: 32, humidity: "24%", wind: "14 km/h W", windDir: 270, windLabel: "W", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 6, rainDesc: "Punishing Rajasthani heat; no rain forecast.", aqi: 140, desc: "Intense desert heat with a dry westerly wind.", utcOffset: 5.5, sunriseM: 5*60+42, sunsetM: 19*60+22 },
  { name: "Bikaner", region: "Rajasthan, India", flag: "🇮🇳", temp: "44°C", icon: "dust", h: 47, l: 36, humidity: "16%", wind: "28 km/h W", windDir: 270, windLabel: "W", windSpeed: "28 km/h", windGust: "46 km/h", rainChance: 3, rainDesc: "Severe sandstorm risk; virtually zero rainfall today.", aqi: 200, desc: "Extreme Thar Desert heat with blinding dust storms.", utcOffset: 5.5, sunriseM: 5*60+44, sunsetM: 19*60+22 },
  { name: "Kota", region: "Rajasthan, India", flag: "🇮🇳", temp: "42°C", icon: "sunny", h: 45, l: 32, humidity: "20%", wind: "16 km/h W", windDir: 270, windLabel: "W", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 6, rainDesc: "Desert sun scorching the Chambal plains.", aqi: 130, desc: "Very hot and dry with haze obscuring the distant Chambal valley.", utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 19*60+20 },
  { name: "Alwar", region: "Rajasthan, India", flag: "🇮🇳", temp: "40°C", icon: "mostlyclear", h: 43, l: 30, humidity: "28%", wind: "11 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 10, rainDesc: "Hot and dry near the Aravalli hills.", aqi: 155, desc: "Scorching heat at the eastern gateway to Rajasthan.", utcOffset: 5.5, sunriseM: 5*60+36, sunsetM: 19*60+18 },
  { name: "Bharatpur", region: "Rajasthan, India", flag: "🇮🇳", temp: "39°C", icon: "mostlyclear", h: 42, l: 29, humidity: "32%", wind: "10 km/h N", windDir: 0, windLabel: "N", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 9, rainDesc: "Hot and dry near the Keoladeo bird sanctuary.", aqi: 150, desc: "Scorching heat at the birding capital of India.", utcOffset: 5.5, sunriseM: 5*60+36, sunsetM: 19*60+17 },
  { name: "Sikar", region: "Rajasthan, India", flag: "🇮🇳", temp: "41°C", icon: "dust", h: 44, l: 31, humidity: "20%", wind: "18 km/h W", windDir: 270, windLabel: "W", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 5, rainDesc: "Shekhawati region baking under harsh desert sun.", aqi: 165, desc: "Extreme heat in the painted havelis city.", utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 19*60+20 },
  { name: "Churu", region: "Rajasthan, India", flag: "🇮🇳", temp: "45°C", icon: "dust", h: 48, l: 36, humidity: "12%", wind: "24 km/h W", windDir: 270, windLabel: "W", windSpeed: "24 km/h", windGust: "40 km/h", rainChance: 2, rainDesc: "One of India's hottest cities; extreme heat warning in effect.", aqi: 195, desc: "Extreme desert heat — often one of the hottest places in India.", utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 19*60+22 },
  { name: "Hanumangarh", region: "Rajasthan, India", flag: "🇮🇳", temp: "42°C", icon: "dust", h: 45, l: 32, humidity: "15%", wind: "20 km/h W", windDir: 270, windLabel: "W", windSpeed: "20 km/h", windGust: "33 km/h", rainChance: 3, rainDesc: "North Rajasthan desert; extreme dryness.", aqi: 175, desc: "Scorching heat in the northern Rajasthan flatlands.", utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 19*60+24 },

  // Sikkim
  { name: "Gangtok", region: "Sikkim, India", flag: "🇮🇳", temp: "17°C", icon: "rain", h: 19, l: 11, humidity: "92%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "17 km/h", rainChance: 80, rainDesc: "Persistent cloud cover keeping conditions wet and foggy.", aqi: 22, desc: "Cold and misty high-altitude drizzle over the mountains.", utcOffset: 5.5, sunriseM: 4*60+55, sunsetM: 18*60+8 },
  { name: "Namchi", region: "Sikkim, India", flag: "🇮🇳", temp: "18°C", icon: "rain", h: 20, l: 12, humidity: "88%", wind: "9 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "9 km/h", windGust: "15 km/h", rainChance: 75, rainDesc: "South Sikkim receiving steady monsoon showers.", aqi: 20, desc: "Cool and wet in the south Sikkim temple hill.", utcOffset: 5.5, sunriseM: 4*60+56, sunsetM: 18*60+8 },
  { name: "Mangan", region: "Sikkim, India", flag: "🇮🇳", temp: "16°C", icon: "rain", h: 18, l: 10, humidity: "90%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 80, rainDesc: "North Sikkim sub-division drenched in monsoon rains.", aqi: 18, desc: "Cold and very wet at the base of the Teesta gorge.", utcOffset: 5.5, sunriseM: 4*60+54, sunsetM: 18*60+8 },

  // Tamil Nadu
  { name: "Chennai", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "35°C", icon: "cloudy", h: 37, l: 30, humidity: "78%", wind: "18 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "18 km/h", windGust: "26 km/h", rainChance: 40, rainDesc: "Coastal humidity high; scattered showers possible along the shoreline.", aqi: 95, desc: "Hot and muggy with scattered clouds along the coast.", utcOffset: 5.5, sunriseM: 5*60+58, sunsetM: 18*60+42 },
  { name: "Madurai", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "36°C", icon: "sunny", h: 38, l: 29, humidity: "62%", wind: "14 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 20, rainDesc: "Hot and dry; scattered sea-breeze triggered showers possible.", aqi: 80, desc: "Intense heat at the Temple City with a moderate sea breeze.", utcOffset: 5.5, sunriseM: 6*60+0, sunsetM: 18*60+40 },
  { name: "Coimbatore", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "30°C", icon: "partlycloudy", h: 33, l: 23, humidity: "60%", wind: "16 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 35, rainDesc: "Mountain-influenced showers from the Western Ghats possible.", aqi: 70, desc: "Moderate heat with Nilgiri mountain breezes keeping it pleasant.", utcOffset: 5.5, sunriseM: 6*60+2, sunsetM: 18*60+42 },
  { name: "Tiruchirappalli", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "37°C", icon: "sunny", h: 39, l: 30, humidity: "55%", wind: "12 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 15, rainDesc: "Hot interiors; very little rain expected today.", aqi: 88, desc: "Blazing sun over the Cauvery delta with clear visibility.", utcOffset: 5.5, sunriseM: 5*60+58, sunsetM: 18*60+42 },
  { name: "Salem", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 36, l: 27, humidity: "58%", wind: "13 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 30, rainDesc: "Afternoon cloud build-up; a passing shower is possible.", aqi: 75, desc: "Warm and partly cloudy over the steel city.", utcOffset: 5.5, sunriseM: 6*60+0, sunsetM: 18*60+42 },
  { name: "Tirunelveli", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "35°C", icon: "sunny", h: 37, l: 28, humidity: "60%", wind: "15 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 20, rainDesc: "Hot southern Tamil Nadu; sea breeze offering mild relief.", aqi: 65, desc: "Hot and sunny near the southernmost tip of peninsular India.", utcOffset: 5.5, sunriseM: 6*60+2, sunsetM: 18*60+38 },
  { name: "Vellore", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 36, l: 26, humidity: "60%", wind: "12 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 28, rainDesc: "Eastern Ghats moisture; afternoon shower possible.", aqi: 78, desc: "Warm and partly cloudy at the fort city.", utcOffset: 5.5, sunriseM: 5*60+59, sunsetM: 18*60+42 },
  { name: "Erode", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "33°C", icon: "partlycloudy", h: 35, l: 25, humidity: "62%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 32, rainDesc: "Cauvery valley showers possible in the afternoon.", aqi: 72, desc: "Warm in the textile and turmeric city.", utcOffset: 5.5, sunriseM: 6*60+1, sunsetM: 18*60+42 },
  { name: "Thoothukudi", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "34°C", icon: "sunny", h: 36, l: 28, humidity: "68%", wind: "18 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 18, rainDesc: "Pearl city coast; warm and partly cloudy.", aqi: 62, desc: "Warm and sunny at the pearl and port city.", utcOffset: 5.5, sunriseM: 6*60+2, sunsetM: 18*60+38 },
  { name: "Thanjavur", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "35°C", icon: "partlycloudy", h: 37, l: 28, humidity: "65%", wind: "13 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 28, rainDesc: "Delta rice belt moisture; showers possible by evening.", aqi: 72, desc: "Warm and partly cloudy in the Cauvery delta granary.", utcOffset: 5.5, sunriseM: 5*60+59, sunsetM: 18*60+41 },
  { name: "Kanchipuram", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "35°C", icon: "partlycloudy", h: 37, l: 28, humidity: "68%", wind: "15 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 35, rainDesc: "Near-coastal humidity; afternoon shower from the Bay.", aqi: 82, desc: "Hot and humid in the city of a thousand temples.", utcOffset: 5.5, sunriseM: 5*60+58, sunsetM: 18*60+42 },
  { name: "Ooty", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "14°C", icon: "rain", h: 17, l: 8, humidity: "85%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 65, rainDesc: "Nilgiri highland hill station receiving heavy monsoon rains.", aqi: 18, desc: "Cold and misty at the Queen of Hill Stations.", utcOffset: 5.5, sunriseM: 6*60+4, sunsetM: 18*60+44 },
  { name: "Nagercoil", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "31°C", icon: "showers", h: 33, l: 26, humidity: "76%", wind: "20 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 60, rainDesc: "Kerala monsoon rain spilling over into the cape district.", aqi: 45, desc: "Warm and showery near India's southernmost tip.", utcOffset: 5.5, sunriseM: 6*60+4, sunsetM: 18*60+36 },
  { name: "Kumbakonam", region: "Tamil Nadu, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 36, l: 27, humidity: "68%", wind: "12 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 30, rainDesc: "Temple town delta humidity; afternoon shower possible.", aqi: 70, desc: "Hot and humid in the temple town of the Cauvery delta.", utcOffset: 5.5, sunriseM: 5*60+58, sunsetM: 18*60+41 },

  // Telangana
  { name: "Hyderabad", region: "Telangana, India", flag: "🇮🇳", temp: "30°C", icon: "sunny", h: 33, l: 24, humidity: "55%", wind: "10 km/h W", windDir: 270, windLabel: "W", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 15, rainDesc: "Mostly dry with a slight chance of isolated afternoon showers.", aqi: 88, desc: "Warm day with mostly clear skies and good visibility.", utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 18*60+52 },
  { name: "Karimnagar", region: "Telangana, India", flag: "🇮🇳", temp: "35°C", icon: "sunny", h: 38, l: 27, humidity: "48%", wind: "9 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "9 km/h", windGust: "15 km/h", rainChance: 12, rainDesc: "Dry and hot; minimal cloud development expected.", aqi: 92, desc: "Hot and dry Deccan afternoon with clear skies.", utcOffset: 5.5, sunriseM: 5*60+48, sunsetM: 18*60+52 },
  { name: "Khammam", region: "Telangana, India", flag: "🇮🇳", temp: "36°C", icon: "partlycloudy", h: 38, l: 27, humidity: "55%", wind: "11 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 30, rainDesc: "Godavari basin moisture; afternoon shower possible.", aqi: 85, desc: "Hot and humid in the forested Khammam district.", utcOffset: 5.5, sunriseM: 5*60+46, sunsetM: 18*60+50 },
  { name: "Nizamabad", region: "Telangana, India", flag: "🇮🇳", temp: "33°C", icon: "partlycloudy", h: 36, l: 24, humidity: "52%", wind: "10 km/h W", windDir: 270, windLabel: "W", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 22, rainDesc: "Pre-monsoon cloud buildup; light shower possible.", aqi: 82, desc: "Warm and moderately cloudy over the Deccan plateau.", utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 18*60+53 },
  { name: "Nalgonda", region: "Telangana, India", flag: "🇮🇳", temp: "36°C", icon: "sunny", h: 39, l: 27, humidity: "44%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 12, rainDesc: "Hot and dry Deccan plateau; little rain expected.", aqi: 88, desc: "Intense heat in the fluoride belt of Telangana.", utcOffset: 5.5, sunriseM: 5*60+50, sunsetM: 18*60+51 },
  { name: "Adilabad", region: "Telangana, India", flag: "🇮🇳", temp: "33°C", icon: "showers", h: 36, l: 24, humidity: "62%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 48, rainDesc: "Tribal forested district receiving pre-monsoon showers.", aqi: 55, desc: "Warm and showery over the Sahyadri forest belt.", utcOffset: 5.5, sunriseM: 5*60+48, sunsetM: 18*60+54 },

  // Tripura
  { name: "Agartala", region: "Tripura, India", flag: "🇮🇳", temp: "30°C", icon: "rain", h: 32, l: 24, humidity: "85%", wind: "15 km/h S", windDir: 180, windLabel: "S", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 80, rainDesc: "Heavy tropical moisture feeding continuous rainfall spells.", aqi: 50, desc: "Humid and overcast with active monsoon conditions.", utcOffset: 5.5, sunriseM: 4*60+50, sunsetM: 18*60+10 },
  { name: "Udaipur", region: "Tripura, India", flag: "🇮🇳", temp: "29°C", icon: "rain", h: 31, l: 23, humidity: "86%", wind: "14 km/h S", windDir: 180, windLabel: "S", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 78, rainDesc: "Tripura's green hills drenched in monsoon rain.", aqi: 45, desc: "Rainy and warm in the temple town of Tripura.", utcOffset: 5.5, sunriseM: 4*60+52, sunsetM: 18*60+10 },
  { name: "Dharmanagar", region: "Tripura, India", flag: "🇮🇳", temp: "30°C", icon: "thunderstorm", h: 32, l: 24, humidity: "84%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 75, rainDesc: "North Tripura receiving monsoon thunderstorms.", aqi: 48, desc: "Warm and stormy in north Tripura.", utcOffset: 5.5, sunriseM: 4*60+49, sunsetM: 18*60+9 },

  // Uttar Pradesh
  { name: "Lucknow", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "37°C", icon: "mostlyclear", h: 40, l: 29, humidity: "48%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 18, rainDesc: "Hot and hazy; light pre-monsoon shower possible in late afternoon.", aqi: 155, desc: "Hot summer day with moderate haze and warm westerly winds.", utcOffset: 5.5, sunriseM: 5*60+20, sunsetM: 18*60+50 },
  { name: "Varanasi", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "36°C", icon: "mostlyclear", h: 39, l: 28, humidity: "50%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "15 km/h", rainChance: 20, rainDesc: "Mostly dry with distant clouds; small chance of a passing shower.", aqi: 180, desc: "Hot and hazy conditions along the sacred Ganges plains.", utcOffset: 5.5, sunriseM: 5*60+18, sunsetM: 18*60+48 },
  { name: "Agra", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "40°C", icon: "sunny", h: 43, l: 31, humidity: "35%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 8, rainDesc: "Hazy summer day at the Taj; poor visibility from dust.", aqi: 185, desc: "Blistering heat and smog veiling the white marble Taj Mahal.", utcOffset: 5.5, sunriseM: 5*60+26, sunsetM: 19*60+10 },
  { name: "Kanpur", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "39°C", icon: "mostlyclear", h: 42, l: 30, humidity: "38%", wind: "8 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 10, rainDesc: "Hot day on the Ganga river banks; dust in the air.", aqi: 175, desc: "Industrial city sweltering in peak summer conditions.", utcOffset: 5.5, sunriseM: 5*60+20, sunsetM: 18*60+52 },
  { name: "Meerut", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 41, l: 29, humidity: "40%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 12, rainDesc: "Hot day in western UP; slight convective shower risk at night.", aqi: 162, desc: "Intense heat in the western Ganga plains.", utcOffset: 5.5, sunriseM: 5*60+24, sunsetM: 19*60+14 },
  { name: "Allahabad", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "37°C", icon: "mostlyclear", h: 40, l: 28, humidity: "45%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 15, rainDesc: "Hot and hazy at the Triveni Sangam confluence.", aqi: 168, desc: "Sweltering heat at the meeting point of India's sacred rivers.", utcOffset: 5.5, sunriseM: 5*60+18, sunsetM: 18*60+48 },
  { name: "Gorakhpur", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "35°C", icon: "partlycloudy", h: 38, l: 27, humidity: "58%", wind: "10 km/h E", windDir: 90, windLabel: "E", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 35, rainDesc: "Pre-monsoon moisture arriving from the Nepal Terai.", aqi: 145, desc: "Warm and increasingly humid near the Nepal border.", utcOffset: 5.5, sunriseM: 5*60+14, sunsetM: 18*60+46 },
  { name: "Mathura", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "41°C", icon: "sunny", h: 44, l: 31, humidity: "30%", wind: "8 km/h N", windDir: 0, windLabel: "N", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 5, rainDesc: "Extreme heat at Krishna's birthplace; no rain today.", aqi: 180, desc: "Intense heat and haze at the sacred Yamuna river banks.", utcOffset: 5.5, sunriseM: 5*60+26, sunsetM: 19*60+10 },
  { name: "Moradabad", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 41, l: 28, humidity: "36%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 10, rainDesc: "Dry and hot over the brassware capital.", aqi: 158, desc: "Scorching heat in the brassware city of India.", utcOffset: 5.5, sunriseM: 5*60+22, sunsetM: 19*60+12 },
  { name: "Bareilly", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 41, l: 28, humidity: "38%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 12, rainDesc: "Hot Rohilkhand plains; dry conditions prevail.", aqi: 155, desc: "Scorching heat in the Rohilkhand region.", utcOffset: 5.5, sunriseM: 5*60+22, sunsetM: 19*60+12 },
  { name: "Aligarh", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "39°C", icon: "mostlyclear", h: 42, l: 29, humidity: "36%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 8, rainDesc: "Hot UP plains; minimal rain activity.", aqi: 165, desc: "Scorching heat near the famous university city.", utcOffset: 5.5, sunriseM: 5*60+24, sunsetM: 19*60+13 },
  { name: "Firozabad", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "40°C", icon: "sunny", h: 43, l: 30, humidity: "34%", wind: "8 km/h N", windDir: 0, windLabel: "N", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 7, rainDesc: "Blazing heat in the bangle city.", aqi: 178, desc: "Intense heat in the bangle capital of India.", utcOffset: 5.5, sunriseM: 5*60+25, sunsetM: 19*60+10 },
  { name: "Saharanpur", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "37°C", icon: "mostlyclear", h: 40, l: 27, humidity: "40%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 14, rainDesc: "Pre-monsoon moisture drifting in from Shiwaliks.", aqi: 145, desc: "Hot and partly hazy near the Shivalik foothills.", utcOffset: 5.5, sunriseM: 5*60+26, sunsetM: 19*60+16 },
  { name: "Muzaffarnagar", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "38°C", icon: "mostlyclear", h: 41, l: 28, humidity: "38%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 10, rainDesc: "Hot western UP day; no significant rain.", aqi: 158, desc: "Scorching heat in the sugarcane belt.", utcOffset: 5.5, sunriseM: 5*60+25, sunsetM: 19*60+15 },
  { name: "Jhansi", region: "Uttar Pradesh, India", flag: "🇮🇳", temp: "41°C", icon: "sunny", h: 44, l: 31, humidity: "26%", wind: "11 km/h W", windDir: 270, windLabel: "W", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 5, rainDesc: "Bundelkhand heat; extremely dry conditions.", aqi: 160, desc: "Blazing heat in the Rani of Jhansi's historic city.", utcOffset: 5.5, sunriseM: 5*60+30, sunsetM: 19*60+0 },

  // Uttarakhand
  { name: "Dehradun", region: "Uttarakhand, India", flag: "🇮🇳", temp: "31°C", icon: "showers", h: 34, l: 21, humidity: "60%", wind: "9 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 40, rainDesc: "Passing showers rolling off the Mussoorie hillsides.", aqi: 68, desc: "Comfortable valley climate with building afternoon clouds.", utcOffset: 5.5, sunriseM: 5*60+38, sunsetM: 19*60+20 },
  { name: "Haridwar", region: "Uttarakhand, India", flag: "🇮🇳", temp: "33°C", icon: "partlycloudy", h: 36, l: 22, humidity: "55%", wind: "10 km/h N", windDir: 0, windLabel: "N", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 30, rainDesc: "Mountain breezes from the upper Himalaya; pre-monsoon showers possible.", aqi: 72, desc: "Warm at the Gateway to the Gods with Himalayan air moving south.", utcOffset: 5.5, sunriseM: 5*60+38, sunsetM: 19*60+18 },
  { name: "Rishikesh", region: "Uttarakhand, India", flag: "🇮🇳", temp: "32°C", icon: "showers", h: 35, l: 21, humidity: "60%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "15 km/h", rainChance: 38, rainDesc: "Mountain-triggered showers in the yoga capital of the world.", aqi: 65, desc: "Warm and partly cloudy with Himalayan mountain showers.", utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 19*60+20 },
  { name: "Mussoorie", region: "Uttarakhand, India", flag: "🇮🇳", temp: "18°C", icon: "rain", h: 21, l: 12, humidity: "78%", wind: "14 km/h W", windDir: 270, windLabel: "W", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 60, rainDesc: "Misty hill station rains drenching the Queen of Hills.", aqi: 25, desc: "Cool and misty Queen of Hills with persistent cloud cover.", utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 19*60+20 },
  { name: "Nainital", region: "Uttarakhand, India", flag: "🇮🇳", temp: "15°C", icon: "rain", h: 18, l: 10, humidity: "82%", wind: "12 km/h W", windDir: 270, windLabel: "W", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 65, rainDesc: "Constant mist and rain around the lake resort hills.", aqi: 20, desc: "Chilly and rainy around the beautiful Naini lake.", utcOffset: 5.5, sunriseM: 5*60+42, sunsetM: 19*60+18 },
  { name: "Roorkee", region: "Uttarakhand, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 37, l: 23, humidity: "54%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 25, rainDesc: "Pre-monsoon clouds building; afternoon shower chance.", aqi: 78, desc: "Warm and partly cloudy near the IIT campus.", utcOffset: 5.5, sunriseM: 5*60+37, sunsetM: 19*60+17 },
  { name: "Haldwani", region: "Uttarakhand, India", flag: "🇮🇳", temp: "33°C", icon: "partlycloudy", h: 36, l: 23, humidity: "56%", wind: "9 km/h N", windDir: 0, windLabel: "N", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 28, rainDesc: "Foothills of Kumaon receiving pre-monsoon showers.", aqi: 72, desc: "Warm gateway city to the Kumaon Himalayas.", utcOffset: 5.5, sunriseM: 5*60+40, sunsetM: 19*60+18 },

  // West Bengal
  { name: "Kolkata", region: "West Bengal, India", flag: "🇮🇳", temp: "30°C", icon: "thunderstorm", h: 30, l:28, humidity: "80%", wind: "15 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "15 km/h", windGust: "28 km/h", rainChance: 5, rainDesc: "Heavy thunderstorms with torrential rainfall expected throughout the day.", aqi: 50, desc: "Violent oceanic thunderstorm underway with repeated lightning strikes and heavy rainfall.", utcOffset: 5.5, sunriseM: 5*60+14, sunsetM: 18*60+32 },
  { name: "Siliguri", region: "West Bengal, India", flag: "🇮🇳", temp: "28°C", icon: "rain", h: 30, l: 22, humidity: "86%", wind: "13 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "13 km/h", windGust: "21 km/h", rainChance: 82, rainDesc: "Heavy monsoon rains at the gateway to Northeast India.", aqi: 52, desc: "Monsoon rains drenching the foothills near Darjeeling.", utcOffset: 5.5, sunriseM: 5*60+4, sunsetM: 18*60+22 },
  { name: "Darjeeling", region: "West Bengal, India", flag: "🇮🇳", temp: "16°C", icon: "rain", h: 18, l: 11, humidity: "90%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 85, rainDesc: "Cloud-shrouded tea gardens with persistent drizzle.", aqi: 18, desc: "Cool and misty Queen of Hills with monsoon rains.", utcOffset: 5.5, sunriseM: 5*60+6, sunsetM: 18*60+20 },
  { name: "Durgapur", region: "West Bengal, India", flag: "🇮🇳", temp: "32°C", icon: "thunderstorm", h: 35, l: 24, humidity: "72%", wind: "13 km/h E", windDir: 90, windLabel: "E", windSpeed: "13 km/h", windGust: "21 km/h", rainChance: 65, rainDesc: "Bay of Bengal weather system bringing thunderstorms.", aqi: 140, desc: "Warm industrial city under monsoon cloud cover with thunder.", utcOffset: 5.5, sunriseM: 5*60+14, sunsetM: 18*60+34 },
  { name: "Asansol", region: "West Bengal, India", flag: "🇮🇳", temp: "33°C", icon: "thunderstorm", h: 36, l: 25, humidity: "70%", wind: "12 km/h E", windDir: 90, windLabel: "E", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 62, rainDesc: "Pre-monsoon thunderstorms over the mining belt.", aqi: 155, desc: "Hot and humid with heavy thunder in the mining city.", utcOffset: 5.5, sunriseM: 5*60+12, sunsetM: 18*60+34 },
  { name: "Haldia", region: "West Bengal, India", flag: "🇮🇳", temp: "31°C", icon: "thunderstorm", h: 33, l: 24, humidity: "78%", wind: "16 km/h S", windDir: 180, windLabel: "S", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 68, rainDesc: "Bay of Bengal moisture pushing into the port area.", aqi: 92, desc: "Humid industrial port city with monsoon squalls.", utcOffset: 5.5, sunriseM: 5*60+13, sunsetM: 18*60+31 },
  { name: "Kharagpur", region: "West Bengal, India", flag: "🇮🇳", temp: "33°C", icon: "thunderstorm", h: 35, l: 25, humidity: "74%", wind: "14 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 62, rainDesc: "Pre-monsoon thunderstorms rolling in from Bay of Bengal.", aqi: 85, desc: "Warm and stormy near the IIT campus and railway junction.", utcOffset: 5.5, sunriseM: 5*60+14, sunsetM: 18*60+33 },
  { name: "Bankura", region: "West Bengal, India", flag: "🇮🇳", temp: "34°C", icon: "partlycloudy", h: 37, l: 25, humidity: "65%", wind: "12 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 45, rainDesc: "Bishnupur plateau receiving pre-monsoon showers.", aqi: 72, desc: "Warm and partly cloudy in the terracotta temple land.", utcOffset: 5.5, sunriseM: 5*60+13, sunsetM: 18*60+33 },
  { name: "Malda", region: "West Bengal, India", flag: "🇮🇳", temp: "33°C", icon: "thunderstorm", h: 35, l: 25, humidity: "72%", wind: "13 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "13 km/h", windGust: "21 km/h", rainChance: 62, rainDesc: "Ganga-Mahananda basin receiving monsoon thunderstorms.", aqi: 88, desc: "Warm and stormy in the mango capital of Bengal.", utcOffset: 5.5, sunriseM: 5*60+8, sunsetM: 18*60+26 },
  { name: "Murshidabad", region: "West Bengal, India", flag: "🇮🇳", temp: "32°C", icon: "thunderstorm", h: 35, l: 25, humidity: "73%", wind: "13 km/h E", windDir: 90, windLabel: "E", windSpeed: "13 km/h", windGust: "21 km/h", rainChance: 60, rainDesc: "Bay moisture reaching the Bhagirathi banks.", aqi: 82, desc: "Warm and cloudy in the historic former Bengal capital.", utcOffset: 5.5, sunriseM: 5*60+10, sunsetM: 18*60+28 },

  // ─── INTERNATIONAL CITIES ────────────────────────────────────────────────────

  // ── USA ──────────────────────────────────────────────────────────────────────
  { name: "New York", region: "New York, USA", flag: "🇺🇸", temp: "18°C", icon: "partlycloudy", h: 21, l: 13, humidity: "58%", wind: "16 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 25, rainDesc: "Breezy spring day; a passing shower possible in the morning hours.", aqi: 45, desc: "Cool spring day with partly cloudy skies over Manhattan.", utcOffset: -4, sunriseM: 5*60+28, sunsetM: 20*60+14 },
  { name: "Los Angeles", region: "California, USA", flag: "🇺🇸", temp: "26°C", icon: "sunny", h: 28, l: 18, humidity: "42%", wind: "12 km/h W", windDir: 270, windLabel: "W", windSpeed: "12 km/h", windGust: "18 km/h", rainChance: 5, rainDesc: "Sunny and dry; typical Southern California weather.", aqi: 60, desc: "Sunny and warm with clear skies along the Pacific coast.", utcOffset: -7, sunriseM: 5*60+53, sunsetM: 20*60+8 },
  { name: "Chicago", region: "Illinois, USA", flag: "🇺🇸", temp: "14°C", icon: "windy", h: 17, l: 9, humidity: "65%", wind: "30 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "30 km/h", windGust: "48 km/h", rainChance: 20, rainDesc: "Strong north-westerlies; blustery but mostly dry.", aqi: 38, desc: "Windy city living up to its name with strong gusts off Lake Michigan.", utcOffset: -5, sunriseM: 5*60+19, sunsetM: 20*60+17 },
  { name: "Houston", region: "Texas, USA", flag: "🇺🇸", temp: "31°C", icon: "partlycloudy", h: 34, l: 24, humidity: "70%", wind: "15 km/h S", windDir: 180, windLabel: "S", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 45, rainDesc: "Gulf moisture streaming in; afternoon storms possible.", aqi: 52, desc: "Hot and humid Gulf Coast city with storm potential.", utcOffset: -5, sunriseM: 6*60+16, sunsetM: 20*60+22 },
  { name: "Miami", region: "Florida, USA", flag: "🇺🇸", temp: "30°C", icon: "thunderstorm", h: 33, l: 25, humidity: "82%", wind: "18 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 70, rainDesc: "Classic subtropical afternoon thunderstorm pattern in full effect.", aqi: 40, desc: "Tropical heat with afternoon thunderstorms rolling off the Atlantic.", utcOffset: -4, sunriseM: 6*60+30, sunsetM: 20*60+2 },
  { name: "Phoenix", region: "Arizona, USA", flag: "🇺🇸", temp: "42°C", icon: "sunny", h: 45, l: 32, humidity: "15%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 2, rainDesc: "Sonoran desert heat; essentially zero chance of rain.", aqi: 55, desc: "Extreme desert heat baking the Valley of the Sun.", utcOffset: -7, sunriseM: 5*60+30, sunsetM: 19*60+45 },
  { name: "San Francisco", region: "California, USA", flag: "🇺🇸", temp: "15°C", icon: "foggy", h: 18, l: 11, humidity: "80%", wind: "24 km/h W", windDir: 270, windLabel: "W", windSpeed: "24 km/h", windGust: "38 km/h", rainChance: 10, rainDesc: "Thick marine layer fog rolling in through the Golden Gate.", aqi: 35, desc: "Cool, breezy, and characteristically foggy by the bay.", utcOffset: -7, sunriseM: 5*60+52, sunsetM: 20*60+14 },
  { name: "Seattle", region: "Washington, USA", flag: "🇺🇸", temp: "13°C", icon: "rain", h: 16, l: 9, humidity: "84%", wind: "11 km/h S", windDir: 180, windLabel: "S", windSpeed: "11 km/h", windGust: "16 km/h", rainChance: 70, rainDesc: "Classic Pacific Northwest light drizzle persisting throughout the day.", aqi: 20, desc: "Cool, damp, and overcast over the Emerald City.", utcOffset: -7, sunriseM: 5*60+17, sunsetM: 20*60+55 },
  { name: "Dallas", region: "Texas, USA", flag: "🇺🇸", temp: "33°C", icon: "partlycloudy", h: 36, l: 24, humidity: "58%", wind: "18 km/h S", windDir: 180, windLabel: "S", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 40, rainDesc: "Gulf moisture fueling afternoon convection; severe storm risk low.", aqi: 48, desc: "Hot and partly cloudy with storm potential in North Texas.", utcOffset: -5, sunriseM: 6*60+18, sunsetM: 20*60+24 },
  { name: "Atlanta", region: "Georgia, USA", flag: "🇺🇸", temp: "28°C", icon: "thunderstorm", h: 31, l: 20, humidity: "72%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "22 km/h", rainChance: 60, rainDesc: "Afternoon thunderstorms typical of Georgia summer pattern.", aqi: 42, desc: "Warm and humid Southern city with active afternoon storms.", utcOffset: -4, sunriseM: 6*60+20, sunsetM: 20*60+22 },
  { name: "Boston", region: "Massachusetts, USA", flag: "🇺🇸", temp: "16°C", icon: "partlycloudy", h: 19, l: 11, humidity: "62%", wind: "20 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 30, rainDesc: "Northeast coastal breeze; passing shower possible by afternoon.", aqi: 38, desc: "Cool coastal spring day with a brisk Atlantic breeze.", utcOffset: -4, sunriseM: 5*60+12, sunsetM: 20*60+8 },
  { name: "Denver", region: "Colorado, USA", flag: "🇺🇸", temp: "22°C", icon: "mostlyclear", h: 26, l: 10, humidity: "35%", wind: "16 km/h W", windDir: 270, windLabel: "W", windSpeed: "16 km/h", windGust: "28 km/h", rainChance: 20, rainDesc: "Mile-high city afternoon thunderstorm possible; morning clear.", aqi: 32, desc: "Sunny and dry with stunning Rocky Mountain views.", utcOffset: -6, sunriseM: 5*60+42, sunsetM: 20*60+28 },
  { name: "Las Vegas", region: "Nevada, USA", flag: "🇺🇸", temp: "38°C", icon: "sunny", h: 41, l: 27, humidity: "14%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 3, rainDesc: "Mojave desert heat; extremely arid conditions today.", aqi: 42, desc: "Blazing desert sun lighting up the neon city.", utcOffset: -7, sunriseM: 5*60+48, sunsetM: 20*60+4 },
  { name: "Washington DC", region: "District of Columbia, USA", flag: "🇺🇸", temp: "24°C", icon: "partlycloudy", h: 27, l: 16, humidity: "64%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 30, rainDesc: "Partly cloudy humid day; afternoon shower can't be ruled out.", aqi: 50, desc: "Warm and muggy around the National Mall.", utcOffset: -4, sunriseM: 5*60+48, sunsetM: 20*60+18 },
  { name: "Minneapolis", region: "Minnesota, USA", flag: "🇺🇸", temp: "18°C", icon: "partlycloudy", h: 22, l: 10, humidity: "56%", wind: "22 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "22 km/h", windGust: "36 km/h", rainChance: 25, rainDesc: "Breezy prairie winds; isolated shower possible this afternoon.", aqi: 28, desc: "Cool and breezy Minnesota spring over the Twin Cities lakes.", utcOffset: -5, sunriseM: 5*60+32, sunsetM: 20*60+44 },
  { name: "New Orleans", region: "Louisiana, USA", flag: "🇺🇸", temp: "30°C", icon: "thunderstorm", h: 33, l: 24, humidity: "84%", wind: "14 km/h S", windDir: 180, windLabel: "S", windSpeed: "14 km/h", windGust: "24 km/h", rainChance: 72, rainDesc: "Gulf humidity triggering frequent afternoon pop-up thunderstorms.", aqi: 45, desc: "Steamy bayou city with intense afternoon thunderstorms.", utcOffset: -5, sunriseM: 6*60+4, sunsetM: 20*60+4 },
  { name: "Portland", region: "Oregon, USA", flag: "🇺🇸", temp: "16°C", icon: "showers", h: 19, l: 10, humidity: "78%", wind: "13 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 55, rainDesc: "Pacific Northwest showers; typical Oregon weather pattern.", aqi: 22, desc: "Damp and cool with light rain in the Rose City.", utcOffset: -7, sunriseM: 5*60+22, sunsetM: 20*60+50 },
  { name: "Nashville", region: "Tennessee, USA", flag: "🇺🇸", temp: "26°C", icon: "showers", h: 29, l: 18, humidity: "68%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 50, rainDesc: "Tennessee River valley moisture; afternoon showers likely.", aqi: 38, desc: "Warm and humid Music City with scattered showers.", utcOffset: -5, sunriseM: 6*60+2, sunsetM: 20*60+14 },
  { name: "Orlando", region: "Florida, USA", flag: "🇺🇸", temp: "31°C", icon: "thunderstorm", h: 34, l: 23, humidity: "78%", wind: "16 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 68, rainDesc: "Florida's famous daily thunderstorm pattern fully active.", aqi: 35, desc: "Hot and stormy in the theme park capital of the world.", utcOffset: -4, sunriseM: 6*60+30, sunsetM: 20*60+0 },
  { name: "Tampa", region: "Florida, USA", flag: "🇺🇸", temp: "32°C", icon: "thunderstorm", h: 35, l: 24, humidity: "80%", wind: "17 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "17 km/h", windGust: "28 km/h", rainChance: 70, rainDesc: "Bay breezes converging with Gulf moisture creating storms.", aqi: 38, desc: "Hot and humid Tampa Bay with recurring afternoon thunderstorms.", utcOffset: -4, sunriseM: 6*60+32, sunsetM: 20*60+2 },
  { name: "Detroit", region: "Michigan, USA", flag: "🇺🇸", temp: "15°C", icon: "partlycloudy", h: 18, l: 9, humidity: "66%", wind: "19 km/h W", windDir: 270, windLabel: "W", windSpeed: "19 km/h", windGust: "30 km/h", rainChance: 28, rainDesc: "Lake Michigan influence; breezy with isolated shower risk.", aqi: 42, desc: "Cool spring day with gusty lake winds.", utcOffset: -4, sunriseM: 6*60+4, sunsetM: 20*60+32 },
  { name: "Charlotte", region: "North Carolina, USA", flag: "🇺🇸", temp: "27°C", icon: "partlycloudy", h: 30, l: 18, humidity: "65%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 35, rainDesc: "Piedmont humidity building; afternoon pop-up showers possible.", aqi: 40, desc: "Warm Southern spring day with building afternoon humidity.", utcOffset: -4, sunriseM: 6*60+6, sunsetM: 20*60+14 },
  { name: "Honolulu", region: "Hawaii, USA", flag: "🇺🇸", temp: "28°C", icon: "showers", h: 30, l: 23, humidity: "68%", wind: "26 km/h E", windDir: 90, windLabel: "E", windSpeed: "26 km/h", windGust: "36 km/h", rainChance: 40, rainDesc: "Passing tropical trade wind showers; brief rainbow expected.", aqi: 15, desc: "Warm and tropical with a refreshing trade breeze and sudden light showers.", utcOffset: -10, sunriseM: 5*60+52, sunsetM: 19*60+15 },
  { name: "Anchorage", region: "Alaska, USA", flag: "🇺🇸", temp: "8°C", icon: "partlycloudy", h: 12, l: 3, humidity: "62%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 25, rainDesc: "Subarctic spring; passing shower possible off Cook Inlet.", aqi: 12, desc: "Cool subarctic spring in Alaska's largest city.", utcOffset: -8, sunriseM: 5*60+20, sunsetM: 22*60+10 },
  { name: "Kansas City", region: "Missouri, USA", flag: "🇺🇸", temp: "22°C", icon: "partlycloudy", h: 25, l: 14, humidity: "55%", wind: "18 km/h S", windDir: 180, windLabel: "S", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 30, rainDesc: "Spring prairie weather; afternoon thunderstorm possible.", aqi: 35, desc: "Cool and partly cloudy on the Missouri plains.", utcOffset: -5, sunriseM: 6*60+10, sunsetM: 20*60+18 },
  { name: "San Diego", region: "California, USA", flag: "🇺🇸", temp: "22°C", icon: "sunny", h: 24, l: 16, humidity: "68%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 5, rainDesc: "Near-perfect Southern California beach weather.", aqi: 30, desc: "Perfect beach weather in America's Finest City.", utcOffset: -7, sunriseM: 5*60+56, sunsetM: 20*60+0 },
  { name: "Indianapolis", region: "Indiana, USA", flag: "🇺🇸", temp: "20°C", icon: "partlycloudy", h: 23, l: 13, humidity: "60%", wind: "15 km/h W", windDir: 270, windLabel: "W", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 28, rainDesc: "Midwest spring shower risk in the afternoon.", aqi: 38, desc: "Cool spring day in the Crossroads of America.", utcOffset: -4, sunriseM: 6*60+14, sunsetM: 20*60+28 },
  { name: "Columbus", region: "Ohio, USA", flag: "🇺🇸", temp: "19°C", icon: "partlycloudy", h: 22, l: 12, humidity: "62%", wind: "14 km/h W", windDir: 270, windLabel: "W", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 30, rainDesc: "Great Lakes moisture; spring shower possible.", aqi: 40, desc: "Cool and partly cloudy in the Buckeye capital.", utcOffset: -4, sunriseM: 6*60+10, sunsetM: 20*60+24 },
  { name: "Memphis", region: "Tennessee, USA", flag: "🇺🇸", temp: "27°C", icon: "thunderstorm", h: 30, l: 20, humidity: "72%", wind: "13 km/h S", windDir: 180, windLabel: "S", windSpeed: "13 km/h", windGust: "22 km/h", rainChance: 55, rainDesc: "Mississippi delta moisture; afternoon storms likely.", aqi: 42, desc: "Warm and stormy in the home of the blues.", utcOffset: -5, sunriseM: 6*60+0, sunsetM: 20*60+10 },
  { name: "Louisville", region: "Kentucky, USA", flag: "🇺🇸", temp: "24°C", icon: "showers", h: 27, l: 16, humidity: "65%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 48, rainDesc: "Ohio River valley moisture; afternoon showers likely.", aqi: 38, desc: "Warm Kentucky spring with passing showers.", utcOffset: -4, sunriseM: 6*60+6, sunsetM: 20*60+20 },
  { name: "Baltimore", region: "Maryland, USA", flag: "🇺🇸", temp: "22°C", icon: "partlycloudy", h: 25, l: 14, humidity: "62%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 30, rainDesc: "Chesapeake Bay humidity; afternoon shower possible.", aqi: 48, desc: "Warm spring day on the Chesapeake Bay.", utcOffset: -4, sunriseM: 5*60+52, sunsetM: 20*60+14 },
  { name: "Sacramento", region: "California, USA", flag: "🇺🇸", temp: "28°C", icon: "sunny", h: 31, l: 15, humidity: "32%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 5, rainDesc: "Warm dry Sacramento valley; no rain today.", aqi: 45, desc: "Warm and sunny in California's state capital.", utcOffset: -7, sunriseM: 5*60+54, sunsetM: 20*60+10 },
  { name: "Salt Lake City", region: "Utah, USA", flag: "🇺🇸", temp: "20°C", icon: "mostlyclear", h: 24, l: 10, humidity: "30%", wind: "14 km/h W", windDir: 270, windLabel: "W", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 12, rainDesc: "High desert spring; afternoon thunderstorm possible in mountains.", aqi: 28, desc: "Sunny and pleasant by the Great Salt Lake.", utcOffset: -6, sunriseM: 6*60+6, sunsetM: 20*60+32 },
  { name: "Richmond", region: "Virginia, USA", flag: "🇺🇸", temp: "25°C", icon: "partlycloudy", h: 28, l: 16, humidity: "62%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 30, rainDesc: "Mid-Atlantic humidity; afternoon shower possible.", aqi: 44, desc: "Warm spring day in the former Confederate capital.", utcOffset: -4, sunriseM: 5*60+54, sunsetM: 20*60+12 },
  { name: "Pittsburgh", region: "Pennsylvania, USA", flag: "🇺🇸", temp: "17°C", icon: "partlycloudy", h: 20, l: 10, humidity: "65%", wind: "15 km/h W", windDir: 270, windLabel: "W", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 32, rainDesc: "Great Lakes weather pattern; shower possible today.", aqi: 42, desc: "Cool spring day in the City of Bridges.", utcOffset: -4, sunriseM: 6*60+2, sunsetM: 20*60+22 },
  { name: "Milwaukee", region: "Wisconsin, USA", flag: "🇺🇸", temp: "14°C", icon: "partlycloudy", h: 17, l: 8, humidity: "68%", wind: "22 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "22 km/h", windGust: "36 km/h", rainChance: 25, rainDesc: "Lake Michigan breezes; blustery spring day.", aqi: 32, desc: "Cool and breezy spring on the shores of Lake Michigan.", utcOffset: -5, sunriseM: 5*60+40, sunsetM: 20*60+24 },
  { name: "Albuquerque", region: "New Mexico, USA", flag: "🇺🇸", temp: "26°C", icon: "sunny", h: 30, l: 12, humidity: "22%", wind: "16 km/h W", windDir: 270, windLabel: "W", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 8, rainDesc: "High desert plateau; dry and sunny today.", aqi: 38, desc: "Sunny and dry in the Rio Grande valley.", utcOffset: -6, sunriseM: 6*60+8, sunsetM: 20*60+18 },
  { name: "Tulsa", region: "Oklahoma, USA", flag: "🇺🇸", temp: "26°C", icon: "thunderstorm", h: 30, l: 18, humidity: "62%", wind: "18 km/h S", windDir: 180, windLabel: "S", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 55, rainDesc: "Tornado Alley spring storms; severe weather possible.", aqi: 40, desc: "Warm and stormy in the heart of Tornado Alley.", utcOffset: -5, sunriseM: 6*60+18, sunsetM: 20*60+24 },
  { name: "Raleigh", region: "North Carolina, USA", flag: "🇺🇸", temp: "26°C", icon: "partlycloudy", h: 29, l: 17, humidity: "62%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 32, rainDesc: "Piedmont humidity; afternoon shower possible.", aqi: 38, desc: "Warm spring day in the Research Triangle.", utcOffset: -4, sunriseM: 6*60+4, sunsetM: 20*60+12 },
  { name: "Virginia Beach", region: "Virginia, USA", flag: "🇺🇸", temp: "24°C", icon: "partlycloudy", h: 26, l: 16, humidity: "68%", wind: "18 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 28, rainDesc: "Atlantic sea breeze; a coastal shower possible.", aqi: 36, desc: "Warm and breezy on the Atlantic coast.", utcOffset: -4, sunriseM: 5*60+54, sunsetM: 20*60+8 },
  { name: "Jacksonville", region: "Florida, USA", flag: "🇺🇸", temp: "29°C", icon: "thunderstorm", h: 32, l: 22, humidity: "76%", wind: "14 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 60, rainDesc: "Florida summer storms rolling in from the Atlantic.", aqi: 38, desc: "Hot and stormy in the largest city by area in the US.", utcOffset: -4, sunriseM: 6*60+28, sunsetM: 20*60+4 },
  { name: "Oklahoma City", region: "Oklahoma, USA", flag: "🇺🇸", temp: "24°C", icon: "thunderstorm", h: 28, l: 16, humidity: "60%", wind: "20 km/h S", windDir: 180, windLabel: "S", windSpeed: "20 km/h", windGust: "34 km/h", rainChance: 52, rainDesc: "Severe thunderstorm watch issued; tornado alley active.", aqi: 42, desc: "Severe spring storm threat across the Oklahoma plains.", utcOffset: -5, sunriseM: 6*60+20, sunsetM: 20*60+26 },
  { name: "Omaha", region: "Nebraska, USA", flag: "🇺🇸", temp: "20°C", icon: "partlycloudy", h: 24, l: 12, humidity: "58%", wind: "18 km/h S", windDir: 180, windLabel: "S", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 28, rainDesc: "Great Plains spring weather; afternoon shower possible.", aqi: 30, desc: "Cool spring day on the Missouri River banks.", utcOffset: -5, sunriseM: 6*60+6, sunsetM: 20*60+28 },
  { name: "Cincinnati", region: "Ohio, USA", flag: "🇺🇸", temp: "20°C", icon: "partlycloudy", h: 23, l: 12, humidity: "62%", wind: "14 km/h W", windDir: 270, windLabel: "W", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 28, rainDesc: "Ohio River valley spring shower possible.", aqi: 40, desc: "Cool spring day on the Ohio River.", utcOffset: -4, sunriseM: 6*60+12, sunsetM: 20*60+26 },
  { name: "Boise", region: "Idaho, USA", flag: "🇺🇸", temp: "18°C", icon: "mostlyclear", h: 22, l: 8, humidity: "35%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 12, rainDesc: "High desert spring; mostly clear with cool nights.", aqi: 22, desc: "Sunny and dry spring in the Treasure Valley.", utcOffset: -6, sunriseM: 6*60+14, sunsetM: 20*60+40 },
  { name: "El Paso", region: "Texas, USA", flag: "🇺🇸", temp: "32°C", icon: "sunny", h: 36, l: 18, humidity: "18%", wind: "14 km/h W", windDir: 270, windLabel: "W", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 5, rainDesc: "Chihuahuan Desert heat; very little rain expected.", aqi: 48, desc: "Hot and dry on the Texas-Mexico border.", utcOffset: -6, sunriseM: 6*60+18, sunsetM: 20*60+14 },

  // ── Canada ───────────────────────────────────────────────────────────────────
  { name: "Toronto", region: "Ontario, Canada", flag: "🇨🇦", temp: "12°C", icon: "sunny", h: 15, l: 7, humidity: "52%", wind: "18 km/h N", windDir: 0, windLabel: "N", windSpeed: "18 km/h", windGust: "27 km/h", rainChance: 10, rainDesc: "Clear and cool; no precipitation expected over Lake Ontario.", aqi: 30, desc: "Cool spring air with bright sunshine and blue skies over the lake.", utcOffset: -4, sunriseM: 5*60+38, sunsetM: 20*60+38 },
  { name: "Vancouver", region: "British Columbia, Canada", flag: "🇨🇦", temp: "14°C", icon: "rain", h: 16, l: 9, humidity: "80%", wind: "15 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 65, rainDesc: "Pacific moisture bringing steady rain to the West Coast mountains.", aqi: 18, desc: "Rainy Pacific Coast weather with low cloud over the mountains.", utcOffset: -7, sunriseM: 5*60+16, sunsetM: 20*60+55 },
  { name: "Montreal", region: "Quebec, Canada", flag: "🇨🇦", temp: "14°C", icon: "partlycloudy", h: 17, l: 8, humidity: "58%", wind: "16 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 22, rainDesc: "Breezy St. Lawrence spring day; afternoon clouds possible.", aqi: 28, desc: "Cool and pleasant Montreal spring with bilingual charm.", utcOffset: -4, sunriseM: 5*60+22, sunsetM: 20*60+32 },
  { name: "Calgary", region: "Alberta, Canada", flag: "🇨🇦", temp: "16°C", icon: "mostlyclear", h: 20, l: 5, humidity: "40%", wind: "20 km/h W", windDir: 270, windLabel: "W", windSpeed: "20 km/h", windGust: "35 km/h", rainChance: 18, rainDesc: "Chinook arch visible; warm foehn winds off the Rockies.", aqi: 20, desc: "Warm Chinook winds sweeping east off the Canadian Rockies.", utcOffset: -6, sunriseM: 5*60+44, sunsetM: 21*60+10 },
  { name: "Ottawa", region: "Ontario, Canada", flag: "🇨🇦", temp: "13°C", icon: "sunny", h: 16, l: 7, humidity: "50%", wind: "15 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "15 km/h", windGust: "23 km/h", rainChance: 12, rainDesc: "Clear spring day over Parliament Hill.", aqi: 24, desc: "Bright spring day in Canada's capital city.", utcOffset: -4, sunriseM: 5*60+30, sunsetM: 20*60+28 },
  { name: "Edmonton", region: "Alberta, Canada", flag: "🇨🇦", temp: "14°C", icon: "partlycloudy", h: 18, l: 4, humidity: "42%", wind: "16 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 20, rainDesc: "Prairies spring; afternoon convective shower possible.", aqi: 22, desc: "Cool spring on the North Saskatchewan river.", utcOffset: -6, sunriseM: 5*60+38, sunsetM: 21*60+18 },
  { name: "Winnipeg", region: "Manitoba, Canada", flag: "🇨🇦", temp: "15°C", icon: "mostlyclear", h: 20, l: 5, humidity: "45%", wind: "18 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 18, rainDesc: "Prairies spring warming; light shower possible.", aqi: 20, desc: "Cool and breezy on the Red River prairies.", utcOffset: -5, sunriseM: 5*60+44, sunsetM: 20*60+52 },
  { name: "Quebec City", region: "Quebec, Canada", flag: "🇨🇦", temp: "11°C", icon: "partlycloudy", h: 14, l: 6, humidity: "60%", wind: "17 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "17 km/h", windGust: "27 km/h", rainChance: 28, rainDesc: "St. Lawrence River wind; a passing shower possible.", aqi: 18, desc: "Chilly spring in the walled French city.", utcOffset: -4, sunriseM: 5*60+18, sunsetM: 20*60+26 },
  { name: "Hamilton", region: "Ontario, Canada", flag: "🇨🇦", temp: "13°C", icon: "partlycloudy", h: 16, l: 7, humidity: "60%", wind: "16 km/h W", windDir: 270, windLabel: "W", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 25, rainDesc: "Lake Ontario influence; breezy spring day.", aqi: 36, desc: "Cool spring on the western end of Lake Ontario.", utcOffset: -4, sunriseM: 5*60+40, sunsetM: 20*60+36 },
  { name: "Saskatoon", region: "Saskatchewan, Canada", flag: "🇨🇦", temp: "14°C", icon: "sunny", h: 19, l: 4, humidity: "38%", wind: "15 km/h W", windDir: 270, windLabel: "W", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 12, rainDesc: "Prairies spring; mostly clear and dry.", aqi: 16, desc: "Sunny spring day on the Saskatchewan prairies.", utcOffset: -6, sunriseM: 5*60+52, sunsetM: 21*60+0 },

  // ── Mexico ───────────────────────────────────────────────────────────────────
  { name: "Mexico City", region: "CDMX, Mexico", flag: "🇲🇽", temp: "20°C", icon: "partlycloudy", h: 23, l: 13, humidity: "60%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 40, rainDesc: "High altitude rainy season building; afternoon showers likely.", aqi: 110, desc: "High altitude city with afternoon shower potential and smog.", utcOffset: -5, sunriseM: 6*60+8, sunsetM: 20*60+2 },
  { name: "Guadalajara", region: "Jalisco, Mexico", flag: "🇲🇽", temp: "24°C", icon: "partlycloudy", h: 27, l: 14, humidity: "52%", wind: "10 km/h W", windDir: 270, windLabel: "W", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 35, rainDesc: "Rainy season building; afternoon shower likely.", aqi: 82, desc: "Warm spring day in the tequila and mariachi capital.", utcOffset: -5, sunriseM: 6*60+16, sunsetM: 20*60+10 },
  { name: "Monterrey", region: "Nuevo León, Mexico", flag: "🇲🇽", temp: "32°C", icon: "mostlyclear", h: 36, l: 22, humidity: "42%", wind: "14 km/h N", windDir: 0, windLabel: "N", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 18, rainDesc: "Sierra Madre breezes; afternoon thunderstorm possible.", aqi: 75, desc: "Hot and dry at the foot of the Sierra Madre Oriental.", utcOffset: -5, sunriseM: 6*60+10, sunsetM: 20*60+6 },
  { name: "Cancún", region: "Quintana Roo, Mexico", flag: "🇲🇽", temp: "30°C", icon: "partlycloudy", h: 32, l: 24, humidity: "72%", wind: "18 km/h E", windDir: 90, windLabel: "E", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 30, rainDesc: "Caribbean trade wind day; brief tropical shower possible.", aqi: 25, desc: "Warm Caribbean beach city with trade wind breeze.", utcOffset: -5, sunriseM: 6*60+10, sunsetM: 19*60+48 },
  { name: "Tijuana", region: "Baja California, Mexico", flag: "🇲🇽", temp: "20°C", icon: "mostlyclear", h: 23, l: 14, humidity: "62%", wind: "14 km/h W", windDir: 270, windLabel: "W", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 10, rainDesc: "Pacific coast climate; mostly dry and pleasant.", aqi: 55, desc: "Cool and pleasant on the Pacific coast border city.", utcOffset: -7, sunriseM: 5*60+58, sunsetM: 20*60+2 },
  { name: "Puebla", region: "Puebla, Mexico", flag: "🇲🇽", temp: "18°C", icon: "showers", h: 22, l: 10, humidity: "65%", wind: "8 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 55, rainDesc: "Highland Mexico rainy season; afternoon showers expected.", aqi: 80, desc: "Cool highland city with afternoon showers near Popocatepetl.", utcOffset: -5, sunriseM: 6*60+6, sunsetM: 20*60+0 },
  { name: "Mérida", region: "Yucatán, Mexico", flag: "🇲🇽", temp: "4°C", icon: "partlycloudy", h: 36, l: 24, humidity: "68%", wind: "16 km/h E", windDir: 90, windLabel: "E", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 30, rainDesc: "Yucatan heat with afternoon convective shower risk.", aqi: 42, desc: "Hot and humid in the White City of the Maya.", utcOffset: -5, sunriseM: 6*60+14, sunsetM: 19*60+52 },

  // ── UK & Ireland ─────────────────────────────────────────────────────────────
  { name: "London", region: "England, UK", flag: "🇬🇧", temp: "14°C", icon: "rain", h: 16, l: 10, humidity: "82%", wind: "20 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 75, rainDesc: "Persistent drizzle and overcast skies — quintessentially London weather.", aqi: 32, desc: "Overcast with light drizzle — a typically grey London day.", utcOffset: 1, sunriseM: 5*60+2, sunsetM: 20*60+50 },
  { name: "Manchester", region: "England, UK", flag: "🇬🇧", temp: "12°C", icon: "rain", h: 14, l: 8, humidity: "84%", wind: "22 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "22 km/h", windGust: "35 km/h", rainChance: 78, rainDesc: "Northern England rain; persistent and heavy at times.", aqi: 28, desc: "Wet and grey in the football and music capital.", utcOffset: 1, sunriseM: 5*60+10, sunsetM: 20*60+55 },
  { name: "Birmingham", region: "England, UK", flag: "🇬🇧", temp: "13°C", icon: "partlycloudy", h: 15, l: 9, humidity: "76%", wind: "18 km/h W", windDir: 270, windLabel: "W", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 50, rainDesc: "Midlands cloud and shower mix; typical English weather.", aqi: 32, desc: "Cool and partly cloudy in the UK's second city.", utcOffset: 1, sunriseM: 5*60+6, sunsetM: 20*60+52 },
  { name: "Edinburgh", region: "Scotland, UK", flag: "🇬🇧", temp: "10°C", icon: "showers", h: 12, l: 6, humidity: "78%", wind: "25 km/h W", windDir: 270, windLabel: "W", windSpeed: "25 km/h", windGust: "40 km/h", rainChance: 60, rainDesc: "Scottish breezes blowing in Atlantic showers.", aqi: 18, desc: "Cool and blustery in the Athens of the North.", utcOffset: 1, sunriseM: 4*60+46, sunsetM: 21*60+22 },
  { name: "Dublin", region: "Leinster, Ireland", flag: "🇮🇪", temp: "12°C", icon: "showers", h: 14, l: 8, humidity: "80%", wind: "20 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 65, rainDesc: "Soft Irish rain drifting in off the Atlantic.", aqi: 20, desc: "Cool and showery in the fair city.", utcOffset: 1, sunriseM: 5*60+14, sunsetM: 21*60+12 },
  { name: "Glasgow", region: "Scotland, UK", flag: "🇬🇧", temp: "11°C", icon: "rain", h: 13, l: 7, humidity: "82%", wind: "22 km/h W", windDir: 270, windLabel: "W", windSpeed: "22 km/h", windGust: "36 km/h", rainChance: 70, rainDesc: "Scotland's west coast; heavy rain expected today.", aqi: 20, desc: "Wet and chilly in Scotland's largest city.", utcOffset: 1, sunriseM: 4*60+52, sunsetM: 21*60+28 },

  // ── Western Europe ───────────────────────────────────────────────────────────
  { name: "Paris", region: "Île-de-France, France", flag: "🇫🇷", temp: "16°C", icon: "mostlyclear", h: 19, l: 11, humidity: "68%", wind: "15 km/h W", windDir: 270, windLabel: "W", windSpeed: "15 km/h", windGust: "22 km/h", rainChance: 25, rainDesc: "Mild spring day; a brief shower possible but mostly pleasant.", aqi: 38, desc: "Mild spring weather with pleasant afternoon sunshine over the Seine.", utcOffset: 2, sunriseM: 5*60+55, sunsetM: 21*60+30 },
  { name: "Lyon", region: "Auvergne-Rhône-Alpes, France", flag: "🇫🇷", temp: "18°C", icon: "partlycloudy", h: 21, l: 12, humidity: "62%", wind: "13 km/h N", windDir: 0, windLabel: "N", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 22, rainDesc: "Rhône valley spring; afternoon cloud possible.", aqi: 32, desc: "Warm spring in France's gastronomic capital.", utcOffset: 2, sunriseM: 5*60+58, sunsetM: 21*60+18 },
  { name: "Marseille", region: "Provence-Alpes-Côte d'Azur, France", flag: "🇫🇷", temp: "20°C", icon: "sunny", h: 23, l: 14, humidity: "55%", wind: "28 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "28 km/h", windGust: "45 km/h", rainChance: 8, rainDesc: "Famous Mistral wind blowing; sunny and very gusty.", aqi: 30, desc: "Sunny and very windy on the Mediterranean coast.", utcOffset: 2, sunriseM: 6*60+2, sunsetM: 21*60+16 },
  { name: "Berlin", region: "Berlin, Germany", flag: "🇩🇪", temp: "13°C", icon: "partlycloudy", h: 16, l: 8, humidity: "70%", wind: "18 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 35, rainDesc: "Variable cloud cover; scattered showers possible across the city.", aqi: 28, desc: "Cool and breezy Berlin day with mixed cloud cover.", utcOffset: 2, sunriseM: 5*60+2, sunsetM: 21*60+26 },
  { name: "Munich", region: "Bavaria, Germany", flag: "🇩🇪", temp: "16°C", icon: "partlycloudy", h: 19, l: 9, humidity: "62%", wind: "14 km/h S", windDir: 180, windLabel: "S", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 28, rainDesc: "Bavarian Alpine spring; afternoon shower possible.", aqi: 24, desc: "Cool Bavarian spring with Alpine views.", utcOffset: 2, sunriseM: 5*60+14, sunsetM: 21*60+10 },
  { name: "Hamburg", region: "Hamburg, Germany", flag: "🇩🇪", temp: "11°C", icon: "rain", h: 13, l: 7, humidity: "82%", wind: "22 km/h W", windDir: 270, windLabel: "W", windSpeed: "22 km/h", windGust: "35 km/h", rainChance: 70, rainDesc: "North Sea weather; rainy and blustery.", aqi: 22, desc: "Wet and windy in Germany's gateway to the world.", utcOffset: 2, sunriseM: 5*60+8, sunsetM: 21*60+30 },
  { name: "Frankfurt", region: "Hessen, Germany", flag: "🇩🇪", temp: "14°C", icon: "partlycloudy", h: 17, l: 9, humidity: "68%", wind: "16 km/h W", windDir: 270, windLabel: "W", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 30, rainDesc: "Central European spring; passing shower possible.", aqi: 28, desc: "Cool and partly cloudy in the European financial hub.", utcOffset: 2, sunriseM: 5*60+16, sunsetM: 21*60+16 },
  { name: "Amsterdam", region: "North Holland, Netherlands", flag: "🇳🇱", temp: "12°C", icon: "rain", h: 14, l: 8, humidity: "85%", wind: "22 km/h W", windDir: 270, windLabel: "W", windSpeed: "22 km/h", windGust: "36 km/h", rainChance: 70, rainDesc: "Rainy and windy; classic Dutch weather with heavy overcast skies.", aqi: 25, desc: "Wet and windy along the North Sea canals.", utcOffset: 2, sunriseM: 5*60+18, sunsetM: 21*60+42 },
  { name: "Brussels", region: "Brussels Capital Region, Belgium", flag: "🇧🇪", temp: "13°C", icon: "rain", h: 15, l: 9, humidity: "84%", wind: "20 km/h W", windDir: 270, windLabel: "W", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 72, rainDesc: "Belgian weather being quintessentially Belgian — wet and grey.", aqi: 28, desc: "Overcast and drizzly in the EU capital.", utcOffset: 2, sunriseM: 5*60+28, sunsetM: 21*60+38 },
  { name: "Rome", region: "Lazio, Italy", flag: "🇮🇹", temp: "22°C", icon: "sunny", h: 25, l: 15, humidity: "52%", wind: "13 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 10, rainDesc: "Beautifully sunny; almost no rain expected over the Eternal City.", aqi: 45, desc: "Glorious sunshine over Rome's ancient streets.", utcOffset: 2, sunriseM: 5*60+45, sunsetM: 20*60+36 },
  { name: "Milan", region: "Lombardy, Italy", flag: "🇮🇹", temp: "19°C", icon: "partlycloudy", h: 22, l: 13, humidity: "65%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "18 km/h", rainChance: 25, rainDesc: "Po Valley spring; afternoon cloud and light shower possible.", aqi: 52, desc: "Warm spring in Italy's fashion and finance capital.", utcOffset: 2, sunriseM: 5*60+38, sunsetM: 21*60+0 },
  { name: "Madrid", region: "Community of Madrid, Spain", flag: "🇪🇸", temp: "22°C", icon: "sunny", h: 25, l: 13, humidity: "38%", wind: "12 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 8, rainDesc: "Warm dry Castilian plateau; no rain today.", aqi: 42, desc: "Clear sunny skies over the high plateau capital.", utcOffset: 2, sunriseM: 6*60+44, sunsetM: 21*60+30 },
  { name: "Barcelona", region: "Catalonia, Spain", flag: "🇪🇸", temp: "21°C", icon: "mostlyclear", h: 24, l: 16, humidity: "60%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 15, rainDesc: "Mostly sunny Mediterranean day.", aqi: 38, desc: "Warm and pleasant with a refreshing Mediterranean breeze.", utcOffset: 2, sunriseM: 6*60+21, sunsetM: 21*60+23 },
  { name: "Lisbon", region: "Lisbon District, Portugal", flag: "🇵🇹", temp: "20°C", icon: "mostlyclear", h: 23, l: 14, humidity: "62%", wind: "16 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 15, rainDesc: "Atlantic sea breeze; mostly dry and pleasant along the Tagus.", aqi: 30, desc: "Mild Atlantic city with pleasant sea breezes.", utcOffset: 1, sunriseM: 6*60+14, sunsetM: 20*60+58 },
  { name: "Stockholm", region: "Stockholm County, Sweden", flag: "🇸🇪", temp: "14°C", icon: "mostlyclear", h: 17, l: 8, humidity: "58%", wind: "12 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "12 km/h", windGust: "18 km/h", rainChance: 15, rainDesc: "Crisp Nordic spring air; skies clearing beautifully by noon.", aqi: 18, desc: "Cool and pleasant spring day across the Baltic archipelago.", utcOffset: 2, sunriseM: 3*60+54, sunsetM: 21*60+47 },
  { name: "Vienna", region: "Vienna, Austria", flag: "🇦🇹", temp: "17°C", icon: "partlycloudy", h: 20, l: 11, humidity: "62%", wind: "15 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 25, rainDesc: "Breezy Central European spring day with passing light clouds.", aqi: 32, desc: "Mild and comfortable with alternating periods of sun and cloud.", utcOffset: 2, sunriseM: 5*60+10, sunsetM: 21*60+2 },
  { name: "Athens", region: "Attica, Greece", flag: "🇬🇷", temp: "24°C", icon: "sunny", h: 27, l: 17, humidity: "45%", wind: "14 km/h N", windDir: 0, windLabel: "N", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 5, rainDesc: "Clear Mediterranean skies; beautiful sunny day over the Acropolis.", aqi: 55, desc: "Warm and brilliantly sunny with excellent visibility.", utcOffset: 3, sunriseM: 6*60+2, sunsetM: 20*60+48 },
  { name: "Istanbul", region: "İstanbul, Turkey", flag: "🇹🇷", temp: "19°C", icon: "mostlyclear", h: 22, l: 14, humidity: "65%", wind: "15 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 25, rainDesc: "Bosphorus breeze; partly cloudy with a slight chance of evening showers.", aqi: 48, desc: "Warm spring day over the Bosphorus with a refreshing breeze.", utcOffset: 3, sunriseM: 5*60+38, sunsetM: 20*60+28 },
  { name: "Ankara", region: "Ankara Province, Turkey", flag: "🇹🇷", temp: "18°C", icon: "partlycloudy", h: 22, l: 10, humidity: "50%", wind: "14 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 22, rainDesc: "Anatolian plateau spring; afternoon shower possible.", aqi: 42, desc: "Cool and partly cloudy in the Turkish capital.", utcOffset: 3, sunriseM: 5*60+42, sunsetM: 20*60+22 },
  { name: "Zurich", region: "Canton of Zurich, Switzerland", flag: "🇨🇭", temp: "15°C", icon: "partlycloudy", h: 18, l: 9, humidity: "65%", wind: "13 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 28, rainDesc: "Alpine moisture; afternoon shower risk near the lake.", aqi: 22, desc: "Crisp Swiss spring day with Alpine clouds building.", utcOffset: 2, sunriseM: 5*60+32, sunsetM: 21*60+12 },
  { name: "Oslo", region: "Oslo, Norway", flag: "🇳🇴", temp: "12°C", icon: "mostlyclear", h: 15, l: 5, humidity: "52%", wind: "11 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 15, rainDesc: "Fjord spring clearing; bright sunny days returning.", aqi: 14, desc: "Crisp Norwegian spring with stunning fjord views.", utcOffset: 2, sunriseM: 4*60+40, sunsetM: 22*60+0 },
  { name: "Copenhagen", region: "Capital Region, Denmark", flag: "🇩🇰", temp: "13°C", icon: "partlycloudy", h: 15, l: 7, humidity: "70%", wind: "18 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 32, rainDesc: "North Sea breezes; intermittent shower possible.", aqi: 20, desc: "Breezy Danish spring over the Little Mermaid harbour.", utcOffset: 2, sunriseM: 5*60+4, sunsetM: 21*60+38 },
  { name: "Helsinki", region: "Uusimaa, Finland", flag: "🇫🇮", temp: "11°C", icon: "mostlyclear", h: 14, l: 5, humidity: "55%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 18, rainDesc: "Baltic spring clearing; fresh Nordic air over the harbour.", aqi: 15, desc: "Cool Nordic spring brightening over the Helsinki harbour.", utcOffset: 3, sunriseM: 4*60+28, sunsetM: 22*60+18 },
  { name: "Prague", region: "Prague, Czech Republic", flag: "🇨🇿", temp: "14°C", icon: "partlycloudy", h: 17, l: 8, humidity: "66%", wind: "14 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 30, rainDesc: "Central European spring cloud; scattered showers possible.", aqi: 30, desc: "Cool spring day in the City of a Hundred Spires.", utcOffset: 2, sunriseM: 5*60+16, sunsetM: 21*60+10 },
  { name: "Warsaw", region: "Masovian Voivodeship, Poland", flag: "🇵🇱", temp: "12°C", icon: "partlycloudy", h: 15, l: 6, humidity: "68%", wind: "16 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 30, rainDesc: "Baltic influence; cool breezy spring day with shower chance.", aqi: 35, desc: "Cool Eastern European spring with passing cloud.", utcOffset: 2, sunriseM: 5*60+10, sunsetM: 21*60+4 },
  { name: "Budapest", region: "Budapest, Hungary", flag: "🇭🇺", temp: "16°C", icon: "mostlyclear", h: 19, l: 9, humidity: "58%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "18 km/h", rainChance: 18, rainDesc: "Danube valley spring; mostly clear with a slim shower chance.", aqi: 36, desc: "Lovely Danube spring in the Pearl of the Danube.", utcOffset: 2, sunriseM: 5*60+20, sunsetM: 20*60+54 },
  { name: "Bucharest", region: "Ilfov County, Romania", flag: "🇷🇴", temp: "18°C", icon: "partlycloudy", h: 22, l: 10, humidity: "60%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 28, rainDesc: "Continental spring; afternoon shower building.", aqi: 40, desc: "Warm Balkan spring day in Little Paris.", utcOffset: 3, sunriseM: 5*60+52, sunsetM: 21*60+0 },
  { name: "Moscow", region: "Moscow Oblast, Russia", flag: "🇷🇺", temp: "8°C", icon: "snow", h: 10, l: 3, humidity: "75%", wind: "22 km/h N", windDir: 0, windLabel: "N", windSpeed: "22 km/h", windGust: "35 km/h", rainChance: 40, rainDesc: "Cold north winds; late spring sleet or snow flurries possible overnight.", aqi: 25, desc: "Cold with overcast skies and a chance of late spring snow flurries.", utcOffset: 3, sunriseM: 4*60+46, sunsetM: 21*60+7 },
  { name: "Saint Petersburg", region: "Leningrad Oblast, Russia", flag: "🇷🇺", temp: "10°C", icon: "partlycloudy", h: 13, l: 5, humidity: "72%", wind: "18 km/h W", windDir: 270, windLabel: "W", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 38, rainDesc: "Baltic spring shower; overcast and damp by the Neva.", aqi: 22, desc: "Cool White Night season approaching on the Neva delta.", utcOffset: 3, sunriseM: 4*60+10, sunsetM: 22*60+28 },
  { name: "Kiev", region: "Kyiv Oblast, Ukraine", flag: "🇺🇦", temp: "14°C", icon: "partlycloudy", h: 17, l: 7, humidity: "64%", wind: "15 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 28, rainDesc: "Eastern European spring cloud; shower possible in the afternoon.", aqi: 32, desc: "Cool spring day on the Dnipro river banks.", utcOffset: 3, sunriseM: 5*60+18, sunsetM: 21*60+6 },
  { name: "Reykjavík", region: "Capital Region, Iceland", flag: "🇮🇸", temp: "6°C", icon: "rain", h: 8, l: 3, humidity: "82%", wind: "25 km/h W", windDir: 270, windLabel: "W", windSpeed: "25 km/h", windGust: "42 km/h", rainChance: 80, rainDesc: "Cold North Atlantic rain showers with misty conditions.", aqi: 12, desc: "Brisk and wet subpolar climate with low cloud cover.", utcOffset: 0, sunriseM: 4*60+4, sunsetM: 22*60+50 },
  { name: "Belgrade", region: "Belgrade District, Serbia", flag: "🇷🇸", temp: "18°C", icon: "mostlyclear", h: 22, l: 10, humidity: "58%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 20, rainDesc: "Danube and Sava confluence; mostly clear spring day.", aqi: 38, desc: "Pleasant spring day in the White City.", utcOffset: 2, sunriseM: 5*60+28, sunsetM: 20*60+50 },
  { name: "Sofia", region: "Sofia Province, Bulgaria", flag: "🇧🇬", temp: "15°C", icon: "partlycloudy", h: 18, l: 7, humidity: "62%", wind: "13 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "13 km/h", windGust: "21 km/h", rainChance: 30, rainDesc: "Balkan mountain clouds; afternoon shower possible.", aqi: 35, desc: "Cool Balkan spring beneath the Vitosha Mountain.", utcOffset: 3, sunriseM: 5*60+56, sunsetM: 21*60+2 },
  { name: "Zagreb", region: "City of Zagreb, Croatia", flag: "🇭🇷", temp: "17°C", icon: "mostlyclear", h: 20, l: 9, humidity: "60%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 22, rainDesc: "Alpine influences; a passing shower possible over the Sava valley.", aqi: 30, desc: "Mild Croatian spring in the twin-towered cathedral city.", utcOffset: 2, sunriseM: 5*60+28, sunsetM: 20*60+44 },
  { name: "Tirana", region: "Tirana County, Albania", flag: "🇦🇱", temp: "20°C", icon: "sunny", h: 23, l: 12, humidity: "56%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "18 km/h", rainChance: 12, rainDesc: "Mediterranean Adriatic influence; warm and dry spring day.", aqi: 42, desc: "Warm sunny spring in the Albanian capital.", utcOffset: 2, sunriseM: 5*60+50, sunsetM: 20*60+38 },
  { name: "Valletta", region: "South Eastern Region, Malta", flag: "🇲🇹", temp: "21°C", icon: "sunny", h: 24, l: 16, humidity: "62%", wind: "18 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 8, rainDesc: "Breezy Mediterranean day; very little rain chance.", aqi: 28, desc: "Warm sunny day on the limestone Mediterranean island.", utcOffset: 2, sunriseM: 5*60+52, sunsetM: 20*60+30 },
  { name: "Nicosia", region: "Nicosia District, Cyprus", flag: "🇨🇾", temp: "26°C", icon: "sunny", h: 29, l: 18, humidity: "40%", wind: "11 km/h W", windDir: 270, windLabel: "W", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 5, rainDesc: "Hot dry Eastern Mediterranean; no rain today.", aqi: 40, desc: "Warm and sunny in the divided island capital.", utcOffset: 3, sunriseM: 6*60+0, sunsetM: 20*60+42 },
  { name: "Ljubljana", region: "City Municipality of Ljubljana, Slovenia", flag: "🇸🇮", temp: "16°C", icon: "mostlyclear", h: 19, l: 9, humidity: "62%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 20, rainDesc: "Julian Alps moisture; a brief shower possible.", aqi: 22, desc: "Charming Alpine capital with beautiful spring weather.", utcOffset: 2, sunriseM: 5*60+30, sunsetM: 20*60+46 },

  // ── Middle East ───────────────────────────────────────────────────────────────
  { name: "Dubai", region: "Dubai, UAE", flag: "🇦🇪", temp: "40°C", icon: "sunny", h: 44, l: 33, humidity: "40%", wind: "19 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "19 km/h", windGust: "30 km/h", rainChance: 2, rainDesc: "Essentially zero rain probability; extreme desert heat dominates.", aqi: 85, desc: "Blistering heat with clear sunny skies and hot desert winds.", utcOffset: 4, sunriseM: 5*60+41, sunsetM: 19*60+2 },
  { name: "Abu Dhabi", region: "Abu Dhabi Emirate, UAE", flag: "🇦🇪", temp: "41°C", icon: "sunny", h: 45, l: 32, humidity: "38%", wind: "16 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 1, rainDesc: "Extreme Gulf heat; essentially zero rain today.", aqi: 80, desc: "Blistering desert heat in the pearl diving heritage capital.", utcOffset: 4, sunriseM: 5*60+40, sunsetM: 19*60+4 },
  { name: "Riyadh", region: "Riyadh Province, Saudi Arabia", flag: "🇸🇦", temp: "43°C", icon: "sunny", h: 46, l: 34, humidity: "12%", wind: "16 km/h N", windDir: 0, windLabel: "N", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 0, rainDesc: "Absolute zero chance of rain; intense desert heatwave conditions.", aqi: 145, desc: "Blistering, extreme desert heat with suspension of fine dust particles.", utcOffset: 3, sunriseM: 5*60+30, sunsetM: 18*60+46 },
  { name: "Jeddah", region: "Makkah Province, Saudi Arabia", flag: "🇸🇦", temp: "36°C", icon: "sunny", h: 40, l: 28, humidity: "45%", wind: "18 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 1, rainDesc: "Red Sea coastal heat; virtually no rain expected.", aqi: 90, desc: "Hot and humid on the Red Sea coast.", utcOffset: 3, sunriseM: 5*60+36, sunsetM: 18*60+50 },
  { name: "Doha", region: "Doha Municipality, Qatar", flag: "🇶🇦", temp: "40°C", icon: "sunny", h: 44, l: 32, humidity: "38%", wind: "20 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 1, rainDesc: "Extreme Qatar Gulf heat; rain impossible today.", aqi: 90, desc: "Intense Gulf heat and humidity in the football city.", utcOffset: 3, sunriseM: 5*60+20, sunsetM: 18*60+40 },
  { name: "Kuwait City", region: "Asimah Governorate, Kuwait", flag: "🇰🇼", temp: "44°C", icon: "sunny", h: 48, l: 34, humidity: "20%", wind: "18 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 0, rainDesc: "Kuwait summer heatwave; absolute desert conditions.", aqi: 120, desc: "Extreme heat in one of the world's hottest cities.", utcOffset: 3, sunriseM: 5*60+6, sunsetM: 19*60+0 },
  { name: "Cairo", region: "Cairo Governorate, Egypt", flag: "🇪🇬", temp: "36°C", icon: "sunny", h: 39, l: 27, humidity: "25%", wind: "24 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "24 km/h", windGust: "40 km/h", rainChance: 2, rainDesc: "Khamsin desert wind bringing sand and dust.", aqi: 120, desc: "Hot and dry with strong Khamsin desert winds and blowing sand.", utcOffset: 3, sunriseM: 5*60+5, sunsetM: 19*60+40 },
  { name: "Tehran", region: "Tehran Province, Iran", flag: "🇮🇷", temp: "28°C", icon: "mostlyclear", h: 32, l: 18, humidity: "35%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 8, rainDesc: "Alborz mountain breezes; mostly dry spring day.", aqi: 120, desc: "Warm and hazy in the foot of the Alborz Mountains.", utcOffset: 3.5, sunriseM: 5*60+22, sunsetM: 20*60+8 },
  { name: "Baghdad", region: "Baghdad Governorate, Iraq", flag: "🇮🇶", temp: "40°C", icon: "sunny", h: 44, l: 30, humidity: "20%", wind: "14 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 1, rainDesc: "Mesopotamian summer; essentially no rainfall today.", aqi: 150, desc: "Intense Mesopotamian heat in the ancient capital.", utcOffset: 3, sunriseM: 5*60+18, sunsetM: 19*60+8 },
  { name: "Amman", region: "Amman Governorate, Jordan", flag: "🇯🇴", temp: "28°C", icon: "sunny", h: 32, l: 18, humidity: "35%", wind: "13 km/h W", windDir: 270, windLabel: "W", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 4, rainDesc: "Dry Levant spring; minimal rain risk.", aqi: 52, desc: "Warm and dry on the ancient Jordanian plateau.", utcOffset: 3, sunriseM: 5*60+38, sunsetM: 19*60+44 },
  { name: "Tel Aviv", region: "Tel Aviv District, Israel", flag: "🇮🇱", temp: "26°C", icon: "sunny", h: 28, l: 18, humidity: "60%", wind: "16 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "16 km/h", windGust: "24 km/h", rainChance: 5, rainDesc: "Mediterranean sea breeze; dry and pleasant today.", aqi: 38, desc: "Warm and sunny coastal city by the Mediterranean.", utcOffset: 3, sunriseM: 5*60+26, sunsetM: 19*60+42 },
  { name: "Muscat", region: "Muscat Governorate, Oman", flag: "🇴🇲", temp: "38°C", icon: "sunny", h: 42, l: 30, humidity: "44%", wind: "18 km/h NNW", windDir: 338, windLabel: "NNW", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 3, rainDesc: "Arabian Sea heat; extremely dry conditions.", aqi: 70, desc: "Hot and sunny in the ancient fortified Omani capital.", utcOffset: 4, sunriseM: 5*60+44, sunsetM: 18*60+56 },
  { name: "Manama", region: "Capital Governorate, Bahrain", flag: "🇧🇭", temp: "38°C", icon: "sunny", h: 42, l: 30, humidity: "52%", wind: "22 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "22 km/h", windGust: "36 km/h", rainChance: 2, rainDesc: "Hot and very humid Gulf island; no rain today.", aqi: 88, desc: "Oppressive Gulf heat and humidity on the pearl island.", utcOffset: 3, sunriseM: 5*60+22, sunsetM: 18*60+44 },
  { name: "Kabul", region: "Kabul Province, Afghanistan", flag: "🇦🇫", temp: "20°C", icon: "partlycloudy", h: 25, l: 10, humidity: "38%", wind: "12 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 20, rainDesc: "Hindu Kush spring; afternoon shower possible.", aqi: 88, desc: "Cool and partly cloudy in the high-altitude Afghan capital.", utcOffset: 4.5, sunriseM: 5*60+20, sunsetM: 19*60+8 },

  // ── Central/South Asia ────────────────────────────────────────────────────────
  { name: "Islamabad", region: "Islamabad Capital Territory, Pakistan", flag: "🇵🇰", temp: "32°C", icon: "partlycloudy", h: 35, l: 22, humidity: "52%", wind: "11 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 35, rainDesc: "Margalla Hills moisture; pre-monsoon shower possible.", aqi: 95, desc: "Warm and partly cloudy at the Margalla Hills foothills.", utcOffset: 5, sunriseM: 5*60+22, sunsetM: 19*60+20 },
  { name: "Karachi", region: "Sindh, Pakistan", flag: "🇵🇰", temp: "35°C", icon: "sunny", h: 38, l: 28, humidity: "62%", wind: "24 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "24 km/h", windGust: "38 km/h", rainChance: 10, rainDesc: "Arabian Sea monsoon approaching; pre-monsoon humidity high.", aqi: 130, desc: "Hot coastal city with strong sea winds and high humidity.", utcOffset: 5, sunriseM: 6*60+2, sunsetM: 19*60+30 },
  { name: "Lahore", region: "Punjab, Pakistan", flag: "🇵🇰", temp: "40°C", icon: "sunny", h: 44, l: 30, humidity: "32%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 8, rainDesc: "Punjab heat wave; pre-monsoon dry conditions.", aqi: 210, desc: "Scorching heat in the City of Gardens.", utcOffset: 5, sunriseM: 5*60+28, sunsetM: 19*60+28 },
  { name: "Dhaka", region: "Dhaka Division, Bangladesh", flag: "🇧🇩", temp: "32°C", icon: "thunderstorm", h: 34, l: 26, humidity: "86%", wind: "15 km/h S", windDir: 180, windLabel: "S", windSpeed: "15 km/h", windGust: "26 km/h", rainChance: 78, rainDesc: "Bay of Bengal monsoon reaching the Bengal delta.", aqi: 160, desc: "Intense monsoon downpours in the densely populated delta city.", utcOffset: 6, sunriseM: 5*60+20, sunsetM: 18*60+44 },
  { name: "Chittagong", region: "Chittagong Division, Bangladesh", flag: "🇧🇩", temp: "31°C", icon: "rain", h: 33, l: 25, humidity: "85%", wind: "16 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 75, rainDesc: "Bay of Bengal rains drenching the port city.", aqi: 120, desc: "Tropical monsoon in Bangladesh's port city.", utcOffset: 6, sunriseM: 5*60+18, sunsetM: 18*60+42 },
  { name: "Kathmandu", region: "Bagmati Province, Nepal", flag: "🇳🇵", temp: "22°C", icon: "rain", h: 25, l: 16, humidity: "78%", wind: "8 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "8 km/h", windGust: "14 km/h", rainChance: 65, rainDesc: "Himalayan monsoon rains filling the Kathmandu valley.", aqi: 85, desc: "Warm and rainy in the Himalayan kingdom's capital.", utcOffset: 5.75, sunriseM: 5*60+28, sunsetM: 18*60+48 },
  // ─── NEW INTERNATIONAL ───────────────────────────────────────────────────────

  // North America (additional)
  { name: "Phoenix", region: "Arizona, USA", flag: "🇺🇸", temp: "42°C", icon: "sunny", h: 45, l: 32, humidity: "15%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 2, rainDesc: "Sonoran desert heat; essentially zero chance of rain.", aqi: 55, desc: "Extreme desert heat baking the Valley of the Sun.", utcOffset: -7, sunriseM: 5 * 60 + 30, sunsetM: 19 * 60 + 45 },
  { name: "Dallas", region: "Texas, USA", flag: "🇺🇸", temp: "33°C", icon: "partlycloudy", h: 36, l: 24, humidity: "58%", wind: "18 km/h S", windDir: 180, windLabel: "S", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 40, rainDesc: "Gulf moisture fueling afternoon convection; severe storm risk low.", aqi: 48, desc: "Hot and partly cloudy with storm potential in North Texas.", utcOffset: -5, sunriseM: 6 * 60 + 18, sunsetM: 20 * 60 + 24 },
  { name: "Atlanta", region: "Georgia, USA", flag: "🇺🇸", temp: "28°C", icon: "thunderstorm", h: 31, l: 20, humidity: "72%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "22 km/h", rainChance: 60, rainDesc: "Afternoon thunderstorms typical of Georgia summer pattern.", aqi: 42, desc: "Warm and humid Southern city with active afternoon storms.", utcOffset: -4, sunriseM: 6 * 60 + 20, sunsetM: 20 * 60 + 22 },
  { name: "Boston", region: "Massachusetts, USA", flag: "🇺🇸", temp: "16°C", icon: "partlycloudy", h: 19, l: 11, humidity: "62%", wind: "20 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 30, rainDesc: "Northeast coastal breeze; passing shower possible by afternoon.", aqi: 38, desc: "Cool coastal spring day with a brisk Atlantic breeze.", utcOffset: -4, sunriseM: 5 * 60 + 12, sunsetM: 20 * 60 + 8 },
  { name: "Denver", region: "Colorado, USA", flag: "🇺🇸", temp: "22°C", icon: "mostlyclear", h: 26, l: 10, humidity: "35%", wind: "16 km/h W", windDir: 270, windLabel: "W", windSpeed: "16 km/h", windGust: "28 km/h", rainChance: 20, rainDesc: "Mile-high city afternoon thunderstorm possible; morning clear.", aqi: 32, desc: "Sunny and dry with stunning Rocky Mountain views.", utcOffset: -6, sunriseM: 5 * 60 + 42, sunsetM: 20 * 60 + 28 },
  { name: "Las Vegas", region: "Nevada, USA", flag: "🇺🇸", temp: "38°C", icon: "sunny", h: 41, l: 27, humidity: "14%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 3, rainDesc: "Mojave desert heat; extremely arid conditions today.", aqi: 42, desc: "Blazing desert sun lighting up the neon city.", utcOffset: -7, sunriseM: 5 * 60 + 48, sunsetM: 20 * 60 + 4 },
  { name: "Portland", region: "Oregon, USA", flag: "🇺🇸", temp: "16°C", icon: "showers", h: 19, l: 10, humidity: "78%", wind: "13 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 55, rainDesc: "Pacific Northwest showers; typical Oregon weather pattern.", aqi: 22, desc: "Damp and cool with light rain in the Rose City.", utcOffset: -7, sunriseM: 5 * 60 + 22, sunsetM: 20 * 60 + 50 },
  { name: "Minneapolis", region: "Minnesota, USA", flag: "🇺🇸", temp: "18°C", icon: "partlycloudy", h: 22, l: 10, humidity: "56%", wind: "22 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "22 km/h", windGust: "36 km/h", rainChance: 25, rainDesc: "Breezy prairie winds; isolated shower possible this afternoon.", aqi: 28, desc: "Cool and breezy Minnesota spring over the Twin Cities lakes.", utcOffset: -5, sunriseM: 5 * 60 + 32, sunsetM: 20 * 60 + 44 },
  { name: "New Orleans", region: "Louisiana, USA", flag: "🇺🇸", temp: "30°C", icon: "thunderstorm", h: 33, l: 24, humidity: "84%", wind: "14 km/h S", windDir: 180, windLabel: "S", windSpeed: "14 km/h", windGust: "24 km/h", rainChance: 72, rainDesc: "Gulf humidity triggering frequent afternoon pop-up thunderstorms.", aqi: 45, desc: "Steamy bayou city with intense afternoon thunderstorms.", utcOffset: -5, sunriseM: 6 * 60 + 4, sunsetM: 20 * 60 + 4 },
  { name: "Washington DC", region: "District of Columbia, USA", flag: "🇺🇸", temp: "24°C", icon: "partlycloudy", h: 27, l: 16, humidity: "64%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 30, rainDesc: "Partly cloudy humid day; afternoon shower can't be ruled out.", aqi: 50, desc: "Warm and muggy around the National Mall.", utcOffset: -4, sunriseM: 5 * 60 + 48, sunsetM: 20 * 60 + 18 },
  { name: "Detroit", region: "Michigan, USA", flag: "🇺🇸", temp: "15°C", icon: "partlycloudy", h: 18, l: 9, humidity: "66%", wind: "19 km/h W", windDir: 270, windLabel: "W", windSpeed: "19 km/h", windGust: "30 km/h", rainChance: 28, rainDesc: "Lake Michigan influence; breezy with isolated shower risk.", aqi: 42, desc: "Cool spring day with gusty lake winds.", utcOffset: -4, sunriseM: 6 * 60 + 4, sunsetM: 20 * 60 + 32 },
  { name: "Nashville", region: "Tennessee, USA", flag: "🇺🇸", temp: "26°C", icon: "showers", h: 29, l: 18, humidity: "68%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 50, rainDesc: "Tennessee River valley moisture; afternoon showers likely.", aqi: 38, desc: "Warm and humid Music City with scattered showers.", utcOffset: -5, sunriseM: 6 * 60 + 2, sunsetM: 20 * 60 + 14 },
  { name: "Charlotte", region: "North Carolina, USA", flag: "🇺🇸", temp: "27°C", icon: "partlycloudy", h: 30, l: 18, humidity: "65%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 35, rainDesc: "Piedmont humidity building; afternoon pop-up showers possible.", aqi: 40, desc: "Warm Southern spring day with building afternoon humidity.", utcOffset: -4, sunriseM: 6 * 60 + 6, sunsetM: 20 * 60 + 14 },
  { name: "Orlando", region: "Florida, USA", flag: "🇺🇸", temp: "31°C", icon: "thunderstorm", h: 34, l: 23, humidity: "78%", wind: "16 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 68, rainDesc: "Florida's famous daily thunderstorm pattern fully active.", aqi: 35, desc: "Hot and stormy in the theme park capital of the world.", utcOffset: -4, sunriseM: 6 * 60 + 30, sunsetM: 20 * 60 + 0 },
  { name: "Tampa", region: "Florida, USA", flag: "🇺🇸", temp: "32°C", icon: "thunderstorm", h: 35, l: 24, humidity: "80%", wind: "17 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "17 km/h", windGust: "28 km/h", rainChance: 70, rainDesc: "Bay breezes converging with Gulf moisture creating storms.", aqi: 38, desc: "Hot and humid Tampa Bay with recurring afternoon thunderstorms.", utcOffset: -4, sunriseM: 6 * 60 + 32, sunsetM: 20 * 60 + 2 },
  { name: "Anchorage", region: "Alaska, USA", flag: "🇺🇸", temp: "8°C", icon: "partlycloudy", h: 12, l: 3, humidity: "62%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 25, rainDesc: "Subarctic spring; passing shower possible off Cook Inlet.", aqi: 12, desc: "Cool subarctic spring in Alaska's largest city.", utcOffset: -8, sunriseM: 5 * 60 + 20, sunsetM: 22 * 60 + 10 },
  { name: "Montreal", region: "Quebec, Canada", flag: "🇨🇦", temp: "14°C", icon: "partlycloudy", h: 17, l: 8, humidity: "58%", wind: "16 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 22, rainDesc: "Breezy St. Lawrence spring day; afternoon clouds possible.", aqi: 28, desc: "Cool and pleasant Montreal spring with bilingual charm.", utcOffset: -4, sunriseM: 5 * 60 + 22, sunsetM: 20 * 60 + 32 },
  { name: "Calgary", region: "Alberta, Canada", flag: "🇨🇦", temp: "16°C", icon: "mostlyclear", h: 20, l: 5, humidity: "40%", wind: "20 km/h W", windDir: 270, windLabel: "W", windSpeed: "20 km/h", windGust: "35 km/h", rainChance: 18, rainDesc: "Chinook arch visible; warm foehn winds off the Rockies.", aqi: 20, desc: "Warm Chinook winds sweeping east off the Canadian Rockies.", utcOffset: -6, sunriseM: 5 * 60 + 44, sunsetM: 21 * 60 + 10 },
  { name: "Ottawa", region: "Ontario, Canada", flag: "🇨🇦", temp: "13°C", icon: "sunny", h: 16, l: 7, humidity: "50%", wind: "15 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "15 km/h", windGust: "23 km/h", rainChance: 12, rainDesc: "Clear spring day over Parliament Hill; no rain expected.", aqi: 24, desc: "Bright spring day in Canada's capital city.", utcOffset: -4, sunriseM: 5 * 60 + 30, sunsetM: 20 * 60 + 28 },
  { name: "Quebec City", region: "Quebec, Canada", flag: "🇨🇦", temp: "11°C", icon: "partlycloudy", h: 14, l: 6, humidity: "60%", wind: "17 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "17 km/h", windGust: "27 km/h", rainChance: 28, rainDesc: "St. Lawrence River wind; a passing shower possible.", aqi: 18, desc: "Chilly spring in the walled French city.", utcOffset: -4, sunriseM: 5 * 60 + 18, sunsetM: 20 * 60 + 26 },
  { name: "Havana", region: "La Habana, Cuba", flag: "🇨🇺", temp: "30°C", icon: "partlycloudy", h: 32, l: 23, humidity: "76%", wind: "18 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 35, rainDesc: "Caribbean trade winds; brief tropical shower possible.", aqi: 38, desc: "Warm Caribbean day in the classic Cuban capital.", utcOffset: -4, sunriseM: 6 * 60 + 40, sunsetM: 20 * 60 + 8 },
  { name: "San José", region: "San José Province, Costa Rica", flag: "🇨🇷", temp: "22°C", icon: "showers", h: 25, l: 16, humidity: "74%", wind: "8 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 60, rainDesc: "Central American rainy season; afternoon showers regular.", aqi: 30, desc: "Cool highland capital with regular afternoon tropical showers.", utcOffset: -6, sunriseM: 5 * 60 + 30, sunsetM: 17 * 60 + 48 },
  { name: "Panama City", region: "Panamá Province, Panama", flag: "🇵🇦", temp: "30°C", icon: "thunderstorm", h: 32, l: 24, humidity: "85%", wind: "11 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 75, rainDesc: "Isthmus storms; heavy convective rain expected daily.", aqi: 45, desc: "Tropical storms crossing the famous Canal Zone.", utcOffset: -5, sunriseM: 6 * 60 + 12, sunsetM: 18 * 60 + 24 },
  { name: "Bogotá", region: "Cundinamarca, Colombia", flag: "🇨🇴", temp: "14°C", icon: "showers", h: 17, l: 8, humidity: "78%", wind: "9 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 65, rainDesc: "High Andean capital in bimodal rainy season; afternoon showers.", aqi: 55, desc: "Cool Andean capital with frequent afternoon rain.", utcOffset: -5, sunriseM: 5 * 60 + 58, sunsetM: 18 * 60 + 10 },
  { name: "Caracas", region: "Capital District, Venezuela", flag: "🇻🇪", temp: "22°C", icon: "partlycloudy", h: 25, l: 17, humidity: "68%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 40, rainDesc: "Venezuelan rainy season beginning; afternoon showers possible.", aqi: 60, desc: "Mild Andean mountain capital with pleasant temperatures.", utcOffset: -4, sunriseM: 6 * 60 + 14, sunsetM: 18 * 60 + 28 },
  { name: "Rio de Janeiro", region: "Rio de Janeiro, Brazil", flag: "🇧🇷", temp: "26°C", icon: "showers", h: 30, l: 22, humidity: "80%", wind: "14 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 55, rainDesc: "Tropical showers typical over the Carioca mountains.", aqi: 52, desc: "Beautiful but stormy Rio, with clouds over Sugarloaf Mountain.", utcOffset: -3, sunriseM: 6 * 60 + 8, sunsetM: 17 * 60 + 42 },
  { name: "Brasília", region: "Distrito Federal, Brazil", flag: "🇧🇷", temp: "24°C", icon: "showers", h: 28, l: 18, humidity: "72%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 58, rainDesc: "Cerrado rainy season; afternoon downpours common.", aqi: 40, desc: "Warm capital city in the rainy season on the central plateau.", utcOffset: -3, sunriseM: 6 * 60 + 10, sunsetM: 17 * 60 + 52 },
  { name: "Manaus", region: "Amazonas, Brazil", flag: "🇧🇷", temp: "30°C", icon: "thunderstorm", h: 33, l: 24, humidity: "88%", wind: "8 km/h E", windDir: 90, windLabel: "E", windSpeed: "8 km/h", windGust: "14 km/h", rainChance: 85, rainDesc: "Amazon jungle storms; heavy persistent rain.", aqi: 35, desc: "Intense equatorial heat and daily torrential downpours.", utcOffset: -4, sunriseM: 6 * 60 + 0, sunsetM: 18 * 60 + 6 },
  { name: "Montevideo", region: "Montevideo Department, Uruguay", flag: "🇺🇾", temp: "17°C", icon: "mostlyclear", h: 20, l: 11, humidity: "64%", wind: "20 km/h S", windDir: 180, windLabel: "S", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 18, rainDesc: "Río de la Plata southerly winds; mostly dry today.", aqi: 25, desc: "Mild autumn day on the Río de la Plata estuary.", utcOffset: -3, sunriseM: 7 * 60 + 48, sunsetM: 18 * 60 + 14 },
  { name: "La Paz", region: "Murillo Province, Bolivia", flag: "🇧🇴", temp: "10°C", icon: "partlycloudy", h: 14, l: 3, humidity: "60%", wind: "12 km/h W", windDir: 270, windLabel: "W", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 35, rainDesc: "High altitude altiplano showers; thin air above 3600m.", aqi: 48, desc: "Cold and thin air in the world's highest administrative capital.", utcOffset: -4, sunriseM: 6 * 60 + 28, sunsetM: 18 * 60 + 22 },
  { name: "Quito", region: "Pichincha Province, Ecuador", flag: "🇪🇨", temp: "15°C", icon: "showers", h: 18, l: 9, humidity: "75%", wind: "7 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "7 km/h", windGust: "12 km/h", rainChance: 60, rainDesc: "Andean afternoon showers at the equatorial mountain capital.", aqi: 42, desc: "Cool equatorial mountain city with reliable afternoon rain.", utcOffset: -5, sunriseM: 6 * 60 + 12, sunsetM: 18 * 60 + 18 },
  { name: "Asunción", region: "Central Department, Paraguay", flag: "🇵🇾", temp: "24°C", icon: "partlycloudy", h: 28, l: 16, humidity: "65%", wind: "14 km/h N", windDir: 0, windLabel: "N", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 30, rainDesc: "Subtropical Paraguay; afternoon convective shower possible.", aqi: 42, desc: "Warm subtropical capital beside the Paraguay River.", utcOffset: -4, sunriseM: 7 * 60 + 0, sunsetM: 18 * 60 + 30 },
  { name: "Georgetown", region: "Demerara-Mahaica, Guyana", flag: "🇬🇾", temp: "30°C", icon: "rain", h: 32, l: 24, humidity: "84%", wind: "18 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 72, rainDesc: "Equatorial Atlantic rains drenching the low-lying coast.", aqi: 38, desc: "Tropical coastal city below sea level with heavy rains.", utcOffset: -4, sunriseM: 6 * 60 + 2, sunsetM: 18 * 60 + 18 },

  // Europe (additional)
  { name: "Madrid", region: "Community of Madrid, Spain", flag: "🇪🇸", temp: "22°C", icon: "sunny", h: 25, l: 13, humidity: "38%", wind: "12 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 8, rainDesc: "Warm dry Castilian plateau; no rain today.", aqi: 42, desc: "Clear sunny skies over the high plateau capital.", utcOffset: 2, sunriseM: 6 * 60 + 44, sunsetM: 21 * 60 + 30 },
  { name: "Lisbon", region: "Lisbon District, Portugal", flag: "🇵🇹", temp: "20°C", icon: "mostlyclear", h: 23, l: 14, humidity: "62%", wind: "16 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 15, rainDesc: "Atlantic sea breeze; mostly dry and pleasant along the Tagus.", aqi: 30, desc: "Mild Atlantic city with pleasant sea breezes.", utcOffset: 1, sunriseM: 6 * 60 + 14, sunsetM: 20 * 60 + 58 },
  { name: "Brussels", region: "Brussels Capital Region, Belgium", flag: "🇧🇪", temp: "13°C", icon: "rain", h: 15, l: 9, humidity: "84%", wind: "20 km/h W", windDir: 270, windLabel: "W", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 72, rainDesc: "Belgian weather being quintessentially Belgian — wet and grey.", aqi: 28, desc: "Overcast and drizzly in the EU capital.", utcOffset: 2, sunriseM: 5 * 60 + 28, sunsetM: 21 * 60 + 38 },
  { name: "Zurich", region: "Canton of Zurich, Switzerland", flag: "🇨🇭", temp: "15°C", icon: "partlycloudy", h: 18, l: 9, humidity: "65%", wind: "13 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 28, rainDesc: "Alpine moisture; afternoon shower risk near the lake.", aqi: 22, desc: "Crisp Swiss spring day with Alpine clouds building.", utcOffset: 2, sunriseM: 5 * 60 + 32, sunsetM: 21 * 60 + 12 },
  { name: "Geneva", region: "Canton of Geneva, Switzerland", flag: "🇨🇭", temp: "16°C", icon: "mostlyclear", h: 19, l: 10, humidity: "60%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 20, rainDesc: "Lac Léman spring breeze; a passing shower possible.", aqi: 20, desc: "Elegant lake city with clear Alpine views.", utcOffset: 2, sunriseM: 5 * 60 + 44, sunsetM: 21 * 60 + 24 },
  { name: "Prague", region: "Prague, Czech Republic", flag: "🇨🇿", temp: "14°C", icon: "partlycloudy", h: 17, l: 8, humidity: "66%", wind: "14 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 30, rainDesc: "Central European spring cloud; scattered showers possible.", aqi: 30, desc: "Cool spring day in the City of a Hundred Spires.", utcOffset: 2, sunriseM: 5 * 60 + 16, sunsetM: 21 * 60 + 10 },
  { name: "Warsaw", region: "Masovian Voivodeship, Poland", flag: "🇵🇱", temp: "12°C", icon: "partlycloudy", h: 15, l: 6, humidity: "68%", wind: "16 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 30, rainDesc: "Baltic influence; cool breezy spring day with shower chance.", aqi: 35, desc: "Cool Eastern European spring with passing cloud.", utcOffset: 2, sunriseM: 5 * 60 + 10, sunsetM: 21 * 60 + 4 },
  { name: "Budapest", region: "Budapest, Hungary", flag: "🇭🇺", temp: "16°C", icon: "mostlyclear", h: 19, l: 9, humidity: "58%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "18 km/h", rainChance: 18, rainDesc: "Danube valley spring; mostly clear with a slim shower chance.", aqi: 36, desc: "Lovely Danube spring in the Pearl of the Danube.", utcOffset: 2, sunriseM: 5 * 60 + 20, sunsetM: 20 * 60 + 54 },
  { name: "Bucharest", region: "Ilfov County, Romania", flag: "🇷🇴", temp: "18°C", icon: "partlycloudy", h: 22, l: 10, humidity: "60%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 28, rainDesc: "Continental spring; afternoon shower building over the Wallachian plain.", aqi: 40, desc: "Warm Balkan spring day in Little Paris.", utcOffset: 3, sunriseM: 5 * 60 + 52, sunsetM: 21 * 60 + 0 },
  { name: "Sofia", region: "Sofia Province, Bulgaria", flag: "🇧🇬", temp: "15°C", icon: "partlycloudy", h: 18, l: 7, humidity: "62%", wind: "13 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "13 km/h", windGust: "21 km/h", rainChance: 30, rainDesc: "Balkan mountain clouds; afternoon shower possible.", aqi: 35, desc: "Cool Balkan spring beneath the Vitosha Mountain.", utcOffset: 3, sunriseM: 5 * 60 + 56, sunsetM: 21 * 60 + 2 },
  { name: "Helsinki", region: "Uusimaa, Finland", flag: "🇫🇮", temp: "11°C", icon: "mostlyclear", h: 14, l: 5, humidity: "55%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 18, rainDesc: "Baltic spring clearing; fresh Nordic air over the harbour.", aqi: 15, desc: "Cool Nordic spring brightening over the Helsinki harbour.", utcOffset: 3, sunriseM: 4 * 60 + 28, sunsetM: 22 * 60 + 18 },
  { name: "Oslo", region: "Oslo, Norway", flag: "🇳🇴", temp: "12°C", icon: "mostlyclear", h: 15, l: 5, humidity: "52%", wind: "11 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 15, rainDesc: "Fjord spring clearing; bright sunny days returning.", aqi: 14, desc: "Crisp Norwegian spring with stunning fjord views.", utcOffset: 2, sunriseM: 4 * 60 + 40, sunsetM: 22 * 60 + 0 },
  { name: "Copenhagen", region: "Capital Region, Denmark", flag: "🇩🇰", temp: "13°C", icon: "partlycloudy", h: 15, l: 7, humidity: "70%", wind: "18 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 32, rainDesc: "North Sea breezes; intermittent shower possible.", aqi: 20, desc: "Breezy Danish spring over the Little Mermaid harbour.", utcOffset: 2, sunriseM: 5 * 60 + 4, sunsetM: 21 * 60 + 38 },
  { name: "Zurich", region: "Canton of Zurich, Switzerland", flag: "🇨🇭", temp: "15°C", icon: "partlycloudy", h: 18, l: 9, humidity: "65%", wind: "13 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 28, rainDesc: "Alpine moisture; afternoon shower risk near the lake.", aqi: 22, desc: "Crisp Swiss spring day with Alpine clouds building.", utcOffset: 2, sunriseM: 5 * 60 + 32, sunsetM: 21 * 60 + 12 },
  { name: "Kyiv", region: "Kyiv Oblast, Ukraine", flag: "🇺🇦", temp: "14°C", icon: "partlycloudy", h: 17, l: 7, humidity: "64%", wind: "15 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 28, rainDesc: "Eastern European spring cloud; shower possible in the afternoon.", aqi: 32, desc: "Cool spring day on the Dnipro river banks.", utcOffset: 3, sunriseM: 5 * 60 + 18, sunsetM: 21 * 60 + 6 },
  { name: "Minsk", region: "Minsk Region, Belarus", flag: "🇧🇾", temp: "11°C", icon: "partlycloudy", h: 14, l: 5, humidity: "68%", wind: "13 km/h W", windDir: 270, windLabel: "W", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 30, rainDesc: "Continental European spring; scattered showers possible.", aqi: 25, desc: "Cool continental spring in the Belarusian capital.", utcOffset: 3, sunriseM: 5 * 60 + 4, sunsetM: 21 * 60 + 8 },
  { name: "Riga", region: "Riga, Latvia", flag: "🇱🇻", temp: "12°C", icon: "partlycloudy", h: 15, l: 6, humidity: "70%", wind: "16 km/h W", windDir: 270, windLabel: "W", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 35, rainDesc: "Baltic coast conditions; showery intervals possible.", aqi: 18, desc: "Cool Baltic spring in the Art Nouveau capital.", utcOffset: 3, sunriseM: 4 * 60 + 58, sunsetM: 21 * 60 + 28 },
  { name: "Tallinn", region: "Harju County, Estonia", flag: "🇪🇪", temp: "10°C", icon: "partlycloudy", h: 13, l: 5, humidity: "72%", wind: "17 km/h W", windDir: 270, windLabel: "W", windSpeed: "17 km/h", windGust: "28 km/h", rainChance: 35, rainDesc: "Baltic Sea influence; cool and occasionally showery.", aqi: 16, desc: "Cool Baltic spring in the medieval Old Town.", utcOffset: 3, sunriseM: 4 * 60 + 48, sunsetM: 21 * 60 + 36 },
  { name: "Vilnius", region: "Vilnius County, Lithuania", flag: "🇱🇹", temp: "12°C", icon: "partlycloudy", h: 15, l: 6, humidity: "66%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 28, rainDesc: "Baltic spring shower risk in the afternoon.", aqi: 20, desc: "Mild Baltic spring in the Baroque city.", utcOffset: 3, sunriseM: 5 * 60 + 4, sunsetM: 21 * 60 + 22 },
  { name: "Skopje", region: "City of Skopje, North Macedonia", flag: "🇲🇰", temp: "19°C", icon: "sunny", h: 22, l: 10, humidity: "52%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 14, rainDesc: "Warm Balkan spring; mostly sunny with low rain risk.", aqi: 38, desc: "Warm spring day in the Vardar valley capital.", utcOffset: 2, sunriseM: 5 * 60 + 50, sunsetM: 20 * 60 + 44 },
  { name: "Tirana", region: "Tirana County, Albania", flag: "🇦🇱", temp: "20°C", icon: "sunny", h: 23, l: 12, humidity: "56%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "18 km/h", rainChance: 12, rainDesc: "Mediterranean Adriatic influence; warm and dry spring day.", aqi: 42, desc: "Warm sunny spring in the Albanian capital.", utcOffset: 2, sunriseM: 5 * 60 + 50, sunsetM: 20 * 60 + 38 },
  { name: "Sarajevo", region: "Federation of B&H, Bosnia", flag: "🇧🇦", temp: "16°C", icon: "partlycloudy", h: 19, l: 8, humidity: "65%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 30, rainDesc: "Dinaric Alps moisture; afternoon shower in the valley possible.", aqi: 30, desc: "Mild spring in the valley surrounded by Balkan mountains.", utcOffset: 2, sunriseM: 5 * 60 + 36, sunsetM: 20 * 60 + 34 },
  { name: "Belgrade", region: "Belgrade District, Serbia", flag: "🇷🇸", temp: "18°C", icon: "mostlyclear", h: 22, l: 10, humidity: "58%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 20, rainDesc: "Danube and Sava confluence; mostly clear spring day.", aqi: 38, desc: "Pleasant spring day in the White City.", utcOffset: 2, sunriseM: 5 * 60 + 28, sunsetM: 20 * 60 + 50 },
  { name: "Zagreb", region: "City of Zagreb, Croatia", flag: "🇭🇷", temp: "17°C", icon: "mostlyclear", h: 20, l: 9, humidity: "60%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 22, rainDesc: "Alpine influences; a passing shower possible over the Sava valley.", aqi: 30, desc: "Mild Croatian spring in the twin-towered cathedral city.", utcOffset: 2, sunriseM: 5 * 60 + 28, sunsetM: 20 * 60 + 44 },
  { name: "Ljubljana", region: "City Municipality of Ljubljana, Slovenia", flag: "🇸🇮", temp: "16°C", icon: "mostlyclear", h: 19, l: 9, humidity: "62%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 20, rainDesc: "Julian Alps moisture; a brief shower possible.", aqi: 22, desc: "Charming Alpine capital with beautiful spring weather.", utcOffset: 2, sunriseM: 5 * 60 + 30, sunsetM: 20 * 60 + 46 },
  { name: "Valletta", region: "South Eastern Region, Malta", flag: "🇲🇹", temp: "21°C", icon: "sunny", h: 24, l: 16, humidity: "62%", wind: "18 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 8, rainDesc: "Breezy Mediterranean day; very little rain chance.", aqi: 28, desc: "Warm sunny day on the limestone Mediterranean island.", utcOffset: 2, sunriseM: 5 * 60 + 52, sunsetM: 20 * 60 + 30 },
  { name: "Nicosia", region: "Nicosia District, Cyprus", flag: "🇨🇾", temp: "26°C", icon: "sunny", h: 29, l: 18, humidity: "40%", wind: "11 km/h W", windDir: 270, windLabel: "W", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 5, rainDesc: "Hot dry Eastern Mediterranean; no rain today.", aqi: 40, desc: "Warm and sunny in the divided island capital.", utcOffset: 3, sunriseM: 6 * 60 + 0, sunsetM: 20 * 60 + 42 },
  { name: "Baku", region: "Baku, Azerbaijan", flag: "🇦🇿", temp: "24°C", icon: "mostlyclear", h: 28, l: 17, humidity: "48%", wind: "18 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "18 km/h", windGust: "32 km/h", rainChance: 12, rainDesc: "Caspian winds breezy; mostly dry day on the oil coast.", aqi: 55, desc: "Warm Caspian spring in the Land of Fire.", utcOffset: 4, sunriseM: 5 * 60 + 48, sunsetM: 20 * 60 + 26 },
  { name: "Tbilisi", region: "Tbilisi, Georgia", flag: "🇬🇪", temp: "20°C", icon: "partlycloudy", h: 24, l: 12, humidity: "58%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 30, rainDesc: "Caucasus spring; afternoon shower possible in the valley.", aqi: 42, desc: "Warm Caucasian spring in the ancient Georgian capital.", utcOffset: 4, sunriseM: 6 * 60 + 4, sunsetM: 20 * 60 + 38 },
  { name: "Yerevan", region: "Yerevan, Armenia", flag: "🇦🇲", temp: "22°C", icon: "sunny", h: 26, l: 13, humidity: "42%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 12, rainDesc: "Ararat plain spring; mostly dry but mountain showers possible.", aqi: 45, desc: "Warm sunny day with Ararat in the background.", utcOffset: 4, sunriseM: 5 * 60 + 52, sunsetM: 20 * 60 + 22 },
  { name: "Nur-Sultan", region: "Akmola Region, Kazakhstan", flag: "🇰🇿", temp: "16°C", icon: "mostlyclear", h: 22, l: 5, humidity: "38%", wind: "20 km/h N", windDir: 0, windLabel: "N", windSpeed: "20 km/h", windGust: "35 km/h", rainChance: 15, rainDesc: "Steppe winds strong; dry spring conditions likely.", aqi: 28, desc: "Cool steppe spring in the futuristic Kazakh capital.", utcOffset: 6, sunriseM: 5 * 60 + 30, sunsetM: 20 * 60 + 32 },
  { name: "Tashkent", region: "Tashkent Province, Uzbekistan", flag: "🇺🇿", temp: "28°C", icon: "sunny", h: 32, l: 18, humidity: "28%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 5, rainDesc: "Dry Central Asian spring; very little rain expected.", aqi: 55, desc: "Warm and dry in the ancient Silk Road capital.", utcOffset: 5, sunriseM: 5 * 60 + 42, sunsetM: 19 * 60 + 50 },
  { name: "Almaty", region: "Almaty Province, Kazakhstan", flag: "🇰🇿", temp: "22°C", icon: "mostlyclear", h: 26, l: 12, humidity: "45%", wind: "12 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "12 km/h", windGust: "18 km/h", rainChance: 18, rainDesc: "Tian Shan mountain breezes; light shower possible in evening.", aqi: 65, desc: "Warm and pleasant in the Tian Shan mountain foothills.", utcOffset: 6, sunriseM: 5 * 60 + 52, sunsetM: 20 * 60 + 14 },

  // Middle East (additional)
  { name: "Abu Dhabi", region: "Abu Dhabi Emirate, UAE", flag: "🇦🇪", temp: "41°C", icon: "sunny", h: 45, l: 32, humidity: "38%", wind: "16 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 1, rainDesc: "Extreme Gulf heat; essentially zero rain today.", aqi: 80, desc: "Blistering desert heat in the pearl diving heritage capital.", utcOffset: 4, sunriseM: 5 * 60 + 40, sunsetM: 19 * 60 + 4 },
  { name: "Muscat", region: "Muscat Governorate, Oman", flag: "🇴🇲", temp: "38°C", icon: "sunny", h: 42, l: 30, humidity: "44%", wind: "18 km/h NNW", windDir: 338, windLabel: "NNW", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 3, rainDesc: "Arabian Sea heat; extremely dry conditions.", aqi: 70, desc: "Hot and sunny in the ancient fortified Omani capital.", utcOffset: 4, sunriseM: 5 * 60 + 44, sunsetM: 18 * 60 + 56 },
  { name: "Doha", region: "Doha Municipality, Qatar", flag: "🇶🇦", temp: "40°C", icon: "sunny", h: 44, l: 32, humidity: "38%", wind: "20 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 1, rainDesc: "Extreme Qatar Gulf heat; rain impossible today.", aqi: 90, desc: "Intense Gulf heat and humidity in the football city.", utcOffset: 3, sunriseM: 5 * 60 + 20, sunsetM: 18 * 60 + 40 },
  { name: "Kuwait City", region: "Asimah Governorate, Kuwait", flag: "🇰🇼", temp: "44°C", icon: "sunny", h: 48, l: 34, humidity: "20%", wind: "18 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 0, rainDesc: "Kuwait summer heatwave; absolute desert conditions.", aqi: 120, desc: "Extreme heat in one of the world's hottest cities.", utcOffset: 3, sunriseM: 5 * 60 + 6, sunsetM: 19 * 60 + 0 },
  { name: "Manama", region: "Capital Governorate, Bahrain", flag: "🇧🇭", temp: "38°C", icon: "sunny", h: 42, l: 30, humidity: "52%", wind: "22 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "22 km/h", windGust: "36 km/h", rainChance: 2, rainDesc: "Hot and very humid Gulf island; no rain today.", aqi: 88, desc: "Oppressive Gulf heat and humidity on the pearl island.", utcOffset: 3, sunriseM: 5 * 60 + 22, sunsetM: 18 * 60 + 44 },
  { name: "Amman", region: "Amman Governorate, Jordan", flag: "🇯🇴", temp: "28°C", icon: "sunny", h: 32, l: 18, humidity: "35%", wind: "13 km/h W", windDir: 270, windLabel: "W", windSpeed: "13 km/h", windGust: "20 km/h", rainChance: 4, rainDesc: "Dry Levant spring; minimal rain risk on the Jordanian plateau.", aqi: 52, desc: "Warm and dry on the ancient Jordanian plateau.", utcOffset: 3, sunriseM: 5 * 60 + 38, sunsetM: 19 * 60 + 44 },
  { name: "Jerusalem", region: "Jerusalem District, Israel", flag: "🇮🇱", temp: "24°C", icon: "sunny", h: 27, l: 16, humidity: "42%", wind: "12 km/h W", windDir: 270, windLabel: "W", windSpeed: "12 km/h", windGust: "18 km/h", rainChance: 5, rainDesc: "Dry Levantine spring on the Judean hills; no rain expected.", aqi: 40, desc: "Warm and sunny in the holy city on the hilltop.", utcOffset: 3, sunriseM: 5 * 60 + 30, sunsetM: 19 * 60 + 42 },
  { name: "Tel Aviv", region: "Tel Aviv District, Israel", flag: "🇮🇱", temp: "26°C", icon: "sunny", h: 28, l: 18, humidity: "60%", wind: "16 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "16 km/h", windGust: "24 km/h", rainChance: 5, rainDesc: "Mediterranean sea breeze; dry and pleasant today.", aqi: 38, desc: "Warm and sunny coastal city by the Mediterranean.", utcOffset: 3, sunriseM: 5 * 60 + 26, sunsetM: 19 * 60 + 42 },
  { name: "Baghdad", region: "Baghdad Governorate, Iraq", flag: "🇮🇶", temp: "40°C", icon: "sunny", h: 44, l: 30, humidity: "20%", wind: "14 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 1, rainDesc: "Mesopotamian summer; essentially no rainfall today.", aqi: 150, desc: "Intense Mesopotamian heat in the ancient capital.", utcOffset: 3, sunriseM: 5 * 60 + 18, sunsetM: 19 * 60 + 8 },
  { name: "Tehran", region: "Tehran Province, Iran", flag: "🇮🇷", temp: "28°C", icon: "mostlyclear", h: 32, l: 18, humidity: "35%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 8, rainDesc: "Alborz mountain breezes; mostly dry spring day.", aqi: 120, desc: "Warm and hazy in the foot of the Alborz Mountains.", utcOffset: 3.5, sunriseM: 5 * 60 + 22, sunsetM: 20 * 60 + 8 },
  { name: "Kabul", region: "Kabul Province, Afghanistan", flag: "🇦🇫", temp: "20°C", icon: "partlycloudy", h: 25, l: 10, humidity: "38%", wind: "12 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 20, rainDesc: "Hindu Kush spring; afternoon shower possible.", aqi: 88, desc: "Cool and partly cloudy in the high-altitude Afghan capital.", utcOffset: 4.5, sunriseM: 5 * 60 + 20, sunsetM: 19 * 60 + 8 },
  { name: "Islamabad", region: "Islamabad Capital Territory, Pakistan", flag: "🇵🇰", temp: "32°C", icon: "partlycloudy", h: 35, l: 22, humidity: "52%", wind: "11 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 35, rainDesc: "Margalla Hills moisture; pre-monsoon shower possible.", aqi: 95, desc: "Warm and partly cloudy at the Margalla Hills foothills.", utcOffset: 5, sunriseM: 5 * 60 + 22, sunsetM: 19 * 60 + 20 },
  { name: "Karachi", region: "Sindh, Pakistan", flag: "🇵🇰", temp: "35°C", icon: "sunny", h: 38, l: 28, humidity: "62%", wind: "24 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "24 km/h", windGust: "38 km/h", rainChance: 10, rainDesc: "Arabian Sea monsoon approaching; pre-monsoon humidity high.", aqi: 130, desc: "Hot coastal city with strong sea winds and high humidity.", utcOffset: 5, sunriseM: 6 * 60 + 2, sunsetM: 19 * 60 + 30 },
  { name: "Lahore", region: "Punjab, Pakistan", flag: "🇵🇰", temp: "40°C", icon: "sunny", h: 44, l: 30, humidity: "32%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 8, rainDesc: "Punjab heat wave; pre-monsoon dry conditions.", aqi: 210, desc: "Scorching heat in the City of Gardens.", utcOffset: 5, sunriseM: 5 * 60 + 28, sunsetM: 19 * 60 + 28 },
  { name: "Dhaka", region: "Dhaka Division, Bangladesh", flag: "🇧🇩", temp: "32°C", icon: "thunderstorm", h: 34, l: 26, humidity: "86%", wind: "15 km/h S", windDir: 180, windLabel: "S", windSpeed: "15 km/h", windGust: "26 km/h", rainChance: 78, rainDesc: "Bay of Bengal monsoon reaching the Bengal delta.", aqi: 160, desc: "Intense monsoon downpours in the densely populated delta city.", utcOffset: 6, sunriseM: 5 * 60 + 20, sunsetM: 18 * 60 + 44 },
  { name: "Kathmandu", region: "Bagmati Province, Nepal", flag: "🇳🇵", temp: "22°C", icon: "rain", h: 25, l: 16, humidity: "78%", wind: "8 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "8 km/h", windGust: "14 km/h", rainChance: 65, rainDesc: "Himalayan monsoon rains filling the Kathmandu valley.", aqi: 85, desc: "Warm and rainy in the Himalayan kingdom's capital.", utcOffset: 5.75, sunriseM: 5 * 60 + 28, sunsetM: 18 * 60 + 48 },
  { name: "Thimphu", region: "Thimphu District, Bhutan", flag: "🇧🇹", temp: "14°C", icon: "rain", h: 17, l: 8, humidity: "80%", wind: "9 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 68, rainDesc: "Himalayan rain in the Gross National Happiness kingdom.", aqi: 20, desc: "Cool and rainy in the Himalayan dragon kingdom capital.", utcOffset: 6, sunriseM: 5 * 60 + 30, sunsetM: 18 * 60 + 46 },
  { name: "Colombo", region: "Western Province, Sri Lanka", flag: "🇱🇰", temp: "29°C", icon: "thunderstorm", h: 31, l: 25, humidity: "84%", wind: "18 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 80, rainDesc: "Southwest monsoon active over the island; heavy rain.", aqi: 45, desc: "Tropical monsoon storms bashing the Pearl of the Indian Ocean.", utcOffset: 5.5, sunriseM: 6 * 60 + 2, sunsetM: 18 * 60 + 18 },
  { name: "Malé", region: "Malé Atoll, Maldives", flag: "🇲🇻", temp: "30°C", icon: "thunderstorm", h: 32, l: 26, humidity: "82%", wind: "16 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 72, rainDesc: "Tropical island storms typical of monsoon season.", aqi: 18, desc: "Tropical monsoon conditions on the low-lying atoll capital.", utcOffset: 5, sunriseM: 6 * 60 + 4, sunsetM: 18 * 60 + 16 },

  // East / Southeast Asia (additional)
  { name: "Osaka", region: "Kansai, Japan", flag: "🇯🇵", temp: "24°C", icon: "partlycloudy", h: 27, l: 18, humidity: "65%", wind: "11 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 25, rainDesc: "Kansai spring; passing shower possible before clearing.", aqi: 52, desc: "Warm and pleasant spring in Japan's kitchen city.", utcOffset: 9, sunriseM: 5 * 60 + 2, sunsetM: 19 * 60 + 4 },
  { name: "Kyoto", region: "Kansai, Japan", flag: "🇯🇵", temp: "22°C", icon: "mostlyclear", h: 25, l: 15, humidity: "60%", wind: "8 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 18, rainDesc: "Gentle spring in the ancient capital; mostly clear.", aqi: 40, desc: "Tranquil spring day in Japan's timeless temple city.", utcOffset: 9, sunriseM: 5 * 60 + 4, sunsetM: 19 * 60 + 0 },
  { name: "Sapporo", region: "Hokkaido, Japan", flag: "🇯🇵", temp: "12°C", icon: "partlycloudy", h: 15, l: 5, humidity: "58%", wind: "14 km/h N", windDir: 0, windLabel: "N", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 28, rainDesc: "Cool Hokkaido spring; passing shower possible.", aqi: 18, desc: "Cool northern Japan spring with occasional cloud.", utcOffset: 9, sunriseM: 4 * 60 + 14, sunsetM: 18 * 60 + 38 },
  { name: "Busan", region: "Yeongnam, South Korea", flag: "🇰🇷", temp: "18°C", icon: "mostlyclear", h: 21, l: 13, humidity: "60%", wind: "18 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 18, rainDesc: "Strait of Korea sea breeze; dry and pleasant.", aqi: 55, desc: "Warm coastal spring at South Korea's beach city.", utcOffset: 9, sunriseM: 5 * 60 + 28, sunsetM: 19 * 60 + 38 },
  { name: "Taipei", region: "Taipei City, Taiwan", flag: "🇹🇼", temp: "25°C", icon: "showers", h: 28, l: 20, humidity: "80%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 58, rainDesc: "Northeast monsoon moisture; plum rain season showers.", aqi: 62, desc: "Warm and showery in the sub-tropical island capital.", utcOffset: 8, sunriseM: 5 * 60 + 12, sunsetM: 18 * 60 + 46 },
  { name: "Chengdu", region: "Sichuan, China", flag: "🇨🇳", temp: "22°C", icon: "cloudy", h: 25, l: 17, humidity: "78%", wind: "6 km/h E", windDir: 90, windLabel: "E", windSpeed: "6 km/h", windGust: "10 km/h", rainChance: 42, rainDesc: "Sichuan Basin typical overcast with drizzle; no strong rain.", aqi: 88, desc: "Overcast and misty in the panda capital of the world.", utcOffset: 8, sunriseM: 6 * 60 + 2, sunsetM: 19 * 60 + 46 },
  { name: "Guangzhou", region: "Guangdong, China", flag: "🇨🇳", temp: "28°C", icon: "thunderstorm", h: 31, l: 24, humidity: "85%", wind: "12 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 72, rainDesc: "Pre-typhoon monsoon rains drenching the Pearl River delta.", aqi: 70, desc: "Hot and very humid with heavy subtropical downpours.", utcOffset: 8, sunriseM: 5 * 60 + 52, sunsetM: 19 * 60 + 12 },
  { name: "Shenzhen", region: "Guangdong, China", flag: "🇨🇳", temp: "28°C", icon: "thunderstorm", h: 31, l: 24, humidity: "86%", wind: "14 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 74, rainDesc: "South China Sea moisture; heavy afternoon thunderstorms.", aqi: 65, desc: "Hot and stormy in China's Silicon Valley.", utcOffset: 8, sunriseM: 5 * 60 + 52, sunsetM: 19 * 60 + 10 },
  { name: "Wuhan", region: "Hubei, China", flag: "🇨🇳", temp: "25°C", icon: "showers", h: 28, l: 19, humidity: "72%", wind: "10 km/h E", windDir: 90, windLabel: "E", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 55, rainDesc: "Yangtze plum rains; moderate showers in central China.", aqi: 80, desc: "Warm and showery along the Yangtze in the furnace city.", utcOffset: 8, sunriseM: 5 * 60 + 46, sunsetM: 19 * 60 + 36 },
  { name: "Xi'an", region: "Shaanxi, China", flag: "🇨🇳", temp: "26°C", icon: "mostlyclear", h: 30, l: 18, humidity: "48%", wind: "12 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 15, rainDesc: "Wei River valley spring; mostly dry with dust haze.", aqi: 110, desc: "Warm and hazy spring near the ancient Terracotta Warriors.", utcOffset: 8, sunriseM: 6 * 60 + 2, sunsetM: 19 * 60 + 50 },
  { name: "Harbin", region: "Heilongjiang, China", flag: "🇨🇳", temp: "14°C", icon: "partlycloudy", h: 18, l: 5, humidity: "48%", wind: "14 km/h W", windDir: 270, windLabel: "W", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 18, rainDesc: "Cool northeast China spring; light shower possible.", aqi: 40, desc: "Cool spring in the Ice Festival city.", utcOffset: 8, sunriseM: 4 * 60 + 40, sunsetM: 19 * 60 + 18 },
  { name: "Ulaanbaatar", region: "Ulaanbaatar, Mongolia", flag: "🇲🇳", temp: "12°C", icon: "mostlyclear", h: 18, l: 2, humidity: "32%", wind: "18 km/h W", windDir: 270, windLabel: "W", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 12, rainDesc: "Steppe winds cold; dry spring on the Mongolian plateau.", aqi: 35, desc: "Cold and breezy spring on the high Mongolian plateau.", utcOffset: 8, sunriseM: 5 * 60 + 32, sunsetM: 20 * 60 + 28 },
  { name: "Yangon", region: "Yangon Region, Myanmar", flag: "🇲🇲", temp: "36°C", icon: "thunderstorm", h: 38, l: 28, humidity: "78%", wind: "13 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "13 km/h", windGust: "22 km/h", rainChance: 72, rainDesc: "Myanmar monsoon fully engaged over the Irrawaddy delta.", aqi: 78, desc: "Sweltering monsoon conditions in the Shwedagon Pagoda city.", utcOffset: 6.5, sunriseM: 5 * 60 + 54, sunsetM: 18 * 60 + 28 },
  { name: "Naypyidaw", region: "Naypyidaw Union Territory, Myanmar", flag: "🇲🇲", temp: "32°C", icon: "rain", h: 34, l: 24, humidity: "74%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "17 km/h", rainChance: 65, rainDesc: "Interior Burma monsoon bringing steady rains.", aqi: 55, desc: "Tropical monsoon rains over the planned Myanmar capital.", utcOffset: 6.5, sunriseM: 5 * 60 + 52, sunsetM: 18 * 60 + 26 },
  { name: "Phnom Penh", region: "Phnom Penh, Cambodia", flag: "🇰🇭", temp: "33°C", icon: "thunderstorm", h: 35, l: 27, humidity: "78%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 68, rainDesc: "Mekong delta storms with heavy afternoon convection.", aqi: 62, desc: "Tropical heat and daily thunderstorms over the Mekong.", utcOffset: 7, sunriseM: 5 * 60 + 52, sunsetM: 18 * 60 + 26 },
  { name: "Vientiane", region: "Vientiane Prefecture, Laos", flag: "🇱🇦", temp: "32°C", icon: "rain", h: 34, l: 25, humidity: "80%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 68, rainDesc: "Laos monsoon rains over the Mekong river plains.", aqi: 52, desc: "Hot and rainy in the laid-back Mekong capital.", utcOffset: 7, sunriseM: 5 * 60 + 50, sunsetM: 18 * 60 + 28 },
  { name: "Hanoi", region: "Red River Delta, Vietnam", flag: "🇻🇳", temp: "30°C", icon: "showers", h: 32, l: 25, humidity: "82%", wind: "12 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 60, rainDesc: "Northern Vietnam monsoon showers over the Red River delta.", aqi: 72, desc: "Humid and showery in the ancient Vietnamese capital.", utcOffset: 7, sunriseM: 5 * 60 + 30, sunsetM: 18 * 60 + 38 },
  { name: "Ho Chi Minh City", region: "Southeast, Vietnam", flag: "🇻🇳", temp: "33°C", icon: "thunderstorm", h: 35, l: 26, humidity: "80%", wind: "13 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "13 km/h", windGust: "22 km/h", rainChance: 72, rainDesc: "Saigon wet season thunderstorms disrupting afternoon traffic.", aqi: 85, desc: "Steamy monsoon storms over the bustling southern metropolis.", utcOffset: 7, sunriseM: 5 * 60 + 38, sunsetM: 18 * 60 + 16 },
  { name: "Jakarta", region: "DKI Jakarta, Indonesia", flag: "🇮🇩", temp: "31°C", icon: "thunderstorm", h: 33, l: 25, humidity: "85%", wind: "11 km/h W", windDir: 270, windLabel: "W", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 80, rainDesc: "Equatorial Java rains; flooding risk in low-lying areas.", aqi: 100, desc: "Heavy equatorial rain in the archipelago's mega-city.", utcOffset: 7, sunriseM: 5 * 60 + 56, sunsetM: 17 * 60 + 56 },
  { name: "Surabaya", region: "East Java, Indonesia", flag: "🇮🇩", temp: "32°C", icon: "partlycloudy", h: 34, l: 26, humidity: "76%", wind: "12 km/h E", windDir: 90, windLabel: "E", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 40, rainDesc: "East Java dry season transition; afternoon shower possible.", aqi: 75, desc: "Hot and humid in Indonesia's second-largest city.", utcOffset: 7, sunriseM: 5 * 60 + 40, sunsetM: 17 * 60 + 42 },
  { name: "Bali", region: "Bali Province, Indonesia", flag: "🇮🇩", temp: "30°C", icon: "showers", h: 32, l: 24, humidity: "80%", wind: "14 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 55, rainDesc: "Tropical island showers; brief but refreshing.", aqi: 22, desc: "Warm tropical island with afternoon rain and lush scenery.", utcOffset: 8, sunriseM: 6 * 60 + 6, sunsetM: 18 * 60 + 2 },
  { name: "Brunei Darussalam", region: "Brunei-Muara District, Brunei", flag: "🇧🇳", temp: "30°C", icon: "rain", h: 33, l: 24, humidity: "88%", wind: "9 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "9 km/h", windGust: "15 km/h", rainChance: 76, rainDesc: "Equatorial Borneo rains; heavy showers throughout the day.", aqi: 35, desc: "Hot and very humid equatorial rainforest weather.", utcOffset: 8, sunriseM: 5 * 60 + 54, sunsetM: 18 * 60 + 12 },
  { name: "Dili", region: "Dili Municipality, Timor-Leste", flag: "🇹🇱", temp: "29°C", icon: "sunny", h: 31, l: 24, humidity: "68%", wind: "15 km/h E", windDir: 90, windLabel: "E", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 15, rainDesc: "Dry season in Timor-Leste; trade winds keeping conditions fair.", aqi: 28, desc: "Warm and dry in the young nation's coastal capital.", utcOffset: 9, sunriseM: 6 * 60 + 14, sunsetM: 18 * 60 + 18 },

  // Oceania (additional)
  { name: "Brisbane", region: "Queensland, Australia", flag: "🇦🇺", temp: "22°C", icon: "sunny", h: 25, l: 14, humidity: "58%", wind: "16 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 15, rainDesc: "Sunny autumn day in Brisvegas; very little rain.", aqi: 25, desc: "Brilliant sunny autumn day in the River City.", utcOffset: 10, sunriseM: 6 * 60 + 14, sunsetM: 17 * 60 + 24 },
  { name: "Perth", region: "Western Australia, Australia", flag: "🇦🇺", temp: "18°C", icon: "sunny", h: 21, l: 11, humidity: "55%", wind: "22 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "22 km/h", windGust: "35 km/h", rainChance: 20, rainDesc: "Fremantle Doctor sea breeze in effect; mostly clear.", aqi: 18, desc: "Sunny and breezy in the most isolated city on Earth.", utcOffset: 8, sunriseM: 7 * 60 + 20, sunsetM: 18 * 60 + 12 },
  { name: "Adelaide", region: "South Australia, Australia", flag: "🇦🇺", temp: "17°C", icon: "showers", h: 20, l: 11, humidity: "68%", wind: "18 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 45, rainDesc: "Southern Ocean front bringing winter showers.", aqi: 20, desc: "Cool autumn showers in the Festival City.", utcOffset: 10.5, sunriseM: 7 * 60 + 38, sunsetM: 17 * 60 + 52 },
  { name: "Canberra", region: "Australian Capital Territory, Australia", flag: "🇦🇺", temp: "13°C", icon: "mostlyclear", h: 17, l: 5, humidity: "50%", wind: "14 km/h W", windDir: 270, windLabel: "W", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 14, rainDesc: "Cold clear nights and mild sunny days in the capital.", aqi: 15, desc: "Cool and crisp autumn day in the bush capital.", utcOffset: 11, sunriseM: 7 * 60 + 10, sunsetM: 17 * 60 + 18 },
  { name: "Darwin", region: "Northern Territory, Australia", flag: "🇦🇺", temp: "32°C", icon: "partlycloudy", h: 34, l: 24, humidity: "55%", wind: "16 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 10, rainDesc: "Dry season in the Top End; clear days persist.", aqi: 18, desc: "Dry season sunshine in Australia's tropical gateway.", utcOffset: 9.5, sunriseM: 7 * 60 + 10, sunsetM: 19 * 60 + 4 },
  { name: "Wellington", region: "Wellington Region, New Zealand", flag: "🇳🇿", temp: "12°C", icon: "verywindy", h: 14, l: 7, humidity: "74%", wind: "45 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "45 km/h", windGust: "68 km/h", rainChance: 35, rainDesc: "Notorious Cook Strait gale-force northwesterlies active.", aqi: 12, desc: "Blustery Wellington living up to its windy capital reputation.", utcOffset: 12, sunriseM: 7 * 60 + 30, sunsetM: 17 * 60 + 22 },
  { name: "Suva", region: "Central Division, Fiji", flag: "🇫🇯", temp: "26°C", icon: "showers", h: 29, l: 22, humidity: "84%", wind: "16 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 65, rainDesc: "Trade wind showers common on the wet side of Viti Levu.", aqi: 15, desc: "Tropical island showers on Fiji's main island.", utcOffset: 12, sunriseM: 6 * 60 + 26, sunsetM: 18 * 60 + 14 },
  { name: "Port Moresby", region: "National Capital District, PNG", flag: "🇵🇬", temp: "30°C", icon: "thunderstorm", h: 32, l: 24, humidity: "80%", wind: "12 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 70, rainDesc: "Tropical PNG storms; heavy rain with thunderstorm activity.", aqi: 35, desc: "Humid tropical storms in the Pacific island capital.", utcOffset: 10, sunriseM: 6 * 60 + 8, sunsetM: 18 * 60 + 12 },
  { name: "Nuku'alofa", region: "Tongatapu Island, Tonga", flag: "🇹🇴", temp: "24°C", icon: "partlycloudy", h: 26, l: 20, humidity: "76%", wind: "18 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 30, rainDesc: "Trade wind showers; brief tropical rain possible.", aqi: 12, desc: "Warm and breezy Pacific island climate.", utcOffset: 13, sunriseM: 6 * 60 + 42, sunsetM: 18 * 60 + 28 },

  // Africa (additional)
  { name: "Johannesburg", region: "Gauteng, South Africa", flag: "🇿🇦", temp: "18°C", icon: "mostlyclear", h: 22, l: 7, humidity: "45%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 10, rainDesc: "Highveld winter dry season; clear and cold at night.", aqi: 38, desc: "Warm sunny winter day on the Highveld plateau.", utcOffset: 2, sunriseM: 6 * 60 + 44, sunsetM: 17 * 60 + 50 },
  { name: "Durban", region: "KwaZulu-Natal, South Africa", flag: "🇿🇦", temp: "22°C", icon: "partlycloudy", h: 24, l: 16, humidity: "70%", wind: "14 km/h S", windDir: 180, windLabel: "S", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 30, rainDesc: "Indian Ocean influence; a coastal shower possible.", aqi: 30, desc: "Warm subtropical coastal city with balmy sea air.", utcOffset: 2, sunriseM: 6 * 60 + 38, sunsetM: 17 * 60 + 44 },
  { name: "Pretoria", region: "Gauteng, South Africa", flag: "🇿🇦", temp: "17°C", icon: "sunny", h: 20, l: 5, humidity: "40%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 8, rainDesc: "Highveld winter sunshine; dry and cool.", aqi: 35, desc: "Sunny winter day in the Jacaranda City.", utcOffset: 2, sunriseM: 6 * 60 + 42, sunsetM: 17 * 60 + 50 },
  { name: "Addis Ababa", region: "Addis Ababa, Ethiopia", flag: "🇪🇹", temp: "18°C", icon: "showers", h: 21, l: 10, humidity: "72%", wind: "8 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 60, rainDesc: "Ethiopian rainy season; afternoon highland showers likely.", aqi: 55, desc: "Cool highland capital in the heart of the Ethiopian rainy season.", utcOffset: 3, sunriseM: 6 * 60 + 18, sunsetM: 18 * 60 + 40 },
  { name: "Dar es Salaam", region: "Dar es Salaam Region, Tanzania", flag: "🇹🇿", temp: "29°C", icon: "showers", h: 31, l: 24, humidity: "80%", wind: "14 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 55, rainDesc: "Indian Ocean moisture; afternoon showers along the coast.", aqi: 38, desc: "Tropical coastal city with Indian Ocean humidity.", utcOffset: 3, sunriseM: 6 * 60 + 16, sunsetM: 18 * 60 + 26 },
  { name: "Kampala", region: "Kampala District, Uganda", flag: "🇺🇬", temp: "22°C", icon: "thunderstorm", h: 25, l: 16, humidity: "74%", wind: "9 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 65, rainDesc: "Lake Victoria moisture feeding afternoon thunderstorms.", aqi: 45, desc: "Equatorial highland storms over the Pearl of Africa.", utcOffset: 3, sunriseM: 6 * 60 + 40, sunsetM: 18 * 60 + 52 },
  { name: "Kigali", region: "Kigali Province, Rwanda", flag: "🇷🇼", temp: "20°C", icon: "showers", h: 23, l: 14, humidity: "70%", wind: "8 km/h E", windDir: 90, windLabel: "E", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 60, rainDesc: "Land of a Thousand Hills afternoon showers.", aqi: 25, desc: "Cool and pleasant highland African weather with afternoon rain.", utcOffset: 2, sunriseM: 5 * 60 + 48, sunsetM: 17 * 60 + 52 },
  { name: "Accra", region: "Greater Accra, Ghana", flag: "🇬🇭", temp: "28°C", icon: "partlycloudy", h: 30, l: 24, humidity: "78%", wind: "16 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 42, rainDesc: "West African monsoon moisture; afternoon shower possible.", aqi: 55, desc: "Warm coastal city with Gulf of Guinea sea breeze.", utcOffset: 0, sunriseM: 5 * 60 + 52, sunsetM: 18 * 60 + 12 },
  { name: "Abidjan", region: "Lagunes District, Côte d'Ivoire", flag: "🇨🇮", temp: "29°C", icon: "thunderstorm", h: 31, l: 24, humidity: "84%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 70, rainDesc: "West African monsoon bringing heavy convective rains.", aqi: 62, desc: "Hot tropical city with heavy equatorial downpours.", utcOffset: 0, sunriseM: 6 * 60 + 4, sunsetM: 18 * 60 + 18 },
  { name: "Dakar", region: "Dakar Region, Senegal", flag: "🇸🇳", temp: "27°C", icon: "sunny", h: 29, l: 22, humidity: "68%", wind: "22 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "22 km/h", windGust: "35 km/h", rainChance: 15, rainDesc: "Harmattan season fading; relatively dry Atlantic coast.", aqi: 45, desc: "Warm Atlantic breezes at the westernmost point of Africa.", utcOffset: 0, sunriseM: 7 * 60 + 0, sunsetM: 19 * 60 + 32 },
  { name: "Bamako", region: "Bamako Capital District, Mali", flag: "🇲🇱", temp: "38°C", icon: "sunny", h: 41, l: 28, humidity: "22%", wind: "15 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 8, rainDesc: "Sahel pre-monsoon heat; very little rain expected.", aqi: 110, desc: "Intense Sahelian heat in the Niger river capital.", utcOffset: 0, sunriseM: 6 * 60 + 22, sunsetM: 18 * 60 + 52 },
  { name: "Ouagadougou", region: "Centre Region, Burkina Faso", flag: "🇧🇫", temp: "40°C", icon: "sunny", h: 43, l: 30, humidity: "18%", wind: "20 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "20 km/h", windGust: "32 km/h", rainChance: 5, rainDesc: "Extreme Sahel heat; dust haze reduces visibility.", aqi: 150, desc: "Blazing heat in one of West Africa's hottest capitals.", utcOffset: 0, sunriseM: 6 * 60 + 10, sunsetM: 18 * 60 + 40 },
  { name: "N'Djamena", region: "N'Djamena, Chad", flag: "🇹🇩", temp: "42°C", icon: "sunny", h: 45, l: 31, humidity: "14%", wind: "16 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 3, rainDesc: "Near-Saharan desert conditions; extreme dry heat.", aqi: 165, desc: "Extreme Sahelo-Saharan heat in Chad's capital.", utcOffset: 1, sunriseM: 5 * 60 + 58, sunsetM: 18 * 60 + 24 },
  { name: "Khartoum", region: "Khartoum State, Sudan", flag: "🇸🇩", temp: "44°C", icon: "sunny", h: 47, l: 33, humidity: "10%", wind: "18 km/h N", windDir: 0, windLabel: "N", windSpeed: "18 km/h", windGust: "30 km/h", rainChance: 1, rainDesc: "Extreme Sudanese desert; essentially no rainfall.", aqi: 180, desc: "Punishing desert heat at the Nile's confluence.", utcOffset: 3, sunriseM: 5 * 60 + 12, sunsetM: 19 * 60 + 8 },
  { name: "Mogadishu", region: "Banadir, Somalia", flag: "🇸🇴", temp: "30°C", icon: "sunny", h: 32, l: 26, humidity: "72%", wind: "24 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "24 km/h", windGust: "38 km/h", rainChance: 12, rainDesc: "Indian Ocean southwest monsoon; brief shower possible.", aqi: 35, desc: "Hot and breezy on the Indian Ocean Somali coast.", utcOffset: 3, sunriseM: 5 * 60 + 56, sunsetM: 18 * 60 + 4 },
  { name: "Lusaka", region: "Lusaka Province, Zambia", flag: "🇿🇲", temp: "22°C", icon: "sunny", h: 25, l: 10, humidity: "30%", wind: "11 km/h E", windDir: 90, windLabel: "E", windSpeed: "11 km/h", windGust: "17 km/h", rainChance: 5, rainDesc: "Southern Africa dry season; clear cool days expected.", aqi: 30, desc: "Warm and sunny winter day on the Zambian plateau.", utcOffset: 2, sunriseM: 6 * 60 + 26, sunsetM: 17 * 60 + 42 },
  { name: "Harare", region: "Harare Province, Zimbabwe", flag: "🇿🇼", temp: "20°C", icon: "sunny", h: 23, l: 8, humidity: "32%", wind: "10 km/h E", windDir: 90, windLabel: "E", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 5, rainDesc: "Zimbabwean dry season; clear and pleasant on the plateau.", aqi: 28, desc: "Sunny and mild in the Sunshine City of Zimbabwe.", utcOffset: 2, sunriseM: 6 * 60 + 28, sunsetM: 17 * 60 + 46 },
  { name: "Luanda", region: "Luanda Province, Angola", flag: "🇦🇴", temp: "28°C", icon: "partlycloudy", h: 30, l: 22, humidity: "72%", wind: "14 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 20, rainDesc: "Atlantic coastal Angola; brief shower possible.", aqi: 52, desc: "Warm and slightly humid on the Angolan Atlantic coast.", utcOffset: 1, sunriseM: 6 * 60 + 8, sunsetM: 18 * 60 + 2 },
  { name: "Kinshasa", region: "Kinshasa Province, DRC", flag: "🇨🇩", temp: "29°C", icon: "thunderstorm", h: 31, l: 23, humidity: "82%", wind: "9 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "9 km/h", windGust: "16 km/h", rainChance: 72, rainDesc: "Congo Basin equatorial rainstorms; heavy daily rainfall.", aqi: 60, desc: "Tropical storms over the massive Congo River basin capital.", utcOffset: 1, sunriseM: 6 * 60 + 0, sunsetM: 18 * 60 + 0 },
  { name: "Brazzaville", region: "Brazzaville Department, Republic of Congo", flag: "🇨🇬", temp: "28°C", icon: "thunderstorm", h: 30, l: 22, humidity: "84%", wind: "8 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "8 km/h", windGust: "14 km/h", rainChance: 70, rainDesc: "Equatorial Congo storms across the river from Kinshasa.", aqi: 55, desc: "Equatorial downpours in the twin river capital.", utcOffset: 1, sunriseM: 6 * 60 + 0, sunsetM: 18 * 60 + 0 },
  { name: "Libreville", region: "Estuaire Province, Gabon", flag: "🇬🇦", temp: "28°C", icon: "rain", h: 30, l: 23, humidity: "85%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "17 km/h", rainChance: 68, rainDesc: "Equatorial Atlantic rains; persistent heavy rainfall.", aqi: 35, desc: "Hot and very wet equatorial Gabon coastline.", utcOffset: 1, sunriseM: 5 * 60 + 56, sunsetM: 18 * 60 + 4 },
  { name: "Antananarivo", region: "Analamanga, Madagascar", flag: "🇲🇬", temp: "16°C", icon: "mostlyclear", h: 20, l: 9, humidity: "55%", wind: "9 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 14, rainDesc: "Highland Madagascar winter; cool and mostly dry.", aqi: 30, desc: "Cool and sunny winter day in the City of a Thousand.", utcOffset: 3, sunriseM: 6 * 60 + 4, sunsetM: 17 * 60 + 38 },
  { name: "Tunis", region: "Tunis Governorate, Tunisia", flag: "🇹🇳", temp: "24°C", icon: "sunny", h: 27, l: 17, humidity: "55%", wind: "16 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "16 km/h", windGust: "25 km/h", rainChance: 8, rainDesc: "Mediterranean dry spring; beautiful sunshine expected.", aqi: 38, desc: "Warm Mediterranean sunshine in the ancient coastal capital.", utcOffset: 1, sunriseM: 5 * 60 + 44, sunsetM: 20 * 60 + 20 },
  { name: "Algiers", region: "Algiers Province, Algeria", flag: "🇩🇿", temp: "22°C", icon: "sunny", h: 25, l: 15, humidity: "60%", wind: "14 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 10, rainDesc: "Mediterranean spring; mostly dry and pleasant along the Barbary coast.", aqi: 42, desc: "Warm Mediterranean day in the white city by the sea.", utcOffset: 1, sunriseM: 5 * 60 + 56, sunsetM: 20 * 60 + 12 },
  { name: "Tripoli", region: "Tripoli District, Libya", flag: "🇱🇾", temp: "26°C", icon: "sunny", h: 29, l: 18, humidity: "50%", wind: "15 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 4, rainDesc: "Mediterranean coastline; dry and warm today.", aqi: 58, desc: "Warm and sunny on the Libyan Mediterranean coast.", utcOffset: 2, sunriseM: 5 * 60 + 48, sunsetM: 20 * 60 + 6 },

  // Russia & Central Asia (additional)
  { name: "Saint Petersburg", region: "Leningrad Oblast, Russia", flag: "🇷🇺", temp: "10°C", icon: "partlycloudy", h: 13, l: 5, humidity: "72%", wind: "18 km/h W", windDir: 270, windLabel: "W", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 38, rainDesc: "Baltic spring shower; overcast and damp by the Neva.", aqi: 22, desc: "Cool White Night season approaching on the Neva delta.", utcOffset: 3, sunriseM: 4 * 60 + 10, sunsetM: 22 * 60 + 28 },
  { name: "Novosibirsk", region: "Novosibirsk Oblast, Russia", flag: "🇷🇺", temp: "12°C", icon: "partlycloudy", h: 17, l: 4, humidity: "58%", wind: "14 km/h S", windDir: 180, windLabel: "S", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 22, rainDesc: "Siberian spring warming; passing shower possible.", aqi: 30, desc: "Cool Siberian spring on the Ob river plains.", utcOffset: 7, sunriseM: 5 * 60 + 16, sunsetM: 21 * 60 + 28 },
  { name: "Vladivostok", region: "Primorsky Krai, Russia", flag: "🇷🇺", temp: "8°C", icon: "foggy", h: 11, l: 3, humidity: "82%", wind: "16 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 45, rainDesc: "Pacific Ocean fog and drizzle over the Golden Horn Bay.", aqi: 28, desc: "Cool and misty in Russia's Pacific Ocean window.", utcOffset: 10, sunriseM: 4 * 60 + 52, sunsetM: 19 * 60 + 48 },
  { name: "Bishkek", region: "Chuy Oblast, Kyrgyzstan", flag: "🇰🇬", temp: "22°C", icon: "mostlyclear", h: 26, l: 13, humidity: "40%", wind: "11 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 14, rainDesc: "Tian Shan spring; mostly dry with a slight shower risk.", aqi: 50, desc: "Warm spring day beneath the Kyrgyz mountain peaks.", utcOffset: 6, sunriseM: 5 * 60 + 48, sunsetM: 20 * 60 + 22 },
  { name: "Dushanbe", region: "Dushanbe, Tajikistan", flag: "🇹🇯", temp: "26°C", icon: "sunny", h: 30, l: 16, humidity: "34%", wind: "10 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 8, rainDesc: "Pamir foothills spring; mostly dry today.", aqi: 52, desc: "Warm spring day at the foot of the Pamir Mountains.", utcOffset: 5, sunriseM: 5 * 60 + 38, sunsetM: 19 * 60 + 52 },
  { name: "Ashgabat", region: "Ahal Region, Turkmenistan", flag: "🇹🇲", temp: "34°C", icon: "sunny", h: 38, l: 22, humidity: "18%", wind: "15 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "15 km/h", windGust: "24 km/h", rainChance: 3, rainDesc: "Karakum desert heat; extremely arid conditions.", aqi: 60, desc: "Intense desert heat in the white marble city.", utcOffset: 5, sunriseM: 5 * 60 + 48, sunsetM: 20 * 60 + 8 },

  // South Asia (Sri Lanka, Maldives covered; adding more)
  { name: "Lahore", region: "Punjab, Pakistan", flag: "🇵🇰", temp: "40°C", icon: "sunny", h: 44, l: 30, humidity: "32%", wind: "12 km/h NW", windDir: 315, windLabel: "NW", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 8, rainDesc: "Punjab heat wave; pre-monsoon dry conditions.", aqi: 210, desc: "Scorching heat in the City of Gardens.", utcOffset: 5, sunriseM: 5 * 60 + 28, sunsetM: 19 * 60 + 28 },

  // More Americas
  { name: "Guadalajara", region: "Jalisco, Mexico", flag: "🇲🇽", temp: "24°C", icon: "partlycloudy", h: 27, l: 14, humidity: "52%", wind: "10 km/h W", windDir: 270, windLabel: "W", windSpeed: "10 km/h", windGust: "16 km/h", rainChance: 35, rainDesc: "Rainy season building; afternoon shower likely.", aqi: 82, desc: "Warm spring day in the tequila and mariachi capital.", utcOffset: -5, sunriseM: 6 * 60 + 16, sunsetM: 20 * 60 + 10 },
  { name: "Monterrey", region: "Nuevo León, Mexico", flag: "🇲🇽", temp: "32°C", icon: "mostlyclear", h: 36, l: 22, humidity: "42%", wind: "14 km/h N", windDir: 0, windLabel: "N", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 18, rainDesc: "Sierra Madre breezes; afternoon thunderstorm possible.", aqi: 75, desc: "Hot and dry at the foot of the Sierra Madre Oriental.", utcOffset: -5, sunriseM: 6 * 60 + 10, sunsetM: 20 * 60 + 6 },
  { name: "Guatemala City", region: "Guatemala Department, Guatemala", flag: "🇬🇹", temp: "20°C", icon: "showers", h: 23, l: 14, humidity: "72%", wind: "8 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "8 km/h", windGust: "13 km/h", rainChance: 62, rainDesc: "Central American rainy season; afternoon showers.", aqi: 50, desc: "Cool highland capital with afternoon tropical showers.", utcOffset: -6, sunriseM: 5 * 60 + 36, sunsetM: 18 * 60 + 18 },
  { name: "Tegucigalpa", region: "Francisco Morazán, Honduras", flag: "🇭🇳", temp: "22°C", icon: "showers", h: 25, l: 15, humidity: "70%", wind: "9 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "9 km/h", windGust: "14 km/h", rainChance: 58, rainDesc: "Rainy season; regular afternoon showers in the valley.", aqi: 45, desc: "Cool and showery in the Central American highland capital.", utcOffset: -6, sunriseM: 5 * 60 + 32, sunsetM: 18 * 60 + 10 },
  { name: "San Salvador", region: "San Salvador Department, El Salvador", flag: "🇸🇻", temp: "28°C", icon: "thunderstorm", h: 31, l: 20, humidity: "74%", wind: "10 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "10 km/h", windGust: "17 km/h", rainChance: 65, rainDesc: "Pacific-influenced afternoon storms over the valley.", aqi: 52, desc: "Hot and stormy in the Land of Volcanoes.", utcOffset: -6, sunriseM: 5 * 60 + 40, sunsetM: 18 * 60 + 20 },
  { name: "Managua", region: "Managua Department, Nicaragua", flag: "🇳🇮", temp: "33°C", icon: "thunderstorm", h: 35, l: 24, humidity: "78%", wind: "12 km/h SW", windDir: 225, windLabel: "SW", windSpeed: "12 km/h", windGust: "20 km/h", rainChance: 68, rainDesc: "Pacific coast storms drenching Nicaragua's capital.", aqi: 48, desc: "Hot and stormy in the lakeside Nicaraguan capital.", utcOffset: -6, sunriseM: 5 * 60 + 30, sunsetM: 18 * 60 + 10 },
  { name: "Port-au-Prince", region: "Ouest Department, Haiti", flag: "🇭🇹", temp: "32°C", icon: "thunderstorm", h: 34, l: 25, humidity: "80%", wind: "14 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 65, rainDesc: "Caribbean storm system; heavy rains threatening low areas.", aqi: 75, desc: "Intense tropical heat with frequent heavy rain storms.", utcOffset: -4, sunriseM: 6 * 60 + 4, sunsetM: 19 * 60 + 12 },
  { name: "Kingston", region: "Surrey County, Jamaica", flag: "🇯🇲", temp: "30°C", icon: "partlycloudy", h: 32, l: 24, humidity: "72%", wind: "18 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "18 km/h", windGust: "28 km/h", rainChance: 30, rainDesc: "Caribbean trade wind day; brief afternoon shower possible.", aqi: 30, desc: "Warm Caribbean island capital with trade wind breeze.", utcOffset: -5, sunriseM: 5 * 60 + 50, sunsetM: 18 * 60 + 42 },
  { name: "Santo Domingo", region: "Distrito Nacional, Dominican Republic", flag: "🇩🇴", temp: "30°C", icon: "thunderstorm", h: 32, l: 24, humidity: "78%", wind: "16 km/h SE", windDir: 135, windLabel: "SE", windSpeed: "16 km/h", windGust: "26 km/h", rainChance: 65, rainDesc: "Caribbean wave activity bringing afternoon storms.", aqi: 35, desc: "Hot and stormy in the oldest European city in the Americas.", utcOffset: -4, sunriseM: 6 * 60 + 8, sunsetM: 19 * 60 + 16 },
  { name: "Port of Spain", region: "Port of Spain, Trinidad & Tobago", flag: "🇹🇹", temp: "28°C", icon: "thunderstorm", h: 30, l: 24, humidity: "82%", wind: "14 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "14 km/h", windGust: "22 km/h", rainChance: 68, rainDesc: "Caribbean island storms; heavy downpours possible.", aqi: 32, desc: "Tropical storms over the birthplace of Carnival and calypso.", utcOffset: -4, sunriseM: 5 * 60 + 58, sunsetM: 18 * 60 + 30 },
  { name: "Paramaribo", region: "Paramaribo District, Suriname", flag: "🇸🇷", temp: "28°C", icon: "thunderstorm", h: 30, l: 24, humidity: "86%", wind: "10 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "10 km/h", windGust: "17 km/h", rainChance: 72, rainDesc: "Equatorial Atlantic storms; persistent tropical downpours.", aqi: 35, desc: "Equatorial heat and daily downpours in the Dutch Caribbean city.", utcOffset: -3, sunriseM: 6 * 60 + 2, sunsetM: 18 * 60 + 12 },
  { name: "Cayenne", region: "French Guiana, France", flag: "🇬🇫", temp: "28°C", icon: "thunderstorm", h: 30, l: 23, humidity: "88%", wind: "12 km/h NE", windDir: 45, windLabel: "NE", windSpeed: "12 km/h", windGust: "19 km/h", rainChance: 75, rainDesc: "Amazon influence; heavy equatorial rain expected.", aqi: 28, desc: "Tropical equatorial storms in France's jungle outpost.", utcOffset: -3, sunriseM: 6 * 60 + 0, sunsetM: 18 * 60 + 10 },
  { name: "Bridgetown", region: "Saint Michael Parish, Barbados", flag: "🇧🇧", temp: "28°C", icon: "partlycloudy", h: 30, l: 24, humidity: "74%", wind: "22 km/h E", windDir: 90, windLabel: "E", windSpeed: "22 km/h", windGust: "34 km/h", rainChance: 30, rainDesc: "Atlantic trade winds strong; brief island showers possible.", aqi: 14, desc: "Warm and breezy on the Little England island.", utcOffset: -4, sunriseM: 5 * 60 + 52, sunsetM: 18 * 60 + 38 },
  { name: "Nassau", region: "New Providence, Bahamas", flag: "🇧🇸", temp: "29°C", icon: "partlycloudy", h: 31, l: 24, humidity: "72%", wind: "20 km/h E", windDir: 90, windLabel: "E", windSpeed: "20 km/h", windGust: "30 km/h", rainChance: 28, rainDesc: "Trade wind day; afternoon shower brief but possible.", aqi: 20, desc: "Warm turquoise island capital in the Bahamas.", utcOffset: -4, sunriseM: 6 * 60 + 28, sunsetM: 20 * 60 + 4 },
  { name: "Santa Cruz de la Sierra", region: "Santa Cruz Department, Bolivia", flag: "🇧🇴", temp: "28°C", icon: "thunderstorm", h: 31, l: 21, humidity: "78%", wind: "11 km/h N", windDir: 0, windLabel: "N", windSpeed: "11 km/h", windGust: "18 km/h", rainChance: 65, rainDesc: "Amazon lowland storms moving into the Chaco region.", aqi: 48, desc: "Hot tropical city on the edge of the Amazon basin.", utcOffset: -4, sunriseM: 6 * 60 + 20, sunsetM: 18 * 60 + 22 },
];

/* ─── Hour-by-hour forecast generator ─────────────────────────────── */
const generateHourly = (city) => {
  const baseTemp = parseInt(city.temp);
  const hours = [];
  const now = new Date();
  const currentHour = now.getHours();
  const icons = ["sunny","mostlyclear","partlycloudy","cloudy","showers","rain","thunderstorm"];
  for (let i = 0; i < 24; i++) {
    const h = (currentHour + i) % 24;
    const variation = Math.sin((h / 24) * Math.PI * 2) * 4;
    const temp = Math.round(baseTemp + variation - 2 + (Math.random() * 2 - 1));
    const rain = Math.max(0, Math.min(100, city.rainChance + Math.round(Math.random() * 20 - 10)));
    const iconIdx = rain > 70 ? 5 : rain > 50 ? 4 : rain > 30 ? 3 : rain > 15 ? 2 : h < 6 || h > 20 ? 1 : 0;
    hours.push({ hour: h, label: h === 0 ? "12 AM" : h < 12 ? `${h} AM` : h === 12 ? "12 PM" : `${h - 12} PM`, temp, rain, icon: icons[iconIdx] });
  }
  return hours;
};

/* ─── AI Weather Summary ─────────────────────────────────────────── */
const getAISummary = (city) => {
  const temp = parseInt(city.temp);
  const rain = city.rainChance;
  const aqi  = city.aqi;
  const uv   = city.uvIndex || 5;

  let mood = "", advice = [], outfit = "", activity = "";

  if (city.icon === "thunderstorm" || city.stormAlert) {
    mood = "⚡ Severe storm conditions";
    advice = ["Stay indoors if possible", "Avoid open ground and tall trees", "Keep emergency kit ready"];
    outfit = "Rain gear + rubber-soled footwear";
    activity = "Indoors only — cancel outdoor plans";
  } else if (rain >= 70) {
    mood = "🌧️ Heavy rain day";
    advice = ["Carry a strong umbrella", "Avoid low-lying flooded roads", "Allow extra travel time"];
    outfit = "Waterproof jacket + closed shoes";
    activity = "Indoor activities recommended";
  } else if (rain >= 40) {
    mood = "🌦️ Showers likely";
    advice = ["Pack a light raincoat", "Morning may be clearer", "Check road conditions before commuting"];
    outfit = "Light jacket + waterproof bag";
    activity = "Morning outdoor plans are fine; wrap up early";
  } else if (temp >= 40) {
    mood = "🔥 Extreme heat alert";
    advice = ["Drink 3–4 litres of water", "Avoid direct sun 11 AM – 4 PM", "Use SPF 50+ sunscreen"];
    outfit = "Loose cotton clothes + wide-brim hat";
    activity = "Early morning or evening exercise only";
  } else if (temp >= 35) {
    mood = "☀️ Very hot and sunny";
    advice = ["Stay hydrated throughout the day", "Seek shade during peak hours", "Wear sunglasses"];
    outfit = "Light breathable fabrics + sunglasses";
    activity = "Outdoor possible early morning; avoid midday";
  } else if (temp <= 12) {
    mood = "🧥 Chilly conditions";
    advice = ["Layer up well", "Carry a hot flask", "Roads may be slippery at dawn"];
    outfit = "Sweater + jacket + warm socks";
    activity = "Brisk walk or hike — ideal weather for it";
  } else if (city.icon === "dust") {
    mood = "🌫️ Dust storm active";
    advice = ["Wear an N95 mask outdoors", "Keep windows and doors shut", "Avoid driving if visibility is low"];
    outfit = "Full coverage + N95 mask essential";
    activity = "Avoid all outdoor activities";
  } else if (aqi >= 200) {
    mood = "😷 Air quality hazardous";
    advice = ["Wear a mask outdoors", "Keep sensitive individuals inside", "Run air purifiers indoors"];
    outfit = "Mask + covered clothing";
    activity = "No outdoor exercise; AQI is dangerous";
  } else {
    mood = "🌤️ Good day ahead";
    advice = ["Great conditions to go out", "UV is " + (uv >= 8 ? "high — use sunscreen" : "moderate — minimal protection needed"), "Keep some water handy"];
    outfit = "Comfortable casuals";
    activity = "Perfect for a run, walk, or outdoor plans";
  }

  return { mood, advice, outfit, activity };
};

/* ─── UV Index helper ────────────────────────────────────────────── */
const uvLabel  = v => v <= 2 ? "Low" : v <= 5 ? "Moderate" : v <= 7 ? "High" : v <= 10 ? "Very High" : "Extreme";
const uvColor  = v => v <= 2 ? "#4CAF50" : v <= 5 ? "#FFC107" : v <= 7 ? "#FF9800" : v <= 10 ? "#F44336" : "#9C27B0";

/* ─── Dynamic Weather Background ────────────────────────────────── */
const DynamicWeatherBg = ({ icon }) => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const stateRef  = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); };
    const rand = (a, b) => Math.random() * (b - a) + a;

    let rainDrops = [], snowFlakes = [], dustParts = [], cloudBlobs = [], stars = [];
    let lightning = { active: false, x: 0, segments: [], alpha: 0, timer: 0, nextIn: 0 };
    let sunBeams = [], shimmerPts = [], fogLayers = [], windStreaks = [], time = 0;

    const init = () => {
      const W = canvas.width, H = canvas.height;
      stateRef.current = { W, H };
      stars = Array.from({ length: 120 }, () => ({ x: rand(0,W), y: rand(0,H*0.65), r: rand(0.5,1.8), alpha: rand(0.3,0.9), twinkleSpeed: rand(0.005,0.02), twinklePhase: rand(0,Math.PI*2) }));
      cloudBlobs = Array.from({ length: 7 }, () => ({ x: rand(-200,W+200), y: rand(H*0.02,H*0.38), w: rand(220,480), h: rand(70,160), speed: rand(0.18,0.55), alpha: rand(0.12,0.32), bumps: Array.from({length:6},()=>({dx:rand(-80,80),dy:rand(-50,10),r:rand(40,90)})) }));
      rainDrops = Array.from({ length: 260 }, () => ({ x: rand(0,W), y: rand(-H,H), len: rand(14,28), speed: rand(14,22), alpha: rand(0.25,0.55), thick: rand(0.4,1.1), angle: rand(-0.08,0.08) }));
      snowFlakes = Array.from({ length: 110 }, () => ({ x: rand(0,W), y: rand(-H,H), r: rand(1.5,4.5), speed: rand(0.6,1.8), drift: rand(-0.4,0.4), alpha: rand(0.45,0.9), wobble: rand(0,Math.PI*2), wobbleSpeed: rand(0.01,0.03) }));
      dustParts = Array.from({ length: 200 }, () => ({ x: rand(0,W), y: rand(0,H), r: rand(1,5), speed: rand(1.5,4.5), alpha: rand(0.08,0.3), vy: rand(-0.3,0.3) }));
      sunBeams = Array.from({ length: 12 }, (_,i) => ({ angle: (i/12)*Math.PI*2, len: rand(80,200), alpha: rand(0.04,0.12), speed: rand(0.002,0.006) }));
      shimmerPts = Array.from({ length: 40 }, () => ({ x: rand(0,W), y: rand(H*0.3,H), r: rand(1,3), alpha: 0, speed: rand(0.01,0.03), phase: rand(0,Math.PI*2) }));
      fogLayers = Array.from({ length: 5 }, () => ({ x: rand(-W,W*2), y: rand(H*0.1,H*0.8), w: rand(W*0.8,W*1.6), h: rand(80,200), speed: rand(0.2,0.7), alpha: rand(0.04,0.15) }));
      windStreaks = Array.from({ length: 80 }, () => ({ x: rand(-100,W), y: rand(0,H), len: rand(60,200), speed: rand(6,18), alpha: rand(0.05,0.2), vy: rand(-0.5,0.5) }));
      lightning = { active: false, x: rand(W*0.2,W*0.8), segments: [], alpha: 0, timer: 0, nextIn: rand(80,200) };
    };

    const buildLightning = (startX, W, H) => {
      const segs = []; let cx = startX, cy = 0;
      while (cy < H * 0.85) { const nx = cx + rand(-60,60), ny = cy + rand(40,90); segs.push({x1:cx,y1:cy,x2:nx,y2:ny}); cx=nx; cy=ny; }
      return segs;
    };

    const drawCloud = (blob, alpha) => {
      const { x, y, w, h, bumps } = blob; ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = "rgba(220,230,255,1)";
      const cx = x+w/2, cy = y+h/2; ctx.beginPath(); ctx.ellipse(cx,cy,w/2,h/2,0,0,Math.PI*2); ctx.fill();
      bumps.forEach(b => { ctx.beginPath(); ctx.arc(cx+b.dx,cy+b.dy,b.r,0,Math.PI*2); ctx.fill(); }); ctx.restore();
    };

    const getBgGradient = () => {
      const W = canvas.width, H = canvas.height; const g = ctx.createLinearGradient(0,0,0,H);
      switch (icon) {
        case "sunny":       g.addColorStop(0,"rgba(14,60,120,0.92)"); g.addColorStop(0.4,"rgba(30,110,190,0.88)"); g.addColorStop(1,"rgba(80,150,220,0.82)"); break;
        case "mostlyclear": g.addColorStop(0,"rgba(12,50,100,0.9)"); g.addColorStop(0.5,"rgba(25,90,165,0.85)"); g.addColorStop(1,"rgba(60,130,200,0.8)"); break;
        case "partlycloudy":g.addColorStop(0,"rgba(20,35,70,0.92)"); g.addColorStop(0.5,"rgba(35,55,100,0.88)"); g.addColorStop(1,"rgba(50,75,130,0.85)"); break;
        case "cloudy":      g.addColorStop(0,"rgba(28,35,55,0.95)"); g.addColorStop(0.5,"rgba(40,50,75,0.92)"); g.addColorStop(1,"rgba(55,65,90,0.9)"); break;
        case "rain": case "showers": g.addColorStop(0,"rgba(10,18,40,0.97)"); g.addColorStop(0.5,"rgba(18,28,58,0.94)"); g.addColorStop(1,"rgba(28,42,75,0.92)"); break;
        case "thunderstorm":g.addColorStop(0,"rgba(5,8,22,0.98)"); g.addColorStop(0.4,"rgba(12,15,35,0.97)"); g.addColorStop(1,"rgba(20,22,48,0.96)"); break;
        case "snow":        g.addColorStop(0,"rgba(20,35,65,0.93)"); g.addColorStop(0.5,"rgba(35,55,90,0.9)"); g.addColorStop(1,"rgba(55,80,120,0.88)"); break;
        case "dust":        g.addColorStop(0,"rgba(60,40,15,0.95)"); g.addColorStop(0.5,"rgba(90,65,25,0.92)"); g.addColorStop(1,"rgba(120,90,45,0.9)"); break;
        case "windy": case "verywindy": g.addColorStop(0,"rgba(15,28,55,0.93)"); g.addColorStop(0.5,"rgba(28,45,80,0.9)"); g.addColorStop(1,"rgba(45,65,105,0.88)"); break;
        case "foggy":       g.addColorStop(0,"rgba(40,50,70,0.94)"); g.addColorStop(0.5,"rgba(55,68,88,0.92)"); g.addColorStop(1,"rgba(75,88,108,0.9)"); break;
        default:            g.addColorStop(0,"rgba(15,28,58,0.93)"); g.addColorStop(1,"rgba(35,55,95,0.9)");
      }
      return g;
    };

    const draw = () => {
      const W = canvas.width, H = canvas.height; time++;
      ctx.clearRect(0,0,W,H); ctx.fillStyle = getBgGradient(); ctx.fillRect(0,0,W,H);

      if (icon === "thunderstorm") {
        stars.forEach(s => { s.twinklePhase += s.twinkleSpeed; const a = s.alpha*(0.4+0.3*Math.sin(s.twinklePhase)); ctx.save(); ctx.globalAlpha=a; ctx.fillStyle="#cce0ff"; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); ctx.restore(); });
        ctx.save(); rainDrops.forEach(d => { d.y+=d.speed*1.4; d.x+=d.angle*d.speed*1.4; if(d.y>H+d.len){d.y=-d.len;d.x=rand(0,W);} ctx.globalAlpha=d.alpha; ctx.strokeStyle="rgba(160,210,255,0.7)"; ctx.lineWidth=d.thick; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(d.x,d.y); ctx.lineTo(d.x+d.angle*d.len*1.5,d.y+d.len); ctx.stroke(); }); ctx.restore();
        cloudBlobs.forEach(c => { c.x+=c.speed*0.6; if(c.x>W+300)c.x=-300; drawCloud(c,c.alpha*0.9); });
        lightning.timer++; if(!lightning.active&&lightning.timer>=lightning.nextIn){lightning.active=true;lightning.x=rand(W*0.15,W*0.85);lightning.segments=buildLightning(lightning.x,W,H);lightning.alpha=1;lightning.timer=0;lightning.nextIn=rand(60,180);}
        if(lightning.active){ctx.save();ctx.globalAlpha=lightning.alpha*0.08;ctx.fillStyle="#c8d8ff";ctx.fillRect(0,0,W,H);ctx.restore();ctx.save();ctx.globalAlpha=lightning.alpha;ctx.strokeStyle="#ffffff";ctx.lineWidth=2.5;ctx.shadowColor="#aaccff";ctx.shadowBlur=18;ctx.lineCap="round";ctx.beginPath();lightning.segments.forEach((s,i)=>{if(i===0)ctx.moveTo(s.x1,s.y1);else ctx.lineTo(s.x1,s.y1);ctx.lineTo(s.x2,s.y2);});ctx.stroke();ctx.lineWidth=8;ctx.strokeStyle="rgba(180,210,255,0.3)";ctx.shadowBlur=40;ctx.beginPath();lightning.segments.forEach((s,i)=>{if(i===0)ctx.moveTo(s.x1,s.y1);else ctx.lineTo(s.x1,s.y1);ctx.lineTo(s.x2,s.y2);});ctx.stroke();ctx.restore();lightning.alpha-=0.06;if(lightning.alpha<=0){lightning.active=false;lightning.alpha=0;}}
      } else if (icon === "rain" || icon === "showers") {
        const intensity = icon==="rain"?1:0.65;
        cloudBlobs.forEach(c=>{c.x+=c.speed*0.4;if(c.x>W+300)c.x=-300;drawCloud(c,c.alpha*0.85);});
        ctx.save(); rainDrops.forEach(d=>{d.y+=d.speed*intensity;d.x+=d.angle*d.speed*intensity;if(d.y>H+d.len){d.y=-d.len;d.x=rand(0,W);}ctx.globalAlpha=d.alpha*intensity;ctx.strokeStyle="rgba(174,220,255,0.75)";ctx.lineWidth=d.thick;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x+d.angle*d.len,d.y+d.len);ctx.stroke();}); ctx.restore();
      } else if (icon === "snow") {
        cloudBlobs.forEach(c=>{c.x+=c.speed*0.25;if(c.x>W+300)c.x=-300;drawCloud(c,c.alpha*0.7);});
        ctx.save(); snowFlakes.forEach(f=>{f.wobble+=f.wobbleSpeed;f.y+=f.speed;f.x+=f.drift+Math.sin(f.wobble)*0.5;if(f.y>H+10){f.y=-10;f.x=rand(0,W);}if(f.x>W+10)f.x=-10;if(f.x<-10)f.x=W+10;ctx.globalAlpha=f.alpha;ctx.fillStyle="rgba(220,240,255,0.9)";ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();}); ctx.restore();
      } else if (icon === "dust") {
        ctx.save(); dustParts.forEach(d=>{d.x+=d.speed;d.y+=d.vy;if(d.x>W+10){d.x=-10;d.y=rand(0,H);}if(d.y<0||d.y>H)d.vy*=-1;ctx.globalAlpha=d.alpha;ctx.fillStyle=`rgba(200,150,60,${d.alpha})`;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();}); ctx.restore();
        const dw=ctx.createLinearGradient(0,0,0,H);dw.addColorStop(0,"rgba(180,120,40,0)");dw.addColorStop(0.4,"rgba(160,100,30,0.18)");dw.addColorStop(1,"rgba(140,90,20,0.32)");ctx.fillStyle=dw;ctx.fillRect(0,0,W,H);
      } else if (icon === "windy" || icon === "verywindy") {
        const sm=icon==="verywindy"?1.8:1;
        cloudBlobs.forEach(c=>{c.x+=c.speed*2.5*sm;if(c.x>W+300)c.x=-400;drawCloud(c,c.alpha*0.6);});
        ctx.save(); windStreaks.forEach(ws=>{ws.x+=ws.speed*sm;ws.y+=ws.vy;if(ws.x>W+ws.len){ws.x=-ws.len;ws.y=rand(0,H);}if(ws.y<0||ws.y>H)ws.vy*=-1;const g=ctx.createLinearGradient(ws.x,ws.y,ws.x+ws.len,ws.y);g.addColorStop(0,"rgba(180,210,255,0)");g.addColorStop(0.4,`rgba(180,210,255,${ws.alpha})`);g.addColorStop(1,"rgba(180,210,255,0)");ctx.strokeStyle=g;ctx.lineWidth=rand(0.5,1.5);ctx.beginPath();ctx.moveTo(ws.x,ws.y);ctx.lineTo(ws.x+ws.len,ws.y+ws.vy*5);ctx.stroke();}); ctx.restore();
      } else if (icon === "foggy") {
        cloudBlobs.forEach(c=>{c.x+=c.speed*0.15;if(c.x>W+300)c.x=-300;drawCloud(c,c.alpha*0.4);});
        fogLayers.forEach(fl=>{fl.x+=fl.speed*0.3;if(fl.x>W+fl.w)fl.x=-fl.w;const fg=ctx.createRadialGradient(fl.x+fl.w/2,fl.y,0,fl.x+fl.w/2,fl.y,fl.w/2);fg.addColorStop(0,`rgba(200,215,240,${fl.alpha})`);fg.addColorStop(1,"rgba(200,215,240,0)");ctx.save();ctx.globalAlpha=1;ctx.fillStyle=fg;ctx.beginPath();ctx.ellipse(fl.x+fl.w/2,fl.y,fl.w/2,fl.h/2,0,0,Math.PI*2);ctx.fill();ctx.restore();});
      } else if (icon === "sunny" || icon === "clearspring") {
        const sunX=W*0.72,sunY=H*0.14;const sr=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,W*0.55);sr.addColorStop(0,"rgba(255,220,80,0.22)");sr.addColorStop(0.3,"rgba(255,160,40,0.12)");sr.addColorStop(1,"rgba(255,100,20,0)");ctx.fillStyle=sr;ctx.fillRect(0,0,W,H);
        ctx.save();sunBeams.forEach(b=>{b.angle+=b.speed;const x2=sunX+Math.cos(b.angle)*b.len,y2=sunY+Math.sin(b.angle)*b.len;const rg=ctx.createLinearGradient(sunX,sunY,x2,y2);rg.addColorStop(0,`rgba(255,240,120,${b.alpha})`);rg.addColorStop(1,"rgba(255,200,80,0)");ctx.globalAlpha=1;ctx.strokeStyle=rg;ctx.lineWidth=2;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(sunX,sunY);ctx.lineTo(x2,y2);ctx.stroke();}); ctx.restore();
        shimmerPts.forEach(s=>{s.phase+=s.speed;s.alpha=0.4+0.4*Math.sin(s.phase);ctx.save();ctx.globalAlpha=s.alpha*0.5;ctx.fillStyle="rgba(255,240,180,0.6)";ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();ctx.restore();});
        cloudBlobs.slice(0,3).forEach(c=>{c.x+=c.speed*0.2;if(c.x>W+300)c.x=-300;drawCloud(c,c.alpha*0.35);});
      } else if (icon === "mostlyclear") {
        const sunX=W*0.68,sunY=H*0.12;const sr=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,W*0.4);sr.addColorStop(0,"rgba(255,200,60,0.18)");sr.addColorStop(0.5,"rgba(255,140,30,0.08)");sr.addColorStop(1,"rgba(255,100,20,0)");ctx.fillStyle=sr;ctx.fillRect(0,0,W,H);
        cloudBlobs.slice(0,4).forEach(c=>{c.x+=c.speed*0.25;if(c.x>W+300)c.x=-300;drawCloud(c,c.alpha*0.45);});
        shimmerPts.forEach(s=>{s.phase+=s.speed*0.7;ctx.save();ctx.globalAlpha=0.2+0.15*Math.sin(s.phase);ctx.fillStyle="rgba(255,240,180,0.5)";ctx.beginPath();ctx.arc(s.x,s.y,s.r*0.8,0,Math.PI*2);ctx.fill();ctx.restore();});
      } else if (icon === "partlycloudy") {
        cloudBlobs.slice(0,5).forEach(c=>{c.x+=c.speed*0.3;if(c.x>W+300)c.x=-300;drawCloud(c,c.alpha*0.55);});
        const sr=ctx.createRadialGradient(W*0.6,H*0.15,0,W*0.6,H*0.15,W*0.3);sr.addColorStop(0,"rgba(255,200,60,0.12)");sr.addColorStop(1,"rgba(255,160,30,0)");ctx.fillStyle=sr;ctx.fillRect(0,0,W,H);
      } else if (icon === "cloudy") {
        cloudBlobs.forEach(c=>{c.x+=c.speed*0.35;if(c.x>W+300)c.x=-300;drawCloud(c,c.alpha*0.75);});
      }

      ctx.save(); ctx.globalAlpha=0.022; for(let i=0;i<8;i++){ctx.fillStyle=`rgba(255,255,255,${Math.random()*0.06})`;ctx.fillRect(rand(0,W),rand(0,H),rand(1,3),rand(1,3));} ctx.restore();
      const haze=ctx.createLinearGradient(0,H*0.7,0,H);haze.addColorStop(0,"rgba(0,0,0,0)");haze.addColorStop(1,"rgba(0,0,0,0.45)");ctx.fillStyle=haze;ctx.fillRect(0,H*0.7,W,H*0.3);
      animRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize(); draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [icon]);

  return <canvas ref={canvasRef} className="dynamic-weather-bg-canvas" />;
};

/* ─── Weather Icon Component ─────────────────────────────────────── */
const WeatherIcon = ({ icon, size = 32, className = "" }) => {
  const props = { size, className };
  switch (icon) {
    case "sunny":        return <WiDaySunny {...props} />;
    case "partlycloudy": return <WiDayCloudy {...props} />;
    case "mostlyclear":  return <WiDaySunnyOvercast {...props} />;
    case "cloudy":       return <WiCloudy {...props} />;
    case "rain":         return <WiRain {...props} />;
    case "showers":      return <WiShowers {...props} />;
    case "thunderstorm": return <WiThunderstorm {...props} />;
    case "dust":         return <WiDust {...props} />;
    case "windy":        return <WiStrongWind {...props} />;
    case "verywindy":    return <WiStrongWind {...props} />;
    case "foggy":        return <WiDayHaze {...props} />;
    case "snow":         return <WiSnowflakeCold {...props} />;
    case "clearspring":  return <WiDaySprinkle {...props} />;
    default:             return <WiDayCloudy {...props} />;
  }
};

const weatherCondition = (icon) => {
  const map = { partlycloudy:"Partly Cloudy", sunny:"Clear Sky", rain:"Rainy", thunderstorm:"Thunderstorm", mostlyclear:"Mostly Clear", cloudy:"Cloudy", showers:"Light Showers", dust:"Dust Storm", windy:"Windy", verywindy:"Very Windy", clearspring:"Clear & Sunny", snow:"Snow / Sleet", foggy:"Foggy" };
  return map[icon] || "Partly Cloudy";
};

const FORECAST_ICONS = ["partlycloudy","mostlyclear","sunny","rain","showers","thunderstorm","cloudy"];

const fmtTime = m => {
  const h = Math.floor(m / 60), min = String(m % 60).padStart(2, "0"), ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${min} ${ampm}`;
};

const aqiLabel = v => { if(v<=50)return "Good"; if(v<=100)return "Moderate"; if(v<=150)return "Unhealthy for Sensitive"; if(v<=200)return "Unhealthy"; if(v<=300)return "Very Unhealthy"; return "Hazardous"; };

const calcSnowChance = city => {
  const temp = city.l; let base = 0;
  if(temp<=0)base=95; else if(temp<=2)base=85; else if(temp<=4)base=65; else if(temp<=6)base=40; else if(temp<=8)base=20; else if(temp<=10)base=8;
  if(city.icon==="snow")base=Math.min(base+30,98); if(city.icon==="rain"&&temp<=4)base=Math.min(base+15,95); if(city.icon==="showers"&&temp<=4)base=Math.min(base+10,90);
  if(["dust","sunny","thunderstorm","foggy"].includes(city.icon)&&temp>8)base=0; return Math.round(base);
};

const snowDesc = (pct, temp) => { if(pct>=70)return `Very likely — overnight low ${temp}°C with freezing conditions.`; if(pct>=40)return `Possible — temperatures marginal for snowfall at ${temp}°C.`; if(pct>=10)return `Unlikely — a little too warm at ${temp}°C for significant snow.`; return `Not expected — temperatures well above freezing at ${temp}°C.`; };

const getCityTime = utcOffset => {
  const now = new Date(), utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const local = new Date(utcMs + utcOffset * 3600000);
  return { time: `${String(local.getHours()).padStart(2,"0")}:${String(local.getMinutes()).padStart(2,"0")}:${String(local.getSeconds()).padStart(2,"0")}`, day: local.toLocaleDateString("en-US",{weekday:"short"}), date: local.toLocaleDateString("en-US",{day:"numeric",month:"short"}) };
};

const utcLabel = offset => `UTC ${offset >= 0 ? "+" : ""}${Number.isInteger(offset) ? offset : offset.toFixed(1)}`;

/* ─── Rain Canvas ────────────────────────────────────────────────── */
const RainCanvas = ({ active }) => {
  const canvasRef = useRef(null), animRef = useRef(null), drops = useRef([]);
  useEffect(() => {
    if (!active) { cancelAnimationFrame(animRef.current); return; }
    const canvas = canvasRef.current, ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth || 300, H = canvas.offsetHeight || 260;
    canvas.width = W; canvas.height = H;
    drops.current = Array.from({length:120},()=>({x:Math.random()*W,y:Math.random()*H,len:Math.random()*18+8,speed:Math.random()*6+5,thick:Math.random()*0.8+0.3,alpha:Math.random()*0.55+0.2}));
    const draw = () => { ctx.clearRect(0,0,W,H); drops.current.forEach(d=>{ctx.save();ctx.globalAlpha=d.alpha;ctx.strokeStyle=`rgba(174,220,255,${d.alpha})`;ctx.lineWidth=d.thick;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x+d.len*0.18,d.y+d.len);ctx.stroke();ctx.restore();d.y+=d.speed;d.x+=d.speed*0.06;if(d.y>H){d.y=-d.len;d.x=Math.random()*W;}}); animRef.current=requestAnimationFrame(draw); };
    draw(); return () => cancelAnimationFrame(animRef.current);
  }, [active]);
  if (!active) return null;
  return <canvas ref={canvasRef} className="rain-canvas" />;
};

/* ─── Snow Canvas ────────────────────────────────────────────────── */
const SnowCanvas = ({ active }) => {
  const canvasRef = useRef(null), animRef = useRef(null), flakes = useRef([]);
  useEffect(() => {
    if (!active) { cancelAnimationFrame(animRef.current); return; }
    const canvas = canvasRef.current, ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth || 300, H = canvas.offsetHeight || 260;
    canvas.width = W; canvas.height = H;
    flakes.current = Array.from({length:60},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*3+1.5,speed:Math.random()*1.2+0.4,drift:(Math.random()-0.5)*0.5,alpha:Math.random()*0.6+0.3,angle:Math.random()*Math.PI*2,spin:(Math.random()-0.5)*0.04}));
    const draw = () => { ctx.clearRect(0,0,W,H); flakes.current.forEach(f=>{ctx.save();ctx.globalAlpha=f.alpha;ctx.fillStyle="rgba(220,240,255,0.9)";ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();ctx.restore();f.y+=f.speed;f.x+=f.drift;f.angle+=f.spin;if(f.y>H){f.y=-f.r*2;f.x=Math.random()*W;}if(f.x>W+10)f.x=-10;if(f.x<-10)f.x=W+10;}); animRef.current=requestAnimationFrame(draw); };
    draw(); return () => cancelAnimationFrame(animRef.current);
  }, [active]);
  if (!active) return null;
  return <canvas ref={canvasRef} className="snow-canvas" />;
};

/* ─── Sun Arc ────────────────────────────────────────────────────── */
const SunArc = ({ utcOffset = 5.5, sunriseM = 314, sunsetM = 1112 }) => {
  const animRef = useRef(null), rayAngle = useRef(0), pulseR = useRef(13), pulseDir = useRef(1);
  const sunHaloRef = useRef(null), sunBodyRef = useRef(null), sunInnerRef = useRef(null);
  const sunRaysRef = useRef(null), moonRef = useRef(null), skyFillRef = useRef(null);
  useEffect(() => {
    const SUNRISE = sunriseM, SUNSET = sunsetM, CX = 250, CY = 90, RX = 220, RY = 80;
    const tick = () => {
      const now = new Date(), utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const cityDt = new Date(utcMs + utcOffset * 3600000);
      const nowM = cityDt.getHours() * 60 + cityDt.getMinutes() + cityDt.getSeconds() / 60;
      const p = Math.min(Math.max((nowM - SUNRISE) / (SUNSET - SUNRISE), 0), 1);
      const isDay = nowM > SUNRISE && nowM < SUNSET;
      const angle = Math.PI * p;
      const sx = CX - RX * Math.cos(angle), sy = CY - RY * Math.sin(angle);
      pulseR.current += pulseDir.current * 0.05;
      if (pulseR.current > 14.5) pulseDir.current = -1;
      if (pulseR.current < 11.5) pulseDir.current = 1;
      const r = pulseR.current;
      if (isDay) {
        sunHaloRef.current?.setAttribute("cx", sx); sunHaloRef.current?.setAttribute("cy", sy); sunHaloRef.current?.setAttribute("r", r*2.4); sunHaloRef.current?.setAttribute("opacity", "1");
        sunBodyRef.current?.setAttribute("cx", sx); sunBodyRef.current?.setAttribute("cy", sy); sunBodyRef.current?.setAttribute("r", r); sunBodyRef.current?.setAttribute("opacity", "1");
        sunInnerRef.current?.setAttribute("cx", sx); sunInnerRef.current?.setAttribute("cy", sy); sunInnerRef.current?.setAttribute("opacity", "1");
        moonRef.current?.setAttribute("opacity", "0");
        rayAngle.current += 0.4;
        const elevation = Math.sin(angle), rayOpacity = Math.min(elevation * 1.5, 0.9).toFixed(2);
        sunRaysRef.current?.setAttribute("transform", `translate(${sx},${sy}) rotate(${rayAngle.current})`);
        sunRaysRef.current?.setAttribute("opacity", rayOpacity);
        const br = Math.sin(angle), rc = Math.round(20+br*60), gc = Math.round(58+br*100), bc = Math.round(110+br*80);
        skyFillRef.current?.setAttribute("fill", `rgba(${rc},${gc},${bc},0.35)`);
      } else {
        [sunHaloRef, sunBodyRef, sunInnerRef].forEach(ref => ref.current?.setAttribute("opacity", "0"));
        sunRaysRef.current?.setAttribute("opacity", "0"); moonRef.current?.setAttribute("opacity", "1");
        skyFillRef.current?.setAttribute("fill", "rgba(10,20,50,0.35)");
      }
      animRef.current = requestAnimationFrame(tick);
    };
    tick(); return () => cancelAnimationFrame(animRef.current);
  }, [utcOffset, sunriseM, sunsetM]);
  return (
    <div className="sun-arc-container">
      <svg viewBox="0 0 500 110" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",overflow:"visible"}}>
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFE566" stopOpacity="1"/><stop offset="60%" stopColor="#FFAA00" stopOpacity="0.6"/><stop offset="100%" stopColor="#FF6600" stopOpacity="0"/></radialGradient>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#aad4ff" stopOpacity="0.7"/><stop offset="100%" stopColor="#aad4ff" stopOpacity="0"/></radialGradient>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FF9A3C" stopOpacity="0.7"/><stop offset="50%" stopColor="#FFE066" stopOpacity="1"/><stop offset="100%" stopColor="#FF7043" stopOpacity="0.7"/></linearGradient>
        </defs>
        <path ref={skyFillRef} d="M 30 90 A 220 80 0 0 1 470 90 Z" fill="rgba(20,58,110,0.35)" className="sky-fill-path"/>
        <line x1="20" y1="90" x2="480" y2="90" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" strokeDasharray="4,4"/>
        <path d="M 30 90 A 220 80 0 0 1 470 90" fill="none" stroke="url(#arcGrad)" strokeWidth="2" strokeDasharray="6,3"/>
        <circle cx="30" cy="90" r="5" fill="#FF9A3C"/><circle cx="470" cy="90" r="5" fill="#FF7043"/>
        <circle ref={sunHaloRef} cx="250" cy="90" r="31" fill="url(#sunGlow)" opacity="0"/>
        <circle ref={sunBodyRef} cx="250" cy="90" r="13" fill="#FFE566" opacity="0" className="sun-core"/>
        <circle ref={sunInnerRef} cx="250" cy="90" r="9" fill="#FFF176" opacity="0"/>
        <g ref={sunRaysRef} opacity="0">{[0,45,90,135,180,225,270,315].map(a=>(<line key={a} x1="0" y1="0" x2="0" y2="-22" stroke="#FFE566" strokeWidth="1.5" strokeLinecap="round" opacity={a%90===0?"0.7":"0.45"} transform={`rotate(${a})`}/>))}</g>
        <g ref={moonRef} opacity="0"><circle cx="250" cy="35" r="26" fill="url(#moonGlow)"/><circle cx="250" cy="35" r="12" fill="#d0e8ff"/><circle cx="257" cy="31" r="8" fill="#1a2e4a"/>{[[210,18],[280,15],[195,40],[285,45]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="1.5" fill="rgba(255,255,255,0.6)"/>))}</g>
      </svg>
    </div>
  );
};

/* ─── Wind Compass ───────────────────────────────────────────────── */
const WindCompass = ({ direction = 45, label = "NE" }) => (
  <div className="compass-wrap">
    <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
      <circle cx="55" cy="55" r="50" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"/>
      <circle cx="55" cy="55" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {[0,45,90,135,180,225,270,315].map(a=>{const r1=a%90===0?42:44,r2=50,rad=(a-90)*Math.PI/180;return <line key={a} x1={55+r1*Math.cos(rad)} y1={55+r1*Math.sin(rad)} x2={55+r2*Math.cos(rad)} y2={55+r2*Math.sin(rad)} stroke={a%90===0?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.2)"} strokeWidth="1.5"/>;}) }
      {[["N",55,14],["S",55,100],["E",100,58],["W",10,58]].map(([l,x,y])=>(<text key={l} x={x} y={y} textAnchor="middle" fill={l==="N"?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.55)"} fontSize="9" fontWeight={l==="N"?"bold":"normal"}>{l}</text>))}
      <g transform={`rotate(${direction}, 55, 55)`}><polygon points="55,22 51.5,48 55,44 58.5,48" fill="#FF6B6B"/><polygon points="55,88 51.5,62 55,66 58.5,62" fill="rgba(255,255,255,0.55)"/></g>
      <circle cx="55" cy="55" r="4" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
      <text x="55" y="59" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7.5" fontWeight="600">{label}</text>
    </svg>
  </div>
);

/* ─── Storm Notification Banner ──────────────────────────────────── */
const StormBanner = ({ city, onDismiss }) => (
  <div className="storm-banner">
    <span className="storm-banner-icon">⚠️</span>
    <div className="storm-banner-text"><strong>STORM ALERT — {city.name}</strong><span>{city.desc}</span></div>
    <button className="storm-banner-close" onClick={onDismiss} aria-label="Dismiss alert"><FaTimes /></button>
  </div>
);

/* ─── Notification Panel ─────────────────────────────────────────── */
const NotifPanel = ({ city, onClose }) => {
  const alerts = [];
  if (city.stormAlert) {
    alerts.push({ icon: "⛈️", msg: `Severe storm warning active for ${city.name}`, time: "Now", type: "danger" });
    alerts.push({ icon: "⚡", msg: `Lightning risk — stay indoors in ${city.region.split(",")[0]}`, time: "2 min ago", type: "danger" });
  }
  if (city.rainChance >= 70) alerts.push({ icon: "🌧️", msg: `Heavy rainfall expected — ${city.rainChance}% chance`, time: "5 min ago", type: "warn" });
  if (city.aqi >= 150) alerts.push({ icon: "😷", msg: `Air quality hazardous — AQI ${city.aqi}. Wear a mask outdoors`, time: "10 min ago", type: "warn" });
  if ((city.uvIndex || 0) >= 8) alerts.push({ icon: "☀️", msg: `UV index ${city.uvIndex} (${uvLabel(city.uvIndex)}) — apply SPF 50+ sunscreen`, time: "15 min ago", type: "warn" });
  alerts.push({ icon: "📍", msg: `Now viewing: ${city.name}, ${city.region}`, time: "Just now", type: "info" });
  return (
    <div className="notif-panel" role="dialog" aria-label="Notifications">
      <div className="notif-panel-header">
        <span className="notif-panel-title">🔔 Alerts &amp; Notifications</span>
        <button className="notif-panel-close" onClick={onClose} aria-label="Close"><FaTimes /></button>
      </div>
      {alerts.map((a, i) => (
        <div key={i} className={`notif-item notif-${a.type}`}>
          <span className="notif-item-icon">{a.icon}</span>
          <div><div className="notif-item-msg">{a.msg}</div><div className="notif-item-time">{a.time}</div></div>
        </div>
      ))}
    </div>
  );
};

/* ─── Hourly Forecast Strip ──────────────────────────────────────── */
const HourlyStrip = ({ city }) => {
  const hours = generateHourly(city);
  return (
    <div className="hourly-strip-wrap">
      <div className="hourly-strip-title">⏱️ 24-Hour Forecast</div>
      <div className="hourly-strip">
        {hours.map((h, i) => (
          <div className={`hourly-card${i === 0 ? " hourly-now" : ""}`} key={i}>
            <div className="hourly-label">{i === 0 ? "Now" : h.label}</div>
            <div className="hourly-icon"><WeatherIcon icon={h.icon} size={22} /></div>
            <div className="hourly-temp">{h.temp}°</div>
            <div className="hourly-rain">{h.rain > 0 ? `${h.rain}%` : "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── AI Summary Card ────────────────────────────────────────────── */
const AISummaryCard = ({ city }) => {
  const { mood, advice, outfit, activity } = getAISummary(city);
  return (
    <div className="ai-summary-card">
      <div className="ai-summary-header">
        <FaRobot className="ai-icon" />
        <span className="ai-title">AI Weather Insight</span>
        <span className="ai-badge">Smart</span>
      </div>
      <div className="ai-mood">{mood}</div>
      <div className="ai-grid">
        <div className="ai-block">
          <div className="ai-block-label"><FaTshirt size={11}/> Outfit</div>
          <div className="ai-block-val">{outfit}</div>
        </div>
        <div className="ai-block">
          <div className="ai-block-label"><FaRunning size={11}/> Activity</div>
          <div className="ai-block-val">{activity}</div>
        </div>
      </div>
      <ul className="ai-advice-list">
        {advice.map((tip, i) => <li key={i}>{tip}</li>)}
      </ul>
    </div>
  );
};

/* ─── UV Index Card ──────────────────────────────────────────────── */
const UVCard = ({ city }) => {
  const uv = city.uvIndex || 5;
  const pct = Math.min((uv / 14) * 100, 100);
  const color = uvColor(uv);
  return (
    <div className="uv-card">
      <div className="uv-title"><MdWbSunny size={20} style={{verticalAlign:"middle"}}/> UV Index</div>
      <div className="uv-number" style={{ color }}>{uv}</div>
      <div className="uv-label" style={{ color }}>{uvLabel(uv)}</div>
      <div className="uv-bar-track">
        <div className="uv-bar-fill" style={{ width: `${pct}%`, background: `linear-gradient(to right, #4CAF50, #FFC107, #FF9800, #F44336, #9C27B0)` }} />
        <div className="uv-bar-thumb" style={{ left: `calc(${pct}% - 6px)` }} />
      </div>
      <div className="uv-hint">{uv >= 8 ? "SPF 50+ required" : uv >= 6 ? "Sunscreen recommended" : uv >= 3 ? "Minimal protection" : "No protection needed"}</div>
    </div>
  );
};

/* ─── Auth Modal ─────────────────────────────────────────────────── */
const AuthModal = ({ onLogin, onClose }) => {
  const [mode, setMode] = useState("login");
  const [loginType, setLoginType] = useState("email");
  const [loginVal, setLoginVal] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regState, setRegState] = useState("West Bengal");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  const overlayRef = useRef(null);

  const initials = regName ? regName.trim().split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";

  const handleAvatarChange = e => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = ev => setAvatar(ev.target.result); reader.readAsDataURL(file); };

  const handleLogin = () => {
    if (!loginVal.trim()) { setError(`Please enter your ${loginType === "email" ? "email address" : "phone number"}`); return; }
    if (!loginPass) { setError("Please enter your password"); return; }
    const name = loginType === "email" ? loginVal.split("@")[0].replace(/\./g," ").replace(/\b\w/g,c=>c.toUpperCase()) : `User ${loginVal.slice(-4)}`;
    onLogin({ name, email: loginType==="email"?loginVal:"", phone: loginType==="phone"?loginVal:"", avatar: null, homeState: "West Bengal" });
    onClose();
  };

  const handleRegister = () => {
    if (!regName.trim()) { setError("Please enter your full name"); return; }
    if (!regEmail && !regPhone) { setError("Please enter email or phone number"); return; }
    if (!regPass || regPass.length < 6) { setError("Password must be at least 6 characters"); return; }
    onLogin({ name: regName.trim(), email: regEmail, phone: regPhone, avatar, homeState: regState });
    onClose();
  };

  return (
    <div className="auth-modal-overlay" ref={overlayRef} onClick={e => e.target === overlayRef.current && onClose()} role="dialog" aria-modal="true">
      <div className="auth-modal-card">
        <button className="auth-modal-close" onClick={onClose}><FaTimes /></button>
        <div className="auth-logo">
          <span className="auth-logo-icon">🌦️</span>
          <h2>SkyCast India</h2>
          <p>{mode === "login" ? "Sign in to your account" : "Create your account"}</p>
        </div>
        {error && <div className="auth-error"><FaExclamationTriangle /> {error}</div>}
        {mode === "login" ? (
          <>
            <div className="auth-tabs">
              <button className={`auth-tab${loginType==="email"?" active":""}`} onClick={()=>{setLoginType("email");setError("");}}><FaEnvelope /> Email</button>
              <button className={`auth-tab${loginType==="phone"?" active":""}`} onClick={()=>{setLoginType("phone");setError("");}}><FaPhone /> Phone</button>
            </div>
            <div className="auth-field">
              <label>{loginType === "email" ? "Email Address" : "Phone Number"}</label>
              <input type={loginType==="email"?"email":"tel"} placeholder={loginType==="email"?"you@example.com":"+91 98765 43210"} value={loginVal} onChange={e=>{setLoginVal(e.target.value);setError("");}}/>
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={loginPass} onChange={e=>{setLoginPass(e.target.value);setError("");}}/>
            </div>
            <button className="auth-btn" onClick={handleLogin}>Sign In →</button>
            <div className="auth-divider">or</div>
            <p className="auth-switch">New here? <span onClick={()=>{setMode("register");setError("");}}>Create account</span></p>
          </>
        ) : (
          <>
            <div className="avatar-upload-row">
              <div className="avatar-preview" onClick={()=>fileRef.current?.click()}>
                {avatar ? <img src={avatar} alt="avatar"/> : <span>{initials}</span>}
                <div className="avatar-overlay"><FaCamera /></div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleAvatarChange}/>
              <div className="avatar-hint"><strong>Profile Photo</strong><span>Click to upload · JPG or PNG</span></div>
            </div>
            <div className="auth-field"><label>Full Name</label><input type="text" placeholder="Your full name" value={regName} onChange={e=>{setRegName(e.target.value);setError("");}}/></div>
            <div className="auth-field"><label>Email Address</label><input type="email" placeholder="you@example.com" value={regEmail} onChange={e=>{setRegEmail(e.target.value);setError("");}}/></div>
            <div className="auth-field"><label>Phone Number</label><input type="tel" placeholder="+91 98765 43210" value={regPhone} onChange={e=>{setRegPhone(e.target.value);setError("");}}/></div>
            <div className="auth-field">
              <label><FaMapMarkerAlt style={{marginRight:5}}/>Home State / UT</label>
              <select value={regState} onChange={e=>setRegState(e.target.value)}>
                {INDIA_STATES.map(s=><option key={s.state} value={s.state}>{s.state} — {s.capital}</option>)}
              </select>
            </div>
            <div className="auth-field"><label>Password</label><input type="password" placeholder="Min. 6 characters" value={regPass} onChange={e=>{setRegPass(e.target.value);setError("");}}/></div>
            <button className="auth-btn" onClick={handleRegister}>Create Account →</button>
            <div className="auth-divider">or</div>
            <p className="auth-switch">Have an account? <span onClick={()=>{setMode("login");setError("");}}>Sign in</span></p>
          </>
        )}
      </div>
    </div>
  );
};

/* ─── Home ───────────────────────────────────────────────────────── */
const Home = () => {
  const [lightMode,      setLightMode]      = useState(false);
  const [search,         setSearch]         = useState("");
  const [activeCity,     setActiveCity]     = useState(CITIES[0]);
  const [localTime,      setLocalTime]      = useState({ time: "--:--:--", day: "", date: "" });
  const [user,           setUser]           = useState(null);
  const [showNotif,      setShowNotif]      = useState(false);
  const [showAuthModal,  setShowAuthModal]  = useState(false);
  const [stormDismissed, setStormDismissed] = useState(false);
  const [selectedState,  setSelectedState]  = useState("West Bengal");
  const [pinnedCities,   setPinnedCities]   = useState(() => {
    try { return JSON.parse(localStorage.getItem("skycast_pins") || "[]"); } catch { return []; }
  });
  const notifRef = useRef(null);

  /* Notification alert count */
  const alertCount = [
    activeCity.stormAlert,
    activeCity.rainChance >= 70,
    activeCity.aqi >= 150,
    (activeCity.uvIndex || 0) >= 8,
  ].filter(Boolean).length;

  useEffect(() => {
    const tick = () => setLocalTime(getCityTime(activeCity.utcOffset));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [activeCity]);

  useEffect(() => { document.body.classList.toggle("light-mode", lightMode); }, [lightMode]);

  useEffect(() => {
    const handler = e => { if (showNotif && notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false); };
    document.addEventListener("mousedown", handler); return () => document.removeEventListener("mousedown", handler);
  }, [showNotif]);

  useEffect(() => { setStormDismissed(false); }, [activeCity]);

  useEffect(() => { document.body.style.overflow = showAuthModal ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [showAuthModal]);

  /* Pin/unpin city */
  const togglePin = useCallback((city) => {
    setPinnedCities(prev => {
      const key = `${city.name}||${city.region}`;
      const next = prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key];
      try { localStorage.setItem("skycast_pins", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isPinned = city => pinnedCities.includes(`${city.name}||${city.region}`);

  const handleLogin = useCallback(userData => {
    setUser(userData); if (userData.homeState) setSelectedState(userData.homeState);
  }, []);

  const handleLogout = () => { setUser(null); setShowNotif(false); };
  const handleCityClick = city => { setActiveCity(city); setSearch(""); };

  const handleStateChange = e => {
    setSelectedState(e.target.value);
    const match = CITIES.find(c => c.region.includes(e.target.value));
    if (match) { setActiveCity(match); setSearch(""); }
  };

  const stateInfo = INDIA_STATES.find(s => s.state === selectedState) || INDIA_STATES[27];

  const pinnedList = CITIES.filter(c => isPinned(c));
  const filteredCities = CITIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.region.toLowerCase().includes(search.toLowerCase())
  );

  const noonM       = Math.round((activeCity.sunriseM + activeCity.sunsetM) / 2);
  const daylightH   = Math.floor((activeCity.sunsetM - activeCity.sunriseM) / 60);
  const daylightMin = (activeCity.sunsetM - activeCity.sunriseM) % 60;
  const snowPct     = calcSnowChance(activeCity);

  const temps = [activeCity.l+5, activeCity.l+3, activeCity.l+4, activeCity.l+6, activeCity.l+2, activeCity.l+5, activeCity.l+7];
  const minT  = Math.min(...temps), maxT = Math.max(...temps);
  const CHART_H = 70, CHART_W = 100;
  const tempToY   = t => CHART_H - Math.round(((t - minT) / (maxT - minT)) * (CHART_H - 10)) - 5;
  const points    = temps.map((t, i) => ({ x: i * CHART_W + CHART_W / 2, y: tempToY(t) }));
  const curvePath = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1], cpx = (prev.x + p.x) / 2;
    return `${acc} C ${cpx} ${prev.y}, ${cpx} ${p.y}, ${p.x} ${p.y}`;
  }, "");
  const totalW = temps.length * CHART_W;

  const userInitials = user ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "U";

  /* City list to show: pinned at top when not searching */
  const displayCities = search
    ? filteredCities
    : [...pinnedList, ...CITIES.filter(c => !isPinned(c))];

  return (
    <div className="main">
      {showAuthModal && <AuthModal onLogin={handleLogin} onClose={() => setShowAuthModal(false)} />}

      {activeCity.stormAlert && !stormDismissed && (
        <StormBanner city={activeCity} onDismiss={() => setStormDismissed(true)} />
      )}

      <DynamicWeatherBg icon={activeCity.icon} />

      <div className="bg-image">
        <div className="glass">

          <button className="theme-toggle" onClick={() => setLightMode(!lightMode)} aria-label="Toggle theme">
            {lightMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* TOP BAR */}
          <div className="top-bar">
            <div className="top-bar-left">
              <span className="app-brand">🌦️ SkyCast India</span>
            </div>
            <div className="top-bar-right">
              {/* Notification Bell */}
              <div className="notif-bell-wrap" ref={notifRef}>
                <button
                  className={`notif-bell-btn${alertCount > 0 ? " has-alerts" : ""}`}
                  onClick={() => setShowNotif(v => !v)}
                  aria-label="Toggle notifications"
                >
                  <FaBell />
                  {alertCount > 0 && <span className="notif-dot" />}
                  {alertCount > 0 && <span className="notif-count">{alertCount}</span>}
                </button>
                {showNotif && <NotifPanel city={activeCity} onClose={() => setShowNotif(false)} />}
              </div>

              {user ? (
                <>
                  <div className="user-chip">
                    <div className="user-chip-avatar">
                      {user.avatar ? <img src={user.avatar} alt="avatar"/> : <span>{userInitials}</span>}
                    </div>
                    <div className="user-chip-info">
                      <span className="user-chip-name">{user.name}</span>
                      <span className="user-chip-sub">{user.email || user.phone}</span>
                    </div>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Sign out</button>
                </>
              ) : (
                <button className="signin-btn" onClick={() => setShowAuthModal(true)}><FaUser /> Sign In</button>
              )}
            </div>
          </div>

          {/* STATE SELECTOR BAR */}
          <div className="state-selector-bar">
            <FaMapMarkerAlt className="state-selector-icon" />
            <span className="state-selector-label">State / UT</span>
            <select className="state-select" value={selectedState} onChange={handleStateChange}>
              {INDIA_STATES.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
            </select>
            <div className="capital-badge">
              <FaShieldAlt style={{fontSize:"0.7rem"}}/>
              Capital: <strong>{stateInfo.capital}</strong>
            </div>
          </div>

          {/* SEARCH BOX */}
          <div className="search-location-box">
            <div className="search-title"><FaSearch style={{marginRight:6}}/> Search Location</div>
            <div className="search-bar">
              <FaSearch />
              <input type="text" placeholder="Search city or region..." value={search} onChange={e => setSearch(e.target.value)} aria-label="Search city"/>
              {search && <button className="search-clear" onClick={() => setSearch("")}><FaTimes /></button>}
            </div>

            {/* Pinned Cities section */}
            {!search && pinnedList.length > 0 && (
              <div className="pinned-section">
                <p className="pinned-label">⭐ Pinned Cities</p>
                {pinnedList.map((city, i) => (
                  <div
                    className={`city${activeCity.name === city.name && activeCity.region === city.region ? " city-active" : ""}${city.stormAlert ? " city-storm" : ""}`}
                    key={`pinned-${i}`}
                    onClick={() => handleCityClick(city)}
                    role="button" tabIndex={0}
                  >
                    <span className="city-flag">{city.flag}</span>
                    <div className="city-text">
                      <span className="city-name-label">{city.name} {city.stormAlert && <span className="city-storm-tag">⚠️ Alert</span>}</span>
                      <span className="city-region-label">{city.region}</span>
                    </div>
                    <button className="pin-btn pinned" onClick={e => { e.stopPropagation(); togglePin(city); }} title="Unpin"><FaStar size={12}/></button>
                  </div>
                ))}
              </div>
            )}

            <div className="popular">
              <p>{search ? `${filteredCities.length} result${filteredCities.length !== 1 ? "s" : ""}` : "All Cities"}</p>
              {displayCities.length === 0 ? (
                <div className="no-results">No cities found for "{search}"</div>
              ) : (
                displayCities.filter(c => !isPinned(c) || search).map((city, i) => (
                  <div
                    className={`city${activeCity.name === city.name && activeCity.region === city.region ? " city-active" : ""}${city.stormAlert ? " city-storm" : ""}`}
                    key={`${city.name}-${city.region}-${i}`}
                    onClick={() => handleCityClick(city)}
                    role="button" tabIndex={0}
                    onKeyDown={e => e.key === "Enter" && handleCityClick(city)}
                  >
                    <span className="city-flag">{city.flag}</span>
                    <div className="city-text">
                      <span className="city-name-label">
                        {city.name}
                        {city.stormAlert && <span className="city-storm-tag">⚠️ Alert</span>}
                      </span>
                      <span className="city-region-label">{city.region}</span>
                    </div>
                    <button
                      className={`pin-btn${isPinned(city) ? " pinned" : ""}`}
                      onClick={e => { e.stopPropagation(); togglePin(city); }}
                      title={isPinned(city) ? "Unpin" : "Pin city"}
                    >
                      {isPinned(city) ? <FaStar size={12}/> : <FaRegStar size={12}/>}
                    </button>
                    {activeCity.name === city.name && activeCity.region === city.region && (
                      <span className="city-check">✓</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* INFO BOX */}
          <div className={`Info-box${activeCity.stormAlert ? " storm-active" : ""}`}>
            <div className="temp-and-place">
              <div className="temp"><span className="temp-value">{activeCity.temp}</span></div>
              <div className="local-time-display">
                <span className="local-time-clock">{localTime.time}</span>
                <span className="local-time-meta">{localTime.day}, {localTime.date} &nbsp;·&nbsp; {utcLabel(activeCity.utcOffset)}</span>
              </div>
              <div className="place">
                <span className="westbengal">
                  <FaLocationDot className="location-icon" /> {activeCity.name}
                  {activeCity.stormAlert && <span className="storm-alert-badge">⚠️ Storm Alert</span>}
                </span>
                <br/><hr/>
                <span className="city-region-display">{activeCity.region}</span>
                <br/>
                <span className="write">{activeCity.desc}</span>
              </div>
            </div>
            <div className="partially-cloud-and-other">
              <div className="partially-cloud">
                <WeatherIcon icon={activeCity.icon} size={36}/>
                {weatherCondition(activeCity.icon)}
              </div>
              <div className="other">
                <span className="high-temp"><FaTemperatureHigh style={{color:"#ff6b6b",marginRight:4}}/> H: {activeCity.h}°C &nbsp; <FaTemperatureLow style={{color:"#74c0fc",marginRight:4}}/> L: {activeCity.l}°C</span>
                <span className="feels-like"><FaThermometerHalf style={{color:"#ffa94d",marginRight:4}}/> Feels like: {activeCity.h - 2}°C</span>
                <span className="wind"><FaWind style={{marginRight:4}}/> Wind: {activeCity.wind}</span>
                <span className="humidity"><MdOutlineWaterDrop style={{marginRight:4}}/> Humidity: {activeCity.humidity}</span>
                <span className="aqi"><MdAir style={{marginRight:4}}/> AQI: {activeCity.aqi} ({aqiLabel(activeCity.aqi)}){activeCity.aqi >= 120 && <FaMask className="aqi-warning" style={{marginLeft:4}}/>}</span>
              </div>
            </div>
          </div>

          {/* AI SUMMARY + UV ROW */}
          <div className="ai-uv-row">
            <AISummaryCard city={activeCity} />
            <UVCard city={activeCity} />
          </div>

          {/* HOURLY STRIP */}
          <HourlyStrip city={activeCity} />

          {/* MIDDLE ROW */}
          <div className="middle-row">
            <div className="rain-posibility">
              <RainCanvas active={activeCity.rainChance >= 60} />
              <div className="rain-title"><WiRain size={22} style={{verticalAlign:"middle"}}/> Rain Possibility</div>
              <h1>{activeCity.rainChance}%</h1>
              <p>{activeCity.rainDesc}</p>
              <div className="rain-progress"><div className="rain-progress-bar" style={{width:`${activeCity.rainChance}%`}}/></div>
            </div>

            <div className="sunrise-sunset-box">
              <div className="sun-title"><WiSolarEclipse size={22} style={{verticalAlign:"middle"}}/> Sunrise &amp; Sunset</div>
              <SunArc utcOffset={activeCity.utcOffset} sunriseM={activeCity.sunriseM} sunsetM={activeCity.sunsetM}/>
              <div className="sun-times">
                <div className="sun-time-item"><div className="sun-time-label"><WiSunrise size={18} style={{verticalAlign:"middle"}}/> Sunrise</div><div className="sun-time-val">{fmtTime(activeCity.sunriseM)}</div></div>
                <div className="sun-time-item"><div className="sun-time-label"><WiDaySunny size={18} style={{verticalAlign:"middle"}}/> Noon</div><div className="sun-time-val">{fmtTime(noonM)}</div></div>
                <div className="sun-time-item"><div className="sun-time-label"><WiSunset size={18} style={{verticalAlign:"middle"}}/> Sunset</div><div className="sun-time-val">{fmtTime(activeCity.sunsetM)}</div></div>
              </div>
              <div className="sun-duration">Daylight: {daylightH}h {daylightMin}m</div>
            </div>

            <div className="wind-direction-box">
              <div className="wind-dir-title"><FaCompass className="compass-icon"/> Wind Direction</div>
              <WindCompass direction={activeCity.windDir} label={activeCity.windLabel}/>
              <div className="wind-stats">
                <div className="wind-stat"><div className="wind-stat-label">Direction</div><div className="wind-stat-val">{activeCity.windLabel}</div></div>
                <div className="wind-stat"><div className="wind-stat-label">Speed</div><div className="wind-stat-val">{activeCity.windSpeed}</div></div>
                <div className="wind-stat"><div className="wind-stat-label">Gust</div><div className="wind-stat-val">{activeCity.windGust}</div></div>
              </div>
            </div>

            <div className="snow-possibility-box">
              <SnowCanvas active={snowPct >= 40}/>
              <div className="snow-title"><WiSnowflakeCold size={22} style={{verticalAlign:"middle"}}/> Snow Possibility</div>
              <h1>{snowPct}%</h1>
              <p>{snowDesc(snowPct, activeCity.l)}</p>
              <div className="rain-progress"><div className="snow-progress-bar" style={{width:`${snowPct}%`}}/></div>
            </div>
          </div>

          {/* FORECAST */}
          <div className="forcast">
            <div className="forecast-title">7 Day Forecast — {activeCity.name}</div>
            <div className="forecast-wave-wrap">
              <svg className="forecast-wave-svg" viewBox={`0 0 ${totalW} ${CHART_H + 10}`} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#9ddcff"/><stop offset="50%" stopColor="#bfefff"/><stop offset="100%" stopColor="#70c7ff"/></linearGradient>
                  <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="rgba(120,210,255,0.25)"/><stop offset="100%" stopColor="rgba(120,210,255,0)"/></linearGradient>
                </defs>
                <path d={`${curvePath} L ${points[points.length-1].x} ${CHART_H+10} L ${points[0].x} ${CHART_H+10} Z`} fill="url(#areaGrad)"/>
                <path d={curvePath} fill="none" stroke="url(#waveGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="wave-line-path"/>
                {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={i===0?7:5} fill={i===0?"#fff5b8":"#c8f1ff"} className={`forecast-dot${i===0?" active-dot":""}`}/>)}
              </svg>
            </div>
            <div className="timeline">
              {Array.from({ length: 7 }, (_, i) => {
                const d = new Date(); d.setDate(d.getDate() + i);
                const dateStr = `${d.getDate()}/${d.getMonth()+1}/${String(d.getFullYear()).slice(2)}`;
                return (
                  <div className={`time-card${i === 0 ? " active" : ""}`} key={i}>
                    <div className="icon"><WeatherIcon icon={FORECAST_ICONS[i]} size={28}/></div>
                    <div className="card-temp">{temps[i]}°</div>
                    <div className="Date">{dateStr}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;