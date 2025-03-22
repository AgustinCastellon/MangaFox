import axios from 'axios'

const BASE_URL = '/api';
const COVER_BASE_URL = 'https://api-mangafox.onrender.com/api'
/**
 * Devuelve la URL de la portada de un manga.
 */
export const getCoverUrl = (mangaId, coverFileName) =>
    `${COVER_BASE_URL}/covers/${mangaId}/${coverFileName}`;

/**
 * Obtiene las portadas de varios mangas a partir de sus IDs.
 */
export const getMangaCovers = async (mangaIds) => {
    try {
        const coverData = {};
        await Promise.all(mangaIds.map(async (id) => {
            const response = await axios.get(`${BASE_URL}/manga/${id}?includes[]=cover_art`);
            const cover = response.data.data.relationships.find(r => r.type === "cover_art");
            if (cover && cover.attributes?.fileName) {
                coverData[id] = `${COVER_BASE_URL}/${id}/${cover.attributes.fileName}.512.jpg`;
            } else {
                coverData[id] = null;
            }
        }));
        return coverData;
    } catch (error) {
        console.error('Error obteniendo portadas de mangas:', error);
        return {};
    }
}

/**
 * Obtiene todos los covers de un manga.
 */
export const getAllCovers = async (id, limit = 30) => {
    try {
        const response = await axios.get(`${BASE_URL}/cover`, {
            params: {
                "order[volume]": "asc",
                "manga[]": `${id}`,
                limit: limit,
            }
        })
        return response.data.data.map(m => {
            const cover = getCoverUrl(id, m.attributes.fileName)
            return {
                volume: m.attributes.volume,
                locale: m.attributes.locale,
                coverUrl: cover ? cover : null
            }
        })

    } catch (error) {
        console.error('Error obteniendo todas las portadas:', error);
        return [];
    }
}
