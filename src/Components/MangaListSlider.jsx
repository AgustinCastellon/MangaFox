import PropTypes from "prop-types";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import { useState } from "react";
import ModalMangaCard from "./modals/MangaModalCard";
import { Link } from "react-router-dom";



function MangaListSlider({ topMangas }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [mangaId, setMangaId] = useState(null);
    const [modalPosition, setModalPosition] = useState(null)

    const handleMouseEnter = (id, event) => {
        if (!event) return; // Previene errores si el evento no está disponible

        const rect = event.currentTarget.getBoundingClientRect();

        // Si el modal se sale del borde derecho, lo mostramos a la izquierda
        if (rect.right + 450 > window.innerWidth) {
            setModalPosition("left");
        } else {
            setModalPosition("right");
        }
        console.log(rect.right, window.innerWidth)
        setMangaId(id);
    };

    const handleMouseLeave = () => {
        setMangaId(null);
    }

    const SamplePrevArrow = (props) => {
        const firstPage = activeSlide == 0;
        const { className, style, onClick } = props;
        return (
            <div className={firstPage ? `invisible` : `bg-linear-to-r from-black from-10% to-transparent to-65%  absolute z-2 h-76 w-9 hover:to-95%`}>
                <div onClick={onClick} className={`arrow ${className}`} >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="text-white text-5xl transition duration-300 -translate-y-1/2 relative left-7"
                    />
                </div>

            </div>
        )
    }

    function SampleNextArrow(props) {

        const { className, style, onClick } = props;
        return (
            <div className="bg-linear-to-l from-black from-05% to-transparent to-50% bottom-13 right-0 absolute z-2 h-77 w-15 hover:to-70%">
                <div onClick={onClick} className={`arrow ${className}`} >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-white text-5xl transition duration-300 -translate-y-1/2 relative right-10"
                    />
                </div>
            </div>
        )
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5.5,
        slidesToScroll: 5,

        beforeChange: (current, next) => {
            setActiveSlide(next);
        },
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />
    };

    return (
        <div className="block h-94 " id="manga-slider">
            <Slider {...settings} >
                {topMangas?.map((manga, index) =>
                    <Link key={index} to={`/manga/${manga.id}`}>
                        <div className="relative" onMouseEnter={(event) => handleMouseEnter(manga.id, event)} onMouseLeave={handleMouseLeave}>
                            <img src={`${manga.coverUrl}.512.jpg`} alt={manga.title} className="h-76 w-50 rounded-sm hover:brightness-70 object-cover" />
                            <h1 className="pr-5 line-clamp-2">{manga.title}</h1>
                            {mangaId === manga.id && <ModalMangaCard manga={manga} position={modalPosition} />}
                        </div>
                    </Link>
                )}
            </Slider>
        </div>
    )
}

// Definición de PropTypes para validar los props del componente
MangaListSlider.propTypes = {
    topMangas: PropTypes.arrayOf(
        PropTypes.shape({
            coverUrl: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        })
    ).isRequired
};


export default MangaListSlider;

// text-white text-5xl transition duration-300 -translate-y-1/2 relative right-10 hover:bg-gray-800