
import React from 'react'
import Layout from '../containers/Layout'

import {
    Link
} from "react-router-dom";

import FlowArticles from '../components/FlowArticles'

class CategoryPage extends React.Component {

    defaultState() {
        return ({
            categoory: null
        })
    }

    constructor(props) {
        super(props)
        this.state = this.defaultState()
    }

    render() {

        const category = this.getRenderCategory()

        if (!category) {
            return null
        }

        document.title = `${category.name} - 大勇的博客`

        const { categories } = this.props

        const header = <Header category={category} />
        const content = <Content category={category} categories={categories} key={category.id} />

        return (
            <Layout header={header} content={content} headerColor={category.color} />
        )
    }

    componentDidMount() {
        this.props.fetchCategories()
    }

    componentDidUpdate(prevProps) {
        if (this.props.categoryId !== prevProps.categoryId) {
            this.refresh()
        }
    }

    refresh() {
        this.setState(this.defaultState())
        this.componentDidMount()
    }

    getRenderCategory() {

        const categoryId = this.props.categoryId

        if (!categoryId) {
            return
        }

        const categoryMapping = this.props.categories.categoryMapping

        return categoryMapping[categoryId]
    }

}

class Header extends React.Component {
    render() {

        const { category } = this.props

        return (
            <div>
                <div className="text-category">
                    <div className="title">{category.name}</div>
                    <div className="intro">{category.description}</div>
                </div>
            </div>
        )
    }
}

class Content extends React.Component {

    constructor(props){
        super(props)
        this.state = this.defaultState()
    }

    defaultState(){
        return {
            articles: this.defaultArticles()
        }
    }

    defaultArticles() {
        return {
            pageLoaded: 0,
            pageSize: 20, //每页几条
            hasMoreArticles: false,
            isFetching: false,
            articleList: []
        }
    }

    render() {

        const { category, categories } = this.props

        return (
            <React.Fragment>

                <BodyCategories categoryList={categories.categoryList} />

                <h1 style={{margin: "30px 0", textAlign: "center"}}>
                    <span>TODO 加载"{category.name}"分类下文章列表</span>
                    <Link to="/" style={{margin: "0 10px"}}>返回首页</Link>
                </h1>
                

                <FlowArticles articles={this.state.articles} fetchArticles={this.fetchArticles.bind(this)} />

            </React.Fragment>
        )
    }

    componentDidMount(){

    }

    fetchArticles() {

        const { category } = this.props

        console.log(`todo 加载文章列表 ${category.name}`)

        return Promise.resolve()
    }
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

export default CategoryPage
