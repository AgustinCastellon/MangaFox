import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

function ModalMangaCard({ manga, position, listPosition }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, delay: .3 }}
            className={`absolute backdrop-blur-sm backdrop-brightness-20 ${position === "right" ? "left-47" : "right-47"}
            ${listPosition === "newPosition" ? "-top-15 left" : "top-0"} w-72 h-85 rounded-md shadow-lg z-50`}
        >
            <div className="">
                <img src={manga.coverUrl} alt={manga.title} className="rounded-t-sm h-30 w-72 object-top object-cover" />
            </div>
            <div className="mt-1 p-2 ">
                <h2 className="text-sm font-bold line-clamp-2">{manga.title}</h2>
                <p className="text-xs text-gray-300 max-h-15 overflow-y-scroll overflow-x-hidden scroll-auto">{manga.description}</p>
                <div className="mt-2 text-xs opacity-75">
                    <p><strong>Autor:</strong> {manga.author}</p>
                    <p><strong>Publicación:</strong> {manga.year}</p>
                    <p><strong>Status:</strong> {manga.status}</p>
                </div>
            </div>
            <div className="flex absolute left-5 bottom-2 gap-1 px-2 ">
                <button className="bg-gray-600 px-3 py-1 rounded-l-md text-white cursor-pointer hover:bg-gray-500">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <button className="bg-slate-700 px-4 py-1 text-white w-36 cursor-pointer hover:bg-slate-600 ">
                    <FontAwesomeIcon icon={faPlay} className="pr-2" />Watch Now
                </button>
                <button className="bg-gray-600 px-3 py-1 rounded-r-md text-white cursor-pointer hover:bg-gray-500">
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </motion.div>
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