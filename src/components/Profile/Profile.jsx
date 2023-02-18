// @ts-nocheck
import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import ProfileFUNC from './ProfileFUNC';

window.props = [];

const Profile = (props) => {
    // console.log('render', props);
    // установка условия для рендеринга страницы для избежания ненужных ререндеров
    //при обновлении страницы F5, компонент рендерится 1 раз, но если перейти на
    // другую страницу и вернутся обратно - компонент ререндерится 3 раза - почему?
    
    // Установка прелоадера в ProfileFUNC не помогла, т.к. он ререндерится всего 3 раза 
    // и если за 3 ререндера условие не выполняется, показывается вечная крутилка
    return (
        <div>
            <ProfileInfo
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profilePage.profile}
                status={props.profilePage.status}
                updateStatus={props.updateStatus}
                saveProfile= {props.saveProfile}
                error={props.error}
            />
            <MyPosts
                profilePage={props.profilePage}
                addMessage={props.addMessage}
            />
        </div>
    );
};

export default Profile;
