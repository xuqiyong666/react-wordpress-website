
import lodash from 'lodash'


import {
    FETCH_CATEGORIES_START,
    FETCH_CATEGORIES_FAILED,
    FETCH_CATEGORIES_SUCCESS
} from '../actions/categories'

const defaultState = {
    isFetching: false,
    isLoaded: false,
    categoryList: [],
    categoryMapping: {}
}

function categories(state = defaultState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_START:
            return { ...state, isFetching: true }
        case FETCH_CATEGORIES_FAILED:
            return { ...state, isFetching: false }
        case FETCH_CATEGORIES_SUCCESS:
            return fetch_categories_success(state, action.categories)
        default:
            return state
    }
}

//菜单栏上忽略的分类
const HiddenCategorySlugs = new Set(["uncategorized", "test"])

function fetch_categories_success(state, newCategories) {

    let categoryList = []
    let categoryMapping = {}

    lodash.each(newCategories, (category) => {

        let categoryId = category.id
        if (isNaN(categoryId)) {
            return
        }

        if (categoryMapping[categoryId]) {
            return
        }

        category.color = get_category_color(categoryId)

        if (!HiddenCategorySlugs.has(category.slug)) {
            categoryList.push(category)
        }

        categoryMapping[categoryId] = category
    })

    return {
        ...state,
        isFetching: false,
        isLoaded: true,
        categoryList,
        categoryMapping
    }
}

const Colors = [
    "rgb(13, 91, 171)", //深蓝色
    "#000000", //黑色
    "#4e54c8", //亮蓝色
    "rgb(95, 47, 144)", //紫色
]

function get_category_color(categoryId) {

    const index = categoryId % Colors.length;
    return Colors[index]
}

export default categories