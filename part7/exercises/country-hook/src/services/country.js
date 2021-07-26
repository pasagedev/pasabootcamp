import axios from 'axios'

const baseUrl = 'https://restcountries.eu/rest/v2'

const get = name => {
    const request = axios.get(`${baseUrl}/name/${name}?fullText=true`)
    return request
        .then(response => response.data)
    }

export default {get}