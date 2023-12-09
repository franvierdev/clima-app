import React, { useState } from 'react';
export default function App({ pm, setPm, cls, weather, openW, hora, setHora }) {
  const dia = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  var horaFuturo
  var chequeado
  var input1
  var input2

  if (weather.localTime.getHours() <= 12) {
    horaFuturo = weather.localTime.getHours()
  }
  else {
    horaFuturo = weather.localTime.getHours() - 12
  }


  if (openW.fecha11.getHours() > 12) {
    chequeado = openW.fecha11.getHours() - 12
  }
  else {
    chequeado = openW.fecha11.getHours()
  }


  if (chequeado + horaFuturo > 12) {
    input1 = (chequeado + horaFuturo) - 12

  }
  else {
    input1 = chequeado + horaFuturo
  }

  if ((openW.fecha12.getHours() > 12 ? openW.fecha12.getHours() - 12 : openW.fecha12.getHours()) + (horaFuturo) > 12) {
    input2 = (openW.fecha12.getHours() + horaFuturo) - 12
  }
  else {
    input2 = openW.fecha12.getHours() + horaFuturo
  }
  var input3
  var input4

  if ((openW.fecha13.getHours() > 12 ? openW.fecha13.getHours() - 12 : openW.fecha13.getHours()) + (horaFuturo) > 12) {
    input3 = (openW.fecha13.getHours() + horaFuturo) - 12
  }
  else {
    input3 = openW.fecha13.getHours() + horaFuturo
  }
  if ((openW.fecha14.getHours() > 12 ? openW.fecha14.getHours() - 12 : openW.fecha14.getHours()) + (horaFuturo) > 12) {
    input4 = (openW.fecha14.getHours() + horaFuturo) - 12
  }
  else {
    input4 = openW.fecha14.getHours() + horaFuturo
  }



  const asd = (e) => {


    e.preventDefault()
    console.log(hora)
  }


  return (

    <div className='relative flex justify-between ' onSubmit={asd}  >

      {hora.checked === input1 && (
        <div className=' grid absolute -mt-36 bg-gray-400/95 
            w-28 h-32 rounded-xl ms-3 shadow-2xl border border-gray-300 '>
          <div className='flex justify-center mt-1'>
            <p className=' text-2xl font-bold text-white text-shadow'>{hora.temp}</p>
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
      <label className={`` + cls}>
        <input type='radio' className='me-2' value={input1} checked={hora.checked === input1}
          onChange={(e) =>
            setHora({
              temp: openW.tempC11.toFixed(1),
              checked: input1,
              minutos: ` ${openW.fecha11.getMinutes()}`,
              dia: `${dia[openW.fecha11.getDay()]} : ${openW.fecha11.getDate()}-${openW.fecha11.getMonth()}-${openW.fecha11.getFullYear()}`,
            })} />
        {input1 > 12 ? input1 - 12 : input1} :  {openW.fecha11.getMinutes() < 10 ? `0${+ openW.fecha11.getMinutes()}` : openW.fecha11.getMinutes()} {openW.fecha11.getHours > 12 ? `PM` : `AM`}
      </label>

      {hora.checked === input2 && (
        <div className=' grid absolute -mt-36 bg-gray-400/95 
            w-28 h-32 rounded-xl ms-40 shadow-2xl border border-gray-300 '>
          <div className='flex justify-center mt-1'>
            <p className=' text-2xl font-bold text-white text-shadow'>{hora.temp}</p>
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
        <input type='radio' className='me-2' value={input2} checked={hora.checked === input2}
          onChange={(e) =>
            setHora({
              temp: openW.tempC12.toFixed(1),
              checked: input2,
              minutos: ` ${openW.fecha12.getMinutes()}`,
              dia: `${dia[openW.fecha12.getDay()]} : ${openW.fecha12.getDate()}-${openW.fecha12.getMonth()}-${openW.fecha12.getFullYear()}`,
            })} />
        {input2} : 00 {openW.fecha12.getHours > 12 ? `PM` : `AM`}
      </label>
      {hora.checked === input3 && (
        <div className=' grid absolute -mt-36 bg-gray-400/95 
            w-28 h-32 rounded-xl ms-[300px] shadow-2xl border border-gray-300 '>
          <div className='flex justify-center mt-1'>
            <p className=' text-2xl font-bold text-white text-shadow'>{hora.temp}</p>
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
        <input type='radio' className='me-2' value={input3} checked={hora.checked === input3}
          onChange={(e) =>
            setHora({
              temp: openW.tempC13.toFixed(1),
              checked: input3,
              minutos: ` ${openW.fecha13.getMinutes()}`,

            })} />
        {input3 > 12 ? input3 - 12 : input3} :  {openW.fecha13.getMinutes() < 10 ? `0${+ openW.fecha13.getMinutes()}` : openW.fecha13.getMinutes()} {input3 > 12 ? `PM` : `AM`}
      </label>
      {hora.checked === input4 && (
        <div className=' grid absolute -mt-36 bg-gray-400/95 
            w-28 h-32 rounded-xl ms-[444px] shadow-2xl border border-gray-300 '>
          <div className='flex justify-center mt-1'>
            <p className=' text-2xl font-bold text-white text-shadow'>{hora.temp}</p>
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
        <input type='radio' className='me-2' value={input4} checked={hora.checked === input4}
          onChange={(e) =>
            setHora({
              temp: openW.tempC14.toFixed(1),
              checked: input4,
              minutos: ` ${openW.fecha14.getMinutes()}`,

            })} />
        {input4 > 12 ? input4 - 12 : input4} :  00 {input4 > 12 ? `PM` : `AM`}
      </label>








    </div>





  );
}