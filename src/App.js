import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import IsPrivate from './components/authentication/IsPrivate';
import IsAnon from './components/authentication/IsAnon';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ExplorePage from './pages/ExplorePage';
import WatchListsPage from './pages/WatchListsPage';
import AccountPage from './pages/AccountPage';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';



function App() {
  return (
    <div className="App">
      <Routes>
        {/* --- Only for not logged in users: --- */}
        <Route path="/" element={<IsAnon><LandingPage /></IsAnon>} />
        <Route path="/login" element={ <IsAnon><LoginPage /></IsAnon> } />
        <Route path="/signup" element={ <IsAnon><SignupPage /></IsAnon> } />

        {/* --- Only for logged in users: --- */}
        <Route path="/account" element={<IsPrivate><AccountPage /></IsPrivate>} />
        <Route path="/home" element={<IsPrivate><HomePage /></IsPrivate>} />
        <Route path="/movies" element={<IsPrivate><MoviesPage /></IsPrivate>} />
        <Route path="/series" element={<IsPrivate><SeriesPage /></IsPrivate>} />
        <Route path="/watchlists" element={<IsPrivate><WatchListsPage /></IsPrivate>} />
        <Route path="/users" element={<IsPrivate><UsersPage /></IsPrivate>} />
        <Route path="/explore" element={<IsPrivate><ExplorePage /></IsPrivate>} />
        <Route path="/settings" element={<IsPrivate><SettingsPage /></IsPrivate>} />
        {/* 
        --> watchItem 
        --> user
        */}
      </Routes>
    </div>
  );
}

export default App;
