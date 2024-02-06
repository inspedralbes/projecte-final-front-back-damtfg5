import "./App.css";
import "./index.css";
import { Link } from "react-router-dom";
import { Calendar, DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function App() {
  const [calendarShow, setCalendarShow] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

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

  return (
    <div className="App bg-[url('./Images/nubesGifVerde.gif')] bg-cover">
      <header className="fixed h-20 w-[100%]">
        <nav className="App-nav h-[100%] flex justify-end">
          <Link to="/login" className="border border-night ml-2 w-[6rem]">
            LOGIN
          </Link>
          <div className="border border-night ml-2 w-[6rem]">SINGUP</div>
        </nav>
      </header>
      <main className="h-screen flex flex-col justify-center items-center">
        <div className="text-[7rem]">
          <h1>Web TITLE</h1>
        </div>
        <div className="text-[3rem]">
          <h1>ESLOGAN</h1>
        </div>
        <div className="h-20 w-[50%] rounded-[20rem] m-3 flex bg-honeydew">
          <div className="s-1l bg-honeydew">
            <div className="s-1l-s bg-light-green"></div>
            <input className="s-1l-s2 bg-honeydew" placeholder="Salida"></input>
          </div>
          <div className="s-1l bg-honeydew">
            <div className="s-1l-s bg-light-green"></div>
            <input
              className="s-1l-s2 bg-honeydew"
              placeholder="Destino"
            ></input>
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
                  onChange={(item) => setState([item.selection])}
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
                        <td className="p-2">{changeFormat(dateRange.startDate)}</td>
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
          <button className="border border-customGreen bg-light-green rounded-full w-[7%] m-3 hover:bg-customGreen">
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
      </main>
    </div>
  );
}

export default App;
