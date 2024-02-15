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
      cityCode: destination,
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
      <header className="fixed h-[7vh] w-[100%]">
        <nav className="App-nav h-[100%] flex justify-end bg-blue21">
          <Link to="/login" className="ml-2 w-[5rem]">
            <div className="flex flex-col justify-center align-middle h-full text-white-custom font-sans text-base font-bold">
              Login
            </div>
          </Link>
          <Link to="/register" className="ml-2 w-[5rem]">
            <div className="flex flex-col justify-center align-middle h-full text-white-custom font-sans text-base font-bold">
              Register
            </div>
          </Link>
        </nav>
      </header>
      <div className="bg-[url('./Images/fono2.jpg')] bg-cover h-[50vh] flex flex-col justify-center items-center">
        <div className=" w-full h-[80vh] flex flex-col justify-center items-center">
          <div className="text-[7rem] text-white-custom font-sans">
            <h1>Web TITLE</h1>
          </div>
          <div className="text-[3rem] text-white-custom font-sans">
            <h1>ESLOGAN</h1>
          </div>
          {/* SEARCH DATA */}
          <div className="h-20 w-[70%] rounded m-3 flex bg-black/70 justify-end hidden">
            <div className="rounded w-[28%] m-3 flex justify-between bg-honeydew">
              <div className="ml-4 mt-3 border border-black">
                <Autocomplete
                  placeholder="Origen"
                  options={cityNames}
                  onChange={(event, newValue) => {
                    setOriginCode(newValue);
                  }}
                />
              </div>
            </div>
            <div className="rounded w-[28%] m-3 flex justify-between bg-honeydew">
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
            <div className="rounded w-[34%] m-3 flex justify-between bg-honeydew">
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

          <div className=" w-[65%] h-[17vh] rounded">
            <table className="w-full h-full rounded ">
              <tr className="h-[30%] rounded">
                <td
                  className="flex items-center h-full"
                  style={{ margin: 0, padding: 0 }}
                >
                  <div
                    className="w-[13%] h-full flex justify-center items-center font-semibold bg-blue42 rounded-tl-lg"
                    style={{ margin: 0, padding: 0 }}
                  >
                    <button
                      className="border-r border-black w-full"
                      style={{ margin: 0, padding: 0 }}
                    >
                      IDA
                    </button>
                  </div>
                  <div
                    className="w-[13%] h-full flex justify-center items-center font-semibold bg-blue42 rounded-tr-lg"
                    style={{ margin: 0, padding: 0 }}
                  >
                    <button
                      className="w-full"
                      style={{ margin: 0, padding: 0 }}
                    >
                      IDA Y VUELTA
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-blue42 rounded">
                <td
                  className="h-full flex flex-row justify-start items-center rounded"
                  style={{ margin: 0, padding: 0 }}
                >
                  <div
                    className="h-[80%] w-[80%] bg-white-custom rounded "
                    style={{ margin: 10, padding: 0 }}
                  >
                    <table className="w-full h-full rounded">
                      <tr className="h-[25%] w-full">
                        <td className="border-r border-gray-400 w-[20%]">
                          <div className=" flex ml-2 text-gray-400 text-sm">
                            Origen
                          </div>
                        </td>
                        <td className="border-r border-gray-400 w-[20%]">
                          <div className=" flex ml-2 text-gray-400 text-sm">
                            Destino
                          </div>
                        </td>
                        <td className="border-r border-gray-400 w-[35%]">
                          <div className=" flex ml-2 text-gray-400 text-sm">
                            Ida y vuelta
                          </div>
                        </td>
                        <td className=" w-[25%]">
                          <div className=" flex ml-2 text-gray-400 text-sm">
                            Pasajeros
                          </div>
                        </td>
                      </tr>
                      <tr className="rounded">
                        <td className="border-r border-gray-400 w-[20%]">
                          <div className="flex ml-2 mr-2">
                            <Autocomplete
                              placeholder="Origen"
                              options={cityNames}
                              onChange={(event, newValue) => {
                                setOriginCode(newValue);
                              }}
                            />
                          </div>
                        </td>
                        <td className="border-r border-gray-400 w-[20%]">
                          <div className="flex ml-2 mr-2">
                            <Autocomplete
                              placeholder="Destino"
                              options={cityNames}
                              onChange={(event, newValue) => {
                                setDestinationCode(newValue);
                              }}
                            />
                          </div>
                        </td>
                        <td className="border-r border-gray-400 w-[35%]">
                          <div className="flex ml-2 mr-2">
                            <button onClick={handleCalendar}>
                              <div className="">
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
                            {calendarShow ? (
                              <div className="fixed mt-12">
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
                        </td>
                        <td className=" w-[25%]">
                          <div className=" flex ml-2 mr-2">
                            <button
                              onClick={() => setIsOpen(!isOpen)}
                              className=" w-full flex justify-between"
                            >
                              0 Pasajeros
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </button>
                            {isOpen && (
                              <div className="fixed mt-10 bg-white-custom rounded border border-black w-[10%]">
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
                                      onChange={(e) =>
                                        setAdults(e.target.value)
                                      }
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
                                        if (children >= 1)
                                          setChildren(children - 1);
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
                                      onChange={(e) =>
                                        setChildren(e.target.value)
                                      }
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
                                        if (infants >= 1)
                                          setInfants(infants - 1);
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
                                      onChange={(e) =>
                                        setInfants(e.target.value)
                                      }
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
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className=" h-[80%] w-[20%] flex justify-center items-center mr-4">
                    <button
                      onClick={handleSearch}
                      className="w-full h-[70%] rounded-full bg-blue0D text-white"
                    >
                      BUSCAR
                    </button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        {/* INFO FLIGHTS */}
      </div>

      <div className="border border-black h-[40vh] w-full mt-5 flex flex-col items-center">
        <div className=" w-[65%] font-bold font-sans text-xl">
          Creamos experiencias y recuerdos
        </div>
        <div className=" w-[65%] mt-5 flex justify-between">
          <div className="border border-black h-[30vh] w-[27%] flex flex-col items-center">
            <div className="border border-black w-[4%] h-[8vh] absolute top-[55%] rounded-full flex justify-center items-center">ICO</div>
            <div className="font-bold font-sans text-xl">Buscamos el mejor precio</div>
          </div>
          <div className="border border-black h-[30vh] w-[27%]">
            <div className="font-bold font-sans text-xl">No tienes ni que pensar</div>
          </div>
          <div className="border border-black h-[30vh] w-[27%]">
            <div className="font-bold font-sans text-xl">Puedes crear tu viaje</div>
          </div>
        </div>
      </div>

      <div className="p-3 flex text-4xl flex font-bold font-sans w-full mb-4 mt-20">
        Resultados de la busqueda:{" "}
      </div>
      <section className="flex w-full">
        <div className=" border-r border-black w-[20%] p-3">
          {/* CLASE(PRIMERA, BUSINESS, TURISTA), NUM PERSONAS, HORA SALIDA, ESCALA(SI O NO), PRECIO, */}
          <div className=" border-b border-black flex text-2xl flex font-bold font-sans w-full">
            Fliters:
          </div>
          <div></div>
        </div>
        {flightData && <FlightData flightData={flightData} />}
      </section>
    </div>
  );
}

export default App;
