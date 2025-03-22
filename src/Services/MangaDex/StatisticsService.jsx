import axios from 'axios'

const BASE_URL = '/api';
export const getMangaStatistics = async(id) => {
    const response = await axios.get(`${BASE_URL}/statistics/manga/${id}`)
    return response?.data?.statistics[`${id}`];
}