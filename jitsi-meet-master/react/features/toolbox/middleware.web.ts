import { AnyAction } from 'redux';

import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

import {
    CLEAR_TOOLBOX_TIMEOUT,
    SET_FULL_SCREEN,
    SET_TOOLBOX_TIMEOUT
} from './actionTypes';

import './subscriber';

/**
 * Middleware which intercepts Toolbox actions to handle changes to the
 * visibility timeout of the Toolbox.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {

    switch (action.type) {
    case CLEAR_TOOLBOX_TIMEOUT: {
        const { timeoutID } = store.getState()['features/toolbox'];

        clearTimeout(timeoutID ?? undefined);
        break;
    }

    case SET_FULL_SCREEN:
        return _setFullScreen(next, action);

    case SET_TOOLBOX_TIMEOUT: {
        const { timeoutID } = store.getState()['features/toolbox'];
        const { handler, timeoutMS }: { handler: Function; timeoutMS: number; } = action;

        clearTimeout(timeoutID ?? undefined);
        action.timeoutID = setTimeout(handler, timeoutMS);

        break;
    }
    }

    return next(action);
});

type DocumentElement = {
    mozRequestFullScreen?: Function;
    requestFullscreen?: Function;
    webkitRequestFullscreen?: Function;
};

/**
 * Makes an external request to enter or exit full screen mode.
 *
 * @param {Dispatch} next - The redux dispatch function to dispatch the
 * specified action to the specified store.
 * @param {Action} action - The redux action SET_FULL_SCREEN which is being
 * dispatched in the specified store.
 * @private
 * @returns {Object} The value returned by {@code next(action)}.
 */
function _setFullScreen(next: Function, action: AnyAction) {
    const result = next(action);

    if (typeof APP === 'object') {
        const { fullScreen } = action;

        if (fullScreen) {
            const documentElement: DocumentElement
                = document.documentElement || {};

            if (typeof documentElement.requestFullscreen === 'function') {
                documentElement.requestFullscreen();
            } else if (
                typeof documentElement.mozRequestFullScreen === 'function') {
                documentElement.mozRequestFullScreen();
            } else if (
                typeof documentElement.webkitRequestFullscreen === 'function') {
                documentElement.webkitRequestFullscreen();
            }

            return result;
        }

        if (typeof document.exitFullscreen === 'function') {
            document.exitFullscreen();

        // @ts-ignore
        } else if (typeof document.mozCancelFullScreen === 'function') {
            // @ts-ignore
            document.mozCancelFullScreen();

        // @ts-ignore
        } else if (typeof document.webkitExitFullscreen === 'function') {
            // @ts-ignore
            document.webkitExitFullscreen();
        }
    }

    return result;
}