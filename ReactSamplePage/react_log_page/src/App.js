import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSide from './Components/SignInSide';
import SignUp from './Components/SignUp';
import ForgotPass from './Components/ForgotPass';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
      </Routes>
    </Router>
  );
}

export default App;
