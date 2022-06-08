import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import IsPrivate from './components/authentication/IsPrivate';
import IsAnon from './components/authentication/IsAnon';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';



function App() {
  return (
    <div className="App">
      <Routes>
        {/* --- Only for not logged in users: --- */}
        <Route path="/" element={<IsAnon><LandingPage /></IsAnon>} />
        <Route path="/login" element={ <IsAnon><LoginPage /></IsAnon> } />
        <Route path="/signup" element={ <IsAnon><SignupPage /></IsAnon> } />

        {/* --- Only for logged in users: --- */}
        <Route path="/home" element={<IsPrivate><HomePage /></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
