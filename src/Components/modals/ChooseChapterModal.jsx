import { useEffect, useState } from "react";
import { getFirstChapterEachLanguage } from "../../Services/MangaDex/MangaService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faClose, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ChooseChapterLoader from "../skeletonLoader/ChooseChapterLoader";
dayjs.extend(relativeTime);
dayjs.locale("es");

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

function ChooseChapterModal({ mangaId, setModalOpen }) {

    const [chapters, setChapters] = useState();
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const fetchFirstChapters = async () => {
            const chapters = await getFirstChapterEachLanguage(mangaId);
            setChapters(chapters);

        }

        fetchFirstChapters()

    }, [mangaId])

    const handleClose = () => {
        setIsExiting(true); // Activa la animación de salida
        setTimeout(() => {
            setModalOpen(false); // Desmonta el modal tras la animación
        }, 300); // Tiempo que coincide con la duración de la animación en milisegundos
    };
    return (
        <div className="">



            <motion.div
                className="fixed inset-0 z-888 bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={isExiting ? { opacity: 0 } : { opacity: 0.3 }} // Cambia según `isExiting`
                exit={{ opacity: 0 }} // Asegura el soporte de salida
                transition={{ duration: 0.3 }} // Duración de la animación
            />

            <motion.div
                className="bg-slate-900 rounded-lg py-2 px-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-999"
                initial={{ opacity: 0, scale: 0 }}
                animate={isExiting ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }} // Cambia según `isExiting`
                transition={{ duration: 0.3 }}
            >
                <header className="flex justify-between items-center border-b-[0.5px] border-slate-700 mb-2">
                    <h1 className="text-xl">Seleccione un grupo</h1>
                    <button
                        onClick={handleClose} // Cambia el estado para cerrar el modal
                        className="flex justify-center cursor-pointer items-center text-center rounded-full py-1 px-2 hover:bg-slate-700"
                    >
                        <FontAwesomeIcon icon={faClose} className="text-lg" />
                    </button>
                </header>
                {!chapters ? (
                    <ChooseChapterLoader />
                ) : (
                    chapters.length > 0 ? (

                        <div>
                            {chapters?.map((m, index) => (
                                <Link key={index} to={`/chapter/${mangaId}/${m.id}/${m.attributes.translatedLanguage}`}>
                                    <div className="w-140 flex justify-between items-center mt-1 bg-slate-600 p-1 rounded-lg hover:bg-slate-500 cursor-pointer">
                                        <div>
                                            <div className="flex items-center">
                                                <img
                                                    src={getFlagUrl(m.attributes.translatedLanguage)}
                                                    alt={m.attributes.translatedLanguage}
                                                    className="object-scale-down pr-1"
                                                />
                                                <h1 className="font-bold">Cap {m.attributes.chapter}</h1>
                                            </div>
                                            <span className="text-sm">
                                                <FontAwesomeIcon icon={faUsers} className="pr-2 text-gray-300" />
                                                {m.relationships.find((su) => su.type === "scanlation_group")?.attributes.name || "-"}
                                            </span>
                                        </div>
                                        <div className="flex flex-col w-30">
                                            <span className="text-gray-300 text-sm">
                                                <FontAwesomeIcon icon={faClock} className="pr-1" />
                                                {m?.attributes?.updatedAt ? dayjs(m?.attributes?.updatedAt).fromNow() : "unknow date"}
                                            </span>
                                            <span className="text-sm line-clamp-1 text-teal-300">
                                                <FontAwesomeIcon icon={faUser} className="pr-1 text-gray-300" />
                                                {m.relationships.find((su) => su.type === "user")?.attributes.username || "-"}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center w-140 h-50 bg-slate-800 p-1 rounded">
                            <h1 className="text-sm my-10">No hay capítulos disponibles...</h1>
                        </div>
                    )
                )}
            </motion.div>
        </div >
    )
}

export default ChooseChapterModal;