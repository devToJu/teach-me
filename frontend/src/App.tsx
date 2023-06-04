import React from 'react';
import ResponsiveAppBar from "./components/navigation/ResponsiveAppBar";
import Welcome from "./components/Welcome";
import ResponsiveAppBarBottom from "./components/navigation/ResponsiveAppBarBottom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UrlNotFound from "./components/UrlNotFound";
import GapTextGallery from "./gaptext/components/GapTextGallery";
import {urlGapText, urlGapTextCreate, urlLogin, urlTaskCreate} from "./components/navigation/PageModel";
import GapTextCreateOrUpdate from "./gaptext/components/createOrUpdate/GapTextCreateOrUpdate";
import SignIn from "./security/components/SignIn";
import ProtectedRoutes from "./security/components/ProtectedRoutes";
import CreateTask from "./tasks/components/CreateTask";

function App() {
    return (
        <BrowserRouter>
            <ResponsiveAppBar/>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path={urlLogin} element={<SignIn/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path={urlGapText} element={<GapTextGallery/>}/>
                    <Route path={urlGapText + "/:id"} element={<GapTextCreateOrUpdate/>}/>
                    <Route path={urlGapTextCreate} element={<GapTextCreateOrUpdate/>}/>
                </Route>
                <Route path={urlTaskCreate} element={<CreateTask/>}/>
                <Route path="*" element={<UrlNotFound/>}/>
            </Routes>
            <ResponsiveAppBarBottom/>
        </BrowserRouter>
    );
}

export default App;
