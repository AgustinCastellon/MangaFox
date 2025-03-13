import axios from 'axios'
import { getMangaCovers } from './CoverService';

const BASE_URL = 'https://api.mangadex.org';



/**
 * Obtiene los últimos capítulos actualizados
 */
export const getLatestUpdates = async (limit) => {
    try {
        const response = await axios.get(`${BASE_URL}/chapter`, {
            params: {
                "order[updatedAt]": "desc",
                "includes[]": ["manga", "user"],
                limit: limit,
            },
        });

        const chapters = response.data.data || [];
        const mangaIds = [... new Set(chapters.map((c) => c.relationships.find(r => r.type === "manga")?.id))];
        const coverData = await getMangaCovers(mangaIds);
        const chapterWithCovers = chapters.map((c) => {
            const mangaId = c.relationships.find(t => t.type === "manga")?.id;
            const manga = c.relationships.find(t => t.type === "manga")?.attributes || {};
            const user = c.relationships.find(t => t.type === "user")?.attributes || {};
            return {
                id: c.id,
                title: manga.title["en"] || Object.values(manga.title)[0] || "not title",
                coverUrl: coverData[mangaId] || null,
                vol: c.attributes.volume,
                chapter: c.attributes.chapter,
                updatedAt: c.attributes.updatedAt,
                user: user.username,
                translate: c.attributes.translatedLanguage
            };
        });
        return chapterWithCovers;
    } catch (error) {
        console.error('Error obteniendo actualizaciones recientes:', error);
        return [];
    }
}

