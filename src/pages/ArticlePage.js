
import React from 'react'
import Layout from '../components/Layout'

// import { Link } from 'react-router-dom';
import wordpressClient from '../utils/wordpressClient'

import articleReader from '../utils/articleReader'

class ArticlePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            article: null
        }
    }

    render() {

        const header = <Header articleId={this.props.articleId} article={this.state.article} />
        const content = <Content articleId={this.props.articleId} article={this.state.article} />

        return (
            <Layout header={header} content={content} ></Layout>
        )
    }

    componentDidMount() {
        this.get_or_fetch_article(this.props.articleId)
    }

    //文章从redux中直接拿，或者从接口中获取
    async get_or_fetch_article(articleId) {

        let rxArticle = this.props.articles.articleMapping[articleId]
        if (rxArticle) {
            this.setState({ article: rxArticle })
            return
        }

        let response = await wordpressClient.fetch_article(articleId)

        // console.log(response)

        let rpArticle = response.data
        if (rpArticle && rpArticle.id) {
            this.setState({ article: rpArticle })
        }
    }
}

class Header extends React.Component {
    render() {

        let article = this.props.article
        if (!article) {
            return null
        }

        return (
            <div>
                <div className="text-title">
                    <div className="text-title-inner">{article.title.rendered}</div>
                </div>
            </div>
        )
    }
}

class Content extends React.Component {
    render() {

        let article = this.props.article
        if (!article) {
            return null
        }

        let thumbUrl = articleReader.read_article_full_image_url(article)
        let updateDate = articleReader.read_article_date(article)
        let author = articleReader.read_article_author(article)

        let thumbFrag
        if (thumbUrl) {
            thumbFrag = (
                <div className="main-thumb">
                    <img src={thumbUrl} alt="" />
                </div>
            )
        }

        return (

            <div className="pq-article-wrap">

                {thumbFrag}

                <article className="weui-article">

                    <div className="top-bar-space">
                        <div className="top-bar">
                            <div className="left">
                                <i className="far fa-clock icon"></i>
                                <span>{updateDate }</span>
                            </div>
                            <div className="right">
                                <span>{ author && author.name}</span>
                            </div>
                        </div>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: article.content.rendered }}></div>

                </article>
            </div>

        )
    }
}

export default ArticlePage