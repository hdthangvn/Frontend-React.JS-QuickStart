import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({ // write like this when it is not transmitting data
    type: actionTypes.APP_START_UP_COMPLETE
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({ // write like this when it is transmitting data
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});

export const changeLanguageApp = (languageInput) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language: languageInput
});