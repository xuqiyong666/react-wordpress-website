
import React from 'react'
import Layout from '../containers/Layout'

import {
    Link
} from "react-router-dom";

import FlowArticles from '../components/FlowArticles'
import wordpressClient from '../utils/wordpressClient'

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
            pageSize: 10, //每页几条
            hasMoreArticles: true,
            isFetching: false,
            articleList: []
        }
    }

    render() {

        const { categories } = this.props

        return (
            <React.Fragment>

                <BodyCategories categoryList={categories.categoryList} />

                <FlowArticles articles={this.state.articles} fetchArticles={this.fetchArticles.bind(this)} />

            </React.Fragment>
        )
    }

    componentDidMount(){

    }

    async fetchArticles() {

        const { category } = this.props

        const stArticles = this.state.articles
        const nextPage = stArticles.pageLoaded + 1
        const pageSize = stArticles.pageSize

        stArticles.isFetching = true
        this.setState({articles: stArticles})

        return wordpressClient.fetch_page_articles_in_category(category.id, nextPage, pageSize).then(response=>{

            stArticles.isFetching = false

            const newArticles = response.data

            if(!newArticles || !newArticles.length){
                return
            }

            stArticles.articleList.push(...newArticles)
            stArticles.pageLoaded = stArticles.pageLoaded + 1
            stArticles.hasMoreArticles = newArticles.length === stArticles.pageSize

            this.setState({articles: stArticles})

        }).catch(error=>{

            stArticles.isFetching = false

            if(error.message === "Request failed with status code 400"){
                stArticles.hasMoreArticles = false
            }
            
            this.setState({articles: stArticles})
        })
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
