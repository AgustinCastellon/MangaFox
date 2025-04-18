function SearchingLoader() {
    return (
        <div className="rounded-md p-4">
            <div className="flex flex-col gap-4 animate-pulse space-x-4">
                <div className="h-4 w-25 ml-2 rounded bg-gray-200"></div>
                <div className="flex w-full bg-slate-800 dark:bg-neutral-700 light:bg-amber-100 rounded py-2 pr-5">
                    <div className="w-17 h-24 rounded bg-gray-200 ml-2"></div>
                    <div className="flex-1 ml-2 space-y-3 py-1">
                        <div className="h-3 rounded bg-gray-200"></div>
                        <div className="h-3 w-25 rounded bg-gray-200"></div>
                        <div className="h-3 w-25 rounded bg-gray-200"></div>
                        <div className="h-3 w-25 rounded bg-gray-200"></div>
                    </div>
                </div>
                <div className="flex w-full bg-slate-800 dark:bg-neutral-700 light:bg-amber-100 rounded py-2">
                    <div className="w-17 h-24 rounded bg-gray-200 ml-2"></div>
                    <div className="flex-1 ml-2 space-y-3 py-1 pr-5">
                        <div className="h-3 rounded bg-gray-200"></div>
                        <div className="h-3 w-25 rounded bg-gray-200"></div>
                        <div className="h-3 w-25 rounded bg-gray-200"></div>
                        <div className="h-3 w-25 rounded bg-gray-200"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchingLoader;