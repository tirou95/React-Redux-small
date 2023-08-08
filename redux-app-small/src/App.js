import "./index.css";
import AddBox from "./components/addBox";
import Lists from "./components/lists";
import Reducer from "../src/reducer/reducer.js";

export default function App() {
  // cover the entire app with the Reducer component to use reducer fucntion to update
  return (
    <Reducer>
      <h1>To Do List!</h1>
      <AddBox />
      <Lists />
    </Reducer>
  );
}
