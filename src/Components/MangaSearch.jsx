import { faBookmark, faCircle, faComment, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { findMangaByTitle } from '../Services/MangaDex/MangaService';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SearchingLoader from "./skeletonLoader/SearchingLoader";

function MangaSearch() {

    const [mangasFound, setMangasFound] = useState([]);
    const [title, setTitle] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const modalRef = useRef();
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const fetchManga = async () => {
            if (!title) return
            const data = await findMangaByTitle(title)
            setMangasFound(data)
            setIsVisible(false)
        }
        fetchManga()
    }, [title])

    const handleSearchModal = (e) => {
        setModalOpen(true)
        e.stopPropagation();
    }

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setModalOpen(false)
        }
    };

    useEffect(() => {
        if (modalOpen) {
            document.addEventListener("click", handleClickOutside)
        } else {
            document.removeEventListener("click", handleClickOutside)
        }

        return () => {
            document.removeEventListener("click", handleClickOutside)
        };

    }, [modalOpen])

    const handleState = (state) => {
        switch (state) {
            case 'completed':
                return 'text-blue-400'
            case 'hiatus':
                return 'text-yellow-400'
            case 'cancelled':
                return 'text-red-400'
            case 'ongoing':
                return 'text-green-400'
            default:
                return 'text-gray-400'
        }
    }

    return (
        <div className="flex flex-col relative">
            <div className='flex h-full items-center gap-2 bg-gray-900 light:bg-cyan-50 dark:bg-stone-900 dark:border-cyan-300 border-2 content-center 2xl:w-150 lg:w-120 rounded-2xl text-lg light:border-black '>
                <div className="w-10 h-full flex items-center justify-center  rounded-l-xl bg-white dark:bg-cyan-300 light:bg-black">
                    <FontAwesomeIcon icon={faSearch} className='text-slate-900 dark:text-stone-900 light:text-white' />
                </div>
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="outline-none z-50 placeholder-gray-500 w-full light:text-black"
                    onChange={(e) => setTitle(e.target.value)}
                    onClick={handleSearchModal}
                />
            </div>

            {/* Background overlay */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}  // Initial state when it enters
                        animate={{ opacity: 0.3 }} // Final state when it is visible
                        exit={{ opacity: 0 }}  // Final state when it exits
                        transition={{ duration: 0.3 }}  // Transition duration
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        ref={modalRef}
                        className="absolute top-12 w-full bg-slate-900 light:bg-amber-200 dark:bg-stone-900 rounded-xl z-50"
                        initial={{ opacity: 0, y: -10 }}  // Initial state when it enters
                        animate={{ opacity: 1, y: 0 }}    // Final state when it is visible
                        exit={{ opacity: 0, y: -10 }}     // Final state when it exits
                        transition={{ duration: 0.2 }}  // Transition duration
                    >
                        <div className="">
                            {!title ? (
                                <h1 className="text-xl p-4 light:text-black">Ingresa el nombre del manga...</h1>
                            ) : (
                                isVisible ? (
                                    <SearchingLoader />
                                ) : (
                                    <div className="flex flex-col gap-4 p-2 overflow-y-scroll h-[600px] scrollbar scrollbar-thumb-slate-700 light:scrollbar-thumb-amber-300 dark:scrollbar-thumb-cyan-300">
                                        <h1 className="text-xl font-bold px-4 pt-2 light:text-black">Manga</h1>
                                        {mangasFound?.map((m, index) => (
                                            <Link to={`/manga/${m.id}`} key={index}>
                                                <div onClick={() => setModalOpen(false)} key={index} className="flex bg-slate-800 light:bg-amber-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 p-1 rounded-lg light:hover:bg-amber-50 hover:bg-slate-700 cursor-pointer">
                                                    <img src={`${m.coverUrl}`} alt={m.title} className="w-17 h-24 object-cover object-top rounded-lg" />
                                                    <div className="pl-2">
                                                        <h1 className="text-sm font-bold line-clamp-1 mb-2 light:text-black">{m.title}</h1>
                                                        <div className="flex gap-4 mb-2">
                                                            <p className="text-xs light:text-black">
                                                                <FontAwesomeIcon icon={faStar} className="text-yellow-400 pr-1" />
                                                                {m.rating.toFixed(2)}
                                                            </p>
                                                            <p className="text-xs light:text-black">
                                                                <FontAwesomeIcon icon={faBookmark} className="pr-1" />
                                                                {m.followers}
                                                            </p>
                                                            {m.comments !== null &&
                                                                <p className="text-xs light:text-black">
                                                                    <FontAwesomeIcon icon={faComment} className="pr-1" />
                                                                    {m.comments.repliesCount}
                                                                </p>
                                                            }
                                                        </div>
                                                        <div className="flex items-center gap-1 mb-2">
                                                            <FontAwesomeIcon icon={faCircle} className={`${handleState(m.status)} size-2`} />
                                                            <p className="text-xs light:text-black">{m.status.toUpperCase()}</p>
                                                        </div>
                                                        <p className="text-xs text-gray-400 light:text-slate-600">{m.year}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MangaSearch;