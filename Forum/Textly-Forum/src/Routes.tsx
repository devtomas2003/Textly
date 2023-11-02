import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forum from "./Views/Forum";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Forum />} />
            </Routes>
        </BrowserRouter>
    );
}