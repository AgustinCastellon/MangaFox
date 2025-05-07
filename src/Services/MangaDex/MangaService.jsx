import axios from 'axios'
import { getCoverUrl } from './CoverService';
import { getMangaStatistics } from './StatisticsService'
const BASE_URL = '/api';

/**
 * Obtiene todos los mangas
 */
export const getAllMangas = async (limit, offset = 0) => {
    try {
        const response = await axios.get(`${BASE_URL}/manga`, {
            params: {
                "includes[]": ["cover_art", "author"],
                limit: limit,
                offset: offset,
            }
        })
        return {
            mangas: response.data.data.map(manga => ({
                id: manga.id,
                title: manga.attributes.title.en || Object.values(manga.attributes.title)[0],
                description: manga.attributes.description.es || manga.attributes.description.en || Object.values(manga.attributes.title)[0],
                coverUrl: manga.relationships.find(rel => rel.type === "cover_art") ? getCoverUrl(manga.id, manga.relationships.find(rel => rel.type === "cover_art").attributes.fileName) : null,
                year: manga.attributes.year,
                status: manga.attributes.status,
                author: manga.relationships.find(f => f.type === "author")?.attributes.name || "N/A"
            })),
            total: response.data.total
        }
    } catch (error) {
        console.error('Error obteniendo mangas:', error);
        return [{ mangas: [], total: 0 }];
    }
}

export const getMangaById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/manga/${id}`, {
            params: {
                "includes[]": ["cover_art", "author", "artist"],
            }
        })
        const mangaData = response.data.data;
        const mangaId = response.data.data.id;
        const cover = response.data.data.relationships.find(f => f.type === "cover_art").attributes.fileName;
        const content = response.data.data.attributes.tags.filter(f => f.attributes.group === "content")
            .map(m => m.attributes.name.en);
        const genres = response.data.data.attributes.tags.filter(f => f.attributes.group === "genre")
            .map(m => m.attributes.name.en);
        const themes = response.data.data.attributes.tags.filter(f => f.attributes.group === "theme")
            .map(t => t.attributes.name.en);
        const authors = response.data.data.relationships.filter(f => f.type === "author").map(a => a.attributes.name);
        const artists = response.data.data.relationships.filter(f => f.type === "artist").map(a => a.attributes.name);
        const altTitles = response.data.data.attributes.altTitles
        return {
            ...mangaData,
            coverUrl: cover ? getCoverUrl(mangaId, cover) : null,
            content,
            genres,
            authors,
            artists,
            themes,
            altTitles
        };
    } catch (error) {
        console.error('Error obteniendo manga:', error);
        return null;
    }
}

/**
 * Obtiene los mangas más populares
 */
export const getMangasPopulares = async (limit, content) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/manga`, {
            params: {
                "order[year]": "desc",
                "order[followedCount]": "desc",
                "includes[]": "cover_art",
                hasAvailableChapters: true,
                limit: limit,
                contentRating: content
            },
        });
        return response.data.data.map(manga => {
            const cover = manga.relationships.find(rel => rel.type === "cover_art")
            return {
                id: manga.id,
                title: manga.attributes.title.en || Object.values(manga.attributes.title)[0],
                description: manga.attributes.description["es-la"] || Object.values(manga.attributes.description)[0],
                genres: manga.attributes.tags.filter(tag => tag.attributes.group === "genre")
                    .map(tag => tag.attributes.name.en.toUpperCase()),
                coverUrl: cover ? getCoverUrl(manga.id, cover.attributes.fileName) : null,
            };
        });

    } catch (error) {
        console.error('Error obteniendo mangas populares:', error);
        return [];
    }
};
/**
 * Obtiene los mangas mas recientes
 */
export const getMangasRecientes = async (limit, offset = 0, content) => {
    try {
        const response = await axios.get(`${BASE_URL}/manga`, {
            params: {
                "order[year]": "desc",
                "includes[]": ["cover_art", "author"],
                limit: limit,
                offset: offset,
                contentRating: content
            }
        });

        return {
            mangas: response.data.data.map(manga => ({
                id: manga.id,
                title: manga.attributes.title.en || Object.values(manga.attributes.title)[0],
                description: manga.attributes.description.es || manga.attributes.description.en || Object.values(manga.attributes.title)[0],
                coverUrl: manga.relationships.find(rel => rel.type === "cover_art") ? getCoverUrl(manga.id, manga.relationships.find(rel => rel.type === "cover_art").attributes.fileName) : null,
                year: manga.attributes.year,
                status: manga.attributes.status,
                author: manga.relationships.find(f => f.type === "author")?.attributes.name || "N/A"
            })),
            total: response.data.total
        };

    } catch (error) {
        console.error('Error obteniendo mangas recientes:', error);
        return { mangas: [], total: 0 };
    }
};

/**
 * Obtiene los mangas mejor calificados
 */
export const getMangasTopRated = async (limit, offset = 0, content) => {
    try {
        const response = await axios.get(`${BASE_URL}/manga`, {
            params: {
                "order[rating]": "desc",
                "includes[]": ["cover_art", "author"],
                limit: limit,
                offset: offset,
                contentRating: content
            }
        });

        return {
            mangas: response.data.data.map(manga => ({
                id: manga.id,
                title: manga.attributes.title.en || Object.values(manga.attributes.title)[0],
                description: manga.attributes.description.es || manga.attributes.description.en || Object.values(manga.attributes.title)[0],
                coverUrl: manga.relationships.find(rel => rel.type === "cover_art") ? getCoverUrl(manga.id, manga.relationships.find(rel => rel.type === "cover_art").attributes.fileName) : null,
                year: manga.attributes.year,
                status: manga.attributes.status,
                author: manga.relationships.find(f => f.type === "author")?.attributes.name || "holas"
            })),
            total: response.data.total
        };

    } catch (error) {
        console.error('Error obteniendo top rated manga:', error);
        return { mangas: [], total: 0 };
    }
}

export const getCapitulosManga = async (id, lang, limit = 500, offset = 0) => {
    const response = await axios.get(`${BASE_URL}/manga/${id}/feed`, {
        params: {
            "order[chapter]": "asc",
            "translatedLanguage[]": `${lang}`,
            "includeExternalUrl": 0,
            limit: limit,
            offset: offset
        }
    })
    return {
        chapters: response.data.data || [],
        total: response.data.total
    }
}

export const getFirstChapterEachLanguage = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/manga/${id}/feed`, {
            params: {
                "order[chapter]": "asc",
                "includeExternalUrl": 0,
                "includes[]": ["user", "scanlation_group"],
            }
        })

        const chapters = response.data.data || [];

        // Filtrar el primer capítulo para cada idioma
        const firstChaptersByLanguage = {};

        chapters.forEach((chapter) => {
            const langCode = chapter.attributes.translatedLanguage;

            // Solo guardamos el primer capítulo por idioma
            if (!firstChaptersByLanguage[langCode]) {
                firstChaptersByLanguage[langCode] = chapter;
            }
        });

        // Convertir el objeto a un array de capítulos por idioma
        return Object.values(firstChaptersByLanguage);
    } catch (error) {
        console.error('Error obteniendo primer capítulo por idioma:', error);
        return null;
    }
}

export const getRandomManga = async () => {
    const response = await axios.get(`${BASE_URL}/manga/random`, {
        params: {
            "includes[]": "cover_art",
        }
    })
    const cover = response.data.data.relationships.find(f => f.type === "cover_art").attributes.fileName;
    const mangaId = response.data.data.id;
    return {
        manga: response.data.data,
        coverUrl: cover ? getCoverUrl(mangaId, cover) : null
    }
}

export const findMangaByTitle = async (title) => {
    try {
        const response = await axios.get(`${BASE_URL}/manga`, {
            params: {
                title: title,
                "includes[]": "cover_art",
            }
        })

        const mangas = response.data.data;

        // Obtener estadísticas en paralelo
        const statsPromises = mangas.map(manga => getMangaStatistics(manga.id));
        const statsResults = await Promise.all(statsPromises);

        return mangas.map((manga, index) => {
            const cover = manga.relationships.find(rel => rel.type === "cover_art");
            return {
                id: manga.id,
                title: manga.attributes.title.en || Object.values(manga.attributes.title)[0],
                description: manga.attributes.description["es-la"] || Object.values(manga.attributes.description)[0],
                status: manga.attributes.status,
                year: manga.attributes.year || "-",
                coverUrl: cover ? getCoverUrl(manga.id, cover.attributes.fileName) : null,
                rating: statsResults[index].rating.average || 0,
                followers: statsResults[index].follows || null,
                comments: statsResults[index].comments
            };
        });
    } catch (error) {
        console.error('Error obteniendo mangas populares:', error);
        return [];
    }
}

export const getTags = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/manga/tag`
        )
        const data = response.data.data;
        const genres = data.filter(f => f.attributes.group === "genre")
            .map(m => m.attributes.name.en) || "vacio"
        const format = data.filter(f => f.attributes.group === "format")
            .map(m => m.attributes.name.en) || "vacio"
        const theme = data.filter(f => f.attributes.group === "theme")
            .map(m => m.attributes.name.en) || "vacio"
        const content = data.filter(f => f.attributes.group === "content")
            .map(m => m.attributes.name.en) || "vacio"
        return {
            genres: genres,
            format: format,
            theme: theme,
            content: content
        }
    } catch (error) {
        return console.error('No se encontraron tags: ', error);
    }
}

export const getMangasByFilter = async (limit, offset = 0, includedTagNames, filtersCDS, sortName, sortValue) => {
    try {
        const tags = await axios.get(`${BASE_URL}/manga/tag`)

        const includedTagIDs = tags.data.data
            .filter(tag => includedTagNames.includeTag.includes(tag.attributes.name.en))
            .map(tag => tag.id);

        const excludedTagIDs = tags.data.data
            .filter(tag => includedTagNames.excludeTag.includes(tag.attributes.name.en))
            .map(tag => tag.id);

        const demographic = filtersCDS.demographic;
        const contentRating = filtersCDS.contentRating;
        const status = filtersCDS.status;

        const response = await axios.get(`${BASE_URL}/manga`, {
            params: {
                limit: limit,
                offset: offset,
                "includes[]": ["cover_art", "author"],
                'includedTags': includedTagIDs,
                'excludedTags': excludedTagIDs,
                includedTagsMode: includedTagNames.incTagMode,
                excludedTagsMode: includedTagNames.excTagMode,
                publicationDemographic: demographic,
                contentRating: contentRating,
                status: status,
                [`order[${sortName}]`]: sortValue
            }
        })

        return {
            mangas: response.data.data.map(manga => ({
                id: manga.id,
                title: manga.attributes.title.en || Object.values(manga.attributes.title)[0],
                description: manga.attributes.description.es || manga.attributes.description.en || Object.values(manga.attributes.title)[0],
                coverUrl: manga.relationships.find(rel => rel.type === "cover_art") ? getCoverUrl(manga.id, manga.relationships.find(rel => rel.type === "cover_art").attributes.fileName) : null,
                year: manga.attributes.year,
                status: manga.attributes.status,
                author: manga.relationships.find(f => f.type === "author")?.attributes.name || "holas"
            })),
            total: response.data.total
        }

    } catch (error) {
        console.error('Error al filtrar mangas', error);
    }

}