import React from "react";

export default function FlightData({ flightData }) {
  return (
    <div className="bg-honeydew p-4">
      {flightData &&
        flightData.data &&
        flightData.data.map((flight, index) => (
          <div key={index} className="mb-8 bg-honeydew w-[100%]">
            <tr className="flex h-[100%]">
              <td className="border border-black w-[33%]">
                <img
                  className="h-[40vh] border boder border-black bg-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI0NR4RXHsJIwuPjD1JG0K1rWD9lews4yJ4Q&usqp=CAU"
                ></img>
              </td>
              <td className="border border-black w-[67%]">
                <div className="border border-black w-[100%]">
                  <p className="mb-2">Fuente: {flight.source}</p>
                  <p className="mb-2">
                    Precio total: {flight.price.total} {flight.price.currency}
                  </p>
                  <p className="mb-2">
                    Asientos disponibles: {flight.numberOfBookableSeats}
                  </p>
                  {flight.itineraries.map((itinerary, iIndex) => (
                    <div key={iIndex} className="ml-4 mt-2">
                      <h4 className="text-md font-bold">Segmentos:</h4>
                      {itinerary.segments.map((segment, sIndex) => (
                        <div key={sIndex} className="ml-4 mt-2">
                          <p className="mb-2">
                            Salida: {segment.departure.iataCode} -{" "}
                            {segment.departure.at}
                          </p>
                          <p className="mb-2">
                            Llegada: {segment.arrival.iataCode} -{" "}
                            {segment.arrival.at}
                          </p>
                          <p className="mb-2">Duración: {segment.duration}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </div>
        ))}
    </div>
  );
}
