import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LoginModal({ setLoginOpen }) {

    return (
        <div>
            <motion.div
                className="inset-0 bg-black opacity-70 fixed z-999"
                initial={{ opacity: 0 }}
                animate={{opacity: 0.7}}
                exit={{opacity:0}}
            />
            <motion.div
                className="absolute z-9999 top-30 left-1/2 transform -translate-x-1/2 bg-slate-950 light:bg-amber-100 dark:bg-neutral-800 dark:border-cyan-400 min-w-120 rounded light:text-black border-y-2 light:border-cyan-500"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
            >
                <div className="w-full flex justify-end">
                    <button
                        onClick={() => setLoginOpen(false)}
                        className="flex justify-end cursor-pointer items-center text-center rounded-full mt-1 mr-1 py-1 px-2 light:hover:bg-amber-50 dark:hover:bg-neutral-700 hover:bg-slate-700"
                    >
                        <FontAwesomeIcon icon={faClose} className="text-2xl light:text-black" />
                    </button>
                </div>
                <form action="" className="px-10">
                    <h1 className="text-2xl  border-b-1 border-slate-600 light:border-amber-50 dark:border-neutral-700 text-center font-bold">Iniciar Sesion</h1>
                    <div className="flex flex-col mt-10 gap-1">
                        <label htmlFor="" className="text-sm font-bold">Usuario o Correo Electronico</label>
                        <input type="text" className="bg-slate-600 light:bg-white dark:bg-zinc-600 dark:focus-within:outline-cyan-400 light:focus-within:outline-cyan-200 rounded h-8 focus-within:outline-2 focus-within:outline-blue-400 pl-2" />
                    </div>
                    <div className="flex flex-col gap-1 mt-4">
                        <label htmlFor="" className="text-sm font-bold">Contraseña</label>
                        <input type="password" className="bg-slate-600 light:bg-white dark:bg-zinc-600 dark:focus-within:outline-cyan-400 light:focus-within:outline-cyan-200 rounded h-8 focus-within:outline-2 focus-within:outline-blue-400 pl-2" />
                    </div>
                    <label htmlFor="" className="text-sm">
                        <input type="checkbox" className="accent-blue-400 light:accent-cyan-300 dark:accent-cyan-300" /> Recordarme
                    </label>
                    <button className="bg-blue-500 light:bg-cyan-200 dark:bg-cyan-400 h-8 w-full font-bold my-6 rounded text-xl cursor-pointer hover:bg-blue-400 dark:hover:bg-cyan-500 light:hover:bg-cyan-100">Ingresar</button>
                    <footer className="flex justify-between mb-7 border-t-1 border-slate-600 light:border-amber-50">
                        <p className="text-sm mt-2">No tienes una cuenta? <Link className="text-slate-300 light:text-cyan-700 hover:text-slate-400 underline underline-offset-1">Registrate</Link></p>
                        <Link className="text-slate-300 light:text-cyan-700 hover:text-slate-400 mt-2"><p className="text-sm underline underline-offset-1">Olvidé mi contraseña</p></Link>
                    </footer>
                </form>
            </motion.div >
        </div >
    )
}

export default LoginModal;