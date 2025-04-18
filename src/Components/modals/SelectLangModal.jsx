import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { motion } from "framer-motion";

function SelectLangModal({ setLangsOpen }) {

    const languageMap = {
        "en": "gb",  // Inglés - Reino Unido
        "es": "es",   // Español de España.
        "es-la": "mx",  // Español (Latinoamérica) - España
        "fr": "fr",  // Francés - Francia
        "pt-br": "br",  // Portugués (Brasil) - Brasil
        "ja": "jp",  // Japonés - Japón
        "zh": "cn",  // Chino Mandarín - China
        "zh-hk": "hk",  // Chino Hong Kong - Hong Kong
        "ko": "kr",  // Coreano - Corea del Sur
        "uk": "ua",  // Ucraniano - Ucrania
        "fa": "ir",  // Persa - Irán
        "hi": "in",  // Hindi - India
        "ta": "in",  // Tamil - India
        "kk": "kz",  // Kazajo - Kazajistán
        "he": "il",  // Hebreo - Israel
        "te": "in",   // Telugu - India
        "ja-ro": "ro" // Japonés en Rumanía - Rumanía
    };

    // Etiquetas legibles para el usuario
    const languageLabels = {
        "en": "Inglés (Reino Unido)",
        "es": "Español (España)",
        "es-la": "Español (Latinoamérica)",
        "fr": "Francés (Francia)",
        "pt-br": "Portugués (Brasil)",
        "ja": "Japonés",
        "zh": "Chino (China)",
        "zh-hk": "Chino (Hong Kong)",
        "ko": "Coreano",
        "uk": "Ucraniano",
        "fa": "Persa",
        "hi": "Hindi",
        "ta": "Tamil",
        "kk": "Kazajo",
        "he": "Hebreo",
        "te": "Telugu",
        "ja-ro": "Japonés (Rumanía)"
    };

    const getFlagUrl = (lang) => {
        const countryCode = languageMap[lang] || lang; // Usa el mapeo o el código original
        return `https://flagcdn.com/w20/${countryCode}.png`;
    };

    const [langsSelected, setLangsSelected] = useState([]);

    const handleLangsSelected = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setLangsSelected([...langsSelected, value]);
        }
        else {
            setLangsSelected(langsSelected.filter((item) => item != value));
        }
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
                        onClick={() => setLangsOpen(false)}
                        className="absolute -top-4 -right-8 flex justify-end cursor-pointer items-center text-center rounded-full py-1 px-2 light:hover:bg-amber-50 dark:hover:bg-neutral-700 hover:bg-slate-700"
                    >
                        <FontAwesomeIcon icon={faClose} className="text-2xl light:text-black" />
                    </button>
                </div>
                <h1 className="font-bold text-xl">Seleccione idiomas</h1>
                <p className="text-xs mb-2">Idioma de capitulos</p>
                {Object.keys(languageMap).map((langKey) => (
                    <label key={langKey} className="flex gap-1">
                        <input
                            className="w-4 accent-blue-300 light:accent-cyan-300 dark:dark:accent-cyan-300"
                            type="checkbox"
                            value={langKey}
                            checked={langsSelected.includes(langKey)}
                            onChange={handleLangsSelected}
                        />
                        <img
                            className="object-scale-down"
                            src={getFlagUrl(langKey)}
                            alt={langKey} />
                        {languageLabels[langKey] || langKey}
                    </label>
                ))}
                <h3 className="text-sm font-bold border-t-1 border-slate-500 dark:border-neutral-600 light:border-amber-300 mt-2">Importante!</h3>
                <p className="text-[10px] w-55">Los idiomas que elijas afectarán la selección de capítulos y las últimas actualizaciones.
                    Aun así, las recomendaciones (como nuevos títulos populares o mejor valorados) seguirán apareciendo sin importar los idiomas seleccionados.
                </p>
            </motion.div>
        </div>
    )
}

export default SelectLangModal;


