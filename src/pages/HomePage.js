
import React from 'react'
import Layout from '../containers/Layout'
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
                categories={this.props.categories}
            />
        )
        return (
            <Layout content={content} ></Layout>
        )
    }

    componentDidMount() {
        this.props.fetchStickArticles()
        this.props.fetchCategories()
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

        const { categories, stickArticles } = this.props
        const { articleList } = stickArticles
        const { categoryList } = categories

        let stickArticlesFrag
        if (articleList.length >= 3) {
            stickArticlesFrag = (
                <div className="pq-article-exhibition">
                    <div className="big-part">
                        <StickArticle article={articleList[0]} />
                    </div>
                    <div className="small-part">
                        <StickArticle article={articleList[1]} side={true} orderClass="first" />
                        <StickArticle article={articleList[2]} side={true} />
                    </div>
                </div>
            )
        }

        return (
            <React.Fragment>

                {stickArticlesFrag}

                <BodyCategories categoryList={categoryList} />

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


function BodyCategories(props) {

    const { categoryList } = props

    if (!categoryList.length) {
        return null
    }

    const categoryFrags = categoryList.map((category) => {
        return <Link to={`/category/${category.id}`} key={category.id}>{category.name}</Link>
    })

    return (
        <div className="pq-index-categories">
            {categoryFrags}
        </div>
    )
}

export default HomePage