function CarouselLoader(){
    return(
        <div className="relative bg-gray-800 dark:bg-neutral-700 light:bg-neutral-300 rounded h-[300px] animate-pulse">
            <svg className="absolute z-99 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mr-3 h-9 w-9 animate-spin text-white light:text-cyan-200 dark:text-cyan-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    )
}

export default CarouselLoader;