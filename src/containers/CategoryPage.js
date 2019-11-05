
import React from 'react'

import {
    useLocation,
    useParams
} from "react-router-dom";

import { connect } from 'react-redux'
import CategoryPage from '../pages/CategoryPage'
import { fetchCategories } from '../actions/categories'

const mapStateToProps = (state, ownProps) => ({
    categories: state.categories
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchCategories: () => dispatch(fetchCategories())
})

const ConnectCategoryPage = connect(mapStateToProps, mapDispatchToProps)(CategoryPage)

export function CategoryPageWithParams() {

    const { categoryId } = useParams();

    return (<ConnectCategoryPage categoryId={categoryId} />)
}

export function CategoryPageWithQuery() {

    const query = new URLSearchParams(useLocation().search);

    const categoryId = parseInt(query.get("id"))

    return (
        <ConnectCategoryPage categoryId={categoryId} />
    );
}

export default ConnectCategoryPage
