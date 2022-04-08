import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import "./static/scss/app.scss";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;
