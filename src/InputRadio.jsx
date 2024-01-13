import React from 'react';
import './App.css'
export default function App({ cls, weather, openW, hora, setHora }) {

  const asd = (e) => {



    e.preventDefault()

  }

  return (

    <div className='relative flex justify-between ' onSubmit={asd}  >

      {hora.checked === openW.fecha11 && (
        <div className='animate-jump-in duration-75 grid absolute -mt-36 bg-gray-400/95 
            w-28 h-32 rounded-xl  shadow-2xl border border-gray-300 '>
          <div className='flex justify-center mt-1'>
            <p className=' text-2xl font-bold text-white text-shadow'>{openW.tempC11.toFixed(1)}</p>
            <p className='  text-xs text-white text-shadow font-bold'>°C</p>
          </div>
          <div className='flex justify-center mt-1'>

            <p className=' text-xs font-bold text-white text-shadow me-1'>Humedad</p>
            <p className='  text-sm mt-[-2px] text-white text-shadow font-bold'>{openW.humedad11}</p>
            <p className='  text-xs text-white text-shadow font-bold'>%</p>
          </div>
          <div className='flex justify-center mt-1'>
            <p className=' text-[10px] font-bold text-white text-shadow me-2'>Vientos</p>
            <p className='  text-[10px] font-bold text-white text-shadow'>{openW.vientos11}</p>
            <p className='   text-[8px] text-white text-shadow '>km/h</p>
          </div>
          <div className='flex justify-center mt-1'>
            <p className=' text-xs font-bold text-white text-shadow'>{openW.fecha11.getDate()} - {openW.fecha11.getMonth() + 1} - {openW.fecha11.getFullYear()}</p>

          </div>
        </div>
      )}
      <label className={cls}>
        <input type='radio' className='me-2' value={openW.fecha11} checked={hora.checked === openW.fecha11}
          onChange={() =>
            setHora({
              checked: openW.fecha11,
            })} />{new Intl.DateTimeFormat('en-US', {
              timeStyle: 'short',
              timeZone: `${weather.tz}`
            }).format(openW.fecha11)}
      </label>

      {hora.checked === openW.fecha12 && (
        <div className='animate-jump-in duration-75 grid absolute -mt-36 bg-gray-400/95 
            w-28 h-32 rounded-xl ms-[150px] shadow-2xl border border-gray-300 '>
          <div className='flex justify-center mt-1'>
            <p className=' text-2xl font-bold text-white text-shadow'>{openW.tempC12.toFixed(1)}</p>
            <p className='  text-xs text-white text-shadow font-bold'>°C</p>
          </div>
          <div className='flex justify-center mt-1'>

            <p className=' text-xs font-bold text-white text-shadow me-1'>Humedad</p>
            <p className='  text-sm mt-[-2px] text-white text-shadow font-bold'>{openW.humedad12}</p>
            <p className='  text-xs text-white text-shadow font-bold'>%</p>
          </div>
          <div className='flex justify-center mt-1'>
            <p className=' text-[10px] font-bold text-white text-shadow me-2'>Vientos</p>
            <p className='  text-[10px] font-bold text-white text-shadow'>{openW.vientos12}</p>
            <p className='   text-[8px] text-white text-shadow '>km/h</p>
          </div>
          <div className='flex justify-center mt-1'>
            <p className=' text-xs font-bold text-white text-shadow'>{openW.fecha12.getDate()} - {openW.fecha12.getMonth() + 1} - {openW.fecha12.getFullYear()}</p>

          </div>
        </div>
      )}
      <label className={`` + cls}>
        <input type='radio' className='me-2' value={openW.fecha12} checked={hora.checked === openW.fecha12}
          onChange={(e) =>
            setHora({
              checked: openW.fecha12,
            })} />
        {new Intl.DateTimeFormat('en-US', {
          timeStyle: 'short',
          timeZone: `${weather.tz}`
        }).format(openW.fecha12)}
      </label>
      {hora.checked === openW.fecha13 && (
        <div className='animate-jump-in duration-75 grid absolute -mt-36 bg-gray-400/95 
            w-28 h-32 rounded-xl ms-[300px] shadow-2xl border border-gray-300 '>
          <div className='flex justify-center mt-1'>
            <p className=' text-2xl font-bold text-white text-shadow'>{openW.tempC13.toFixed(1)}</p>
            <p className='  text-xs text-white text-shadow font-bold'>°C</p>
          </div>
          <div className='flex justify-center mt-1'>

            <p className=' text-xs font-bold text-white text-shadow me-1'>Humedad</p>
            <p className='  text-sm mt-[-2px] text-white text-shadow font-bold'>{openW.humedad13}</p>
            <p className='  text-xs text-white text-shadow font-bold'>%</p>
          </div>
          <div className='flex justify-center mt-1'>
            <p className=' text-[10px] font-bold text-white text-shadow me-2'>Vientos</p>
            <p className='  text-[10px] font-bold text-white text-shadow'>{openW.vientos13}</p>
            <p className='   text-[8px] text-white text-shadow '>km/h</p>
          </div>
          <div className='flex justify-center mt-1'>
            <p className=' text-xs font-bold text-white text-shadow'>{openW.fecha13.getDate()} - {openW.fecha13.getMonth() + 1} - {openW.fecha13.getFullYear()}</p>

          </div>
        </div>
      )}
      <label className={`` + cls}>
        <input type='radio' className='me-2' value={openW.fecha13} checked={hora.checked === openW.fecha13}
          onChange={(e) =>
            setHora({
              checked: openW.fecha13,
            })} />
        {new Intl.DateTimeFormat('en-US', {
          timeStyle: 'short',
          timeZone: `${weather.tz}`
        }).format(openW.fecha13)}
      </label>
      {hora.checked === openW.fecha14 && (
        <div className='animate-jump-in duration-75 grid absolute -mt-36 bg-gray-400/95 
            w-28 h-32 rounded-xl ms-[455px] shadow-2xl border border-gray-300 '>
          <div className='flex justify-center mt-1'>
            <p className=' text-2xl font-bold text-white text-shadow'>{openW.tempC14.toFixed(1)}</p>
            <p className='  text-xs text-white text-shadow font-bold'>°C</p>
          </div>
          <div className='flex justify-center mt-1'>

            <p className=' text-xs font-bold text-white text-shadow me-1'>Humedad</p>
            <p className='  text-sm mt-[-2px] text-white text-shadow font-bold'>{openW.humedad14}</p>
            <p className='  text-xs text-white text-shadow font-bold'>%</p>
          </div>
          <div className='flex justify-center mt-1'>
            <p className=' text-[10px] font-bold text-white text-shadow me-2'>Vientos</p>
            <p className='  text-[10px] font-bold text-white text-shadow'>{openW.vientos14}</p>
            <p className='   text-[8px] text-white text-shadow '>km/h</p>
          </div>
          <div className='flex justify-center mt-1'>
            <p className=' text-xs font-bold text-white text-shadow'>{openW.fecha14.getDate()} - {openW.fecha14.getMonth() + 1} - {openW.fecha14.getFullYear()}</p>

          </div>
        </div>
      )}
      <label className={`` + cls}>
        <input type='radio' className='me-2' value={openW.fecha14} checked={hora.checked === openW.fecha14}
          onChange={(e) =>
            setHora({
              checked: openW.fecha14,
            })} />
        {new Intl.DateTimeFormat('en-US', {
          timeStyle: 'short',
          timeZone: `${weather.tz}`
        }).format(openW.fecha14)}
      </label>








    </div>





  );
}