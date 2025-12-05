import React from 'react'
import './Dashlets.css'

const dashlets = (props) => {
    return (
        <div className={props.class} style={{padding: "5px"}}>
            <div className="dashboard-box" style={{background: props.color}}>
                <p style={{fontSize: "larger", color: props.font, fontWeight: "bold"}}>{props.title}</p>
                <div className="row" style={{height: "80%", paddingLeft: "10px", paddingBottom: "10px"}}>
                    <i className={props.icon + " col-md-4"} aria-hidden="true"
                       style={{
                           textAlign: "right",
                           display: "flex",
                           alignItems: "center",
                           fontSize: "4vh",
                           color: props.font
                       }}/>
                    <strong className="col-md-8 dashlets-text" style={{color: props.font}}>{props.value}</strong>
                </div>

            </div>

        </div>
    )
};

export default dashlets;