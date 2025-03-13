import { faPlay, faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from "react-slick";
import PropTypes from "prop-types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`} >
            <FontAwesomeIcon icon={faChevronLeft} class="arrows" style={{ color: "white", position: "relative", right: "30" }} />
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
            <FontAwesomeIcon icon={faChevronRight} class="arrows" style={{ color: "white", position: "relative", left: "30" }} />
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
};


function carousel({ mangas = [] }) {
    return (

        <div className='w-[900px] m-auto' id="carousel-slider">
            <Slider {...settings} >
                {mangas?.map((d, index) => (
                    <div key={index} className='block bg-linear-to-r/srgb from-slate-700 to-gray-900 backdrop-opacity-10 backdrop-blur-sm'>
                        <div className='flex '>
                            <div className='w-1/4 flex-shrink-0' >
                                <img src={`${d.coverUrl}.512.jpg`} alt={d.title || "Manga Fox"} className='rounded-lg w-50 h-[300px] object-cover' />
                            </div>
                            <div className='flex flex-col justify-between  w-3/4'>
                                <header>

                                    <h1 className='font-black text-3xl line-clamp-2'>{d.title}</h1>
                                    <div className='flex gap-2 pt-5 flex-wrap'>
                                        {d.genres.map((genre, index) => (
                                            <span key={index} className='bg-gray-700 text-[10px] font-bold px-1 rounded-md'>
                                                {genre}
                                            </span>
                                        ))
                                        }
                                    </div>

                                </header>
                                <p className='text-gray-300 text-left text-sm mt-3 line-clamp-5'>
                                    {d.description ? d.description : "Not description..."}
                                </p>
                                <div className='text-end pb-1'>
                                    <button className='bg-slate-700 font-bold text-lg rounded-lg w-40 p-1 hover:bg-slate-600 cursor-pointer'>
                                        <FontAwesomeIcon icon={faPlay} /> Watch Now
                                    </button>
                                    <button className='bg-slate-700 font-bold text-lg p-1 rounded-full w-9 ml-6 hover:bg-slate-600 cursor-pointer'>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>

    )
};

export default carousel;