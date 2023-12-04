import { useState, useEffect } from 'react'
import './App.css'

import { Dia } from './Dia.jsx'

function App() {

  const [city, setCity] = useState("");
  const [fondo, setFondo] = useState("");
  const [weather, setWeather] = useState("")
  const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`
  const API_WALLPAPER = `https://api.unsplash.com/search/photos?query=+${city}&client_id=${import.meta.env.VITE_API_KEY_BG}`
  const dia = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [openW, setOpenW] = useState("")


  const w1 = "&w=1080"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
      error: false,
      message: ""
    })
    const response = await fetch(`${API_WEATHER}${city}`)
    const response2 = await fetch(`${API_WALLPAPER}`)
    const data = await response.json()
    const data2 = await response2.json()
    const API_OpenWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${data.location.name}&appid=${import.meta.env.VITE_API_KEY_OW}`
    const response3 = await fetch(`${API_OpenWeather}`)
    const data3 = await response3.json()

    try {

      if (!city.trim()) throw { message: "No existe esta ciudad" }

      if (data.error || data2.error) throw { message: "No se encontró ninguna ubicación coincidente." };

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp_c: data.current.temp_c,

        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
        localTime: new Date(data.location.localtime),

      })
      if (data3.list) {

        setOpenW({
          fecha1: new Date(data3.list[5].dt_txt),
          fecha2: new Date(data3.list[13].dt_txt),
          fecha3: new Date(data3.list[21].dt_txt),
          fecha4: new Date(data3.list[29].dt_txt),
          tempC1: data3.list[5].main.temp - 273.15,
          tempC2: data3.list[13].main.temp - 273.15,
          tempC3: data3.list[21].main.temp - 273.15,
          tempC4: data3.list[29].main.temp - 273.15,
          humedad1: data3.list[5].main.humidity,
          humedad2: data3.list[13].main.humidity,
          humedad3: data3.list[21].main.humidity,
          humedad4: data3.list[29].main.humidity,
          vientos1: data3.list[5].wind.speed,
          vientos2: data3.list[13].wind.speed,
          vientos3: data3.list[21].wind.speed,
          vientos4: data3.list[29].wind.speed,

        })
      }
      else {
        setOpenW("")
      }

      console.log(data.location.localtime)



    } catch (error) {
      alert(error.message)
      setError({
        error: true,
        message: error.message
      })



    }
    finally {

      if (data2.results[0]) {

        setFondo({
          background: data2.results[0].urls.raw
        })
      }
      else {
        setFondo({
          background: "https://images.unsplash.com/photo-1560977501-7cb367eccebe?ixid=M3w1MjUxMDd8MHwxfHNlYXJjaHwxfHx0ZXJtb21ldHJvJTNGfGVufDB8fHx8MTcwMTYyMzAxNnww\u0026ixlib=rb-4.0.3"
        })
      }
      console.log(data2.results[0].urls.raw)
    }

  }
  return (
    <>
      <form onSubmit={handleSubmit} className={`grid grid-cols-4 grid-rows-4 gap-y-4 w-[800px] h-[600px] rounded-2xl border border-white bg-slate-100/10 shadow-2xl `}
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), transparent, rgba(0, 0, 0, 0.6)), url(${fondo.background + w1})`, backgroundSize: 'cover', height: '600px', width: '800px' }}
      >
        {weather.city && (
          <div className=' inline-block mb-auto px-3 py-2  rounded-ee-2xl rounded-ss-2xl font-bold text-white text-3xl text-shadow shadow-xl bg-slate-100/60' > <p className="">{weather.city}</p><p className='text-sm'> {weather.country}</p>
          </div>

        )}
        <div className='flex justify-between col-start-4 '>
          <div className={'px-2 ms-auto pt-1 rounded-se-2xl rounded-es-xl h-20 border-t-0 border-e-0 border border-white  bg-slate-100/60' + `${weather.city ? " shadow-xl" : " ml-auto"}`}>
            <p className='text-2xl font-bold'>Clima App</p>
            <input type="text" placeholder='Ciudad' value={city} onChange={(e) => setCity(e.target.value)} className='  w-20 h-7 text-xs p-1 rounded-xl hover:shadow-lg outline-2 outline-gray-200 ' required autoFocus />

            <button className=' mx-2 h-6 px-1 text-white text-xs bg-green-500/90 hover:bg-green-600 shadow-xl '>
              Buscar
            </button>

          </div>
        </div>

        {weather.city && (
          <div className='row-start-2 row-end-4 flex flex-col gap-4'>
            <div className='flex text-2xl text-white text-shadow  font-bold'>
              <p className='text-gray-200 text-shadow text-start ms-2 text-8xl font-bold '>{weather.temp_c}</p>
              <p className='mt-2'>°C</p>
            </div>
            <div className='text-start ms-4 text-white text-lg text-shadow flex flex-col gap-2'>
              <p className='font-bold'>{weather.localTime.getHours()}:{weather.localTime.getMinutes()} H</p>
              <p className="text-lg text-white text-shadow " >{dia[weather.localTime.getDay()]} {weather.localTime.getDate()}-{weather.localTime.getMonth() + 1}-{weather.localTime.getFullYear()}</p>
              <div className='flex items-center bg-slate-100/60 rounded-2xl me-auto'>
                <p className='ms-2'> {weather.conditionText} </p>
                <img src={weather.icon} alt="weather-icon" />
              </div>

            </div>
          </div>
        )}
        {openW.fecha1 && (
          <div className='row-start-4 col-span-4 justify-between border flex rounded-es-2xl rounded-ee-2xl bg-slate-100/70'>
            <div className=' w-[200px] flex flex-col gap-1   text-white text-shadow  font-bold border-e-2'>
              <p className='border border-x-0 border-b-2  text-lg'>{dia[openW.fecha1.getDay()]}  {openW.fecha1.getDate()}</p>
              <div className='flex justify-between px-2 '><p className=''><svg height="32px" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Thermometer-Hot" stroke="none" strokeWidth="1"><g id="Group" stroke="black" strokeWidth="2" transform="translate(7.000000, 2.000000)"><path d="M3,16.8026932 L3,3 C3,1.34314575 4.34314575,3.04359188e-16 6,0 C7.65685425,-3.04359188e-16 9,1.34314575 9,3 L9,16.8026932 C10.7934041,17.8401214 12,19.7791529 12,22 C12,25.3137085 9.3137085,28 6,28 C2.6862915,28 0,25.3137085 0,22 C0,19.7791529 1.20659589,17.8401214 3,16.8026932 Z" id="Combined-Shape" /><path d="M13,5 L18,5" id="Path-19" strokeLinecap="round" /><path d="M13,9 L18,9" id="Path-20" strokeLinecap="round" /><path d="M13,13 L18,13" id="Path-21" strokeLinecap="round" /></g><g fill="black" id="Group-2" transform="translate(10.000000, 12.000000)"><circle cx="3" cy="12" id="Oval" r="3" /><rect height="11" id="Rectangle-2" rx="1" width="2" x="2" y="0" /></g></g></svg></p> <p className='text-xs font-semibold mt-1 me-auto ps-7'>temp</p>
                <div className='flex'>
                  <p>{openW.tempC1.toFixed(1)}</p>
                  <p className='text-xs font-normal'>°C</p>
                </div>
              </div>
              <div className='flex justify-between px-2 '><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.6577283,1.24674475 C18.1886921,6.07627821 21,10.29324 21,14 C21,19.2493364 16.9029475,23 12,23 C7.09705254,23 3,19.2493364 3,14 C3,10.29324 5.81130786,6.07627821 11.3422717,1.24674475 L12,0.672428777 L12.6577283,1.24674475 Z M5,14 C5,18.1033978 8.16411512,21 12,21 C15.8358849,21 19,18.1033978 19,14 C19,11.1507676 16.693388,7.56645344 12,3.33659609 C7.30661202,7.56645344 5,11.1507676 5,14 Z M12,20 L12,18 C14.209139,18 16,16.209139 16,14 L18,14 C18,17.3137085 15.3137085,20 12,20 Z" fillRule="evenodd" /></svg>
                <p className='text-xs font-semibold mt-1 me-auto ps-7'>humedad</p>
                <div className='flex'>

                  <p>{openW.humedad1}</p>
                  <p className='text-xs font-normal'>%</p>
                </div>
              </div>
              <div className='flex justify-between px-2'><svg height="32px" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Windy" stroke="none" strokeLinecap="round" strokeWidth="1"><g stroke="black" strokeWidth="2" transform="translate(3.000000, 3.000000)"><g id="Group-2" transform="translate(2.000000, 0.000000)"><g id="Group" transform="translate(5.000000, 0.000000)"><path d="M5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,0 5,0 C2.23857625,0 0,2.23857625 0,5" id="Oval-6" /></g><path d="M0,10 L10,10" id="Path-9" /></g><g id="Group-3" transform="translate(3.000000, 17.000000)"><path d="M0,1 L14,1" id="Path-10" /><path d="M11,4 C11,5.65685425 12.3431458,7 14,7 C15.6568542,7 17,5.65685425 17,4 C17,2.34314575 15.6568542,1 14,1" id="Oval-7" /></g><g id="Group-4" transform="translate(0.000000, 4.000000)"><path d="M21,10 C23.7614237,10 26,7.76142375 26,5 C26,2.23857625 23.7614237,0 21,0 C20.7036941,0 20.4134082,0.0257742635 20.1312618,0.075203111" id="Oval-8" /><path d="M0,10 L21,10" id="Path-11" /></g></g></g></svg>
                <p className='text-xs font-semibold mt-1 me-auto ps-7'> vientos </p>
                <div className='flex'>

                  <p className=''>{openW.vientos1.toFixed(1)}</p>
                  <p className='text-xs font-normal'>km/h</p>
                </div>

              </div>

            </div>
            <div className=' w-[200px] flex flex-col gap-1   text-white text-shadow  font-bold border-e-2'>
              <p className='border border-x-0 border-b-2 text-lg'>{dia[openW.fecha2.getDay()]}  {openW.fecha2.getDate()}</p>
              <div className='flex justify-between px-2 '><p className=''><svg height="32px" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Thermometer-Hot" stroke="none" strokeWidth="1"><g id="Group" stroke="black" strokeWidth="2" transform="translate(7.000000, 2.000000)"><path d="M3,16.8026932 L3,3 C3,1.34314575 4.34314575,3.04359188e-16 6,0 C7.65685425,-3.04359188e-16 9,1.34314575 9,3 L9,16.8026932 C10.7934041,17.8401214 12,19.7791529 12,22 C12,25.3137085 9.3137085,28 6,28 C2.6862915,28 0,25.3137085 0,22 C0,19.7791529 1.20659589,17.8401214 3,16.8026932 Z" id="Combined-Shape" /><path d="M13,5 L18,5" id="Path-19" strokeLinecap="round" /><path d="M13,9 L18,9" id="Path-20" strokeLinecap="round" /><path d="M13,13 L18,13" id="Path-21" strokeLinecap="round" /></g><g fill="black" id="Group-2" transform="translate(10.000000, 12.000000)"><circle cx="3" cy="12" id="Oval" r="3" /><rect height="11" id="Rectangle-2" rx="1" width="2" x="2" y="0" /></g></g></svg></p> <p className='text-xs font-semibold mt-1 me-auto ps-7'>temp</p>
                <div className='flex'>
                  <p>{openW.tempC2.toFixed(1)}</p>
                  <p className='text-xs font-normal'>°C</p>
                </div>
              </div>
              <div className='flex justify-between px-2 '><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.6577283,1.24674475 C18.1886921,6.07627821 21,10.29324 21,14 C21,19.2493364 16.9029475,23 12,23 C7.09705254,23 3,19.2493364 3,14 C3,10.29324 5.81130786,6.07627821 11.3422717,1.24674475 L12,0.672428777 L12.6577283,1.24674475 Z M5,14 C5,18.1033978 8.16411512,21 12,21 C15.8358849,21 19,18.1033978 19,14 C19,11.1507676 16.693388,7.56645344 12,3.33659609 C7.30661202,7.56645344 5,11.1507676 5,14 Z M12,20 L12,18 C14.209139,18 16,16.209139 16,14 L18,14 C18,17.3137085 15.3137085,20 12,20 Z" fillRule="evenodd" /></svg>
                <p className='text-xs font-semibold mt-1 me-auto ps-7'>humedad</p>
                <div className='flex'>

                  <p>{openW.humedad2}</p>
                  <p className='text-xs font-normal'>%</p>
                </div>
              </div>
              <div className='flex justify-between px-2'><svg height="32px" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Windy" stroke="none" strokeLinecap="round" strokeWidth="1"><g stroke="black" strokeWidth="2" transform="translate(3.000000, 3.000000)"><g id="Group-2" transform="translate(2.000000, 0.000000)"><g id="Group" transform="translate(5.000000, 0.000000)"><path d="M5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,0 5,0 C2.23857625,0 0,2.23857625 0,5" id="Oval-6" /></g><path d="M0,10 L10,10" id="Path-9" /></g><g id="Group-3" transform="translate(3.000000, 17.000000)"><path d="M0,1 L14,1" id="Path-10" /><path d="M11,4 C11,5.65685425 12.3431458,7 14,7 C15.6568542,7 17,5.65685425 17,4 C17,2.34314575 15.6568542,1 14,1" id="Oval-7" /></g><g id="Group-4" transform="translate(0.000000, 4.000000)"><path d="M21,10 C23.7614237,10 26,7.76142375 26,5 C26,2.23857625 23.7614237,0 21,0 C20.7036941,0 20.4134082,0.0257742635 20.1312618,0.075203111" id="Oval-8" /><path d="M0,10 L21,10" id="Path-11" /></g></g></g></svg>
                <p className='text-xs font-semibold mt-1 me-auto ps-7'> vientos </p>
                <div className='flex'>

                  <p className=''>{openW.vientos2.toFixed(1)}</p>
                  <p className='text-xs font-normal'>km/h</p>
                </div>

              </div>

            </div>
            <div className=' w-[200px] flex flex-col gap-1   text-white text-shadow  font-bold border-e-2'>
              <p className='border border-x-0 border-b-2 text-lg'>{dia[openW.fecha3.getDay()]}  {openW.fecha3.getDate()}</p>
              <div className='flex justify-between px-2 '><p className=''><svg height="32px" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Thermometer-Hot" stroke="none" strokeWidth="1"><g id="Group" stroke="black" strokeWidth="2" transform="translate(7.000000, 2.000000)"><path d="M3,16.8026932 L3,3 C3,1.34314575 4.34314575,3.04359188e-16 6,0 C7.65685425,-3.04359188e-16 9,1.34314575 9,3 L9,16.8026932 C10.7934041,17.8401214 12,19.7791529 12,22 C12,25.3137085 9.3137085,28 6,28 C2.6862915,28 0,25.3137085 0,22 C0,19.7791529 1.20659589,17.8401214 3,16.8026932 Z" id="Combined-Shape" /><path d="M13,5 L18,5" id="Path-19" strokeLinecap="round" /><path d="M13,9 L18,9" id="Path-20" strokeLinecap="round" /><path d="M13,13 L18,13" id="Path-21" strokeLinecap="round" /></g><g fill="black" id="Group-2" transform="translate(10.000000, 12.000000)"><circle cx="3" cy="12" id="Oval" r="3" /><rect height="11" id="Rectangle-2" rx="1" width="2" x="2" y="0" /></g></g></svg></p> <p className='text-xs font-semibold mt-1 me-auto ps-7'>temp</p>
                <div className='flex'>
                  <p>{openW.tempC3.toFixed(1)}</p>
                  <p className='text-xs font-normal'>°C</p>
                </div>
              </div>
              <div className='flex justify-between px-2 '><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.6577283,1.24674475 C18.1886921,6.07627821 21,10.29324 21,14 C21,19.2493364 16.9029475,23 12,23 C7.09705254,23 3,19.2493364 3,14 C3,10.29324 5.81130786,6.07627821 11.3422717,1.24674475 L12,0.672428777 L12.6577283,1.24674475 Z M5,14 C5,18.1033978 8.16411512,21 12,21 C15.8358849,21 19,18.1033978 19,14 C19,11.1507676 16.693388,7.56645344 12,3.33659609 C7.30661202,7.56645344 5,11.1507676 5,14 Z M12,20 L12,18 C14.209139,18 16,16.209139 16,14 L18,14 C18,17.3137085 15.3137085,20 12,20 Z" fillRule="evenodd" /></svg>
                <p className='text-xs font-semibold mt-1 me-auto ps-7'>humedad</p>
                <div className='flex'>

                  <p>{openW.humedad3}</p>
                  <p className='text-xs font-normal'>%</p>
                </div>
              </div>
              <div className='flex justify-between px-2'><svg height="32px" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Windy" stroke="none" strokeLinecap="round" strokeWidth="1"><g stroke="black" strokeWidth="2" transform="translate(3.000000, 3.000000)"><g id="Group-2" transform="translate(2.000000, 0.000000)"><g id="Group" transform="translate(5.000000, 0.000000)"><path d="M5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,0 5,0 C2.23857625,0 0,2.23857625 0,5" id="Oval-6" /></g><path d="M0,10 L10,10" id="Path-9" /></g><g id="Group-3" transform="translate(3.000000, 17.000000)"><path d="M0,1 L14,1" id="Path-10" /><path d="M11,4 C11,5.65685425 12.3431458,7 14,7 C15.6568542,7 17,5.65685425 17,4 C17,2.34314575 15.6568542,1 14,1" id="Oval-7" /></g><g id="Group-4" transform="translate(0.000000, 4.000000)"><path d="M21,10 C23.7614237,10 26,7.76142375 26,5 C26,2.23857625 23.7614237,0 21,0 C20.7036941,0 20.4134082,0.0257742635 20.1312618,0.075203111" id="Oval-8" /><path d="M0,10 L21,10" id="Path-11" /></g></g></g></svg>
                <p className='text-xs font-semibold mt-1 me-auto ps-7'> vientos </p>
                <div className='flex'>

                  <p className=''>{openW.vientos3.toFixed(1)}</p>
                  <p className='text-xs font-normal'>km/h</p>
                </div>

              </div>

            </div>
            <div className=' w-[200px] flex flex-col gap-1   text-white text-shadow  font-bold '>
              <p className='border-x-0 border border-b-2 text-lg'>{dia[openW.fecha4.getDay()]}  {openW.fecha4.getDate()}</p>
              <div className='flex justify-between px-2 '><p className=''><svg height="32px" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Thermometer-Hot" stroke="none" strokeWidth="1"><g id="Group" stroke="black" strokeWidth="2" transform="translate(7.000000, 2.000000)"><path d="M3,16.8026932 L3,3 C3,1.34314575 4.34314575,3.04359188e-16 6,0 C7.65685425,-3.04359188e-16 9,1.34314575 9,3 L9,16.8026932 C10.7934041,17.8401214 12,19.7791529 12,22 C12,25.3137085 9.3137085,28 6,28 C2.6862915,28 0,25.3137085 0,22 C0,19.7791529 1.20659589,17.8401214 3,16.8026932 Z" id="Combined-Shape" /><path d="M13,5 L18,5" id="Path-19" strokeLinecap="round" /><path d="M13,9 L18,9" id="Path-20" strokeLinecap="round" /><path d="M13,13 L18,13" id="Path-21" strokeLinecap="round" /></g><g fill="black" id="Group-2" transform="translate(10.000000, 12.000000)"><circle cx="3" cy="12" id="Oval" r="3" /><rect height="11" id="Rectangle-2" rx="1" width="2" x="2" y="0" /></g></g></svg></p> <p className='text-xs font-semibold mt-1 me-auto ps-7'>temp</p>
                <div className='flex'>
                  <p>{openW.tempC4.toFixed(1)}</p>
                  <p className='text-xs font-normal'>°C</p>
                </div>
              </div>
              <div className='flex justify-between px-2 '><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.6577283,1.24674475 C18.1886921,6.07627821 21,10.29324 21,14 C21,19.2493364 16.9029475,23 12,23 C7.09705254,23 3,19.2493364 3,14 C3,10.29324 5.81130786,6.07627821 11.3422717,1.24674475 L12,0.672428777 L12.6577283,1.24674475 Z M5,14 C5,18.1033978 8.16411512,21 12,21 C15.8358849,21 19,18.1033978 19,14 C19,11.1507676 16.693388,7.56645344 12,3.33659609 C7.30661202,7.56645344 5,11.1507676 5,14 Z M12,20 L12,18 C14.209139,18 16,16.209139 16,14 L18,14 C18,17.3137085 15.3137085,20 12,20 Z" fillRule="evenodd" /></svg>
                <p className='text-xs font-semibold mt-1 me-auto ps-7'>humedad</p>
                <div className='flex'>

                  <p>{openW.humedad4}</p>
                  <p className='text-xs font-normal'>%</p>
                </div>
              </div>
              <div className='flex justify-between px-2'>
                <svg height="32px" version="1.1" viewBox="0 0 32 32" width="25px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Windy" stroke="none" strokeLinecap="round" strokeWidth="1"><g stroke="black" strokeWidth="2" transform="translate(3.000000, 3.000000)"><g id="Group-2" transform="translate(2.000000, 0.000000)"><g id="Group" transform="translate(5.000000, 0.000000)"><path d="M5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,0 5,0 C2.23857625,0 0,2.23857625 0,5" id="Oval-6" /></g><path d="M0,10 L10,10" id="Path-9" /></g><g id="Group-3" transform="translate(3.000000, 17.000000)"><path d="M0,1 L14,1" id="Path-10" /><path d="M11,4 C11,5.65685425 12.3431458,7 14,7 C15.6568542,7 17,5.65685425 17,4 C17,2.34314575 15.6568542,1 14,1" id="Oval-7" /></g><g id="Group-4" transform="translate(0.000000, 4.000000)"><path d="M21,10 C23.7614237,10 26,7.76142375 26,5 C26,2.23857625 23.7614237,0 21,0 C20.7036941,0 20.4134082,0.0257742635 20.1312618,0.075203111" id="Oval-8" /><path d="M0,10 L21,10" id="Path-11" /></g></g></g></svg>
                <p className='text-xs font-semibold mt-1 me-auto ps-7'> vientos </p>
                <div className='flex'>

                  <p className=''>{openW.vientos4.toFixed(1)}</p>
                  <p className='text-xs font-normal'>km/h</p>
                </div>

              </div>

            </div>

          </div>
        )

        }
        {/* <div className='relative flex gap-2'>
          <p className=' text-xs'> Powered by:  </p>
          <a href="https://www.weatherapi.com" className='text-blue-600 text-xs' title=' Weather API'> WeatherAPI.com</a>
        </div> */}
      </form >

    </>
  )
}

export default App
