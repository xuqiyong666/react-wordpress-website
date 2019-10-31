
import lodash from 'lodash'


import {
    FETCH_CATEGORIES_START,
    FETCH_CATEGORIES_FAILED,
    FETCH_CATEGORIES_SUCCESS
} from '../actions/categories'

const defaultState = {
    isFetching: false,
    isLoaded: false,
    categoryList: [],
    categoryMapping: {}
}

function categories(state = defaultState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_START:
            return { ...state, isFetching: true }
        case FETCH_CATEGORIES_FAILED:
            return { ...state, isFetching: false }
        case FETCH_CATEGORIES_SUCCESS:
            return fetch_categories_success(state, action.categories)
        default:
            return state
    }
}

function fetch_categories_success(state, newCategories) {

    let categoryList = [...state.categoryList]
    let categoryMapping = { ...state.categoryMapping }

    lodash.each(newCategories, (category) => {

        let categoryId = category.id
        if (isNaN(categoryId)) {
            return
        }

        if (categoryMapping[categoryId]) {
            return
        }

        categoryList.push(category)
        categoryMapping[categoryId] = category
    })

    return {
        ...state,
        isFetching: false,
        isLoaded: true,
        categoryList,
        categoryMapping
    }
}

export default categories