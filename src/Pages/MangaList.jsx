import { useEffect, useState } from "react";
import { getAllMangas, getMangasByFilter, getMangasRecientes, getMangasTopRated, getTags } from "../Services/MangaDex/MangaService";
import { useSearchParams } from "react-router-dom";
import MangaListFiltered from "../Components/MangaListFiltered";
import Pagination from "../Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import AdvancedSearch from "../Components/AdvancedSearch";
import { motion, AnimatePresence } from "framer-motion";

function MangaList() {
    const [mangas, setMangas] = useState([]);
    const [totalMangas, setTotalMangas] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [tags, setTags] = useState();
    const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
    const filter = searchParams.get("filter");
    const page = parseInt(searchParams.get("page")) || 1; // obtiene la pagina de la URL
    const mangasPerPage = 30;
    const [includeTag, setIncludeTag] = useState([]);
    const [excludeTag, setExcludeTag] = useState([]);
    const [allTags, setAllTags] = useState({});
    const [filtersCDS, setFiltersCDS] = useState({});
    const [incTagMode, setIncTagMode] = useState('AND');
    const [excTagMode, setExcTagMode] = useState('AND');
    const [contentRating, setContentRating] = useState([]);
    const [demographic, setDemographic] = useState([]);
    const [status, setStatus] = useState([]);
    const [sortName, setSortName] = useState();
    const [sortValue, setSortValue] = useState();

    useEffect(() => {
        const fetchTags = async () => {
            const data = await getTags();
            setTags(data)
        }
        fetchTags();
    }, [])

    const sendFilters = () => {
        const updatedTags = {
            includeTag,
            excludeTag,
            incTagMode,
            excTagMode
        };

        const updatedCDS = {
            contentRating,
            demographic,
            status
        };

        setAllTags(updatedTags);
        setFiltersCDS(updatedCDS);

        setSearchParams({
            filter: "Personalizado",
            page: 1,
            include: includeTag.length ? includeTag.join(",") : "false",
            exclude: excludeTag.length ? excludeTag.join(",") : "false",
            incMode: incTagMode || "false",
            excMode: excTagMode || "false",
            content: contentRating.length ? contentRating.join(",") : "false",
            demo: demographic.length ? demographic.join(",") : "false",
            stat: status.length ? status.join(",") : "false",
            sort: sortName,
            value: sortValue
        });
    };

    useEffect(() => {
        const fetchMangaFilter = async () => {
            let data;
            if (filter === "Mejor-Valorados") {
                data = await getMangasTopRated(mangasPerPage, (page - 1) * mangasPerPage);
            } else if (filter === "Ultimos-Lanzamientos") {
                data = await getMangasRecientes(mangasPerPage, (page - 1) * mangasPerPage);
            } else if (filter === "Todos-los mangas") {
                data = await getAllMangas(mangasPerPage, (page - 1) * mangasPerPage);
            } else {
                data = await getMangasByFilter(mangasPerPage, (page - 1) * mangasPerPage, allTags, filtersCDS, sortName, sortValue);
            }

            if (data) {
                setMangas(data.mangas);
                setTotalMangas(data.total);
            }
        };

        fetchMangaFilter();


    }, [filter, page, allTags, filtersCDS]);

    const handlePageChange = (newPage) => {
        const currentParams = Object.fromEntries(searchParams.entries());

        setSearchParams({
            ...currentParams,
            page: newPage
        });
    }

    const handleSearchOpen = () => {
        setAdvancedSearchOpen(prev => !prev)
    }

    const ResetParams = () => {
        setStatus([])
        setContentRating([])
        setDemographic([])
        setIncludeTag([])
        setExcludeTag([])
        setSortName()
        setSortValue()
    }

    return (
        <div className="xl:w-[1200px] mx-auto px-4">
            <h1 className="text-2xl font-bold light:text-black">Busqueda Avanzada</h1>
            <div className="flex mb-5 gap-3">
                <div className="flex items-center text-xl border-2 rounded-lg bg-slate-700 dark:bg-cyan-300 border-slate-700 light:bg-black dark:border-cyan-300 light:border-black grow">
                    <div className="flex h-full justify-center items-center mx-1">
                        <FontAwesomeIcon icon={faSearch} className="text-white dark:text-neutral-800 light:text-white px-1" />
                    </div>
                    <input type="text" placeholder="Buscar..." className="bg-gray-900 dark:bg-neutral-800 light:bg-cyan-50 w-full rounded-r-lg outline-none p-1 placeholder-gray-500 light:text-black" />
                </div>
                {!advancedSearchOpen ? (
                    <button
                        onClick={handleSearchOpen}
                        className="cursor-pointer flex items-center rounded-lg px-8 gap-1 font-bold bg-slate-700 text-white dark:bg-cyan-300 hover:bg-slate-600 dark:hover:bg-cyan-400 light:bg-black light:text-white light:hover:bg-gray-800 dark:text-neutral-800"
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                        Mostrar Filtros
                    </button>
                ) : (
                    <button
                        onClick={handleSearchOpen}
                        className="cursor-pointer flex items-center rounded-lg px-8 gap-1 font-bold bg-slate-700 text-white dark:bg-cyan-300 light:bg-black light:text-white light:hover:bg-gray-800 hover:bg-slate-600 dark:hover:bg-cyan-400 dark:text-neutral-800"
                    >
                        <FontAwesomeIcon icon={faChevronUp} />
                        Ocultar Filtros
                    </button>
                )}
            </div>
            <AnimatePresence>
                {advancedSearchOpen && (
                    <motion.div
                        initial={{ height: 0, scaleY: 0, originY: 0 }}
                        animate={{ height: "auto", scaleY: 1 }}
                        exit={{ height: 0, scaleY: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <AdvancedSearch
                            tags={tags} includeTag={includeTag} setIncludeTag={setIncludeTag} excludeTag={excludeTag} setExcludeTag={setExcludeTag} incTagMode={incTagMode} setIncTagMode={setIncTagMode}
                            excTagMode={excTagMode} setExcTagMode={setExcTagMode} contentRating={contentRating} setContentRating={setContentRating} demographic={demographic} setDemographic={setDemographic}
                            status={status} setStatus={setStatus} setSortName={setSortName} sortName={sortName} sortValue={sortValue} setSortValue={setSortValue} />
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div >
                <div
                    className="flex justify-end gap-2 ">
                    <button
                        onClick={ResetParams}
                        className="cursor-pointer rounded-sm px-2 py-1 bg-red-700 light:bg-red-200 light:hover:bg-red-300 hover:bg-red-800 light:border light:border-red-500 light:text-black">
                        Resetar Parametros
                    </button>
                    <button
                        onClick={sendFilters}
                        className="cursor-pointer rounded-sm px-8 py-1 font-bold bg-slate-700 dark:bg-cyan-300 light:bg-black light:text-white light:hover:bg-gray-800 dark:text-neutral-800 hover:bg-slate-600 dark:hover:bg-cyan-400">
                        Buscar
                    </button>
                </div>
                <h1 className='mb-3 text-lg light:text-black'>{filter ? filter.replace("-", " ").toUpperCase() : "Ingrese una busqueda..."}</h1>
                <MangaListFiltered mangas={mangas} />
                <Pagination
                    totalItems={totalMangas}
                    itemsPerPage={mangasPerPage}
                    currentPage={page}
                    onPageChange={handlePageChange}
                />
            </motion.div>
        </div >
    );
}

export default MangaList;