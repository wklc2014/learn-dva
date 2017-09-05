export default {

    namespace: 'UserSurvery',

    state: {
        Basic: {
            userName: 'ABCDEFG',
            carNumber: 'hijklmn',
        },
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
        },
    },

    effects: {

    },

    reducers: {
        update(state, action) {
            const { modelKey, modelValue } = action.payload;
            return Object.assign({}, state, {
                [modelKey]: Object.assign({}, state[modelKey], modelValue),
            })
        },
    },

};
