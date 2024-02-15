import React from "react";
import FlightCard from "./FlightCard";

export default function FlightData({ flightData }) {
  return (
    <div className="bg-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {flightData &&
        flightData.data &&
        flightData.data.map((flight, index) => (
          <FlightCard key={index} flight={flight}></FlightCard>
        ))}
    </div>
  );
}
