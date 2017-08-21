import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import MainLayout from '../components/MainLayout/MainLayout.jsx';
import Index from '../components/Index.js';
import Assess from '../components/Assess/Assess.jsx';
import Test from '../components/Test/Test.jsx';

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Route path="/" component={MainLayout}>
                <IndexRoute component={Index} />
                <Route path="/assess" component={Assess} />
                <Route path="/test" component={Test} />
            </Route>
        </Router>
    );
}

export default RouterConfig;
