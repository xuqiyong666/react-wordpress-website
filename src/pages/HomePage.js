
import React from 'react'
import Layout from '../Layout'

import { Link } from 'react-router-dom';

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

        const articles = this.state.articleList.map((article) => {
            return (
                <p key={article.id}>
                    <Link to={`/article/${article.id}`}>[{article.id}] {article.title.rendered}</Link>
                </p>
            )
        })

        return (
            <div style={{ minHeight: "600px", padding: "10px", backgroundColor: "#1fc8db", backgroundImage: "linear-gradient(141deg,#9fb8ad 0%,#1fc8db 51%,#2cb5e8 75%)" }}>
                <h3>Home Content</h3>

                {articles}

                <p>
                    <button onClick={this.loading_more_articles.bind(this)}>{this.props.articles.isFetching ? "加载中..." : "加载更多"}</button>
                </p>
            </div>
        )
    }

    componentDidMount() {

        this.loading_more_articles()

    }

    loading_more_articles() {

        console.log("loading_more_articles")

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

export default HomePage