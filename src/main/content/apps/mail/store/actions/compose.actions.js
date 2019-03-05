import axios from 'axios/index';

export const TOGGLE_COMPOSE = '[MAIL APP] TOGGLE COMPOSE';

export function toggleCompose(param)
{
    return {
        type: TOGGLE_COMPOSE,
        payload: param
    }
}