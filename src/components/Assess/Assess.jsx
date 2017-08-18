import React, { Component } from 'react';
import SummaryTable from '../common/SummaryTable/SummaryTable.jsx';
import * as CONFIG_TABLE from './common/';

class Assess extends Component {

    render() {
        return (
            <SummaryTable
                tableHead={CONFIG_TABLE.CONFIT_TABLE_HEAD}
                tableData={CONFIG_TABLE.CONFIG_TABLE_DATA}
            />
        )
    }
}

export default Assess;
