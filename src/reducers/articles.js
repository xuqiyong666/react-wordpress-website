import lodash from 'lodash'

import {
    FETCH_ARTICLES_START,
    FETCH_ARTICLES_FAILED,
    FETCH_ARTICLES_SUCCESS,
} from '../actions'

// function defaultArticle
const defaultState = {
    pageLoaded: 0,
    pageSize: 20,
    hasMoreArticles: true,
    isFetching: false,
    cacheLimit: 500, //缓存最新的xx篇文章
    articleList: [],
    articleMapping: {}
}

function articles(state = defaultState, action) {
    switch (action.type) {
        case FETCH_ARTICLES_START:
            return { ...state, isFetching: true }
        case FETCH_ARTICLES_FAILED:
            return { ...state, isFetching: false }
        case FETCH_ARTICLES_SUCCESS:
            return fetch_articles_success(state, action.articles)
        default:
            return state
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



