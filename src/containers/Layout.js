
import { connect } from 'react-redux'
import Layout from '../components/Layout'

import { fetchCategories } from '../actions/categories';

const mapStateToProps = (state, ownProps) => ({
    categories: state.categories
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)