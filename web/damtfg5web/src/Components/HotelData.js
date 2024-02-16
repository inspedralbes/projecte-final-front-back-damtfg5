import React from "react";
import HotelCard from "./HotelCard";
import { log } from "../services/communicationManager";

export default function HotelData({ hotelData }) {
  return (
    <div className="bg-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {hotelData &&
      hotelData[0] &&
        hotelData[0].map((hotel, index) => (
            
            <HotelCard key={index} hotel={hotel}></HotelCard>
        ))}
    </div>
  );
}
