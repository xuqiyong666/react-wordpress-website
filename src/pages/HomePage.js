
import React from 'react'
import Layout from '../components/Layout'
import FlowArticles from '../containers/FlowArticles'

import { Link } from 'react-router-dom';

import articleReader from '../utils/articleReader'

class HomePage extends React.Component {

    render() {

        const content = (
            <Content
                stickArticles={this.props.stickArticles}
                articles={this.props.articles}
                fetchArticles={this.props.fetchArticles}
            />

        )
        return (
            <Layout content={content} ></Layout>
        )
    }

    componentDidMount() {
        this.props.fetchStickArticles()
    }
}

class Content extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            articleList: []
        }
    }

    render() {

        const stArticles = this.props.stickArticles.articleList
        let stickArticlesFrag
        if (stArticles.length >= 3) {
            stickArticlesFrag = (
                <div className="pq-article-exhibition">
                    <div className="big-part">
                        <StickArticle article={stArticles[0]} />
                    </div>
                    <div className="small-part">
                        <StickArticle article={stArticles[1]} side={true} orderClass="first" />
                        <StickArticle article={stArticles[2]} side={true} />
                    </div>
                </div>
            )
        }

        let categoriesFrag
        categoriesFrag = (
            <div className="pq-index-categories">
                <Link to="/category/11">
                    <span>分类11</span>
                </Link>
                <Link to="/category/22">
                    <span>分类22</span>
                </Link>
                <Link to="/category/33">
                    <span>分类33</span>
                </Link>
            </div>
        )

        return (
            <React.Fragment>

                {stickArticlesFrag}
                {categoriesFrag}

                <div className="pq-section-title">
                    <i className="far fa-book icon"></i>
                    <span>全部文章</span>
                </div>

                <FlowArticles />

            </React.Fragment >
        )
    }
}

function StickArticle(props) {

    const article = props.article
    const side = props.side
    const orderClass = props.orderClass || ""

    const coverUrl = articleReader.read_article_full_image_url(article)

    let coverFrag
    if (coverUrl) {
        coverFrag = (<div className="cover" style={{ backgroundImage: "url(" + coverUrl + ")" }}></div>)
    } else {
        coverFrag = (<div className="cover"></div>)
    }

    let titleFrag
    if (side) {
        titleFrag = (<p className="fake-link">{article.title.rendered}</p>)
    } else {
        titleFrag = (<h3 className="fake-link">{article.title.rendered}</h3>)
    }

    let maskFrag
    if (article) {
        maskFrag = (
            <div className="poster-mask">
                <div className="poster">
                    {titleFrag}
                </div>
            </div>
        )
    }

    return (
        <Link to={`/article/${article.id}`} className={`item block ${orderClass}`}>
            {coverFrag}
            {maskFrag}
        </Link>
    )
}

export default HomePage