function SearchingLoader() {
    return (
        <div className=" max-w-sm rounded-md p-4">
            <div className="flex flex-col gap-4 animate-pulse space-x-4">
                <div className="h-3 w-20 rounded bg-gray-200"></div>
                <div className="flex w-full bg-slate-800 rounded p-2">
                    <div className="size-14 rounded bg-gray-200"></div>
                    <div className="flex-1 ml-2 space-y-3 py-1">
                        <div className="h-2 rounded bg-gray-200"></div>
                        <div className="h-2 w-25 rounded bg-gray-200"></div>
                        <div className="h-2 w-25 rounded bg-gray-200"></div>
                    </div>
                </div>
                <div className="flex w-full bg-slate-800 rounded p-2">
                    <div className="size-14 rounded bg-gray-200"></div>
                    <div className="flex-1 ml-2 space-y-3 py-1">
                        <div className="h-2 rounded bg-gray-200"></div>
                        <div className="h-2 w-25 rounded bg-gray-200"></div>
                        <div className="h-2 w-25 rounded bg-gray-200"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchingLoader;