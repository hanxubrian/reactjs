import axios from 'axios/index';
import {homepageService} from "services";

export const GET_HOME_WIDGETS = '[HOME APP] GET WIDGETS';

export function gethomeWidgets()
{
    // const request = axios.get('/api/analytics-dashboard-app/widgets');

    return (dispatch) =>{
        (async () => {
            let res = await homepageService.getDashboardWidget();
            if (res) {
                dispatch({
                    type: GET_HOME_WIDGETS,
                    payload: res
                });
            } else {

            }
        })();
    }
    // request.then((response) =>
    //     dispatch({
    //         type   : GET_WIDGETS,
    //         payload: response.data
    //     })
    // );
}
