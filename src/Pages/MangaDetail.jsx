import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMangaById } from "../Services/MangaDex/MangaService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faBookOpen, faCircle, faClock, faList, faStar, faUpload, faExpand, faComment } from "@fortawesome/free-solid-svg-icons";
import { getMangaStatistics } from "../Services/MangaDex/StatisticsService";
import { getCapitulosManga } from "../Services/MangaDex/MangaService";
import Pagination from "../Components/Pagination";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import { getAllCovers } from "../Services/MangaDex/CoverService";
import ChooseChapterModal from "../Components/modals/ChooseChapterModal";
import { AnimatePresence } from "framer-motion";
import CoverDetailLoader from "../Components/skeletonLoader/ProfilePictureMangaLoader";
import CoverProfileLoader from "../Components/skeletonLoader/CoverProfileLoader";

dayjs.extend(relativeTime);
dayjs.locale("es");

const displayNames = new Intl.DisplayNames(['es'], { type: 'language' });

const languageMap = {
    "en": "gb",  // Inglés - Reino Unido
    "es-la": "mx",  // Español (Latinoamérica) - España
    "fr": "fr",  // Francés - Francia
    "pt-br": "br",  // Portugués (Brasil) - Brasil
    "ja": "jp",  // Japonés - Japón
    "zh": "cn",  // Chino Mandarín - China
    "zh-hk": "hk",  // Chino Hong Kong - Hong Kong
    "ko": "kr",  // Coreano - Corea del Sur
    "uk": "ua",  // Ucraniano - Ucrania
    "fa": "ir",  // Persa - Irán
    "hi": "in",  // Hindi - India
    "ta": "in",  // Tamil - India
    "kk": "kz",  // Kazajo - Kazajistán
    "he": "il",  // Hebreo - Israel
    "te": "in",   // Telugu - India
    "ja-ro": "ro" // Japonés en Rumanía - Rumanía
};

const getFlagUrl = (lang) => {
    const countryCode = languageMap[lang] || lang; // Usa el mapeo o el código original
    return `https://flagcdn.com/w20/${countryCode}.png`;
};

function MangaDetail() {
    const { id } = useParams(); // Extraemos el id desde los parámetros de la ruta
    const [manga, setManga] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [chapters, setchapters] = useState([]);
    const [lang, setLang] = useState("en");
    const [totalChapters, setTotalChapters] = useState(0);
    const mangasPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [activeModal, setActiveModal] = useState("chapter");
    const [allCovers, setAllCovers] = useState([]);
    const [modalFirstChapter, setModalFirstChapter] = useState(false);

    useEffect(() => {
        if (!id) return; // Evitamos llamar a la API si no hay id

        const fetchGetManga = async () => {
            const data = await getMangaById(id);
            const stats = await getMangaStatistics(id);
            const dataChapters = await getCapitulosManga(id, lang, mangasPerPage, (currentPage - 1) * mangasPerPage);
            const dataCovers = await getAllCovers(id)
            setManga(data)
            setStatistics(stats)
            setchapters(dataChapters.chapters)
            setTotalChapters(dataChapters.total)
            setAllCovers(dataCovers)
        }
        fetchGetManga();
    }, [id, lang, currentPage])

    const handeChangeLang = (e) => {
        setLang(e.target.value)
    }

    const handleClickModal = (section) => {
        setActiveModal(section)
    };

    const adultcontent = (index) => {
        if (manga?.content[index] === "Gore" || manga?.content[index] === "Sexual Violence") {
            return 'bg-red-700'
        } else {
            return 'bg-slate-800'
        }
    }

    return (
        <div className='w-[1200px]  mx-auto px-4 relative'>
            {modalFirstChapter && (
                <AnimatePresence>
                    <ChooseChapterModal
                        mangaId={id}
                        setModalOpen={setModalFirstChapter} // Pasa la función setModalOpen
                    />
                </AnimatePresence>
            )}
            {!manga?.coverUrl ? (
                <CoverProfileLoader />
            ) : (
                <div style={{ backgroundImage: `url(${manga?.coverUrl})` }} className="h-100 bg-cover brightness-80 rounded-xl border-2 border-white" />
            )}
            <div className="flex ml-10">
                <div className="absolute top-82">
                    {!manga?.coverUrl ? (
                        <CoverDetailLoader />
                    ) : (
                        <img src={`${manga?.coverUrl}.256.jpg`} alt={manga?.coverUrl} className="h-64 w-46 rounded-xl object-cover outline-4 outline-offset-0 outline-slate-700 outline-solid " />
                    )}
                </div>
                <div className="absolute left-65 mt-2 h-45 flex flex-col justify-between">
                    <h1 className="font-bold text-3xl line-clamp-2">{manga?.attributes?.title?.en}</h1>
                    <h2 className="text-sm font-medium"><FontAwesomeIcon icon={faCircle} className="text-green-400 text-[9px]" /> Publicacion: {manga?.attributes?.year}, {manga?.attributes?.status}</h2>
                    <h5 className="text-sm">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 pr-1" />{statistics?.rating?.average?.toFixed(2) || "-"}
                        <FontAwesomeIcon icon={faBookmark} className="pl-3 pr-1" />{statistics?.follows}
                        <FontAwesomeIcon icon={faComment} className="pl-3 pr-1" />{statistics?.comments?.repliesCount}
                    </h5>
                    <div className="flex gap-1 flex-wrap pr-1">
                        {manga?.content?.map((f, index) => (
                            <h1 className={`${adultcontent(index)} px-2 text-[10px] font-bold rounded-sm`} key={index}>{f.toUpperCase()}</h1>
                        )
                        )}
                        {manga?.genres?.map((f, index) => (
                            <h1 className="bg-slate-800 px-2 text-[10px] font-bold rounded-sm" key={index}>{f.toUpperCase()}</h1>
                        )
                        )}

                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setModalFirstChapter(true)} className="bg-slate-700 font-bold px-4 py-2 rounded-lg text-lg hover:bg-slate-600 cursor-pointer"><FontAwesomeIcon icon={faBookOpen} className="pr-2" />Leer Ahora</button>
                        <button className="bg-slate-700 font-bold px-4 py-2 rounded-lg text-lg hover:bg-slate-600 cursor-pointer"><FontAwesomeIcon icon={faList} className="pr-2" />Agregar a la lista</button>
                    </div>
                </div>
            </div>
            <p className="mt-54 px-10 text-gray-300 text-left text-sm">{manga?.attributes?.description?.es || manga?.attributes?.description?.en}</p>
            <div>
                <header className="my-5">
                    <nav>
                        <ul className="flex text-xl font-semibold ml-9">
                            <li>
                                <button
                                    onClick={() => handleClickModal("chapter")}
                                    className={`${activeModal === 'chapter' ? 'text-white bg-slate-700 border-slate-500' : 'text-gray-400'} border-slate-500 rounded-l-lg cursor-pointer border-1 px-5`}
                                >
                                    Capitulos
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleClickModal("detail")}
                                    className={`${activeModal === 'detail' ? 'text-white bg-slate-700 border-slate-500' : 'text-gray-400'} border-slate-500 cursor-pointer border-1 px-5`}
                                >
                                    Detalle
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleClickModal("art")}
                                    className={`${activeModal === 'art' ? 'text-white bg-slate-700 border-slate-500' : 'text-gray-400'} border-slate-500 rounded-r-lg cursor-pointer border-1 px-5`}
                                >
                                    Arte
                                </button>
                            </li>
                        </ul>
                    </nav>
                </header>
                <section className={`${activeModal === 'chapter' ? 'visible' : 'hidden'} mx-9 bg-slate-700 rounded-lg p-5`}>
                    <div >
                        <div className="flex justify-between items-center mb-5">
                            <div className="flex">
                                <label htmlFor="lang" className="bg-slate-200 text-gray-900 px-2 rounded-l-sm border-2 border-slate-200 font-bold">IDIOMAS DISPONIBLES</label>
                                <select name="lang" id="lang" onChange={handeChangeLang} className="bg-slate-900 text-slate-200 text-xs  w-35 px-2 rounded-r-sm border-2 border-slate-200">
                                    <option value="" disabled selected>Choose...</option>
                                    {manga?.attributes?.availableTranslatedLanguages?.map((l, index) => (
                                        <option key={index} value={l}>{displayNames.of(`${l}`).toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                            <button className="bg-slate-200 text-gray-900 rounded-sm border-2 font-bold px-2 h-8 cursor-pointer hover:bg-gray-900 hover:text-slate-200">
                                <FontAwesomeIcon icon={faUpload} className="pr-1" />UPLOAD CHAPTER
                            </button>
                        </div>
                        {chapters.map((c, index) => (
                            <Link key={index} to={`/chapter/${id}/${c.id}/${lang}`}>
                                <article className="bg-slate-600 flex justify-between rounded-xl px-2 py-3 mb-5 cursor-pointer hover:bg-slate-500">
                                    <h1>Volumen {c?.attributes?.volume}, Capitulo {c?.attributes?.chapter} - {c?.attributes?.title}</h1>
                                    <span className="text-gray-400">
                                        <FontAwesomeIcon icon={faClock} className="pr-1" />
                                        {c?.attributes?.updatedAt ? dayjs(c?.attributes?.updatedAt).fromNow() : "unknow date"}
                                    </span>
                                </article>
                            </Link>
                        ))}
                        <Pagination
                            totalItems={totalChapters}
                            itemsPerPage={mangasPerPage}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </section>
                <section className={`${activeModal === 'detail' ? 'visible' : 'hidden'} flex mx-9 bg-slate-700 rounded-lg p-5`}>
                    <div className="w-2/5">
                        <ul className="">
                            <li className="flex justify-between mb-3 border-b-1 border-slate-600">
                                <h2 className="text-gray-400 font-medium">Author</h2>
                                <div className="flex gap-4">
                                    {manga?.authors?.map((m, index) => (
                                        <span key={index} className=" font-light">{m}</span>))}
                                </div>
                            </li>
                            <li className="flex justify-between mb-3 border-b-1 border-slate-600">
                                <h2 className="text-gray-400 font-medium">Artist</h2>
                                <div className="flex gap-4">
                                    {manga?.artists?.map((m, index) => (
                                        <span key={index} className=" font-light">{m}</span>))}
                                </div>
                            </li>
                            <div className="flex justify-between">
                                <li className="flex   gap-2 mb-3 border-b-1 border-slate-600">
                                    <h2 className="text-gray-400 font-medium">Original Language</h2>
                                    <img src={getFlagUrl(manga?.attributes?.originalLanguage)} alt="lang" className="object-scale-down" />
                                    <span className="font-light">{manga?.attributes?.originalLanguage}</span>
                                </li>
                                <li className="flex  gap-2 mb-3 border-b-1 border-slate-600 ">
                                    <h2 className="text-gray-400 font-medium">Year</h2>
                                    <span className="font-light">{manga?.attributes?.year}</span>
                                </li>
                                <li className="flex   gap-2 mb-3 border-b-1 border-slate-600 ">
                                    <h2 className="text-gray-400 font-medium">Status</h2>
                                    <span className="font-light">{manga?.attributes?.status}</span>
                                </li>
                            </div>
                            <li className="mb-3 border-b-1 border-slate-600">
                                <h2 className="text-gray-400 font-medium">Alternative Titles</h2>
                                <div className="flex flex-col gap-2">
                                    {manga?.altTitles?.map((m, index) => {
                                        const lang = Object.keys(m)[0];
                                        const title = m[lang];
                                        return (
                                            <li key={index} className="flex gap-2 items-start">
                                                <img src={getFlagUrl(lang)} alt={lang} className="pt-1" />
                                                <span className="font-light text-sm">{title}</span>
                                            </li>
                                        )
                                    })}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="w-3/5">
                        <div className="bg-slate-500 mx-2 rounded-lg">
                            <div className="ml-2 mb-2">
                                <h1 className="font-bold">Genres</h1>
                                <div className="flex flex-wrap  gap-1">
                                    {manga?.genres?.map((g, index) => (
                                        <span key={index} className="text-gray-200 text-xs font-semibold bg-slate-600 rounded-sm px-1">{g}</span>))}
                                </div>
                            </div>
                            <div className="ml-2 pb-2">
                                <h1 className="font-bold">Content</h1>
                                <div className="flex flex-wrap  gap-1">
                                    {manga?.content?.length !== 0 ?
                                        manga?.content?.map((c, index) => (
                                            <span key={index} className="text-gray-200 text-xs font-semibold bg-slate-600 rounded-sm px-1">{c}</span>))
                                        :
                                        <p className="text-gray-300 text-left text-xs">No content available.</p>
                                    }
                                </div>
                            </div>
                            <div className="ml-2 mb-2">
                                <h1 className="font-bold">Themes</h1>
                                <div className="flex flex-wrap  gap-1">
                                    {manga?.themes?.map((t, index) => (
                                        <span key={index} className="text-gray-200 text-xs font-semibold bg-slate-600 rounded-sm px-1">{t}</span>))}
                                </div>
                            </div>
                            <div className="ml-2 pb-2">
                                <h1 className="font-bold">Demographic</h1>
                                <span className="text-gray-200 text-xs font-semibold bg-slate-600 rounded-sm px-1">{manga?.attributes?.publicationDemographic}</span>
                            </div>
                            <div className="ml-2 pb-2">
                                <h1 className="font-bold">Content Raiting</h1>
                                <span className="text-gray-200 text-xs font-semibold bg-slate-600 rounded-sm px-1">{manga?.attributes?.contentRating}</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={`${activeModal === 'art' ? 'visible' : 'hidden'} mx-9 bg-slate-700 rounded-lg p-5 flex flex-wrap gap-2`}>
                    {allCovers?.map((c, index) => (
                        <div key={index} className="relative group cursor-pointer">
                            <FontAwesomeIcon icon={faExpand} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl z-20 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                            <img src={c?.coverUrl} alt={c?.volume} className="h-60 w-42 object-cover relative z-10 transition-all duration-300 group-hover:brightness-50" />
                            <h1 className="bg-gradient-to-t from-black to-transparent w-full absolute bottom-0 left-0 px-2 z-20">Volumen {c.volume}</h1>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    )
}

export default MangaDetail;