import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>This is the Student micro frontend</div>} />
        <Route path="/home" element={<div>This is the home route</div>} />
      </Routes>
    </>
  );
}

export default App;
