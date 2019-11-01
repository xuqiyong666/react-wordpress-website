
import { connect } from 'react-redux'
import FlowArticles from '../components/FlowArticles'

import { fetchArticles } from '../actions/articles'

const mapStateToProps = (state, ownProps) => ({
    articles: state.articles
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchArticles: () => dispatch(fetchArticles()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FlowArticles)