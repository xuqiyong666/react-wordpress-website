
import axios from 'axios'

import ApiConfig from '../config/api'

class WordpressClient {

    constructor(host) {
        this.host = host
    }

    fetch_page_articles(page, pageSize) {

        const apiUrl = this.host + "/wp-json/wp/v2/posts"

        const apiParams = {
            _embed: 1,
            page: page,
            per_page: pageSize
        }

        return axios.get(apiUrl, { params: apiParams })
    }

    fetch_categories() {
        const apiUrl = this.host + "/wp-json/wp/v2/categories"
        const apiParams = {
            per_page: 100
        }

        return axios.get(apiUrl, { params: apiParams })
    }

    fetch_stick_articles(){

        const apiUrl = this.host + "/wp-json/wp/v2/posts"
        const apiParams = {
            _embed: 1,
            page: 1,
            per_page: 3,
            sticky: 1
        }

        return axios.get(apiUrl, { params: apiParams })
    }

}

const myWordpressClient = new WordpressClient(ApiConfig.host)

export default myWordpressClient

