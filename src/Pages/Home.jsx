import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMangasPopulares, getMangasRecientes, getMangasTopRated } from '../Services/MangaDex/MangaService'
import Carousel from "../Components/Carousel";
import { getLatestUpdates } from "../Services/MangaDex/ChapterService";
import LatestUpdatesCard from "../Components/LatestUpdatesCard";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MangaListSlider from "../Components/MangaListSlider";
import { Link } from "react-router-dom";
import LastesUpdatesLoader from "../Components/skeletonLoader/LastesUpdatesLoader";
function Home() {

    const [mangas, setMangas] = useState(null);
    const [chapters, setchapters] = useState(null);
    const [topMangas, setTopMangas] = useState(null);
    const [newMangas, setNewMangas] = useState(null);

    useEffect(() => {
        const fetchMangas = async () => {
            const data = await getMangasPopulares(10)
            setMangas(data);
        };

        fetchMangas();
    }, []);

    useEffect(() => {
        const fetchTopMangas = async () => {
            const data = await getMangasTopRated(15)
            setTopMangas(data.mangas);
        };

        fetchTopMangas();
    }, [])

    useEffect(() => {
        const fetchLatestUpdates = async () => {
            const data = await getLatestUpdates(12);
            setchapters(data);
        };
        fetchLatestUpdates();

    }, []);

    useEffect(() => {
        const fetchMangasRecientes = async () => {
            const data = await getMangasRecientes(15);
            setNewMangas(data.mangas);
        };
        fetchMangasRecientes();

    }, []);

    return (
        <div className="flex w-full mx-auto">
            <div className="flex-1"></div>
            <div className='2xl:max-w-[1200px] lg:max-w-[850px] mx-auto px-4 '>
                <h1 className='font-medium mb-3 text-3xl'>Nuevo Titulos Populares</h1>
                <Carousel mangas={mangas} />
                <div className="flex items-center justify-between mt-15 mb-4">
                    <h1 className='font-medium text-3xl'>Mejor Puntuados</h1>
                    <Link to='/mangas?filter=Top-Rated'>
                        <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
                    </Link>
                </div>
                <MangaListSlider topMangas={topMangas} />
                <div className="flex items-center justify-between  mb-4">
                    <h1 className='font-medium text-3xl'>Ultimos Lanzamientos</h1>
                    <Link to='/mangas?filter=Latest Releases'>
                        <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
                    </Link>
                </div>
                <MangaListSlider topMangas={newMangas} />
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <h1 className="font-bold">Ultimas Actualizaciones</h1>
                    <Link to='/mangas?filter=Latest Releases' className="flex items-center pr-2">
                        <FontAwesomeIcon icon={faArrowRight} className="text-lg" />
                    </Link>
                </div>
                {!chapters? (
                    <LastesUpdatesLoader/>
                ) : (
                <LatestUpdatesCard chapters={chapters} />
                )}
            </div>
        </div>
    )

}

export default Home;