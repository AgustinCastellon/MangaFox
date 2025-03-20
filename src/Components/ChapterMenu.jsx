import { faChevronLeft, faChevronRight, faExpand, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

function ChapterMenu ({chapters, currentChapter, zoom, setZoom, isFullScreen, handleNextChapter, handlePrevChapter, numberChapter, toggleFullScreen}) {
    
    return(
        <div className={`${isFullScreen ? 'hidden' : 'flex'} bottom-0 z-9 p-5 fixed justify-between items-center w-[1090px] opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all delay-100 duration-500 ease-in-out`}>
                    <div className=" text-sm font-semibold bottom-6 text-zinc-300">
                        <button onClick={() => setZoom(zoom - 20)} disabled={zoom === 20} className="px-3 py-2 border-y-1 border-l-1 rounded-l-lg border-zinc-800 bg-zinc-900 hover:bg-zinc-700 cursor-pointer">
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="px-2 py-2 border-y-1 border-zinc-800 bg-zinc-900 select-none backdrop-blur-xl">{zoom}%</span>
                        <button onClick={() => setZoom(zoom + 20)} disabled={zoom === 100} className="px-3 py-2 border-y-1 border-r-1 rounded-r-lg border-zinc-800 bg-zinc-900 hover:bg-zinc-700 cursor-pointer">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    <div className="text-sm font-semibold bottom-6 text-zinc-300">
                        <button
                            className="px-3 py-2 border-y-1 border-l-1 rounded-l-lg border-zinc-700 bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
                            onClick={handlePrevChapter}
                            disabled={chapters.findIndex(ch => ch.id === currentChapter) === 0}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span className="px-4 py-2 border-y-1 border-zinc-700 bg-zinc-800 select-none">Chapter {numberChapter}</span>
                        <button
                            className=" px-3 py-2 border-y-1 border-r-1 rounded-r-lg border-zinc-700 bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
                            onClick={handleNextChapter}
                            disabled={chapters.findIndex(ch => ch.id === currentChapter) === chapters.length - 1}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    <div className="text-sm font-semibold bottom-6 text-zinc-300 ">
                        <button
                            className="px-3 py-2 border-1 rounded-lg border-zinc-700  hover:bg-zinc-800 bg-zinc-900 cursor-pointer"
                            onClick={toggleFullScreen}
                        >
                            <FontAwesomeIcon icon={faExpand} className="text-sm transition duration-300 ease-in-out hover:scale-120" />
                        </button>
                    </div>
                </div>
    )
}

ChapterMenu.propTypes = {
    chapters: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired, 
            title: PropTypes.string 
        })
    ).isRequired,
    currentChapter: PropTypes.string.isRequired, 
    zoom: PropTypes.number.isRequired,
    setZoom: PropTypes.func.isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    handleNextChapter: PropTypes.func.isRequired,
    handlePrevChapter: PropTypes.func.isRequired,
    numberChapter: PropTypes.number.isRequired,
    toggleFullScreen: PropTypes.func.isRequired
};

export default ChapterMenu;