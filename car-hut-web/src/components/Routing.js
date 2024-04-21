import { Routes, Route } from "react-router-dom";
import MainPage from '../pages/MainPage';
import MoreFiltersPage from '../pages/MoreFiltersPage';
import ClickAndPickPage from '../pages/ClickAndPickPage';
import SearchList from '../pages/SearchList';
import CarOfferPage from '../pages/CarOfferPage';
import LoginRegisterPage from '../pages/LoginRegisterPage';
import UserProfilePage from "../pages/UserProfilePage";
import PasswordResetPage from "../pages/PasswordResetPage";

function Routing() {

    return (
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
          <Route path='/carOffer' element={<CarOfferPage/>}/>
          <Route path='/login' element={<LoginRegisterPage/>}/>
          <Route path='/userProfile' element={<UserProfilePage/>}/>
          <Route path='/userProfile/account' element={<UserProfilePage/>}/>
          <Route path='/userProfile/savedCars' element={<UserProfilePage/>}/>  
          <Route path='/passwordReset' element={<PasswordResetPage/>}/>
        </Routes>
    );
}

export default Routing;