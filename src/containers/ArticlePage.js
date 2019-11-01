
import React from 'react'

import {
    useParams
} from "react-router-dom";

import { connect } from 'react-redux'
import ArticlePage from '../pages/ArticlePage'


const mapStateToProps = (state, ownProps) => ({
    articles: state.articles
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const ConnectArticlePage = connect(mapStateToProps, mapDispatchToProps)(ArticlePage)

export function ArticlePageWithParams() {

    const { articleId } = useParams();

    return (<ConnectArticlePage articleId={articleId} />)
}

export default ConnectArticlePage
