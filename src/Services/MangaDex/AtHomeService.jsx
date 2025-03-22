import axios from 'axios'


export const getChapter = async (chapterId) => {
    try {
        const response = await axios.get(`/api/chapter/${chapterId}`);
        return response.data.pages;
    } catch (error) {
        console.error('Error obteniendo capítulos:', error);
        return [];
    }
}