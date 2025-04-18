function ProfilePictureMangaLoader() {
    return (
        <div className="relative rounded-xl outline-4 outline-offset-0 light:outline-cyan-100 dark:outline-neutral-800 outline-slate-700 outline-solid">
            <svg className="absolute z-99 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mr-3 h-9 w-9 animate-spin light:text-black dark:text-cyan-300 text-sky-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="animate-pulse">
                <div className="h-64 w-46 rounded-xl bg-gray-700 dark:bg-neutral-700 light:bg-neutral-200"></div>
            </div>
        </div>
    )
}

export default ProfilePictureMangaLoader;