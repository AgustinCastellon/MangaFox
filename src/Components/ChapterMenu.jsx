import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay, faPlus, faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ChapterMenu = ({ chapters, randomManga, selectedPage, handleSelectChange, handleNextPage, handlePrevPage, setCurrentChapter }) => {
    const [activeMenu, setActiveMenu] = useState(true);

    const handleCloseMenu = () => {
        setActiveMenu(false);
    };

    const handleActiveMenu = () => {
        setActiveMenu(true);
    };
    if (!chapters || !randomManga) {
        return <div>Loading...</div>;
    }
    return (
        <div className="relative z-99">
            <FontAwesomeIcon onClick={handleActiveMenu} icon={faBars} className={`${activeMenu ? 'invisible' : 'visible'} -top-42 absolute left-225 z-3 text-xl rounded-lg px-2 py-1 hover:bg-slate-500 cursor-pointer`} />
            <div className={`${activeMenu ? 'visible' : 'invisible'} z-2 -top-43 absolute left-139 w-95 bg-slate-600 rounded-lg`}>
                <FontAwesomeIcon onClick={handleCloseMenu} icon={faClose} className="ml-4 text-2xl my-2 cursor-pointer hover:bg-zinc-600 rounded-full px-2 py-1" />
                <div className="scrollbar overflow-y-scroll h-[805px] mb-3 scrollable-menu">
                    {/* Navegación de Páginas */}
                    <div className="flex flex-col px-4 pt-2">
                        <div className="flex justify-between">
                            <button
                                onClick={handlePrevPage}
                                disabled={selectedPage === 0}
                                className={`${selectedPage === 0 ? 'bg-zinc-600 hover:cursor-auto' : 'bg-slate-500'}  px-3 py-0.5 text-2xl rounded-l-lg cursor-pointer`}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <select
                                className="bg-slate-700 flex-grow mx-2"
                                value={selectedPage}
                                onChange={handleSelectChange}
                            >
                                {chapters?.map((_, index) => (
                                    <option key={index} value={index}>
                                        Página {index + 1}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleNextPage}
                                disabled={selectedPage === chapters.length - 1}
                                className={`${selectedPage === chapters.length - 1 ? 'bg-zinc-600 hover:cursor-auto' : 'bg-slate-500'} px-3 text-2xl rounded-r-lg cursor-pointer`}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>

                        {/* Entrada para seleccionar capítulo */}
                        <div className="flex justify-between gap-2 mt-2">
                            <input type="number" placeholder="Chapter..." className="bg-slate-700 flex-grow rounded-l-lg p-1" />
                            <select name="" className="bg-slate-700 w-25 rounded-r-lg">
                                <option value="">1-10</option>
                            </select>
                        </div>
                    </div>

                    {/* Lista de Capítulos */}
                    <div className="text-sm mt-7 mb-2 border-b-1 border-slate-500 pb-4 mx-3">
                        <ul>
                            {chapters?.map((chapter, index) => (
                                <li
                                    onClick={() => setCurrentChapter(chapter?.id)}
                                    key={index}
                                    className="bg-slate-700 mb-2 p-2 rounded-lg hover:bg-slate-500 cursor-pointer"
                                >
                                    Cap {chapter?.attributes?.chapter} - {chapter?.attributes?.title}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Manga Sugerido */}
                    <div className="mx-3">
                        <h1 className="text-xl font-bold mb-2">Suggested for you</h1>
                        <div className="flex">
                            <div>
                                <img
                                    src={randomManga?.coverUrl}
                                    alt={randomManga?.coverUrl}
                                    className="h-50 w-35 rounded-lg object-fill"
                                />
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
                                    <button className="bg-slate-700 font-bold text-sm rounded-lg w-35 p-1 hover:bg-slate-500 cursor-pointer">
                                        <FontAwesomeIcon icon={faPlay} /> Watch Now
                                    </button>
                                    <button className="bg-slate-700 font-bold text-sm p-1 rounded-full w-8 ml-5 hover:bg-slate-500 cursor-pointer">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-lg font-bold mt-1">{randomManga?.manga?.attributes?.title?.en}</h1>
                        <p className="bg-slate-700 px-2 py-1 rounded-lg text-xs text-gray-300">{randomManga?.manga?.attributes?.description?.en}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChapterMenu;
