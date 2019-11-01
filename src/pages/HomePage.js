
import React from 'react'
import Layout from '../components/Layout'

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

        const articlesFrag = this.state.articleList.map((article) => {

            return (
                <ArticleCard article={article} key={article.id} />
            )
        })

        const moreArticleButtonArea = (
            <MoreArticleButtonArea
                page={this.state.page}
                articles={this.props.articles}
                loading_more_articles={this.loading_more_articles.bind(this)}
            />
        )

        return (
            <React.Fragment>

                {stickArticlesFrag}
                {categoriesFrag}

                <div className="pq-section-title">
                    <i className="far fa-book icon"></i>
                    <span>全部文章</span>
                </div>

                <div className="pq-flow-article-cards">
                    {articlesFrag}
                </div>

                {moreArticleButtonArea}

            </React.Fragment >
        )
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

function MoreArticleButtonArea(props) {

    const page = props.page
    const articles = props.articles
    const loading_more_articles = props.loading_more_articles

    let buttonFrag

    if (page < articles.pageLoaded || (articles.hasMoreArticles && !articles.isFetching)) {
        buttonFrag = (
            <div style={{ textAlign: "center" }}>
                <span onClick={loading_more_articles} className="weui-btn weui-btn_primary">查看更多</span>
            </div>
        )
    }

    let loadingFrag
    if (articles.isFetching) {
        loadingFrag = (
            <div className="weui-loadmore">
                <i className="weui-loading"></i>
                <span className="weui-loadmore__tips">正在加载</span>
            </div>
        )
    }

    let nothngFrag
    if (!articles.isFetching && !articles.articleList.length) {
        nothngFrag = (
            <div className="weui-loadmore weui-loadmore_line">
                <span className="weui-loadmore__tips">暂无数据</span>
            </div>
        )
    }

    let noMoreFrag
    if (page >= articles.pageLoaded && !articles.hasMoreArticles && !articles.isFetching) {
        noMoreFrag = <div className="weui-loadmore weui-loadmore_line">
            <span className="weui-loadmore__tips">无更多内容</span>
        </div>
    }

    return (
        <div style={{ minHeight: "50px", margin: "30px 0" }}>

            {buttonFrag}
            {loadingFrag}
            {nothngFrag}
            {noMoreFrag}
        </div>
    )
}

export default HomePage