
import React from 'react'
import Layout from '../Layout'

import { Link } from 'react-router-dom';

import articleReader from '../utils/articleReader'

// import ApiConfig from "./config/api"
// import Axios from 'axios';

class HomePage extends React.Component {

    render() {

        const content = <Content articles={this.props.articles} fetchArticles={this.props.fetchArticles} />

        return (
            <Layout content={content} ></Layout>
        )
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

        const stickyArticles = this.state.articleList.slice(0, 3)
        let stickyArticlesFrag
        if (stickyArticles.length >= 3) {
            stickyArticlesFrag = (
                <div className="pq-article-exhibition">
                    <div className="big-part">
                        <StickyArticle article={stickyArticles[0]} />
                    </div>
                    <div className="small-part">
                        <StickyArticle article={stickyArticles[1]} side={true} orderClass="first" />
                        <StickyArticle article={stickyArticles[2]} side={true} />
                    </div>
                </div>
            )
        }

        let categoriesFrag
        categoriesFrag = (
            <div className="pq-index-categories">
                <Link to="/todo">
                    <span>分类1</span>
                </Link>
                <Link to="/todo">
                    <span>分类2</span>
                </Link>
                <Link to="/todo">
                    <span>分类3</span>
                </Link>
            </div>
        )

        const articlesFrag = this.state.articleList.map((article) => {

            return (
                <ArticleCard article={article} key={article.id} />
            )
        })

        const output = (
            <React.Fragment>

                {stickyArticlesFrag}
                {categoriesFrag}

                <div className="pq-section-title">
                    <i className="far fa-book icon"></i>
                    <span>全部文章</span>
                </div>

                <div className="pq-flow-article-cards">
                    {articlesFrag}
                </div>

                <p>
                    <button onClick={this.loading_more_articles.bind(this)}>{this.props.articles.isFetching ? "加载中..." : "加载更多"}</button>
                </p>
            </React.Fragment>
        )

        return output
    }



    componentDidMount() {

        this.loading_more_articles()

    }

    loading_more_articles() {

        let nextPage = this.state.page + 1

        if (nextPage > this.props.articles.pageLoaded) {
            this.props.fetchArticles().then(() => {
                this.setState({
                    page: nextPage,
                    articleList: this.props.articles.articleList
                })
            }).catch((error) => {
                console.log(error)
            })
        } else {
            this.setState({
                page: nextPage,
                articleList: this.props.articles.articleList.slice(0, nextPage * this.props.articles.pageSize)
            })
        }
    }

}

function StickyArticle(props) {

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

function ArticleCard(props) {

    const article = props.article

    if (!article) {
        return null
    }

    const coverUrl = articleReader.read_article_full_image_url(article)
    const updateDate = articleReader.read_article_date(article)
    const category = articleReader.read_article_category(article)
    const author = articleReader.read_article_author(article)

    let coverFrag
    if (coverUrl) {
        coverFrag = (<div className="cover" style={{ backgroundImage: "url(" + coverUrl + ")" }}></div>)
    } else {
        coverFrag = (<div className="cover"></div>)
    }

    let tagFrag
    if (category) {
        tagFrag = (<div className="cover-tag">{category.name}</div>)
    }

    return (
        <Link to={`/article/${article.id}`} className="card">
            <div className="card-inner">

                {coverFrag}
                {tagFrag}

                <div className="info-box">
                    <div className="flex-title-wrap">
                        <span className="fake-link title">{article.title.rendered}</span>
                    </div>
                    <div className="bottom-bar">
                        <div className="left">
                            <i className="far fa-clock icon"></i>
                            <span>{updateDate}</span>
                        </div>
                        <div className="right">
                            <span>{author && author.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )

}

export default HomePage