import React from "react";

export default function FlightCard({ flight }) {
  return (
    <button className="mb-8 bg-white w-[100%] h-[70vh] shadow-xl">
      {/* PARTE DE LA IMAGEN */}
      <div className="h-[30vh] w-full overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI0NR4RXHsJIwuPjD1JG0K1rWD9lews4yJ4Q&usqp=CAU"
          className="w-full h-full object-cover"
          alt="Imagen"
        ></img>
      </div>
      {/* Detalles DIV */}
      <div className=" w-full flex flex-col p-5 h-[33vh]">
        {/* TITLE */}
        <p className=" text-2xl flex font-bold font-sans w-full h-[7vh]">
          Titulo
        </p>
        {flight.itineraries.map((itinerary, iIndex) => (
          <div key={iIndex} className="ml-4 mt-2 flex">
            {itinerary.segments.map((segment, sIndex) => (
              <div key={sIndex} className="ml-4 mt-2">
                <p className="mb-2 flex">
                  <b>Salida: </b> {segment.departure.iataCode} - {segment.departure.at}
                </p>
                <p className="mb-2 flex">
                  <b>Llegada: </b> {segment.arrival.iataCode} - {segment.arrival.at}
                </p>
                <p className="mb-2 flex">Duración: {segment.duration}</p>
              </div>
            ))}
          </div>
        ))}
        {/* <div className=" flex w-full">
          <p className=" w-[10%]">ICO</p>
          <p className=" w-[90%]">{flight.numberOfBookableSeats}</p>
        </div>
        <div className=" flex w-full">
          <p className=" w-[10%]">ICO</p>
          <p className=" w-[90%]">DATA DE Vuelta</p>
        </div> */}
      </div>
      {/* PARTE DEL PRECIO */}
      <hr></hr>
      <div className="h-[7vh] p-5 flex justify-end">
        <p className="flex justify-center items-center w-[20%] font-sans text-xl font-bold">
          ${flight.price.total}
        </p>
      </div>
    </button>
  );
}
