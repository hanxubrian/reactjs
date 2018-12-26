import axios from "axios";

export const GET_ALL_FRANCHISEES = "[FRANCHISEES] GETS ALL";

export function getFranchisees() {
    return dispatch => {
        const request = axios.get("/api/franchisees/gets");

        return request.then(response => {
            return dispatch({
                type: GET_ALL_FRANCHISEES,
                payload: response.data
            });
        });
    };
}
