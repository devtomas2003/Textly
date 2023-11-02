import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./Views/Post";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Post />} />
            </Routes>
        </BrowserRouter>
    );
}