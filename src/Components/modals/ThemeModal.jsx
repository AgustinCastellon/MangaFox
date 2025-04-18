import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function ThemeModal({ setThemesOpen, setTheme, theme }) {

    const handleThemeSelected = (e) => {
        setTheme(e.target.value)
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
                        onClick={() => setThemesOpen(false)}
                        className="absolute -top-4 -right-8 flex justify-end cursor-pointer items-center text-center rounded-full py-1 px-2 light:hover:bg-amber-50 dark:hover:bg-neutral-700 hover:bg-slate-700"
                    >
                        <FontAwesomeIcon icon={faClose} className="text-2xl light:text-black" />
                    </button>
                </div>
                <fieldset>
                    <legend>
                        <h1 className="font-bold text-xl">Temas</h1>
                        <p className="text-xs mb-2">Eliga su tema de preferencia</p>
                    </legend>
                </fieldset>
                <div className="flex gap-1 ">
                    <input
                        value='dark'
                        id="oscuro"
                        type="radio"
                        name="theme"
                        checked={theme == "dark"}
                        onChange={handleThemeSelected}
                        className="w-4 accent-blue-300 light:accent-cyan-300 dark:dark:accent-cyan-300"
                    />
                    <label htmlFor="oscuro">Modo Oscuro</label>
                </div>
                <div className="flex gap-1 ">
                    <input
                        value='light'
                        id="claro"
                        type="radio"
                        name="theme"
                        checked={theme == "light"}
                        onChange={handleThemeSelected}
                        className="w-4 accent-blue-300 light:accent-cyan-300"
                    />
                    <label htmlFor="claro">Modo Claro</label>
                </div>
                <div className="flex gap-1">
                    <input
                        id="slate"
                        className="w-4 accent-blue-300 light:accent-cyan-300"
                        type="radio"
                        name="theme"
                        checked={theme == "slate"}
                        onChange={handleThemeSelected}
                        value='slate'
                    />
                    <label htmlFor="slate">Slate</label>
                </div>
                <div className="flex gap-1 ">
                    <input
                        id="pink"
                        className="w-4 accent-blue-300 light:accent-cyan-300"
                        type="radio"
                        name="theme"
                        disabled
                    />
                    <label htmlFor="pink">Pink <span className="text-xs self-center">(proximamente)</span></label>
                </div>
                <div className="flex gap-1 ">
                    <input
                        id="dracula"
                        className="w-4 accent-blue-300 light:accent-cyan-300"
                        type="radio"
                        name="theme"
                        disabled
                    />
                    <label htmlFor="dracula">Dracula <span className="text-xs self-center">(proximamente)</span></label>
                </div>
            </motion.div>
        </div>
    )
}

export default ThemeModal