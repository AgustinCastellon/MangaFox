import { useEffect, useState } from "react";
import { getAllMangas, getMangasRecientes, getMangasTopRated } from "../Services/MangaDex/MangaService";
import { useSearchParams } from "react-router-dom";
import MangaListFiltered from "../Components/MangaListFiltered";
import Pagination from "../Components/Pagination";

function MangaList() {
    const [mangas, setMangas] = useState([]);
    const [totalMangas, setTotalMangas] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    const filter = searchParams.get("filter");
    const page = parseInt(searchParams.get("page")) || 1; // obtiene la pagina de la URL
    const mangasPerPage = 30;

    useEffect(() => {
        const fetchMangaFilter = async () => {
            let data;
            if (filter === "Top-Rated") {
                data = await getMangasTopRated(mangasPerPage, (page - 1) * mangasPerPage);
            } else if (filter === "Latest Releases") {
                data = await getMangasRecientes(mangasPerPage, (page - 1) * mangasPerPage);
            } else {
                data = await getAllMangas(mangasPerPage, (page - 1) * mangasPerPage);
            }

            if (data) {
                setMangas(data.mangas);
                setTotalMangas(data.total);
            }
        };
        fetchMangaFilter();
    }, [filter, page]);

    const handlePageChange = (newPage) => {
        setSearchParams({ filter, page: newPage }); //actualiza la URL con la nueva pagina
    }

    return (
        <div className="xl:w-[1200px] mx-auto px-4 mb-10">
            <h1 className='font-bold mb-3 text-2xl light:text-black'>{filter ? filter.replace("-", " ").toUpperCase() : "All Mangas"}</h1>
            <MangaListFiltered mangas={mangas} />
            <Pagination
                totalItems={totalMangas}
                itemsPerPage={mangasPerPage}
                currentPage={page}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default MangaList;