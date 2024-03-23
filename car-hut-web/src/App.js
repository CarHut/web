import logo from './logo.svg';
import './App.css';
import MainPage from './pages/MainPage'
import MoreFiltersPage from './pages/MoreFiltersPage';
import { Route, Routes } from 'react-router-dom';
import ClickAndPickPage from './pages/ClickAndPickPage';
import SearchList from './pages/SearchList';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/mainPage" element={<MainPage/>} />
        <Route path="/moreFiltersPage" element={<MoreFiltersPage/>} />
        <Route path="/clickAndPickPage/brand" element={<ClickAndPickPage/>}/>
        <Route path="/clickAndPickPage/model" element={<ClickAndPickPage/>}/>
        <Route path="/clickAndPickPage/price" element={<ClickAndPickPage/>}/>
        <Route path="/clickAndPickPage/mileage" element={<ClickAndPickPage/>}/>
        <Route path='/clickAndPickPage/registration' element={<ClickAndPickPage/>}/>
        <Route path='/clickandPickPage/fuel' element={<ClickAndPickPage/>}/>
        <Route path='/clickandPickPage/engine' element={<ClickAndPickPage/>}/>
        <Route path='/clickandPickPage/gearbox' element={<ClickAndPickPage/>}/>
        <Route path='/clickandPickPage/color' element={<ClickAndPickPage/>}/>
        <Route path='/searchList' element={<SearchList/>}/>
      </Routes>
    </div>
  );
}

export default App;
