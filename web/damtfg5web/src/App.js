import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="App-nav border-8 border-light-green h-20"></nav>
      <main className="border-8 border-gray-800 h-screen flex flex-col justify-center items-center">
        <div className="text-[7rem]">
          <h1>Web TITLE</h1>
        </div>
        <div className="text-[3rem]">
          <h1>ESLOGAN</h1>
        </div>
        <div className="border border-3 h-20 w-[80%] border-night">
          <input type="calendar"></input>
        </div>
      </main>
    </div>
  );
}

export default App;
