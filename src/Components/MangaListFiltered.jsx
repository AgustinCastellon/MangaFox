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
        <div className="grid grid-cols-6 gap-2.5">
            {mangas?.map((manga, index) =>
            <Link key={index} to={`/manga/${manga.id}`}>
                <div  className="relative h-75"
                    onMouseEnter={(event) => handleMouseEnter(manga.id, event)} onMouseLeave={handleMouseLeave}>
                    <img src={`${manga.coverUrl}.512.jpg`} alt={manga.title} className="h-64 w-46 object-cover rounded-sm" />
                    <span className="text-sm font-medium line-clamp-2">{manga.title}</span>
                    {mangaId === manga.id && <ModalMangaCard manga={manga} position={modalPosition} listPosition={listPosition}/>}
                </div>
            </Link>
            )}
        </div>
    )
}

export default MangaList;