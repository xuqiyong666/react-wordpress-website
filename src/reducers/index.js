
import { combineReducers } from 'redux'

import articles from "./articles"
import categories from "./categories"
import stickArticles from "./stickArticles"

const rootReducer = combineReducers({
    articles,
    categories,
    stickArticles
  })
  
  export default rootReducer