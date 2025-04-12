function SelectLangModal () {

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

    return (
        <div className="absolute z-999 right-35 top-25 bg-slate-950 pl-5">
            <h1 className="font-bold">Seleccione idioma</h1>
            <p className="text-xs">Idioma de capitulos</p>
        </div>
    )
}

export default SelectLangModal;


