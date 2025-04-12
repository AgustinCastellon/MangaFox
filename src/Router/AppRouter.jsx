import { Navigate, Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import MangaList from "../Pages/MangaList"
import MangaDetail from "../Pages/MangaDetail"
import ChapterReader from "../Pages/ChapterReader"
import SignIn from "../Pages/SignIn";
export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mangas" element={<MangaList />} />
            <Route path="/manga/:id" element={<MangaDetail />}/>
            <Route path="/*" element={<Navigate to='/'/>}/>
            <Route path="/chapter/:mangaid/:chapterid/:lang" element={<ChapterReader/>} />
            <Route path="/signIn" element={<SignIn/>} />
        </Routes>
    )
}