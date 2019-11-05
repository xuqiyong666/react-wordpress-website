
import { connect } from 'react-redux'
import HomePage from '../pages/HomePage'

import { fetchArticles } from '../actions/articles'
import { fetchStickArticles } from '../actions/stickArticles'
import { fetchCategories } from '../actions/categories'

const mapStateToProps = (state, ownProps) => ({
    articles: state.articles,
    stickArticles: state.stickArticles,
    categories: state.categories
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchArticles: () => dispatch(fetchArticles()),
    fetchStickArticles: () => dispatch(fetchStickArticles()),
    fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)