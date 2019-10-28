
import React from 'react'
import Layout from './Layout.js'

import {
    Link
} from "react-router-dom";

class HomePage extends React.Component {
    render() {

        const content = <Content />

        return (
            <Layout content={content} ></Layout>
        )
    }
}

class Content extends React.Component {
    render() {
        return (
            <div style={{height: "600px", padding: "10px", backgroundColor: "#1fc8db", backgroundImage: "linear-gradient(141deg,#9fb8ad 0%,#1fc8db 51%,#2cb5e8 75%)"}}>
                <h3>Home Content</h3>

                <p style={{margin: "5px 0"}}>
                    <Link to="/article/1" >文章1</Link>
                </p>

                <p style={{margin: "5px 0"}}>
                    <Link to="/article/2" >文章2</Link>
                </p>

                <p style={{margin: "5px 0"}}>
                    <Link to="/article/3" >文章3</Link>
                </p>
            </div>
        )
    }
}

export default HomePage