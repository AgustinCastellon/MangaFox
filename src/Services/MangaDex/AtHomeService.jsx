import axios from 'axios'

const BASE_URL = '/api'

export const getChapter = async (chapterId)=>{
    try{
        const response = await axios.get(`${BASE_URL}/at-home/server/${chapterId}`)
        const baseChapterUrl = response.data.baseUrl;
        const hash = response.data.chapter.hash;
        return response.data.chapter.dataSaver.map(c =>{
            return{
                pageUrl: `${baseChapterUrl}/data-saver/${hash}/${c}`
            }
        })
    } catch(error){
        console.error('Error obteniendo capítulos:', error);
        return [];
    }
}