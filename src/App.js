import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Level1 from "./Pages/level1";
import Level2 from "./Pages/level2";
import Level3 from "./Pages/Level3";
import AdditionalQuestions from "./Pages/AdditionalQuestions";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level3" element={<Level3 />} />
        <Route path="/additional-questions" element={<AdditionalQuestions />} />
      </Routes>
    </Router>
  );
};

export default App;
