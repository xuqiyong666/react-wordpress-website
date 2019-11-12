import lodash from 'lodash'

import {
    FETCH_ARTICLES_START,
    FETCH_ARTICLES_FAILED,
    FETCH_ARTICLES_SUCCESS,
} from '../actions/articles'

const defaultState = {
    pageLoaded: 0,
    pageSize: 20, //每页几条
    hasMoreArticles: true,
    isFetching: false,
    articleList: [],
    articleMapping: {}
}

function articles(state = defaultState, action) {
    switch (action.type) {
        case FETCH_ARTICLES_START:
            return { ...state, isFetching: true }
        case FETCH_ARTICLES_FAILED:
            return fetch_articles_failed(state, action.error)
        case FETCH_ARTICLES_SUCCESS:
            return fetch_articles_success(state, action.articles)
        default:
            return state
    }
}

function fetch_articles_failed(state, error) {

    let hasMoreArticles = state.hasMoreArticles

    console.log("fetch_articles_failed:")
    console.log(error)

    if (error.message === "Request failed with status code 400") {
        hasMoreArticles = false
    }

    return {
        ...state,
        hasMoreArticles,
        isFetching: false
    }
}

function fetch_articles_success(state, newArticles) {

    let articleList = [...state.articleList]
    let articleMapping = { ...state.articleMapping }

    lodash.each(newArticles, (article) => {

        let articleId = article.id
        if (isNaN(articleId)) {
            return
        }

        if (articleMapping[articleId]) {
            return
        }

        articleList.push(article)
        articleMapping[articleId] = article
    })

    let pageLoaded = state.pageLoaded + 1

    //wordpress没有返回总条数，当前页数据如果条数是满的，则认为还有下一页
    let hasMoreArticles = newArticles.length === state.pageSize

    return {
        ...state,
        isFetching: false,
        pageLoaded,
        hasMoreArticles,
        articleList,
        articleMapping
    }
}

export default articles



