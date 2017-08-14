import gridLayout from '../gridLayout/';

export function getGridLayout(col, colSpan) {
    if (col < 1 || col > 5) {
        console.log('getGridLayout col only 1 to 4');
        return {};
    }
    const newCols = gridLayout[`col_${col}`];
    const newColProps = newCols[`colSpan_${colSpan}`] || newCols.normal;

    return newColProps;
}

export function getChildGridLayout(span) {
    const leftProps = {
        xs: 24,
        sm: span,
        md: span,
        lg: span,
        xl: span,
        style: {
            marginBottom: '8px',
        }
    };

    const rightProps = {
        xs: 24,
        sm: 24 - span,
        md: 24 - span,
        lg: 24 - span,
        xl: 24 - span,
    };

    return { left: leftProps, right: rightProps };
}
