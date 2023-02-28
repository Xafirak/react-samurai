
import React from "react";
import cl from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import TextInputWithButton from "../TextInputWithButton/TextInputWithButton";

type usersDataType = {
    id: number
    name: string
    avatar: string
}

type messagesDataType = {
    id: number
    message: string
}

type propsType = {
    dialogPage: {
        usersData: Array<usersDataType>
        messagesData: Array<messagesDataType>
    }
    dispatch: () => void
    addDialogCreator: () => void
}



const Dialogs = (props: propsType) => {


    const users = props.dialogPage.usersData.map((el) => {
        return (
            <DialogItem
                name={el.name}
                id={el.id}
                key={el.id}
                avatar={el.avatar}

            />
        );
    });

    const messages = props.dialogPage.messagesData.map((el) => {
        return <Message message={el.message} id={el.id} key={el.id} />;
    });

    return (
        <div className={cl.dialogs}>
            <div className={cl.usersColumn}>{users}</div>
            <div className={cl.messageColumn}>
                {messages}
                <TextInputWithButton
                    dialog
                    dialogPage={props.dialogPage}
                    dispatch={props.dispatch}
                    addMessage={props.addDialogCreator}
                />
            </div>
        </div>
    );
};

export default Dialogs;