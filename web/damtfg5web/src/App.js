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
import { flights } from "./services/communicationManager";
import FlightData from "./Components/FlightData";

function App() {
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [cityCodes, setCityCodes] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setdepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [calendarShow, setCalendarShow] = useState(false);

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
      adults: 2,
      children: 0,
      infants: 0,
      nonStop: true,
      max: 4,
    };

    const response = await flights(requestBody);
    setFlightData(response);
    console.log(response);
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
      <main className="bg-[url('./Images/nubesGifVerde.gif')] bg-cover h-screen flex flex-col justify-center items-center">
        <div className="text-[7rem]">
          <h1>Web TITLE</h1>
        </div>
        <div className="text-[3rem]">
          <h1>ESLOGAN</h1>
        </div>
        {/* SEARCH DATA */}
        <div className="h-20 w-[50%] rounded-[20rem] m-3 flex bg-honeydew">
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
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 m-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        {/* INFO FLIGHTS */}
      </main>
      <h1 className="text-2xl font-bold mb-4 bg-viridian h-[7vh] w-[100%]">
        Resultados de la búsqueda:
      </h1>
      <div>Filtros: </div>
      <div>{flightData && <FlightData flightData={flightData} />}</div>
    </div>
  );
}

export default App;
