export default {

  namespace: 'UserSurvery',

  state: {
    Basic: {},
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
        return Object.assign({}, state[modelKey], {
            [modelKey]: modelValue,
        })
    },
  },

};
