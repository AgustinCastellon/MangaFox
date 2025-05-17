import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMangasPopulares, getMangasRecientes, getMangasTopRated } from '../Services/MangaDex/MangaService'
import Carousel from "../Components/Carousel";
import { getLatestUpdates } from "../Services/MangaDex/ChapterService";
import LatestUpdatesCard from "../Components/LatestUpdatesCard";
import { faArrowRight, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import MangaListSlider from "../Components/MangaListSlider";
import { Link } from "react-router-dom";
import LastesUpdatesLoader from "../Components/skeletonLoader/LastesUpdatesLoader";
import MenuDashboard from "../Components/MenuDashboard";
import { motion, AnimatePresence } from "framer-motion";
import { useFilters } from "../Context/FilterContext"


function Home() {
    const { filters } = useFilters();
    const [mangas, setMangas] = useState(null);
    const [chapters, setchapters] = useState(null);
    const [topMangas, setTopMangas] = useState(null);
    const [newMangas, setNewMangas] = useState(null);
    const [menu, setMenu] = useState(true);

    const handleMenu = () => {
        setMenu(!menu);
    }

    useEffect(() => {
        const fetchMangas = async () => {
            const data = await getMangasPopulares(10, filters.contentRating)
            setMangas(data);
        };

        fetchMangas();
    }, [filters]);

    useEffect(() => {
        const fetchTopMangas = async () => {
            const data = await getMangasTopRated(15, 0, filters.contentRating)
            setTopMangas(data.mangas);
        };

        fetchTopMangas();
    }, [filters])

    useEffect(() => {
        const fetchLatestUpdates = async () => {
            const data = await getLatestUpdates(12);
            setchapters(data);
        };
        fetchLatestUpdates();

    }, []);

    useEffect(() => {
        const fetchMangasRecientes = async () => {
            const data = await getMangasRecientes(15, 0, filters.contentRating);
            setNewMangas(data.mangas);
        };
        fetchMangasRecientes();

    }, [filters]);

    return (
        <div className="xl:flex md:block w-full mx-auto">
            <aside className="flex-1 mb-3">
                <div className="xl:hidden lg:flex justify-center items-center light:text-black rounded-t-xl mx-auto bg-slate-800 dark:bg-neutral-800 dracula:bg-dracula-700 light:bg-amber-100 w-[900px] text-xl p-1">
                    <motion.button
                        onClick={handleMenu}
                        className="font-bold w-full flex items-center justify-center cursor-pointer"
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.8 }}

                    >
                        {menu ? (
                            <FontAwesomeIcon icon={faChevronUp} className="pl-2 pt-1 dracula:text-dracula-yellow" />
                        ) : (
                            <FontAwesomeIcon icon={faChevronDown} className="pl-2 dracula:text-dracula-yellow" />
                        )}
                    </motion.button>
                </div>
                <AnimatePresence>
                    {menu && (
                        <motion.div
                            initial={{ height: 0, scaleY: 0, originY: 0 }}
                            animate={{ height: "auto", scaleY: 1 }}
                            exit={{ height: 0, scaleY: 0 }}
                            transition={{ duration: 0.2 }}
                            exitTransition={{ duration: 0.2 }}
                        >
                            <MenuDashboard />
                        </motion.div>
                    )}
                </AnimatePresence>
            </aside>
            <motion.div className='3xl:max-w-[1200px] 2xl:max-w-[1000px] xl:max-w-[850px] lg:max-w-[1000px] md:max-w-[700px] mx-auto px-4 '>
                <h1 className='font-medium mb-3 md:text-2xl 2xl:text-3xl light:text-black selection:bg-cyan-300'>Nuevo Titulos Populares</h1>
                <Carousel mangas={mangas} />
                <div className="flex items-center justify-between mt-15 mb-4">
                    <h1 className='font-medium md:text-2xl 2xl:text-3xl light:text-black selection:bg-cyan-300'>Mejor Valorados</h1>
                    <Link to='/mangas?filter=Mejor-Valorados' className="flex">
                        <FontAwesomeIcon icon={faArrowRight} className="text-2xl light:text-black" />
                    </Link>
                </div>
                <MangaListSlider topMangas={topMangas} />
                <div className="flex items-center justify-between  mb-4">
                    <h1 className='font-medium md:text-2xl 2xl:text-3xl light:text-black selection:bg-cyan-300'>Ultimos Lanzamientos</h1>
                    <Link to='/mangas?filter=Ultimos-Lanzamientos' className="flex">
                        <FontAwesomeIcon icon={faArrowRight} className="text-2xl light:text-black" />
                    </Link>
                </div>
                <MangaListSlider topMangas={newMangas} />
            </motion.div>
            <div className="flex-1 2xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] mx-auto px-4">
                <div className="flex justify-between ">
                    <h1 className="font-bold md:text-sm light:text-black">Ultimas Actualizaciones</h1>
                    <Link to='/mangas?filter=Latest Releases' className="flex items-center pr-2">
                        <FontAwesomeIcon icon={faArrowRight} className="text-lg light:text-black" />
                    </Link>
                </div>
                {!chapters ? (
                    <LastesUpdatesLoader />
                ) : (
                    <LatestUpdatesCard chapters={chapters} />
                )}
            </div>
        </div>
    )

}

export default Home;