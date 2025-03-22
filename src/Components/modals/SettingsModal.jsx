import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SettingsModal() {
    return (
        <div className="absolute top-12 right-0 bg-slate-950 p-3 rounded-lg cursor-auto">
            <div className="">
                <div className=" flex flex-col justify-center items-center">
                    <h1 className="text-gray-400">Configuraciones</h1>
                </div>
                <div className="flex flex-col w-35  gap-2 border-t-1 border-slate-600">
                    <button className="mt-2 flex items-center gap-1 hover:bg-slate-800 rounded-lg cursor-pointer">
                        <FontAwesomeIcon icon={faChevronLeft} className="text-xs pl-1"/>
                        Idiomas
                    </button>
                    <button className="hover:bg-slate-800 rounded-lg flex items-center gap-1 cursor-pointer">
                        <FontAwesomeIcon icon={faChevronLeft} className="text-xs pl-1"/>
                        Filtrar Contenido
                    </button>
                    <button className="hover:bg-slate-800 rounded-lg flex items-center gap-1 cursor-pointer">
                        <FontAwesomeIcon icon={faChevronLeft} className="text-xs pl-1"/>
                        Theme
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal;