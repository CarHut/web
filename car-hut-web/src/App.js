import logo from './logo.svg';
import './App.css';
import MainPage from './pages/MainPage'
import MoreFiltersPage from './pages/MoreFiltersPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/mainPage" element={<MainPage/>} />
        <Route path="/moreFiltersPage" element={<MoreFiltersPage/>} />
      </Routes>
    </div>
  );
}

export default App;
