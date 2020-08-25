import React from "react"
import {BrowserRouter, Switch,Route} from "react-router-dom";
import App from "./App"
import Detail from "./Detail"
function Router() {
    return (
        <div>
            <BrowserRouter>
            <Switch>
            <Route path='/' component={App} exact/>
            <Route path='/recipe/:id' component={Detail}/>
            </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Router
