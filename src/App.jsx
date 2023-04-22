import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import './styles/App.css'

function App() {
  return (
    <>
      <Canvas id="three-canvas-container" camera={{ position: [1, 1.5, 2.5], fov: 50 }} shadows>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
