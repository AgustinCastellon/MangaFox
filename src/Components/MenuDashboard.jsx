import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCircleInfo, faClock, faFilter, faHeart, faList, faMessage, faShuffle, faTag } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

function MenuDashboard() {
    return (
        <div className="bg-slate-800 light:bg-amber-100 dark:bg-neutral-800 dark:border-b-1 dark:border-cyan-400 lg:rounded-b-xl xl:mt-1 lg:mb-10 xl:mb-0 xl:rounded-xl pt-1 pb-2 xl:mx-2 lg:flex  lg:justify-center xl:block lg:gap-15 lg:max-w-[900px] lg:mx-auto">
            <div className="mx-2 my-2 lg:justify-center lg:items-center xl:block xl:border-b-1 border-slate-600 dark:border-neutral-600 light:border-amber-200">
                <h1 className="lg:text-lg xl:mb-3 font-bold xl:text-xl light:text-black">Titulos</h1>
                <ul className="flex flex-col xl:gap-3 lg:gap-1 justify-center text-gray-300 light:text-gray-600">
                    <l1 className="flex py-1 px-2 2xl:mr-4 items-center rounded-sm hover:bg-slate-700 light:hover:bg-amber-50 dark:hover:bg-neutral-700 cursor-pointer">
                        <FontAwesomeIcon icon={faFilter} className="pr-1 " />
                        <h2 className="xl:text-sm lg:text-xs">Busqueda Avanzada</h2>
                    </l1>
                    <l1 className="flex py-1 px-2 2xl:mr-4 hover:bg-slate-700 light:hover:bg-amber-50 dark:hover:bg-neutral-700 items-center rounded-sm cursor-pointer">
                        <FontAwesomeIcon icon={faList} className="pr-2 " />
                        <h2 className="xl:text-sm lg:text-xs">Lista Completa</h2>
                    </l1>
                    <l1 className="flex py-1 px-2 2xl:mr-4 hover:bg-slate-700 light:hover:bg-amber-50 dark:hover:bg-neutral-700 items-center rounded-sm cursor-pointer">
                        <FontAwesomeIcon icon={faBook} className="pr-2 " />
                        <h2 className="xl:text-sm lg:text-xs">Lo Mas Nuevo</h2>
                    </l1>
                    <l1 className="flex py-1 px-2 2xl:mr-4 hover:bg-slate-700 light:hover:bg-amber-50 dark:hover:bg-neutral-700 items-center rounded-sm mb-2 cursor-pointer">
                        <FontAwesomeIcon icon={faShuffle} className="pr-2" />
                        <h2 className="xl:text-sm lg:text-xs">Random</h2>
                    </l1>
                </ul>
            </div>
            <div className="mx-2 my-2 xl:border-b-1 border-slate-600 dark:border-neutral-600 light:border-amber-200">
                <h1 className="lg:text-lg xl:mb-3 font-bold xl:text-xl light:text-black">Seguidos</h1>
                <ul className="flex flex-col xl:gap-3 lg:gap-1 justify-center text-gray-300 light:text-gray-600">
                    <l1 className="flex py-1 px-2 2xl:mr-4 items-center rounded-sm hover:bg-slate-700 light:hover:bg-amber-50 dark:hover:bg-neutral-700 cursor-pointer">
                        <FontAwesomeIcon icon={faHeart} className="pr-1 " />
                        <h2 className="xl:text-sm lg:text-xs">Mi Lista</h2>
                    </l1>
                    <l1 className="flex py-1 px-2 2xl:mr-4 hover:bg-slate-700 light:hover:bg-amber-50 dark:hover:bg-neutral-700 items-center rounded-sm mb-2 cursor-pointer">
                        <FontAwesomeIcon icon={faClock} className="pr-1 " />
                        <h2 className="xl:text-sm lg:text-xs">Historial</h2>
                    </l1>
                </ul>
            </div>
            <div className="mx-2 my-2 xl:border-b-1 border-slate-600 dark:border-neutral-600 light:border-amber-200">
                <h1 className="lg:text-lg xl:mb-3 font-bold xl:text-xl light:text-black">MangaFox</h1>
                <ul className="flex flex-col xl:gap-3 lg:gap-1 justify-center text-gray-300 light:text-gray-600">
                    <l1 className="flex py-1 px-2 2xl:mr-4 items-center rounded-sm hover:bg-slate-700 light:hover:bg-amber-50 dark:hover:bg-neutral-700 cursor-pointer">
                        <FontAwesomeIcon icon={faTag} className="pr-1" />
                        <h2 className="xl:text-sm lg:text-xs">Sobre Nosotros</h2>
                    </l1>
                    <l1 className="flex py-1 px-2 2xl:mr-4 items-center rounded-sm hover:bg-slate-700 light:hover:bg-amber-50 dark:hover:bg-neutral-700 cursor-pointer">
                        <FontAwesomeIcon icon={faMessage} className="pr-1 " />
                        <h2 className="xl:text-sm lg:text-xs">Contactenos</h2>
                    </l1>
                    <l1 className="flex py-1 px-2 2xl:mr-4 items-center rounded-sm hover:bg-slate-700 light:hover:bg-amber-50 dark:hover:bg-neutral-700 cursor-pointer mb-2">
                        <FontAwesomeIcon icon={faCircleInfo} className="pr-1 " />
                        <h2 className="xl:text-sm lg:text-xs">Anuncios</h2>
                    </l1>
                </ul>
            </div>
            <div className="xl:flex flex-col lg:hidden items-center text-gray-400 light:text-gray-700 mt-20">
                <div className="text-2xl">
                    <FontAwesomeIcon icon={faDiscord} className="mr-3 hover:text-gray-200 light:hover:text-gray-400 cursor-pointer" />
                    <FontAwesomeIcon icon={faTwitter} className="mr-3 hover:text-gray-200 light:hover:text-gray-400 cursor-pointer" />
                    <FontAwesomeIcon icon={faFacebook} className="hover:text-gray-200 light:hover:text-gray-400 cursor-pointer" />
                </div>
                <span className="text-xs ">Gracias por elegirnos!</span>
                <span className="text-xs ">© MangaFox 2025</span>
            </div>
        </div>
    )
}

export default MenuDashboard;