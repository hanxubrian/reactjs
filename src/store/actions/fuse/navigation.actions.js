export const GET_NAVIGATION = '[NAVIGATION] GET NAVIGATION';
export const SET_NAVIGATION = '[NAVIGATION] SET NAVIGATION';
export const RESET_NAVIGATION = '[NAVIGATION] RESET NAVIGATION';
export const ADD_AUTH_NAVIGATION = '[NAVIGATION] ADD AUTH NAVIGATION';


export function getNavigation()
{
    return {
        type: GET_NAVIGATION
    }
}

export function setNavigation(navigation)
{
    return {
        type: SET_NAVIGATION,
        navigation
    }
}

export function add_auth_navigation(navigation) {
    return {
        type: ADD_AUTH_NAVIGATION,
        navigation
    }
}

export function resetNavigation()
{
    return {
        type: RESET_NAVIGATION
    }
}

