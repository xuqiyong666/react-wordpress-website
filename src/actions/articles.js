
import wordpressClient from '../utils/wordpressClient'

export const FETCH_ARTICLES_START = 'FETCH_ARTICLES_START'
export const FETCH_ARTICLES_FAILED = "FETCH_ARTICLES_FAILED"
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS'

export const fetchArticlesStart = () => ({ type: FETCH_ARTICLES_START })
export const fetchArticlesFailed = (error) => ({ type: FETCH_ARTICLES_FAILED, error: error })
export const fetchArticlesSuccess = (articles) => ({ type: FETCH_ARTICLES_SUCCESS, articles: articles })

export const fetchArticles = () => (dispatch, getState) => {

    let state = getState()

    let stateArticles = state.articles

    if (stateArticles.isFetching) {
        return Promise.reject("articles is fetching")
    }

    if (!stateArticles.hasMoreArticles) {
        return Promise.reject("no more articles")
    }

    let nextPage = stateArticles.pageLoaded + 1
    let pageSize = stateArticles.pageSize

    dispatch(fetchArticlesStart())

    return wordpressClient.fetch_page_articles(nextPage, pageSize).then(response => {

        let newArticles = response.data

        dispatch(fetchArticlesSuccess(newArticles))
    }).catch(error => {

        dispatch(fetchArticlesFailed(error))
    })
}



