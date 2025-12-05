import React from 'react'
import './Dashlets.css'

const dashlets = (props) => {
    return (
        <div>
            <div className="dashboard-box">
                <p>{props.title}</p>
                <div className="row" style={{height: "80%"}}>
                    <i className={props.icon} aria-hidden="true"
                       style={{
                           textAlign: "right",
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           fontSize: "1.8vw"
                       }}/>
                    <strong className="col-md-10 dashlets-text">{props.value}</strong>
                </div>

            </div>

        </div>
    )
};

export default dashlets;