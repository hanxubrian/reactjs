import axios from 'axios/index';
import {dashboardService} from "services";

export const GET_WIDGETS = '[ANALYTICS DASHBOARD APP] GET WIDGETS';

export function getWidgets()
{
    // const request = axios.get('/api/analytics-dashboard-app/widgets');

    return (dispatch) =>{
        (async () => {
            let res = await dashboardService.getDashboardWidget();
            if (res) {
                dispatch({
                    type: GET_WIDGETS,
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
