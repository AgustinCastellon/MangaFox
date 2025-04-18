import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowRight, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


function ModalMangaCard({ manga, position, listPosition }) {


    return (
        <div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: .3 }}
                className={`absolute backdrop-blur-sm backdrop-brightness-20 ${position === "right" ? "2xl:left-47 lg:left-32" : "2xl:right-47 lg:right-32"}
            ${listPosition === "newPosition" ? "-top-15 left" : "top-0"} 2xl:w-72 2xl:h-85 lg:w-62 lg:h-74 rounded-md shadow-lg z-50`}
            >
                <div className="">
                    <img src={manga.coverUrl} alt={manga.title} className="rounded-t-sm h-30 w-72 object-top object-cover" />
                </div>
                <div className="mt-1 p-2">
                    <h2 className="text-sm font-bold 2xl:line-clamp-2 lg:line-clamp-1">{manga.title}</h2>
                    <p className="text-xs text-gray-300 max-h-15 2xl:line-clamp-4 lg:line-clamp-2">{manga.description}</p>
                    <div className="mt-2 text-xs opacity-75">
                        <p><strong>Autor:</strong> {manga.author}</p>
                        <p><strong>Publicación:</strong> {manga.year}</p>
                        <p><strong>Status:</strong> {manga.status}</p>
                    </div>
                </div>
                <div className="flex absolute justify-center w-full 2xl:bottom-2 lg:bottom-5 gap-1 px-2 ">
                    <Link to={`/manga/${manga.id}`} className="" >
                        <button className="flex justify-center items-center bg-gray-700 light:bg-cyan-100 light:text-black dark:bg-cyan-300 dark:hover:bg-cyan-200 dark:text-black light:hover:bg-cyan-50 px-3 py-1 rounded-l-md text-white cursor-pointer hover:bg-gray-500">
                            <FontAwesomeIcon icon={faBookOpen} className="text-xl" />
                            <span className="pl-2">Ver manga</span> 
                        </button>
                    </Link>
                    <Link to={""} className="" >
                        <button className="flex justify-center h-full items-center bg-gray-700 light:bg-cyan-100 light:text-black dark:bg-cyan-300 dark:hover:bg-cyan-200 dark:text-black light:hover:bg-cyan-50 px-3 py-1 rounded-r-md text-white cursor-pointer hover:bg-gray-500">
                            <FontAwesomeIcon icon={faPlus} className="text-xl" />
                        </button>
                    </Link>

                </div>
            </motion.div>
        </div>
    );
}

ModalMangaCard.propTypes = {
    manga: PropTypes.shape({
        coverUrl: PropTypes.string.isRequired,     // URL de la portada
        title: PropTypes.string.isRequired,        // Título del manga
        description: PropTypes.string.isRequired,  // Descripción del manga
        author: PropTypes.string.isRequired,       // Autor del manga
        year: PropTypes.string.isRequired,         // Año de publicación
        status: PropTypes.string.isRequired,       // Estado del manga (e.g., "ongoing", "completed")
    }).isRequired,
    position: PropTypes.oneOf(["right", "left"]).isRequired,  // Posición, solo puede ser "right" o "left"
};

export default ModalMangaCard;