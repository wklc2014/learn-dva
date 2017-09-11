export const TIME_PICKER_OPTION = {
    disabledMinutes: () => {
        const result = [];
        for(let i = 0; i < 60; i++) {
            if (i % 5) {
                result.push(i);
            }
        }
        return result;
    },
    hideDisabledOptions: true,
    disabledSeconds: () => {
        const result = [];
        for(let i = 0; i < 60; i++) {
            if (i % 5) {
                result.push(i);
            }
        }
        return result;
    },
    disabled: true
}

export const DATE_PICKER_OPTIONS_FORMAT = 'YYYY-MM-DD HH:mm:ss';
