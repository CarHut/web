import { Routes, Route } from "react-router-dom";
import MainPage from '../../pages/MainPage';
import MoreFiltersPage from '../../pages/MoreFiltersPage';
import SearchList from '../../pages/SearchList';
import CarOfferPage from '../../pages/CarOfferPage';
import LoginRegisterPage from '../../pages/LoginRegisterPage';
import UserProfilePage from "../../pages/UserProfilePage";
import PasswordResetPage from "../../pages/PasswordResetPage";
import AddCarPage from "../../pages/AddCarPage";
import CheckEmailPage from "../loginregisterpage/CheckEmailPage";
import DefaultPage from "../../pages/DefaultPage";
import SuccessfulVerificationPage from "../loginregisterpage/SuccessfulVerificationPage";
import ComparePage from "../../pages/ComparePage";

function Routing() {

    return (
        <Routes>
          <Route path="/" element={<DefaultPage/>}/>
          <Route path="/mainPage" element={<MainPage/>} />
          <Route path="/moreFiltersPage" element={<MoreFiltersPage/>} />
          <Route path='/searchList' element={<SearchList/>}/>
          <Route path='/carOffer' element={<CarOfferPage/>}/>
          <Route path='/login' element={<LoginRegisterPage/>}/>
          <Route path='/userProfile' element={<UserProfilePage/>}/>
          <Route path='/userProfile/account' element={<UserProfilePage/>}/>
          <Route path='/userProfile/savedCars' element={<UserProfilePage/>}/>  
          <Route path='/passwordReset' element={<PasswordResetPage/>}/>
          <Route path='/addCar/mainInfo' element={<AddCarPage/>}/>
          <Route path='/addCar/engineInfo' element={<AddCarPage/>}/>
          <Route path='/addCar/additionalInfo' element={<AddCarPage/>}/>
          <Route path='/addCar/features' element={<AddCarPage/>}/>
          <Route path='/addCar/addPhotos' element={<AddCarPage/>}/>
          <Route path='/addCar/summary' element={<AddCarPage/>}/>
          <Route path='/addCar/success' element={<AddCarPage/>}/>
          <Route path='/register/emailSent' element={<CheckEmailPage/>}/>
          <Route path='/register/successfulVerification' element={<SuccessfulVerificationPage/>}/>
          <Route path='/userProfile/myListings' element={<UserProfilePage/>}/>
          <Route path='/userProfile/savedSearches' element={<UserProfilePage/>}/>
          <Route path='/userProfile/chats' element={<UserProfilePage/>}/>
          <Route path='/userProfile/chats/with' element={<UserProfilePage/>}/>
          <Route path='/compare' element={<ComparePage/>}/>
        </Routes>
    );
}

export default Routing;