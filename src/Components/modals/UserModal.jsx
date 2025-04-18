import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


function UserModal({ setLoginOpen }) {

    return (
        <div className="absolute top-12 right-0 bg-slate-950 light:bg-amber-200 dark:bg-neutral-800 light:border-1 light:border-black p-5 rounded-xl cursor-auto dark:border-y-2 dark:border-cyan-400">
            <div>
                <div className=" bg-slate-700 light:bg-cyan-100 dark:bg-cyan-300 rounded-lg flex flex-col justify-center items-center dark:hover:bg-cyan-400 light:hover:bg-cyan-200 hover:bg-slate-600 cursor-pointer">
                    <FontAwesomeIcon icon={faUser} className="text-2xl pt-2 text-slate-300 light:text-sky-900 dark:text-black" />
                    <h1 className="text-sky-300 light:text-sky-900 dark:text-black">Invitado</h1>
                </div>
                <div className="flex flex-col w-35 mt-3 gap-1 border-t-1 border-slate-600 dark:border-neutral-700">
                    <button onClick={() => setLoginOpen(true)} className="mt-2 hover:bg-slate-800 rounded-lg cursor-pointer light:text-black dark:text-white dark:hover:bg-neutral-700 light:hover:bg-cyan-100">Iniciar Sesion</button>
                    <Link to={'/signin'} className="hover:bg-slate-800 rounded-lg light:text-black dark:text-white light:hover:bg-cyan-100 dark:hover:bg-neutral-700">
                        <button className="cursor-pointer">Crear Cuenta</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserModal;