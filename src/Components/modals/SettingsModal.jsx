import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SettingsModal({ setLangsOpen, setContentFilterOpen, setThemesOpen }) {
    return (
        <div className="absolute top-12 right-0 bg-slate-950 dark:bg-neutral-800 dark:border-y-2 dark:border-cyan-400 light:bg-amber-200 light:border-1 light:border-black p-5 rounded-xl cursor-auto">
            <div className="">
                <div className=" flex flex-col justify-center items-center">
                    <h1 className="text-gray-400 light:text-gray-500 dark:text-white">Configuraciones</h1>
                </div>
                <div className="flex flex-col w-35  gap-2 border-t-1 border-slate-600 dark:border-neutral-700">
                    <button
                        onClick={() => setLangsOpen(true)}
                        className="mt-2 flex items-center gap-1 hover:bg-slate-800 dark:text-white dark:hover:bg-neutral-700 rounded-lg light:text-black light:hover:bg-cyan-100 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="text-xs pl-1" />
                        Idiomas
                    </button>
                    <button
                        onClick={() => setContentFilterOpen(true)}
                        className="hover:bg-slate-800 dark:text-white dark:hover:bg-neutral-700 rounded-lg flex items-center gap-1 light:text-black light:hover:bg-cyan-100 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="text-xs pl-1" />
                        Filtrar Contenido
                    </button>
                    <button
                        onClick={()=> setThemesOpen(true)}
                        className="hover:bg-slate-800 dark:text-white dark:hover:bg-neutral-700 rounded-lg flex items-center gap-1 light:text-black light:hover:bg-cyan-100 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="text-xs pl-1" />
                        Theme
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal;