import initialService from '../../../services/initial';

export const INITIAL_START = 'INITIAL_START';

export function initialStart(data)
{
    return (dispatch) => {
        dispatch({
            type: INITIAL_START,
            payload: initialService.loadHomeScreen()
        });
        let navigations = initialService.loadHomeScreen();
        console.log('load_home = ' , navigations);
    }
}

