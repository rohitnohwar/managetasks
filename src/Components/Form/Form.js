import React from 'react';
import "../Main.css"

function Form(props){

    function handleChange(e){
        const {name, value}=e.target
        props.setFormContent(prevValue=>{
            return{
                ...prevValue,
                [name]:value
            }
        })
    }

    return(
        <div>
            <form method="POST" className="submit-form">
                <div><input type="text" name="title" placeholder="Title of new task" className="form-textfield" onChange={handleChange} value={props.formContent.title}></input></div>
                <div><input type="text" name="content" placeholder="Content of new task" className="form-textfield" onChange={handleChange} value={props.formContent.content}></input></div>
                <div><button type="submit" className="form-button" onClick={props.addNewTask}>Add new task</button></div>
            </form>

            <div className="message">{props.message}</div>
        </div>
    );
}

export default Form;