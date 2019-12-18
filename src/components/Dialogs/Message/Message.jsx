    import React from 'react';
    import classes from './Message.module.css';

    const Message = (props) => {

        let deleteMessage = () =>{
            props.deleteMessage(props.id)
        }

    return <div className={classes.messages}>
        {props.message}
        <button onClick={deleteMessage} >x</button>
    </div>
    }

    export default Message;