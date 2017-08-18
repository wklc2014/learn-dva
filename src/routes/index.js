import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import MainLayout from '../components/MainLayout/MainLayout.jsx';
import Index from '../components/Index.js';
import Assess from '../components/Assess/Assess.jsx';

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Route path="/" component={MainLayout}>
                <IndexRoute component={Index} />
                <Route path="/assess" component={Assess} />
            </Route>
        </Router>
    );
}

export default RouterConfig;
