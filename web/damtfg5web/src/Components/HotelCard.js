import React from "react";

export default function HotelCard({ hotel }) {
  return (
    <button className="mb-8 bg-white w-[100%] h-[70vh] shadow-xl">
        {console.log(hotel)}
        <div className="h-[30vh] w-full overflow-hidden">
            <img className="w-full h-full object-cover" src="https://static.leonardo-hotels.com/image/leonardohotelbucharestcitycenter_room_comfortdouble2_2022_4000x2600_7e18f254bc75491965d36cc312e8111f_1200x780_mobile_3.jpeg"></img>
        </div>
        <div>
            {hotel.hotel.name}
        </div>
        <div>
            {hotel.room.description}
        </div>
        <div>
            {hotel.price.total}
        </div>
    </button>
  );
}
