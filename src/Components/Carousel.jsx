import { faPlay, faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from "react-slick";
import PropTypes from "prop-types";
import { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatePresence } from 'framer-motion';
import ChooseChapterModal from './modals/ChooseChapterModal';   
import CarouselLoader from './skeletonLoader/CarouselLoader';

const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`} >
            <FontAwesomeIcon icon={faChevronLeft} class="arrows" style={{ color: "gray", position: "relative", right: "30" }} />
        </div>
    )
}

SamplePrevArrow.propTypes = {
    className: PropTypes.string.isRequired, // `className` debe ser un string
    onClick: PropTypes.func.isRequired, // `onClick` es una función obligatoria
};

SampleNextArrow.propTypes = {
    className: PropTypes.string.isRequired, // `className` debe ser un string
    onClick: PropTypes.func.isRequired, // `onClick` es una función obligatoria
};

function SampleNextArrow(props) {
    const { className, onClick } = props;
    
    return (
        <div onClick={onClick} className={`arrow ${className}`} >
            <FontAwesomeIcon icon={faChevronRight} class="arrows" style={{ color: "gray", position: "relative", left: "30" }} />
        </div>
    )
}

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
    responsive: [
        {
            breakpoint: 1535,
            settings: {
                arrows: null,
            }
        }
    ]
};


function Carousel({ mangas = [] }) {

    const [modalFirstChapter, setModalFirstChapter] = useState(false);
    const [mangaId, setMangaId] = useState(null);

    const handleModal = (id) => {
        setModalFirstChapter(true);
        setMangaId(id);
        console.log(mangaId)
    }

    return (

        <div className='2xl:w-[900px] m-auto' id="carousel-slider">
            {modalFirstChapter && (
                <AnimatePresence>
                    <ChooseChapterModal
                        mangaId={mangaId}
                        setModalOpen={setModalFirstChapter} // Pasa la función setModalOpen
                    />
                </AnimatePresence>
            )}
            {!mangas ? (
                <CarouselLoader />
            ) : (
                <Slider {...settings}>
                    {mangas?.map((d, index) => (
                        <div key={index} className='block bg-linear-to-r/srgb from-slate-800 to-gray-900 light:from-amber-100 light:to-amber-50 dark:from-stone-800 dark:to-stone-900 dracula:from-dracula-700 dracula:to-dracula-800'>
                            <div className='flex '>
                                <div className='w-1/4 flex-shrink-0' >
                                    <img src={`${d.coverUrl}`} alt={d.title || "Manga Fox"} className='rounded-lg w-50 h-[300px] object-cover' />
                                </div>
                                <div className='flex flex-col justify-between  w-3/4'>
                                    <header>

                                        <h1 className='font-black md:text-xl 2xl:text-3xl line-clamp-2 light:text-black light:pr-2'>{d.title}</h1>
                                        <div className='flex gap-2 pt-5 flex-wrap'>
                                            {d.genres.map((genre, index) => (
                                                <span key={index} className='bg-gray-700 dark:bg-neutral-600 dracula:bg-dracula-500 light:bg-cyan-100 light:text-black text-[10px] font-bold px-1 rounded-md'>
                                                    {genre}
                                                </span>
                                            ))
                                            }
                                        </div>

                                    </header>
                                    <p className='text-gray-300 light:text-gray-800 text-left text-sm mt-3 line-clamp-5 light:pr-2'>
                                        {d.description ? d.description : "Not description..."}
                                    </p>
                                    <div className='text-end pb-1 pr-2'>
                                        <button onClick={() => handleModal(d?.id)} className='bg-slate-700 light:bg-cyan-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 light:text-black font-bold dracula:bg-dracula-500 dracula:hover:bg-dracula-400 text-lg rounded-lg w-40 p-1 light:hover:bg-cyan-200 hover:bg-slate-600 cursor-pointer light:border-1'>
                                            <FontAwesomeIcon icon={faPlay} /> Leer Ahora
                                        </button>
                                        <button className='bg-slate-700 light:bg-cyan-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 light:text-black font-bold text-lg p-1 rounded-full w-9 ml-6 dracula:bg-dracula-500 dracula:hover:bg-dracula-400 light:hover:bg-cyan-200 hover:bg-slate-600 cursor-pointer light:border-1 '>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div>

    )
};

export default Carousel;