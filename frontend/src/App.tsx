import React from 'react';
import ResponsiveAppBar from "./components/navigation/ResponsiveAppBar";
import Welcome from "./components/Welcome";
import ResponsiveAppBarBottom from "./components/navigation/ResponsiveAppBarBottom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UrlNotFound from "./components/UrlNotFound";
import GapTextGallery from "./gaptext/components/GapTextGallery";
import {urlGapText, urlGapTextCreate} from "./components/navigation/PageModel";
import GapTextCreate from "./gaptext/components/Create/GapTextCreate";
import GapTextCreateContextProvider from "./gaptext/contexts/GapTextCreateContextProvider";

function App() {
    return (
        <>
            <BrowserRouter>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path="/" element={<Welcome/>}/>
                    <Route path={urlGapText} element={<GapTextGallery/>}/>
                    <Route
                        path={urlGapTextCreate}
                        element={
                            <GapTextCreateContextProvider>
                                <GapTextCreate/>
                            </GapTextCreateContextProvider>
                        }
                    />
                    <Route path="*" element={<UrlNotFound/>}/>
                </Routes>
                <ResponsiveAppBarBottom/>
            </BrowserRouter>
        </>
    );
}

export default App;
