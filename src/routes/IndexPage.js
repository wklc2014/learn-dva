import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout.jsx';
import Index from '../components/Index.js';

function IndexPage(props) {
    return (
        <MainLayout {...props}>
            <Index />
        </MainLayout>
    );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
