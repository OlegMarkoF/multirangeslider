// import logo from './logo.svg';
import "./App.css";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";

function App() {
  return (
    <MultiRangeSlider
      min={0}
      max={1000}
      onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
    />
  );
}

export default App;
