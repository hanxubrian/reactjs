import axios from "axios";
import {negativeDueService} from "../../services";

export const GET_ALL_NEGATIVE_DUE_LIST = "[NEGATIVE_DUE_APP] GETS ALL";

export function getNegativeDueList(regionId, statusId, searchtext) {

    regionId = regionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [regionId];

    return (dispatch) => {
        (async () => {
            let negativeDueList = await negativeDueService.getNegativeDueList(regionId, statusId, searchtext);
            if(negativeDueList.IsSuccess){
                dispatch({
                    type: GET_ALL_NEGATIVE_DUE_LIST,
                    payload: negativeDueList.Data
                });
            }
        })();
    }
}

