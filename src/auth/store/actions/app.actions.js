import {initialService} from '../../../services/';

export const INITIAL_START = 'INITIAL_START';

export function initialStart(url)
{
    return (dispatch) => {
        dispatch({
            type: INITIAL_START,
            payload: initialService.loadHomeScreen(url)
        });
    }
}

