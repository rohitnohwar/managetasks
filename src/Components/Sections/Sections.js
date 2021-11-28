import React from 'react';
import "../Main.css"

function Sections(props){

    return (
        <div>
            <div className="choose-one-tag">Choose one to show :-</div>
            <div className="section-list">
                <div className="sections" onClick={()=>{props.setSection("New tasks")}}>New tasks</div>
                <div className="sections" onClick={()=>{props.setSection("Inprogress tasks")}}>Inprogress tasks</div>
                <div className="sections" onClick={()=>{props.setSection("Completed tasks")}}>Completed tasks</div>
                <div className="sections" onClick={()=>{props.setSection("Archived tasks")}}>Archived tasks</div>
            </div>
            <div className="choose-one-tag click-one-tag">Click one task to expand :-</div>
        </div>
    );
}

export default Sections;