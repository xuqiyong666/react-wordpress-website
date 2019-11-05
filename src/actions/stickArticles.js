
import wordpressClient from '../utils/wordpressClient'

export const FETCH_STICK_ARTICLES_START = 'FETCH_STICK_ARTICLES_START'
export const FETCH_STICK_ARTICLES_FAILED = "FETCH_STICK_ARTICLES_FAILED"
export const FETCH_STICK_ARTICLES_SUCCESS = 'FETCH_STICK_ARTICLES_SUCCESS'

export const fetchStickArticlesStart = () => ({ type: FETCH_STICK_ARTICLES_START })
export const fetchStickArticlesFailed = (error) => ({ type: FETCH_STICK_ARTICLES_FAILED, error: error })
export const fetchStickArticlesSuccess = (articles) => ({ type: FETCH_STICK_ARTICLES_SUCCESS, articles: articles })

export const fetchStickArticles = () => (dispatch, getState) => {

    let state = getState()

    let stickArticles = state.stickArticles

    if (stickArticles.isFetching) {
        return Promise.resolve(stickArticles)
    }

    if (stickArticles.isLoaded) {
        return Promise.resolve(stickArticles)
    }

    dispatch(fetchStickArticlesStart())

    return wordpressClient.fetch_stick_articles().then(response => {

        let newArticles = response.data

        dispatch(fetchStickArticlesSuccess(newArticles))
    }).catch(error => {
        
        dispatch(fetchStickArticlesFailed(error))
    })
}




