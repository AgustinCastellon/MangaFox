import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


function UserModal({setLoginOpen}) {
   
    return (
        <div className="absolute top-12 right-0 bg-slate-950 light:bg-amber-200 light:border-1 light:border-black p-3 rounded-lg cursor-auto">
            <div>
                <div className=" bg-slate-700 light:bg-cyan-100 rounded-lg flex flex-col justify-center items-center light:hover:bg-cyan-200 hover:bg-slate-600 cursor-pointer">
                    <FontAwesomeIcon icon={faUser} className="text-2xl pt-2 text-slate-300 light:text-sky-900" />
                    <h1 className="text-sky-300 light:text-sky-900">Invitado</h1>
                </div>
                <div className="flex flex-col w-35 mt-3 gap-1 border-t-1 border-slate-600">
                    <button onClick={()=> setLoginOpen(true)} className="mt-2 hover:bg-slate-800 rounded-lg cursor-pointer light:text-black light:hover:bg-cyan-100">Iniciar Sesion</button>
                    <Link to={'/signin'} className="hover:bg-slate-800 rounded-lg light:text-black light:hover:bg-cyan-100">
                        <button className="cursor-pointer">Crear Cuenta</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserModal;