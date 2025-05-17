import { faArrowDown, faArrowUp, faHandPointDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AdvancedSearch({
    tags, includeTag, setIncludeTag, excludeTag, setExcludeTag, incTagMode, setIncTagMode, excTagMode, setExcTagMode, contentRating,
    setContentRating, demographic, setDemographic, status, setStatus, sortName, setSortName, sortValue, setSortValue }) {

    const contentRatingList = ["safe", "suggestive", "erotica"];
    const demographicList = ["shounen", "shoujo", "josei", "seinen"];
    const statusList = ["ongoing", "completed", "hiatus", "cancelled"];
    const statusLabel = ["En emision", "Completado", "Pausado", "Cancelado"];
    const contenRatingLabel = ["Seguro", "Sugestivo", "Erotico"];
    const sortList = ["title", "year", "followedCount", "relevance", "updatedAt", "createdAt"];
    const sortLabel = ["Titulo", "Año", "Cantidad de Seguidores", "Relevancia", "Actualizado", "Agregado"]
    const [tagsOpen, setTagsOpen] = useState(false);
    const [contRatOpen, setContRatOpen] = useState(false);
    const [demographicOpen, setDemographicOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const [sortListOpen, setSortListOpen] = useState(false);

    const handleContentRatChange = (e) => {
        setContentRating(prev => {
            if (e.target.checked) {
                return [...prev, e.target.value]
            }
            return prev.filter(f => f !== e.target.value)
        })
    }

    const handleDemographicChange = (e) => {
        setDemographic(prev => {
            if (e.target.checked) {
                return [...prev, e.target.value]
            }
            return prev.filter(f => f !== e.target.value)
        })
    }

    const handleStatusChange = (e) => {
        setStatus(prev => {
            if (e.target.checked) {
                return [...prev, e.target.value]
            }
            return prev.filter(f => f !== e.target.value)
        })
    }

    const handleTagSelected = (tag) => {
        if (includeTag.includes(tag)) {
            setIncludeTag(prev => prev.filter(t => t !== tag));
            setExcludeTag([...excludeTag, tag]);
        } else if (excludeTag.includes(tag)) {
            setExcludeTag(prev => prev.filter(t => t !== tag));

        } else {
            setIncludeTag([...includeTag, tag]);
        }
    }

    const getButtonColor = (tag) => {
        if (includeTag.includes(tag)) {
            return 'bg-green-300 text-black'
        } else if (excludeTag.includes(tag)) {
            return 'bg-red-300 text-black'
        } else {
            return 'bg-slate-600 dark:bg-neutral-700 light:bg-cyan-50 light:text-black dracula:bg-dracula-500'
        }
    }

    const handleSortValueClick = (e) => {
        setSortValue(e.target.value)
    }

    const handleSortName = (e) => {
        setSortName(e.target.value)
    }

    const handleIncludeModeSelected = (e) => {
        setIncTagMode(e.target.value)
    }

    const handleExcludeModeSelected = (e) => {
        setExcTagMode(e.target.value)
    }

    const handleClickResetTag = () => {
        setIncludeTag([]);
        setExcludeTag([]);
    }

    const handleTagsOpen = () => {
        setTagsOpen(prev => !prev)
    }

    const handContRatOpen = () => {
        setContRatOpen(prev => !prev)
    }

    const handleDemograpOpen = () => {
        setDemographicOpen(prev => !prev)
    }

    const handleStatusOpen = () => {
        setStatusOpen(prev => !prev)
    }

    const handleSortListOpen = () => {
        setSortListOpen(prev => !prev)
    }

    return (
        <div className="grid grid-cols-4 gap-3">
            <div className="relative z-10 flex flex-col">
                <label htmlFor="" className="text-neutral-400 light:text-neutral-600 dracula:text-dracula-yellow">Ordenar Por {sortValue !== undefined && (sortValue === "asc" ? "[Ascendente]" : "[Descendente]")}</label>
                <button
                    onClick={handleSortListOpen}
                    className="cursor-pointer flex items-center justify-between focus:outline focus:outline-slate-500 dark:focus:outline-cyan-300 light:focus:outline-black text-start bg-slate-800 dark:bg-neutral-700 light:bg-cyan-100 light:text-black dracula:bg-dracula-700 rounded-sm p-1">
                    <span className="ml-1">
                        {sortName ? sortName : "-"}
                    </span>
                    <FontAwesomeIcon icon={faHandPointDown} />
                </button>
                <AnimatePresence>
                    {sortListOpen && (
                        <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-15 w-full bg-slate-800 dark:bg-neutral-800 light:bg-cyan-100 dracula:bg-dracula-700 px-2 py-3"
                        >
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSortValueClick}
                                    value="asc"
                                    className={`${sortValue == "asc" ? 'dark:text-green-300 light:text-green-500 hover:text-green-300 light:hover:text-green-500' : 'text-white hover:text-zinc-300 light:hover:text-zinc-500'} cursor-pointer  light:text-black `}>
                                    Ascendente <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
                                </button>
                                <span className="light:text-black">/</span>
                                <button
                                    onClick={handleSortValueClick}
                                    value="desc"
                                    className={`${sortValue == "desc" ? 'dark:text-green-300 light:text-green-500 hover:text-green-300 light:hover:text-green-500' : 'text-white hover:text-zinc-300 light:hover:text-zinc-500'} cursor-pointer  light:text-black `}>
                                    Descendente <FontAwesomeIcon icon={faArrowDown} className="text-xs" />
                                </button>
                            </div>
                            {sortList.map((item, index) => (
                                <label htmlFor={item} key={index} className="flex gap-1 text-lg light:text-black">
                                    <input
                                        className="w-4 accent-blue-300 light:accent-cyan-300 dark:dark:accent-cyan-300 dracula:accent-dracula-purple"
                                        type="radio"
                                        value={item}
                                        id={item}
                                        onClick={handleSortName}
                                        checked={sortName == item}
                                    />
                                    {sortLabel[index]}
                                </label>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="relative z-9 flex flex-col">
                <label htmlFor="" className="text-neutral-400 light:text-neutral-600 dracula:text-dracula-yellow">
                    Filtrar Etiquetas
                    <strong className="text-xs text-green-500">{includeTag.length > 0 && ` +${includeTag.length}`}</strong>
                    <strong className="text-xs text-red-500">{excludeTag.length > 0 && ` +${excludeTag.length}`}</strong>
                </label>
                <button
                    onClick={handleTagsOpen}
                    className="cursor-pointer flex items-center justify-between focus:outline focus:outline-slate-500 dark:focus:outline-cyan-300 light:focus:outline-black text-start bg-slate-800 dark:bg-neutral-700 light:bg-cyan-100 light:text-black dracula:bg-dracula-700 rounded-sm p-1" >
                    {includeTag.length > 0 || excludeTag.length > 0 ? (
                        <span className="line-clamp-1">
                            <strong className="ml-1 text-green-300 light:text-green-500" >{includeTag != 0 && includeTag.join(` ${incTagMode === 'OR' ? 'o' : 'y'} `)} </strong>
                            <strong className="ml-1 text-red-300 light:text-red-500" >{excludeTag != 0 && excludeTag.join(` ${excTagMode === 'OR' ? 'o' : 'y'} `)}</strong>
                        </span>
                    ) : (
                        <span>Incluir cualquiera...</span>
                    )}
                    <FontAwesomeIcon icon={faHandPointDown} />
                </button>
                <AnimatePresence>
                    {tagsOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-15 w-190 bg-slate-800 dark:bg-neutral-800 light:bg-cyan-100 dracula:bg-dracula-700 p-5 rounded-sm h-130 overflow-y-scroll scrollable-filter-menu scrollbar dark:scrollbar-thumb-cyan-300 light:scrollbar-thumb-cyan-200 scrollbar-thumb-slate-400">
                            <div>
                                <span className="text-sm light:text-black">Haz click una vez si quieres <strong className="text-green-300 light:text-green-600">incluir un tag</strong>,
                                    clickea dos veces si quieres <strong className="text-red-300 light:text-red-600">excluir un tag. </strong>
                                </span>
                                <button className="text-xs underline text-neutral-300 light:text-neutral-600 cursor-pointer">Ocultar</button>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleClickResetTag} className="mt-1 px-3 rounded-xs cursor-pointer bg-red-500 hover:bg-red-600 ">Limpiar</button>
                            </div>
                            <div>
                                <legend className="font-bold text-xl mb-3 light:text-black">Genero</legend>
                                <ul className="flex flex-wrap gap-3">
                                    {tags?.genres?.map((genre, index) => (
                                        <li key={index} className="" >
                                            <button
                                                onClick={() => handleTagSelected(genre)}
                                                className={`${getButtonColor(genre)} px-2 text-sm rounded-sm cursor-pointer`}
                                            >
                                                {genre}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <legend className="font-bold text-xl my-3 light:text-black">Formato</legend>
                                <ul className="flex flex-wrap gap-3">
                                    {tags?.format?.map((format, index) => (
                                        <li key={index} className="" >
                                            <button
                                                onClick={() => handleTagSelected(format)}
                                                className={`${getButtonColor(format)} px-2 text-sm rounded-sm cursor-pointer`}
                                            >
                                                {format}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <legend className="font-bold text-xl my-3 light:text-black">Tema</legend>
                                <ul className="flex flex-wrap gap-3">
                                    {tags?.theme?.map((theme, index) => (
                                        <li key={index} className="" >
                                            <button
                                                onClick={() => handleTagSelected(theme)}
                                                className={`${getButtonColor(theme)} px-2 text-sm rounded-sm cursor-pointer`}
                                            >
                                                {theme}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <legend className="font-bold text-xl my-3 light:text-black">Contenido</legend>
                                <ul className="flex flex-wrap gap-3">
                                    {tags?.content?.map((content, index) => (
                                        <li key={index} className="" >
                                            <button
                                                onClick={() => handleTagSelected(content)}
                                                className={`${getButtonColor(content)} px-2 text-sm rounded-sm cursor-pointer`}
                                            >
                                                {content}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <legend className="font-bold text-xl mt-3 mb-1 light:text-black">Opciones</legend>
                            <p className="text-xs light:text-black">
                                *Con <strong>AND</strong>, el filtro se aplica a <strong>todos</strong> los tags seleccionados.
                            </p>
                            <p className="text-xs light:text-black">
                                *Con <strong>OR</strong>, el filtro se aplica a <strong>cualquiera</strong> de los tags seleccionados.
                            </p>
                            <div className="flex gap-5 my-3">
                                <div className="flex flex-col items-center gap-1">
                                    <label htmlFor="include" className="font-bold text-sm text-neutral-400 light:text-neutral-600 dracula:text-dracula-yellow">Incluir usando</label>
                                    <select
                                        onChange={handleIncludeModeSelected}
                                        name="include"
                                        id="include"
                                        className="bg-slate-600 dark:bg-neutral-700 light:bg-cyan-50 light:text-black dracula:bg-dracula-500 rounded-lg p-1 w-full">
                                        <option value="AND">AND</option>
                                        <option value="OR">OR</option>
                                    </select>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <label htmlFor="excluir" className="font-bold text-sm text-neutral-400 light:text-neutral-600 dracula:text-dracula-yellow">Excluir usando</label>
                                    <select
                                        onChange={handleExcludeModeSelected}
                                        name="excluir"
                                        id="excluir"
                                        className="bg-slate-600 dark:bg-neutral-700 light:bg-cyan-50 light:text-black dracula:bg-dracula-500 rounded-lg p-1 w-full">
                                        <option value="AND">AND</option>
                                        <option value="OR">OR</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="relative z-9 flex flex-col">
                <label htmlFor="contentRating" className="text-neutral-400 light:text-neutral-600 dracula:text-dracula-yellow">
                    Clasificacion
                    <strong className="text-xs text-green-500"> {contentRating.length > 0 && `+${contentRating.length}`}</strong>
                </label>
                <button
                    onClick={handContRatOpen}
                    id="contentRating"
                    className="cursor-pointer flex items-center justify-between focus:outline focus:outline-slate-500 dark:focus:outline-cyan-300 light:focus:outline-black text-start bg-slate-800 dark:bg-neutral-700 light:bg-cyan-100 light:text-black dracula:bg-dracula-700 rounded-sm p-1">
                    <span className="ml-1 line-clamp-1">{contentRating.length ? contentRating.join(", ") : 'Cualquiera...'}</span>
                    <FontAwesomeIcon icon={faHandPointDown} />
                </button>
                <AnimatePresence>
                    {contRatOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-15 w-full bg-slate-800 dark:bg-neutral-800 light:bg-cyan-100 dracula:bg-dracula-700 px-2 py-3"
                        >
                            <div>
                                {contentRatingList.map((cr, index) => (
                                    <label key={index} className="flex gap-1 text-lg light:text-black">
                                        <input
                                            className="w-4 accent-blue-300 light:accent-cyan-300 dark:dark:accent-cyan-300 dracula:accent-dracula-purple"
                                            type="checkbox"
                                            value={cr}
                                            onChange={handleContentRatChange}
                                            checked={contentRating.includes(cr)}
                                        />
                                        {contenRatingLabel[index]}
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="relative z-9 flex flex-col">
                <label htmlFor="demog" className="text-neutral-400 light:text-neutral-600 dracula:text-dracula-yellow">
                    Demographic
                    <strong className="text-green-500 text-xs"> {demographic.length > 0 && `+${demographic.length}`}</strong>
                </label>
                <button
                    onClick={handleDemograpOpen}
                    id="demog"
                    className="cursor-pointer flex items-center justify-between focus:outline focus:outline-slate-500 dark:focus:outline-cyan-300 light:focus:outline-black text-start bg-slate-800 dark:bg-neutral-700 light:bg-cyan-100 light:text-black dracula:bg-dracula-700 rounded-sm p-1">
                    <span className="ml-1 line-clamp-1">{demographic.length ? demographic.join(", ") : 'Cualquera...'}</span>
                    <FontAwesomeIcon icon={faHandPointDown} />
                </button>
                <AnimatePresence>
                    {demographicOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-15 w-full bg-slate-800 dark:bg-neutral-800 light:bg-cyan-100 dracula:bg-dracula-700 px-2 py-3"
                        >
                            <div>
                                {demographicList.map((dem, index) => (
                                    <label htmlFor={dem} key={index} className="flex gap-1 text-lg light:text-black">
                                        <input
                                            className="w-4 accent-blue-300 light:accent-cyan-300 dark:dark:accent-cyan-300 dracula:accent-dracula-purple"
                                            type="checkbox"
                                            value={dem}
                                            id={dem}
                                            onChange={handleDemographicChange}
                                            checked={demographic.includes(dem)}
                                        />
                                        {dem}
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="relative z-9 flex flex-col">
                <label htmlFor="statLabel" className="text-neutral-400 light:text-neutral-600 dracula:text-dracula-yellow">
                    Estado
                    <strong className="text-xs text-green-500"> {status.length > 0 && `+${status.length}`}</strong>
                </label>
                <button
                    id="statLabel"
                    onClick={handleStatusOpen}
                    className="cursor-pointer flex items-center justify-between focus:outline focus:outline-slate-500 dark:focus:outline-cyan-300 light:focus:outline-black text-start bg-slate-800 dark:bg-neutral-700 light:bg-cyan-100 light:text-black dracula:bg-dracula-700 rounded-sm p-1">
                    <span className="ml-1 line-clamp-1">{status.length ? status.join(", ") : 'Cualquera...'}</span>
                    <FontAwesomeIcon icon={faHandPointDown} />
                </button>
                <AnimatePresence>
                    {statusOpen && (
                        <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-15 w-full bg-slate-800 dark:bg-neutral-800 light:bg-cyan-100 dracula:bg-dracula-700 px-2 py-3"
                        >
                            {statusList.map((stat, index) => (
                                <label htmlFor={stat} key={index} className="flex gap-1 text-lg light:text-black">
                                    <input
                                        className="w-4 accent-blue-300 light:accent-cyan-300 dark:dark:accent-cyan-300 dracula:accent-dracula-purple"
                                        type="checkbox"
                                        value={stat}
                                        id={stat}
                                        onChange={handleStatusChange}
                                        checked={status.includes(stat)}
                                    />
                                    {statusLabel[index]}
                                </label>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
AdvancedSearch.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    includeTag: PropTypes.arrayOf(PropTypes.string).isRequired,
    setIncludeTag: PropTypes.func.isRequired,
    excludeTag: PropTypes.arrayOf(PropTypes.string).isRequired,
    setExcludeTag: PropTypes.func.isRequired,
};
export default AdvancedSearch