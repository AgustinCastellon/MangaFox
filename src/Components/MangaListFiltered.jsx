import { useState } from "react";
import ModalMangaCard from "./modals/MangaModalCard";
import { Link } from "react-router-dom";

function MangaList({ mangas }) {
    const [listPosition, setListPosition] = useState(null);
    const [mangaId, setMangaId] = useState(null);
    const [modalPosition, setModalPosition] = useState(null);

    const handleMouseEnter = (id, event) => {
        if (!event) return;

        const rect = event.currentTarget.getBoundingClientRect();

        if (rect.right + 450 > window.innerWidth) {
            setModalPosition("left");
        } else {
            setModalPosition("right");
        }
        
        setListPosition("newPosition");
        setMangaId(id);
    };

    const handleMouseLeave = () => {
        setMangaId(null);
        setListPosition(null);
    }

    return (
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 xl:gap-2.5 lg:gap-4 xl:w-full lg:max-w-fit lg:mx-auto">
            {mangas?.map((manga, index) =>
            <Link key={index} to={`/manga/${manga.id}`}>
                <div  className="relative h-75   lg:w-50 xl:w-full"
                    onMouseEnter={(event) => handleMouseEnter(manga.id, event)} onMouseLeave={handleMouseLeave}>
                    <img src={`${manga.coverUrl}.512.jpg`} alt={manga.title} className="xl:h-64 lg:h-68 2xl:w-46 lg:w-50 object-cover rounded-sm" />
                    <span className="text-sm font-medium line-clamp-2">{manga.title}</span>
                    {mangaId === manga.id && <ModalMangaCard manga={manga} position={modalPosition} listPosition={listPosition}/>}
                </div>
            </Link>
            )}
        </div>
    )
}

export default MangaList;