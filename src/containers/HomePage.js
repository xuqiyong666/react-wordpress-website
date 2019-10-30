
import { connect } from 'react-redux'
import HomePage from '../pages/HomePage'

import { fetchArticles } from '../actions/index';

const mapStateToProps = (state, ownProps) => ({
    articles: state.articles
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchArticles: () => dispatch(fetchArticles())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)