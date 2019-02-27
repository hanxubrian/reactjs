import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
	negativeDueDB: []
};


const negativeDue = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_ALL_NEGATIVE_DUE_LIST:
		{
			return {
				...state,
                negativeDueDB: action.payload,
			};
        }
		case UserActions.USER_LOGGED_OUT:
		{
			return {
			...initialState
			}
		}
		default:
		{
			return state;
		}
	}
};

const persistConfig = {
	key: 'negativeDue',
	blacklist: ['negativeDueDB'],
	storage: storage,
};
export default persistReducer(persistConfig, negativeDue);
