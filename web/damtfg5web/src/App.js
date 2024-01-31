import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="App">
      <header className="fixed h-20 w-[100%]">
        <nav className="App-nav border-8 border-light-green h-[100%] flex justify-end">
          <div className="border border-night ml-2 w-[6rem]">LOGIN</div>
          <div className="border border-night ml-2 w-[6rem]">SINGUP</div>
        </nav>
      </header>
      <main className="border-8 border-gray-800 h-screen flex flex-col justify-center items-center">
        <div className="text-[7rem]">
          <h1>Web TITLE</h1>
        </div>
        <div className="text-[3rem]">
          <h1>ESLOGAN</h1>
        </div>
        <div className="border border-3 h-20 w-[60%] border-night rounded-[20rem] m-3 flex">
          <div className="s-1l">
            <div className="border border-night rounded-full w-[9%] m-2"></div>
            <div className="border border-night rounded-full w-[91%] m-2"></div>
          </div>
          <div className="s-1l">
            <div className="border border-night rounded-full w-[9%] m-2"></div>
            <div className="border border-night rounded-full w-[91%] m-2"></div>
          </div>
          <div className="border border-night rounded-[20rem] w-[15%] m-3 flex justify-between">
            <div className="border border-night rounded-full w-[25%] m-2"></div>
            <div className="border border-night rounded-full w-[75%] m-2"></div>
          </div>
          <button type="calendar" className="border border-night rounded-full w-[5%] m-3">B</button>
        </div>
      </main>
    </div>
  );
}

export default App;
