import React from 'react'
import './App.css'
import 'antd/dist/reset.css';
import {Route, Switch} from 'react-router-dom'
import Index from './pages/index'
import Meeting from './pages/meeting'
import Lives from './pages/lives';
import { BrowserRouterHook } from './utils/use-router'

function App() {
    return (
        <BrowserRouterHook>
            <Switch>
                <Route exact path="/" component={Index}></Route>
                <Route exact path="/host" component={Index}></Route>
                <Route exact path="/lives" component={Lives}></Route>
                <Route exact path="/meeting/:name" component={Meeting}></Route>
            </Switch>
        </BrowserRouterHook>
    )
}

export default App
