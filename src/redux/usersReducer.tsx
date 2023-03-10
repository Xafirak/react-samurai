
import { userType } from '../types/types';
import { baseThunkType, InferActionsTypes } from './reduxStore';
import { usersAPI } from './../API/users-api';
import { resultCodesEnum } from '../API/api';


let initialState = {
    users: [] as Array<userType>,
    pageSize: 10,
    totalUsers: 0,
    currentPage: 1,
    isFetching: false,
    onProgress: [] as Array<number>,  // array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
};


// Создать toggle чтобы переключать isFollowed одной функцией | Надо ли?

// Jobs done, 'toggle' implemented! Вопрос такой же как и ниже - надо ли
// делать один 'case' для похожих случаев, где меняется один параметр
// или можно оставить оба  одинаковых 'case'-а, и там сделать рефакторинг

//  Рефакторинг : идет уменьшение кода вместо переписания \ создания
// существующих, как правильно - пересоздавать или переписывать

export const usersReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'TOGGLE_FOLLOW': {
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: !u.followed };
                    }
                    return u;
                }),
            };
        }

        // case FOLLOW: {
        //     // return {

        //     // AFTER
        //     // ...state,
        //     // users: updateOnjectInArray(state.users, action.userId, 'id', {
        //     //     followed: true,
        //     // }),

        //     // BEFORE
        //     // users: state.users.map((u) => {
        //     //     if (u.id === action.userId) {
        //     //         return { ...u, followed: true };
        //     //     }
        //     //     return u;
        //     // }),
        //     // };
        // }

        // case UNFOLLOW: {
        //     // return {

        //     // AFTER
        //     // ...state,
        //     // users: updateOnjectInArray(state.users, action.userId, 'id', {
        //     //     followed: false,
        //     // }),

        //     // BEFORE 
        //     // users: state.users.map((u) => {
        //     //     if (u.id === action.userId) {
        //     //         return { ...u, followed: false };
        //     //     }
        //     //     return u;
        //     // }),
        //     // };
        // }

        case 'SET_USERS': {
            return { ...state, users: action.users };
        }

        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage };
        }

        case 'SET_TOTAL_USERS': {
            return { ...state, totalUsers: action.count };
        }
        case 'TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching };
        }
        case 'users/SET_FILTER': {
            return { ...state, filter: action.payload };
        }
        case 'TOGGLE_IS_PROGRESS': {
            return {
                ...state,
                onProgress: action.onProgress
                    ? [...state.onProgress, action.userId]
                    : [
                        ...state.onProgress.filter(
                            (id) => id !== action.userId
                        ),
                    ],
            };
        }

        default:
            return state;
    }
};
export type initialStateType = typeof initialState
export type filterType = typeof initialState.filter;
type ActionTypes = InferActionsTypes<typeof actions>


export const actions = {
    toggleFollow: (userId: number) => ({ type: 'TOGGLE_FOLLOW', userId } as const),

    setUsers: (users: Array<userType>) => ({ type: 'SET_USERS', users } as const),

    setFilter: (filter: filterType) => ({ type: 'users/SET_FILTER', payload: filter } as const),

    setPage: (currentPage: number) => ({
        type: 'SET_CURRENT_PAGE',
        currentPage,
    } as const),

    setTotalUsers: (totalUsers: number) => ({
        type: 'SET_TOTAL_USERS',
        count: totalUsers,
    } as const),

    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching,
    } as const),

    toggleProgress: (onProgress: boolean, userId: number) => ({
        type: 'TOGGLE_IS_PROGRESS',
        onProgress,
        userId,
    } as const),

}


export const getUsers = (pageSize: number, page: number, filter: filterType): baseThunkType<ActionTypes> => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setPage(page));
    dispatch(actions.setFilter(filter))


    let data = await usersAPI.getUsers(pageSize, page, filter.term, filter.friend);
    dispatch(actions.setTotalUsers(data.totalCount));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.toggleIsFetching(false));
};

export const toggleFollowUnfollow = (userId: number, type: string): baseThunkType<ActionTypes> => async (dispatch) => {
    dispatch(actions.toggleProgress(true, userId));

    let data = await usersAPI.toggleFollowUser(userId, type);

    if (data?.resultCode === resultCodesEnum.success) {
        dispatch(actions.toggleFollow(userId));
    }
    if (data?.resultCode === resultCodesEnum.error) {
        console.log(data.messages);
    }
    dispatch(actions.toggleProgress(false, userId));
};

export default usersReducer;
