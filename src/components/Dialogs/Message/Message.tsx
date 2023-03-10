import React from "react";
import cl from './Message.module.css'

type messagePropsType = {
    id: number
    message: string
}
const Message:React.FC<messagePropsType> = (props) => {
    return (
        <div className={cl.message}>
            {props.message}            
        </div>
    )
}

export default Message;