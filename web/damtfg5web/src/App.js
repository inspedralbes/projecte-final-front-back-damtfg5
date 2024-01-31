import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="App bg-[url('./assets/nubesGifVerde.gif')] bg-cover">
      <header className="fixed h-20 w-[100%]">
        <nav className="App-nav h-[100%] flex justify-end">
          <div className="border border-night ml-2 w-[6rem]">LOGIN</div>
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
        <div className="border border-3 h-20 w-[50%] border-night rounded-[20rem] m-3 flex bg-honeydew">
          <div className="s-1l">
            <div className="s-1l-s"></div>
            <input className="s-1l-s2" placeholder="Salida"></input>
          </div>
          <div className="s-1l">
            <div className="s-1l-s"></div>
            <input className="s-1l-s2" placeholder="Destino"></input>
          </div>
          <div className="s-2d">
            <div className="border border-night rounded-full w-[15%] m-2"></div>
            <input type="date" className="border border-night rounded-full w-[85%] m-2 p-3" placeholder="Fecha"></input>
          </div>
          <button className="border border-night rounded-full w-[7%] m-3">B</button>
        </div>
      </main>
    </div>
  );
}

export default App;
