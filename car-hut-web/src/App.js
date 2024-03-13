import logo from './logo.svg';
import './App.css';
import MainPage from './pages/MainPage'
import MoreFiltersPage from './pages/MoreFiltersPage';
import { Route, Routes } from 'react-router-dom';
import ClickAndPickPage from './pages/ClickAndPickPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/mainPage" element={<MainPage/>} />
        <Route path="/moreFiltersPage" element={<MoreFiltersPage/>} />
        <Route path="/clickAndPickPage/brand" element={<ClickAndPickPage/>}/>
        <Route path="/clickAndPickPage/model" element={<ClickAndPickPage/>}/>
        <Route path="/clickAndPickPage/price" element={<ClickAndPickPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
