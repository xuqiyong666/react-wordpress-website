
import { connect } from 'react-redux'
import HomePage from '../pages/HomePage'

import { fetchArticles } from '../actions/articles'
import {fetchStickArticles} from '../actions/stickArticles'

const mapStateToProps = (state, ownProps) => ({
    articles: state.articles,
    stickArticles: state.stickArticles
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchArticles: () => dispatch(fetchArticles()),
    fetchStickArticles: () => dispatch(fetchStickArticles())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)