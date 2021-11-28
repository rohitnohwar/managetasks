import React, {useState, useEffect} from 'react';
import "../Main.css"

function MappedItems(props){

    useEffect(()=>{
        console.log(props.newTasks.length)
    },[props.newTasks])

    return (
        <div>

            {
                props.section==="New tasks" && props.newTasks.map((value, index)=>{
                    return(
                        <div className="mapped-item" onClick={()=>props.setExpandIndex(index)} style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>
                            <div className="mapped-item-title" style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>{value.title}</div>
                            <div className="mapped-item-content" style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>{value.content}</div>
                            <div className="mapped-item-time">Added on:- {value.time}</div>
                            <div className="move-to" onClick={()=>{props.newToInprogress(value, index)}}>Move to inprogress</div>
                        </div>
                    )
                })
            }


            {
                props.section==="Inprogress tasks" && props.inProgressTasks.map((value, index)=>{
                    return(
                        <div className="mapped-item" onClick={()=>props.setExpandIndex(index)} style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>
                            <div className="mapped-item-title" style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>{value.title}</div>
                            <div className="mapped-item-content" style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>{value.content}</div>
                            <div className="mapped-item-time">moved to inprogress on:- {value.time}</div>
                            <div className="move-to" onClick={()=>{props.inprogressToCompleted(value, index)}}>Move to Completed</div>
                        </div>
                    )
                })
            }


            {
                props.section==="Completed tasks" && props.completedTasks.map((value, index)=>{
                    return(
                        <div className="mapped-item" onClick={()=>props.setExpandIndex(index)} style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>
                            <div className="mapped-item-title" style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>{value.title}</div>
                            <div className="mapped-item-content" style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>{value.content}</div>
                            <div className="mapped-item-time">moved to completed on:-{value.time}</div>
                        </div>
                    )
                })
            }


            {
                props.section==="Archived tasks" && props.archivedTasks.map((value, index)=>{
                    return(
                        <div className="mapped-item" onClick={()=>props.setExpandIndex(index)} style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>
                            <div className="mapped-item-title" style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>{value.title}</div>
                            <div className="mapped-item-content" style={props.expandIndex===index?{maxHeight:"max-content"}:{}}>{value.content}</div>
                            <div className="mapped-item-time">moved to archive on:-{value.time}</div>
                        </div>
                    )
                })
            }

        </div>
    );
}

export default MappedItems;