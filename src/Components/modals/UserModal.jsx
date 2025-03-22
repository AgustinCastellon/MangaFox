import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserModal(){
    return(
        <div className="absolute top-12 right-0 bg-slate-950 p-3 rounded-lg cursor-auto">
            <div>
                <div className=" bg-slate-700 rounded-lg flex flex-col justify-center items-center hover:bg-slate-600 cursor-pointer">
                    <FontAwesomeIcon icon={faUser} className="text-2xl pt-2 text-slate-300"/>
                    <h1 className="text-sky-300">Invitado</h1>
                </div>
                <div className="flex flex-col w-35 mt-3 gap-1 border-t-1 border-slate-600">
                    <button className="mt-2 hover:bg-slate-800 rounded-lg cursor-pointer">Iniciar Sesion</button>
                    <button className="hover:bg-slate-800 rounded-lg cursor-pointer">Crear Cuenta</button>
                </div>
            </div>
        </div>
    )    
}

export default UserModal;