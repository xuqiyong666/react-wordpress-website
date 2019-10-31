import React from 'react';

import './css/layout.css'
import './css/weui_more.css'
import './css/article_exhibition.css'
import './css/article_list.css'
import './css/article_list_small.css'
import './css/flow_two_grid.css'
import './css/pure_css_animated_background.css'
import './css/flow_article_cards.css'
import './css/login_box.css'
import './css/console.css'
import './css/grid.css'
import './css/button.css'
import './css/input.css'
import './css/form.css'
import './css/message.css'
import './css/checkbox.css'
import './css/info_card_v1.css'
import './css/info_card_v2.css'
import './css/text_info_card_v1.css'
import './css/table_card_v1.css'
import './css/triangle.css'
import './css/simple_card.css'

import 'weui';
import 'react-weui/build/packages/react-weui.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import HomePage from './containers/HomePage'
import NotFoundPage from './pages/NotFoundPage'

import { CategoryPageWithParams, CategoryPageWithQuery } from './pages/CategoryPage'
import { ArticlePageWithParams } from './pages/ArticlePage'

import ScrollToTop from './ScrollToTop'

const scrollery = require('cssplus/scrollery')

class App extends React.Component {

  render() {
    return (
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/category">
            <CategoryPageWithQuery />
          </Route>
          <Route exact path="/category/:categoryId">
            <CategoryPageWithParams />
          </Route>
          <Route exact path="/article/:articleId">
            <ArticlePageWithParams />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    )
  }

  componentDidMount() {
    this.activeScrollery()
  }

  activeScrollery() {
    scrollery.load()
  }
}

export default App;
