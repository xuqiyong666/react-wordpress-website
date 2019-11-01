
import React from 'react'
import Layout from '../components/Layout'

import {
    useParams,
    useLocation
} from "react-router-dom";

class CategoryPage extends React.Component {

    render() {

        const header = <Header categoryId={this.props.categoryId} />
        const content = <Content categoryId={this.props.categoryId} />

        return (
            <Layout header={header} content={content} />
        )
    }

    componentDidMount() {
        console.log(`CategoryPage DiD mount: ${this.props.categoryId}`)
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <div className="text-category">
                    <div className="title">分类{this.props.categoryId}</div>
                    <div className="intro">分类描述分类描述分类描述分类描述分类描述分类描述</div>
                </div>
            </div>
        )
    }
}

class Content extends React.Component {
    render() {
        return (
            <div style={{ height: "600px", padding: "10px", backgroundColor: "#1fc8db", backgroundImage: "linear-gradient(141deg,#9fb8ad 0%,#1fc8db 51%,#2cb5e8 75%)" }}>
                <h3>Category Content</h3>
                <p>categoryId = {this.props.categoryId}</p>

                <h1>TODO 分类页</h1>
            </div>
        )
    }
}

export function CategoryPageWithQuery() {

    const query = new URLSearchParams(useLocation().search);

    const categoryId = parseInt(query.get("id"))

    return (
        <CategoryPage categoryId={categoryId} />
    );
}

export function CategoryPageWithParams() {

    const { categoryId } = useParams();

    return (
        <CategoryPage categoryId={categoryId} />
    );
}

export default CategoryPage
