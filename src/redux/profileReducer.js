// @ts-nocheck
import { profileAPI, usersAPI } from "./../API/api";

const ADD_POST = "ADD-POST";
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

export const addActionCreator = () => ({ type: ADD_POST });
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile,
});
export const setStatus = (status) => ({
    type: SET_STATUS,
    status,
});
export const updatePostText = (text) => ({
    type: UPDATE_POST_TEXT,
    newText: text,
});
export const showProfile = (userId) => {
    return (dispatch) => {
        usersAPI
            .getProfile(userId)
            .then((response) => dispatch(setUserProfile(response.data)))
            .catch((e) => console.error(e));
    };
};

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI
            .getStatus(userId)
            .then((response) => dispatch(setStatus(response.data)))
            .catch((e) => console.error(e));
    };
};
export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI
            .updateStatus(status)
            .then((response) => {
                if (response.data.resultCode === 0) dispatch(setStatus(status));
            })
            .catch((e) => console.error(e));
    };
};

let initialState = {
    postData: [
        { id: 1, message: "HOWDY partner!", likes: 2 },
        { id: 2, message: "It's my first post", likes: 7 },
        { id: 3, message: "Hahahhaha", likes: 1 },
        { id: 4, message: "l2p nub", likes: 420 },
    ],
    newPostText: "KAWABANGA!",
    profile: null,
    status: "///",
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD-POST": {
            let newPost = {
                id: state.postData.length + 1,
                message: state.newPostText,
                likes: 0,
            };
            let stateCopy = JSON.parse(JSON.stringify(state));

            stateCopy.postData.push(newPost);
            stateCopy.newPostText = "";
            return stateCopy;
        }
        case "UPDATE-POST-TEXT": {
            let stateCopy = JSON.parse(JSON.stringify(state));
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }
        case SET_STATUS: {
            return { ...state, status: action.status };
        }
        default:
            return state;
    }
};

export default profileReducer;
