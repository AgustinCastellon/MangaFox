import axios from 'axios'

const BASE_URL = 'https://api.mangadex.org/statistics';
export const getMangaStatistics = async(id) => {
    const response = await axios.get(`${BASE_URL}/manga/${id}`)
    return response?.data?.statistics[`${id}`];
}