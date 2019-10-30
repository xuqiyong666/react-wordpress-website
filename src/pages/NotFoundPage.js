import React from "react"
import Layout from "../Layout"

class NotFoundPage extends React.Component {
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
            <div style={{textAlign: "center", margin: "25vh 0"}}>
                <h1 style={{fontSize: "36px"}}>404 Not Found</h1>
                <p style={{fontSize: "20px", marginTop: "18px"}}>你访问的页面不存在或者已删除</p>
            </div>
        )
    }
}




export default NotFoundPage