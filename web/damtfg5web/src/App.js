import "./App.css";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Autocomplete from "@mui/joy/Autocomplete";
import Input from "@mui/joy/Input";
import { set } from "date-fns";
import {
  flights,
  hotelListing,
  hotelOffers,
} from "./services/communicationManager";
import FlightData from "./Components/FlightData";

function App() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [flightData, setFlightData] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [cityCodes, setCityCodes] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setdepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [calendarShow, setCalendarShow] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [hotelListingData, setHotelListingData] = useState([]);
  const [hotelOffersData, setHotelOffersData] = useState([]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 2);

  const [state, setState] = useState([
    {
      startDate: today,
      endDate: tomorrow,
      key: "selection",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:3001/cityCodes")
      .then((response) => response.json())
      .then((data) => {
        const names = data.ciudades.map((ciudad) => ciudad.nombre);
        setCityNames(names);
        setCityCodes(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleCalendar = () => {
    setCalendarShow(!calendarShow);
  };

  function changeFormat(dateRange) {
    let formatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    let customFormat = new Intl.DateTimeFormat("en-US", formatOptions);
    let formattedStartDate = customFormat.format(dateRange);

    return formattedStartDate;
  }

  function setOriginCode(newValue) {
    const foundCity = cityCodes.ciudades.find(
      (city) => city.nombre === newValue
    );

    setOrigin(foundCity.citycode);
  }

  function setDestinationCode(newValue) {
    const foundCity = cityCodes.ciudades.find(
      (city) => city.nombre === newValue
    );

    setDestination(foundCity.citycode);
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript empiezan en 0
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  async function handleSearch() {
    const departureDateFormatted = formatDate(departureDate);
    const returnDateFormatted = formatDate(returnDate);

    const requestBody = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDateFormatted,
      returnDate: returnDateFormatted,
      adults: adults,
      children: children,
      infants: infants,
      nonStop: true,
      max: 4,
    };

    const response = await flights(requestBody);
    setFlightData(response);
  }

  async function handleHotel() {
    const listingBody = {
      cityCode: origin,
      radius: 5,
      radiusUnit: "KM",
    };

    const responseListing = await hotelListing(listingBody);
    setHotelListingData(responseListing);

    getHotelOffers();
  }

  async function getHotelOffers() {
    const departureDateFormatted = formatDate(departureDate);
    const returnDateFormatted = formatDate(returnDate);

    const offersBody = {
      hotelIds: hotelListingData.data[0].hotelId,
      adults: adults,
      checkInDate: departureDateFormatted,
      checkOutDate: returnDateFormatted,
      roomQuantity: 1,
    };

    const responseOffers = await hotelOffers(offersBody);
    setHotelOffersData(responseOffers);
  }

  return (
    <div className="App">
      <header className="fixed h-20 w-[100%]">
        <nav className="App-nav h-[100%] flex justify-end">
          <Link to="/login" className="border border-night ml-2 w-[6rem]">
            LOGIN
          </Link>
          <Link to="/register" className="border border-night ml-2 w-[6rem]">
            SINGUP
          </Link>
          <Link
            to="/searchTravel"
            className="border border-night ml-2 w-[6rem]"
          >
            SearchTravel
          </Link>
        </nav>
      </header>
      <div className="bg-[url('./Images/pi.jpg')] bg-cover h-screen flex flex-col justify-center items-center bg-black/30">
        <div className="text-[7rem]">
          <h1>Web TITLE</h1>
        </div>
        <div className="text-[3rem]">
          <h1>ESLOGAN</h1>
        </div>
        {/* SEARCH DATA */}
        <div className="h-20 w-[70%] rounded-[20rem] m-3 flex bg-honeydew">
          <div className="s-1l bg-honeydew">
            <div className="s-1l-s bg-light-green hidden"></div>
            <div className="ml-4 mt-3">
              <Autocomplete
                placeholder="Origen"
                options={cityNames}
                onChange={(event, newValue) => {
                  setOriginCode(newValue);
                }}
              />
            </div>
          </div>
          <div className="s-1l bg-honeydew">
            <div className="s-1l-s bg-light-green hidden"></div>
            <div className="mt-3">
              <Autocomplete
                placeholder="Destino"
                options={cityNames}
                onChange={(event, newValue) => {
                  setDestinationCode(newValue);
                }}
              />
            </div>
          </div>
          <div className="s-2d bg-honeydew">
            <button onClick={handleCalendar}>
              <div className="rounded-full w-[15%] m-2 bg-light-green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 m-auto mt-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-18 0A2.25 2.25 0 0 0 3 18.75"
                  />
                </svg>
              </div>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="border border-1 border-viridian rounded-2xl"
            >
              {isOpen ? "Ocultar opciones" : "Mostrar opciones"}
            </button>

            {isOpen && (
              <div>
                <label>
                  Adultos:
                  <div class="flex items-center gap-x-1.5">
                    <button
                      type="button"
                      class="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => {
                        if (adults > 1) setAdults(adults - 1);
                      }}
                    >
                      <svg
                        class="flex-shrink-0 w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <input
                      class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                      type="text"
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                    ></input>
                    <button
                      type="button"
                      class="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => setAdults(adults + 1)}
                    >
                      <svg
                        class="flex-shrink-0 w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </button>
                  </div>
                </label>

                <label>
                  Número de niños:
                  <div class="flex items-center gap-x-1.5">
                    <button
                      type="button"
                      class="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => {
                        if (children >= 1) setChildren(children - 1);
                      }}
                    >
                      <svg
                        class="flex-shrink-0 w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <input
                      class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                      type="text"
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                    ></input>
                    <button
                      type="button"
                      class="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => setChildren(children + 1)}
                    >
                      <svg
                        class="flex-shrink-0 w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </button>
                  </div>
                </label>

                <label>
                  Número de infantes:
                  <div class="flex items-center gap-x-1.5">
                    <button
                      type="button"
                      class="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => {
                        if (infants >= 1) setInfants(infants - 1);
                      }}
                    >
                      <svg
                        class="flex-shrink-0 w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <input
                      class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                      type="text"
                      value={infants}
                      onChange={(e) => setInfants(e.target.value)}
                    ></input>
                    <button
                      type="button"
                      class="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => setInfants(infants + 1)}
                    >
                      <svg
                        class="flex-shrink-0 w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </button>
                  </div>
                </label>
              </div>
            )}
            {calendarShow ? (
              <div>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setState([item.selection]);
                    setdepartureDate(item.selection.startDate);
                    setReturnDate(item.selection.endDate);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
              </div>
            ) : (
              <div>
                {state.map((dateRange, index) => (
                  <table key={index}>
                    <tbody>
                      <tr>
                        <td className="p-2">
                          {changeFormat(dateRange.startDate)}
                        </td>
                        <td className="p-1">
                          {dateRange.endDate
                            ? changeFormat(dateRange.endDate)
                            : "No end date selected"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </div>
            )}
          </div>
          <button
            className="border border-customGreen bg-light-green rounded-full w-[7%] m-3 hover:bg-customGreen"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 m-auto"
              viewBox="0 -256 1792 1792"
            >
              <path
                d="M1397 1324q0-87-149-236l-240-240 143-746 1-6q0-14-9-23l-64-64q-9-9-23-9-21 0-29 18L753 593 508 348q68-238 68-252t-9-23L503 9q-9-9-23-9-18 0-28 16L297 296 17 451q-17 9-17 28 0 14 9 23l64 65q9 9 23 9t252-68l245 245-575 274q-18 8-18 29 0 14 9 23l64 64q9 9 23 9 4 0 6-1l746-143 240 240q149 149 236 149 32 0 52.5-20.5t20.5-52.5z"
                style={{
                  fill: "currentColor",
                }}
                transform="matrix(1 0 0 -1 205.017 1330.983)"
              />
            </svg>
          </button>
          <button
            className="border border-customGreen bg-light-green rounded-full w-[7%] m-3 hover:bg-customGreen"
            onClick={handleHotel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 m-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
              />
            </svg>
          </button>
        </div>
        {/* INFO FLIGHTS */}
      </div>
      <div className="p-3 flex text-4xl flex font-bold font-sans w-full mb-4 mt-20">Resultados de la busqueda: </div>
      <section className="flex w-full">
        <div className=" border-r border-black w-[20%] p-3">
          {/* CLASE(PRIMERA, BUSINESS, TURISTA), NUM PERSONAS, HORA SALIDA, ESCALA(SI O NO), PRECIO, */}
          <div className=" border-b border-black flex text-2xl flex font-bold font-sans w-full">Fliters:</div>
          <div ></div>
        </div>
        {flightData && <FlightData flightData={flightData} />}
      </section>
    </div>
  );
}

export default App;
