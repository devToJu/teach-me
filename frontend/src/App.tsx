import React from 'react';
import ResponsiveAppBar from "./components/navigation/ResponsiveAppBar";
import Welcome from "./components/Welcome";
import ResponsiveAppBarBottom from "./components/navigation/ResponsiveAppBarBottom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UrlNotFound from "./components/UrlNotFound";
import GapTextGallery from "./gaptext/components/GapTextGallery";

function App() {
    return (
        <>
            <BrowserRouter>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path="/" element={<Welcome/>}/>
                    <Route path="/gaptext" element={<GapTextGallery/>}/>
                    <Route path="*" element={<UrlNotFound/>}/>
                </Routes>
                <ResponsiveAppBarBottom/>
            </BrowserRouter>
        </>
    );
}

export default App;
