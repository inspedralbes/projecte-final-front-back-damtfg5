import "./App.css";
import "./index.css";
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App bg-[url('./Images/nubesGifVerde.gif')] bg-cover">
      <header className="fixed h-20 w-[100%]">
        <nav className="App-nav h-[100%] flex justify-end">
          <Link to="/login" className="border border-night ml-2 w-[6rem]">LOGIN</Link>
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
            <div className="s-1l-s bg-light-green">
            </div>
            <input className="s-1l-s2 bg-honeydew" placeholder="Salida"></input>
          </div>
          <div className="s-1l bg-honeydew">
            <div className="s-1l-s bg-light-green"></div>
            <input className="s-1l-s2 bg-honeydew" placeholder="Destino"></input>
          </div>
          <div className="s-2d bg-honeydew">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
            </div>
            <input
              type="date"
              className="rounded-full w-[85%] m-2 p-3 bg-honeydew"
              placeholder="Fecha"
            ></input>
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
