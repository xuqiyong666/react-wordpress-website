
import React from 'react'
import Layout from '../Layout.js'

import {
    Link,
    useParams
} from "react-router-dom";

class ArticlePage extends React.Component {
    render() {

        const header = <Header articleId={this.props.articleId} />
        const content = <Content articleId={this.props.articleId} />

        return (
            <Layout header={header} content={content} ></Layout>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <div className="text-title">
                    <div className="text-title-inner">这里是文章标题({this.props.articleId})</div>
                </div>
            </div>
        )
    }
}

class Content extends React.Component {
    render() {
        return (
            <div style={{ height: "600px", padding: "10px", backgroundColor: "#1fc8db", backgroundImage: "linear-gradient(141deg,#9fb8ad 0%,#1fc8db 51%,#2cb5e8 75%)" }}>
                <h3>Article Content ({this.props.articleId})</h3>
                <p>文章正文文章正文文章正文文章正文文章正文</p>

                <p style={{margin: "5px 0"}}>
                    <Link to="/article/1" >文章1</Link>
                </p>

                <p style={{margin: "5px 0"}}>
                    <Link to="/article/2" >文章2</Link>
                </p>

                <p style={{margin: "5px 0"}}>
                    <Link to="/article/3" >文章3</Link>
                </p>
            </div>
        )
    }
}

export function ArticlePageWithParams() {

    const { articleId } = useParams();

    return (
        <ArticlePage articleId={articleId} />
    );
}

export default ArticlePage