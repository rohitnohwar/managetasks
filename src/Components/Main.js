import React, {useState, useEffect} from 'react';
import Form from './Form/Form';
import Sections from './Sections/Sections';
import MappedItems from './MappedItems/MappedItems';
import "./Main.css"
import Localbase from 'localbase'

function Main() {

    const db = new Localbase('db')


    async function getAll(){

        db.collection('new').get().then(async tasks => {
            await tasks.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            setNewTasks(tasks)
        })   

        db.collection('inprogress').get().then(async tasks => {
            await tasks.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            setInProgressTasks(tasks)
        })

        db.collection('completed').get().then(async tasks => {
            await tasks.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            setCompletedTasks(tasks)
        })

        db.collection('archive').get().then(async tasks => {
            await tasks.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            setArchivedTasks(tasks)
        })

    }


    useEffect(()=>{
        getAll()
    },[])


    async function newToInprogress(value, index){
        setExpandIndex(null)

        await db.collection('new').doc({time:value.time}).delete()

        await db.collection('inprogress').add({
            title: value.title,
            content: value.content,
            time:new Date().toISOString()
        })

        db.collection('new').get().then(async tasks => {
            await tasks.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            setNewTasks(tasks)
        })   

        db.collection('inprogress').get().then(async tasks => {
            await tasks.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            setInProgressTasks(tasks)
        })

        setExpandIndex(null)
    }


    async function inprogressToCompleted(value, index){
        setExpandIndex(null)

        await db.collection('inprogress').doc({ time: value.time }).delete()

        await db.collection('completed').add({
            title: value.title,
            content: value.content,
            time:new Date().toISOString()
        })

        db.collection('inprogress').get().then(async tasks => {
            await tasks.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            setInProgressTasks(tasks)
        })

        db.collection('completed').get().then(async tasks => {
            await tasks.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            setCompletedTasks(tasks)
        })

        setExpandIndex(null)
    }

    const [section, setSection]=useState("")

    const [message, setMessage]=useState("")

    const [expandIndex, setExpandIndex]=useState(null)

    const [formContent, setFormContent]=useState({
        title: "",
        content: ""
    })

    const [newTasks, setNewTasks]=useState([])
    const [inProgressTasks, setInProgressTasks]=useState([])
    const [completedTasks, setCompletedTasks]=useState([])
    const [archivedTasks, setArchivedTasks]=useState([])

    async function completedToArchive(n){
        setExpandIndex(null)

        for(let i=n-1; i>=10; i=i-1){
            await db.collection('completed').doc({ time: completedTasks[i].time }).delete()

            await db.collection('archive').add({
                title: completedTasks[i].title,
                content: completedTasks[i].content,
                time: new Date().toISOString()
            })
        }

        
        db.collection('completed').get().then(async tasks => {
            await tasks.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            setCompletedTasks(tasks)
        })   

        db.collection('archive').get().then(async tasks => {
            await tasks.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            setArchivedTasks(tasks)
        })

    }

    useEffect(()=>{
        const n=completedTasks.length
        if(n>10){
            completedToArchive(n)
        }
    },[completedTasks.length])

    /*useEffect(()=>{
        console.log(newTasks)
        console.log(inProgressTasks)
        console.log(completedTasks)
        console.log(archivedTasks)
    },[newTasks, inProgressTasks, completedTasks, archivedTasks])*/

    async function addNewTask(e){
        e.preventDefault()

        if(formContent.title && formContent.content){ 
            await db.collection('new').add({
                title: formContent.title,
                content: formContent.content,
                time:new Date().toISOString()
            })  

            setMessage("")

            db.collection('new').get().then(async tasks => {
                await tasks.sort(function(a,b){
                    return new Date(b.time) - new Date(a.time);
                });
                setNewTasks(tasks)
            }) 
        }
        else {
            setMessage("All details are compulsory")
        }

        setFormContent({
            title:"",
            content:""
        });
    }

    return (
    <div>
    <div>{expandIndex}</div>
        <Form 
        formContent={formContent} 
        setFormContent={setFormContent} 
        addNewTask={addNewTask}
        message={message}
        />

        <Sections 
        section={section}
        setSection={setSection} 
        />

        <MappedItems 
        section={section} 
        newTasks={newTasks} 
        setNewTasks={setNewTasks} 
        inProgressTasks={inProgressTasks} 
        setInProgressTasks={setInProgressTasks} 
        completedTasks={completedTasks} 
        setCompletedTasks={setCompletedTasks} 
        archivedTasks={archivedTasks} 
        setArchivedTasks={setArchivedTasks} 
        newToInprogress={newToInprogress}
        inprogressToCompleted={inprogressToCompleted}
        expandIndex={expandIndex}
        setExpandIndex={setExpandIndex}
        />

    </div>
    );
}

export default Main;