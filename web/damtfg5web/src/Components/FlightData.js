import React from "react";

export default function FlightData({ flightData }) {
  return (
    <div className="bg-viridian p-4 rounded-full">
      <h1 className="text-2xl font-bold mb-4">Resultados de la búsqueda:</h1>
      {flightData &&
        flightData.data &&
        flightData.data.map((flight, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-bold">Vuelo {index + 1}</h2>
            <p className="mb-2">ID: {flight.id}</p>
            <p className="mb-2">Fuente: {flight.source}</p>
            <p className="mb-2">
              Precio total: {flight.price.total} {flight.price.currency}
            </p>
            <p className="mb-2">
              Asientos disponibles: {flight.numberOfBookableSeats}
            </p>
            <h3 className="text-lg font-bold mt-4">Itinerarios:</h3>
            {flight.itineraries.map((itinerary, iIndex) => (
              <div key={iIndex} className="ml-4 mt-2">
                <p className="mb-2">Duración: {itinerary.duration}</p>
                <h4 className="text-md font-bold">Segmentos:</h4>
                {itinerary.segments.map((segment, sIndex) => (
                  <div key={sIndex} className="ml-4 mt-2">
                    <p className="mb-2">
                      Salida: {segment.departure.iataCode} -{" "}
                      {segment.departure.at}
                    </p>
                    <p className="mb-2">
                      Llegada: {segment.arrival.iataCode} - {segment.arrival.at}
                    </p>
                    <p className="mb-2">Duración: {segment.duration}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
