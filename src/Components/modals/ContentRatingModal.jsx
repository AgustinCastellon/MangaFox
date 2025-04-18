import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useFilters } from "../../Context/FilterContext";

function ContentRatingModal({ setContentFilterOpen }) {

    const contentList = ["safe", "suggestive", "erotica"];
    const contentLabel = ["Seguro", "Sugestivo", "Erótico"];

    // const [filterSelected, setFilterSelected] = useState(["safe", "suggestive", "erotica"]);
    const { filters, updateFilter } = useFilters();

    const handleFiltersSelected = (e) => {
        const { value, checked } = e.target;

        const updated = checked ? [...filters.contentRating, value] : filters.contentRating.filter(item => item !== value)

        updateFilter("contentRating", updated);

        // if (checked) {
        //     setFilterSelected([...filterSelected, value])
        // } else {
        //     setFilterSelected(filterSelected.filter((item) => item != value))
        // }
    }

    return (
        <div>
            <motion.div
                className="inset-0 fixed bg-black opacity-55 z-999"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
            />
            <motion.div
                className="absolute z-999 right-6 top-22 bg-slate-950 light:bg-amber-100 light:text-black light:border-cyan-200 dark:bg-neutral-800 dark:border-cyan-400 border-y-2 px-10 py-5 rounded"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
            >
                <div className="relative w-full flex justify-end">
                    <button
                        onClick={() => setContentFilterOpen(false)}
                        className="absolute -top-4 -right-8 flex justify-end cursor-pointer items-center text-center rounded-full py-1 px-2 light:hover:bg-amber-50 dark:hover:bg-neutral-700 hover:bg-slate-700"
                    >
                        <FontAwesomeIcon icon={faClose} className="text-2xl light:text-black" />
                    </button>
                </div>
                <h1 className="font-bold text-xl">Filtrar Contenido</h1>
                <p className="text-xs mb-2">Eliga sus preferencias</p>
                <div className="block">
                    {contentList.map((content, index) => (
                        <label key={index} className="flex gap-1 ">
                            <input
                                className="w-4 accent-blue-300 light:accent-cyan-300 dark:dark:accent-cyan-300"
                                type="checkbox"
                                value={content}
                                onChange={handleFiltersSelected}
                                checked={filters.contentRating.includes(content)}
                            />
                            {contentLabel[index]}
                        </label>
                    ))}
                </div>
                <h3 className="text-sm font-bold border-t-1 border-slate-500 light:border-amber-300 dark:border-neutral-600 mt-2">Importante!</h3>
                <p className="text-[10px] w-55">Algunas opciones con contenido para mayores de 18 años están disponibles únicamente
                    si ha iniciado sesión y confirma ser mayor de edad. Esto con el fin de proteger su seguridad.
                </p>
            </motion.div>
        </div>
    )
}

export default ContentRatingModal