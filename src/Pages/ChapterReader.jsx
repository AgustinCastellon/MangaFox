import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getChapter } from "../Services/MangaDex/AtHomeService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronLeft, faChevronRight, faClose, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { getCapitulosManga, getRandomManga } from "../Services/MangaDex/MangaService";
import ChapterMenu from "../Components/ChapterMenu";
import { motion, AnimatePresence } from "framer-motion";
import ChapterPageLoader from "../Components/skeletonLoader/ChapterPageLoader";

function ChapterReader() {

    const { mangaid, chapterid, lang } = useParams();
    const [chapter, setChapter] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [randomManga, setRandomManga] = useState(null);
    const [activeMenu, setActiveMenu] = useState(true);
    const [currentChapter, setCurrentChapter] = useState(chapterid);
    const [selectedPage, setSelectedPage] = useState(0);
    const imagesContainerRef = useRef(null);
    const imagesRef = useRef([]);
    const imgFullRef = useRef(null)
    const [manualScroll, setManualScroll] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState();
    const [groupedVolumes, setGroupedVolumes] = useState({});
    const [zoom, setZoom] = useState(60);
    const [numberChapter, setNumberChapter] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    useEffect(() => {
        const onFullScreenChange = () => {
            const isFullscreen = !!document.fullscreenElement;
            setIsFullScreen(isFullscreen); // Actualiza el estado de pantalla completa

            // Actualiza el zoom basándonos en si estamos en pantalla completa
            if (isFullscreen) {
                setZoom(120);
            } else {
                setZoom(60);
            }
        };

        document.addEventListener('fullscreenchange', onFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', onFullScreenChange);
        };
    }, []);

    const imgZoom = (zoom) => {
        switch (zoom) {
            case 20:
                return 'w-[200px]'
            case 40:
                return 'w-[400px]'
            case 60:
                return 'w-[600px]'
            case 80:
                return 'w-[800px]'
            case 100:
                return 'w-[1080px]'
            case 120:
                return 'w-[auto]'
        }
    }

    useEffect(() => {
        const volumes = {};

        chapters?.forEach((chapter) => {
            const volume = chapter?.attributes?.volume || '-'; // Default to '-' if no volume

            // Si el volumen no existe en el objeto, lo creamos
            if (!volumes[volume]) {
                volumes[volume] = [];
            }

            // Añadimos el capítulo a la lista de capítulos de ese volumen
            volumes[volume].push({
                value: chapter?.id,
                label: chapter?.attributes?.chapter,
            });

        });
        // Actualizamos el estado con los volúmenes agrupados
        setGroupedVolumes(volumes);
    }, [chapters,]);

    useEffect(() => {
        if (!chapterid) return;

        const fetchGetChapter = async () => {
            const data = await getChapter(currentChapter);
            setChapter(data);

        };

        const fetchGetAllChapters = async () => {
            const data = await getCapitulosManga(mangaid, lang);
            const dataRManga = await getRandomManga();
            setChapters(data.chapters);
            setRandomManga(dataRManga);
        }



        fetchGetAllChapters()
        fetchGetChapter()

    }, [chapterid, mangaid, lang, currentChapter])

    // Manejar el cambio manual en el select para una pagina
    const handleSelectChange = (e) => {
        const newPage = parseInt(e.target.value);
        setManualScroll(true); // Indica que el usuario seleccionó manualmente
        setSelectedPage(newPage);
    };

    const handleSelectChapterChange = (e) => {
        const newChapter = e.target.value;
        setCurrentChapter(newChapter)
    }

    useEffect(() => {
        if (!imagesContainerRef.current || manualScroll) return; // Evitar conflictos

        const observerOptions = {
            root: imagesContainerRef.current,
            rootMargin: "0px",
            threshold: 0.6,
        };

        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const index = imagesRef.current.indexOf(entry.target);
                    setSelectedPage(index);
                    break;
                }
            }
        }, observerOptions);

        imagesRef.current.forEach((img) => {
            if (img) observer.observe(img);
        });

        return () => observer.disconnect();
    }, [chapter, manualScroll]);

    useEffect(() => {
        if (!manualScroll || !imagesRef.current[selectedPage]) return;

        imagesRef.current[selectedPage].scrollIntoView({ behavior: "smooth", block: "start" });

        setTimeout(() => setManualScroll(false), 500); // Evita conflictos después de 500ms
    }, [selectedPage, manualScroll]);



    const handleCloseMenu = () => {
        setActiveMenu(false)
    }

    const handleActiveMenu = () => {
        setActiveMenu(true)
    }

    const handleNextPage = () => {
        setManualScroll(true);
        setSelectedPage((prev) => Math.min(prev + 1, imagesRef.current.length - 1));
    };

    const handlePrevPage = () => {
        setManualScroll(true);
        setSelectedPage((prev) => Math.max(prev - 1, 0));
    };

    const handleChapterFiltered = (e) => {
        const filter = parseInt(e.target.value);
        setSelectedChapter(filter);
    }

    const handleNextChapter = () => {
        const currentIndex = chapters.findIndex(ch => ch.id === currentChapter);
        if (currentIndex < chapters.length - 1) {
            setCurrentChapter(chapters[currentIndex + 1].id);
            let number = chapters[currentIndex + 1].attributes.chapter
            setNumberChapter(number);
        }
    }

    const handlePrevChapter = () => {
        const currentIndex = chapters.findIndex(ch => ch.id === currentChapter);
        if (currentIndex > 0) {
            setCurrentChapter(chapters[currentIndex - 1].id);
            let number = chapters[currentIndex - 1].attributes.chapter
            setNumberChapter(number);
        }
    }

    useEffect(() => {
        const currentIndex = chapters.findIndex(ch => ch.id === currentChapter);
        if (currentIndex !== -1) {
            setNumberChapter(chapters[currentIndex].attributes.chapter);
        }
    }, [currentChapter, chapters]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            imgFullRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        console.log(imgFullRef)
    }

    // Combinando refs
    const combinedRef = (node) => {
        imagesContainerRef.current = node;
        imgFullRef.current = node; // Esto asegura que ambos refs apuntan al mismo elemento
    };

    useEffect(() => {
        if (activeMenu) {
            // Desactiva el scroll horizontal al activar el menú
            document.body.style.overflowX = 'hidden';
        } else {
            // Vuelve a habilitar el scroll horizontal cuando se cierra el menú
            document.body.style.overflowX = 'hidden';
        }
    }, [activeMenu]);

    return (
        <div className="flex justify-center relative">
            <FontAwesomeIcon onClick={handleActiveMenu} icon={faBars} className={`${activeMenu == true ? 'invisible' : 'visible'} -top-42 absolute right-2 z-3 text-xl  rounded-lg px-2 py-1 hover:bg-slate-500 cursor-pointer `} />
            <AnimatePresence >
                {activeMenu && (
                    <motion.div
                        className="z-2 -top-43 absolute right-1 w-95 bg-slate-600 rounded-lg"
                        initial={{ opacity: 0, x: '100vw' }}  // Start from outside the screen
                        animate={{ opacity: 1, x: 0 }}         // Slide in to its position
                        exit={{ opacity: 0, x: '100vw' }}     // Slide out to the right when closing
                        transition={{
                            type: 'tween',                      // Smooth transition
                            ease: 'easeOut',
                            duration: 0.2                       // Set duration for smooth animation
                        }}
                    >
                        <FontAwesomeIcon onClick={handleCloseMenu} icon={faClose} className="ml-4 text-2xl my-2 cursor-pointer hover:bg-slate-700 rounded-full px-2 py-1" />
                        <div className="scrollbar overflow-y-scroll h-[805px] mb-3 scrollable-menu">
                            <div className="flex flex-col px-4 pt-2">
                                <div className="flex justify-between">
                                    <button
                                        onClick={handlePrevPage} disabled={selectedPage === 0}
                                        className={`${selectedPage === 0 ? 'bg-gray-700 hover:cursor-auto' : 'bg-slate-500'}  px-3 py-0.5 text-2xl rounded-l-lg cursor-pointer `}><FontAwesomeIcon icon={faChevronLeft} /></button>
                                    <select
                                        className="bg-slate-700 flex-grow mx-2 scrollbar scrollbar-thumb-slate-400"
                                        value={selectedPage}
                                        onChange={handleSelectChange}
                                    >
                                        {chapter?.map((_, index) => (
                                            <option key={index} value={index} >
                                                Página {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={handleNextPage} disabled={selectedPage === imagesRef.current.length - 1}
                                        className={`${selectedPage === imagesRef.current.length - 1 ? 'bg-gray-700 hover:cursor-auto' : 'bg-slate-500'} px-3 text-2xl rounded-r-lg cursor-pointer `}><FontAwesomeIcon icon={faChevronRight}
                                        />
                                    </button>
                                </div>
                                <div className="flex justify-between gap-2 mt-2">
                                    <input onChange={handleChapterFiltered} value={selectedChapter} type="number" placeholder="Chapter No..." className="bg-slate-700 flex-grow rounded-l-lg p-1 placeholder:text-sm" />
                                    <select onChange={handleSelectChapterChange} className="bg-slate-700 w-35 rounded-r-lg text-sm text-gray-400 scrollbar scrollbar-thumb-slate-400">
                                        <option hidden disabled selected>Chapters</option>
                                        {Object.keys(groupedVolumes).map((volume, index) => (
                                            <optgroup key={index} label={`Volumen ${volume}`}>
                                                {groupedVolumes[volume].map((chapter, chapterIndex) => (
                                                    <option className="text-white" key={chapterIndex} value={chapter.value}>
                                                        Cap {chapter.label}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="text-sm mt-7 mb-2 border-b-1 border-slate-500 pb-4 mx-3 h-115 overflow-auto scrollable-menu">
                                <ul className="">
                                    {selectedChapter ?
                                        (
                                            chapters?.filter(cap => cap.attributes.chapter.includes(selectedChapter))
                                                .map((chapter, index) => (
                                                    <div key={index} className={`${currentChapter == chapter?.id ? 'bg-slate-500' : 'bg-slate-700 '} flex items-center justify-between mb-2 p-2 rounded-lg hover:bg-slate-500 cursor-pointer`}>
                                                        <li onClick={() => setCurrentChapter(chapter?.id)} className="line-clamp-1 pr-2">Cap {chapter?.attributes?.chapter} - {chapter?.attributes?.title}</li>
                                                        {currentChapter === chapter?.id && (
                                                            <FontAwesomeIcon icon={faPlay} className="text-white" />
                                                        )}
                                                    </div>
                                                ))
                                        ) :
                                        (
                                            chapters?.map((chapter, index) => (
                                                <div key={index} className={`${currentChapter === chapter?.id ? 'bg-slate-500' : 'bg-slate-700 '} flex items-center justify-between mb-2 p-2 rounded-lg hover:bg-slate-500 cursor-pointer`}>
                                                    <li onClick={() => setCurrentChapter(chapter?.id)} className="line-clamp-1 pr-2">Cap {chapter?.attributes?.chapter} - {chapter?.attributes?.title}</li>
                                                    {currentChapter === chapter?.id && (
                                                        <FontAwesomeIcon icon={faPlay} className="text-white" />
                                                    )}
                                                </div>
                                            ))
                                        )}
                                </ul>
                            </div>
                            <div className="mx-3">
                                <h1 className="text-xl font-bold mb-2">Suggested for you</h1>
                                <div className="flex">
                                    <div>
                                        <img src={randomManga?.coverUrl} alt={randomManga?.coverUrl} className="h-50 w-35 rounded-lg object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-between pl-2">
                                        <div>
                                            <div>
                                                <h1 className="text-slate-400">Status</h1>
                                                <h3>{randomManga?.manga?.attributes?.status.toUpperCase()}</h3>
                                            </div>
                                            <div>
                                                <h1 className="text-slate-400">Content Rating </h1>
                                                <h3>{randomManga?.manga?.attributes?.contentRating}</h3>
                                            </div>
                                        </div>
                                        <div>
                                            <button className='bg-slate-700 font-bold text-sm rounded-lg w-35 p-1 hover:bg-slate-500 cursor-pointer'>
                                                <FontAwesomeIcon icon={faPlay} /> Watch Now
                                            </button>
                                            <button className='bg-slate-700 font-bold text-sm p-1 rounded-full w-8 ml-5 hover:bg-slate-500 cursor-pointer'>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="text-lg font-bold mt-1">{randomManga?.manga?.attributes?.title?.en}</h1>
                                <p className="bg-slate-700 px-2 py-1 rounded-lg text-xs text-gray-300">{randomManga?.manga?.attributes?.description?.en}</p>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
            <div
                ref={combinedRef}
                className="bg-black rounded-xl fixed w-[1090px] top-20 z-2 scrollbar scrollbar-hover:cursor-grab scrollbar-thumb-slate-700 overflow-y-scroll h-[870px] group "
            >
                <ChapterMenu
                    chapters={chapters} currentChapter={currentChapter} handleNextChapter={handleNextChapter}
                    handlePrevChapter={handlePrevChapter} isFullScreen={isFullScreen} numberChapter={numberChapter} setZoom={setZoom} zoom={zoom} toggleFullScreen={toggleFullScreen}
                />
                {chapter?.map((page, index) => (
                    <div key={index}>
                        {!imageLoaded && (
                            <ChapterPageLoader/>
                        )}
                        <img
                            key={index}
                            ref={(el) => (imagesRef.current[index] = el)} // Guardar referencia de cada imagen
                            src={page?.pageUrl}
                            alt={`Página ${index + 1}`}
                            className={`${imgZoom(zoom)} m-auto pb-2 transform duration-300 ease-in-out`}
                            onLoad={handleImageLoad}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterReader;