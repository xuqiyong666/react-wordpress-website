
import wordpressClient from '../utils/wordpressClient'

export const FETCH_CATEGORIES_START = 'FETCH_CATEGORIES_START'
export const FETCH_CATEGORIES_FAILED = "FETCH_CATEGORIES_FAILED"
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'

export const fetchCategoriesStart = () => ({ type: FETCH_CATEGORIES_START })
export const fetchCategoriesFailed = (error) => ({ type: FETCH_CATEGORIES_FAILED, error: error })
export const fetchCategoriesSuccess = (categories) => ({ type: FETCH_CATEGORIES_SUCCESS, categories: categories })

export const fetchCategories = () => (dispatch, getState) => {

    let state = getState()

    let stateCategories = state.categories

    if (stateCategories.isFetching) {
        return Promise.reject("categories is fetching")
    }

    if (stateCategories.isLoaded) {
        return Promise.reject("categories is loaded")
    }

    dispatch(fetchCategoriesStart())

    return wordpressClient.fetch_categories().then(response => {

        let newCategories = response.data

        dispatch(fetchCategoriesSuccess(newCategories))

    }).catch(error => {

        dispatch(fetchCategoriesFailed(error))
    })
}