
import React from 'react';

import { Link } from 'react-router-dom';

import articleReader from '../utils/articleReader'

class FlowArticles extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            page: 0,
            articleList: []
        }
    }

    render() {

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

        let columnClass
        if (this.props.columnSize === 3) {
            columnClass = "max-three-columns"
        }

        return (

            <React.Fragment>
                <div className={`pq-flow-article-cards ${columnClass}`}>
                    {articlesFrag}
                </div>

                {moreArticleButtonArea}
            </React.Fragment>
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
    if (page > 1 && !articles.hasMoreArticles && !articles.isFetching) {
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

export default FlowArticles