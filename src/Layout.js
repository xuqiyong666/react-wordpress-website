import React from 'react';

import { Link } from "react-router-dom"

class Layout extends React.Component {

    constructor(props) {
        super(props)

        this.default = {
            backgroundColor: "rgba(0,0,0,1)"
        }
    }

    render() {

        const { header, content } = this.props

        const t1Class = header ? "header-title-show" : ""
        const t2Class = header ? "with-border" : ""

        return (
            <div className='pq-layout'>

                <div className={`pq-header-wrap ${t1Class}`}>
                    <div className={`pq-header-top pq-layout ${t2Class}`}>
                        <div className="pq-header">
                            <div className="left">
                                <i className="pq-icon fa-bars fas" onClick={this.open_mobile_nav.bind(this)} />
                            </div>
                            <div className="logo">
                                <Link to="/" className="inline-block">
                                    <img src="/assets/images/blog_logo_180.png" alt="" />
                                </Link>
                            </div>

                            <div className="right">
                                <div className="nav-item">
                                    <Link to="/category/1" className="nav-link">分类1</Link>
                                    <Link to="/category/2" className="nav-link">分类2</Link>
                                    <Link to="/category/3" className="nav-link">分类3</Link>
                                </div>
                            </div>

                            {/* {<UserInfo />} */}
                        </div>
                    </div>

                    <div className="pure_css_animated_background" style={{ background: this.default.backgroundColor }}>
                        <span className="sprite n1 animate"></span>
                        <span className="sprite n2 animate"></span>
                        <span className="sprite n3 animate"></span>
                        <span className="sprite n4 animate"></span>
                        <span className="sprite n5 animate"></span>
                        <span className="sprite n6 animate"></span>
                        <span className="sprite n7 animate"></span>
                        <span className="sprite n8 animate"></span>
                        <span className="sprite n9 animate"></span>
                        <span className="sprite n10 animate"></span>
                        <span className="sprite n11 animate"></span>
                        <span className="sprite n12 animate"></span>

                        <div>
                            {header}
                        </div>
                    </div>
                    <div className="pg-header-space" style={{ background: this.default.backgroundColor }}></div>

                </div>

                <div className="pq-content main">
                    {content}
                </div>

                <div className="pure_css_animated_background" style={{ background: this.default.backgroundColor }}>
                    <span className="sprite n1 animate"></span>
                    <span className="sprite n2 animate"></span>
                    <span className="sprite n3 animate"></span>
                    <span className="sprite n4 animate"></span>
                    <span className="sprite n5 animate"></span>
                    <span className="sprite n6 animate"></span>
                    <span className="sprite n7 animate"></span>
                    <span className="sprite n8 animate"></span>
                    <span className="sprite n9 animate"></span>
                    <span className="sprite n10 animate"></span>
                    <span className="sprite n11 animate"></span>
                    <span className="sprite n12 animate"></span>

                    <div className="pq-footer">

                        <div className="title">
                            <Link to="/" className="inline-block">
                                <img src="/assets/images/blog_logo_400.png" alt="" style={{ height: "200px", width: "200px" }} />
                            </Link>
                        </div>

                        <div className="qrcode_area"></div>

                        <div className="intro">天空没有翅膀的痕迹，但我已飞过</div>

                        <div className="copyright">Copyright © 2012-2019 jeffrey6052.com ALL Rights Reserved</div>
                        <div className="icp_number">沪ICP备17055983号-1</div>

                    </div>
                </div>
            </div>
        )
    }

    open_mobile_nav() {

    }

}


// function UserInfo(props) {
//     return (
//         <div className="user-info">
//             {<UserPanel user={props.user} />}
//         </div>
//     )
// }

// function UserPanel(props) {

//     if (!props.user) {
//         return <GuestPanel />
//     }

//     return (
//         <React.Fragment>
//             <i className="fas fa-user pq-icon" />
//             <span className="pq-link white">{props.user.name}</span>
//         </React.Fragment>
//     )
// }

// function GuestPanel(props) {
//     return (
//         <React.Fragment>
//             <span className="pq-link white" onClick={()=>alert("TODO 登录页面")}>
//                 <i className="fas fa-user pq-icon" />
//                 <span>登录</span>
//             </span>
//         </React.Fragment>
//     )
// }

export default Layout