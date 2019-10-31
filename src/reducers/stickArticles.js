
// 置顶的三篇文章

import {
    FETCH_STICK_ARTICLES_START,
    FETCH_STICK_ARTICLES_FAILED,
    FETCH_STICK_ARTICLES_SUCCESS
} from '../actions/stickArticles'

const defaultState = {
    isFetching: false,
    isLoaded: false,
    articleList: []
}

function stickArticles(state = defaultState, action) {
    switch (action.type) {
        case FETCH_STICK_ARTICLES_START:
            return { ...state, isFetching: true }
        case FETCH_STICK_ARTICLES_FAILED:
            return { ...state, isFetching: false }
        case FETCH_STICK_ARTICLES_SUCCESS:
            return fetch_sticky_articles_success(state, action.articles)
        default:
            return state
    }
}

function fetch_sticky_articles_success(state, newArticles) {

    return {
        ...state,
        isFetching: false,
        isLoaded: true,
        articleList: newArticles
    }
}

export default stickArticles