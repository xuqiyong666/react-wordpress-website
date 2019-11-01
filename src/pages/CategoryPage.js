
import React from 'react'
import Layout from '../components/Layout'

import {
    Link,
    useParams,
    useLocation
} from "react-router-dom";

const Colors = [
    "#4e54c8", //亮蓝色
    "rgb(95, 47, 144)", //紫色
    "rgb(13, 91, 171)", //深蓝色
]

class CategoryPage extends React.Component {

    render() {

        const header = <Header categoryId={this.props.categoryId} />
        const content = <Content categoryId={this.props.categoryId} />

        const headerColor = this.getHeaderColor()

        return (
            <Layout header={header} content={content} headerColor={headerColor} />
        )
    }

    componentDidMount() {
        console.log(`CategoryPage DiD mount: ${this.props.categoryId}`)
    }

    getHeaderColor(){

        if(!this.props.categoryId){
            return
        }

        const index = this.props.categoryId % Colors.length;
        return Colors[index]
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

                <Link to="/">回到首页</Link>
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
