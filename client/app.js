import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Amplify from 'aws-amplify';
import SignUp from './auth/SignUp';

const awsConfig = {
    Auth: {
        region: 'us-east-2', 
        userPoolId: 'us-east-2_tvVVGu5v5', // example: 'us-east-2_teEUQbkUh'
        userPoolWebClientId: '5c4bthtfdm6h3pqs2u6e2at2pr' // example: '3k09ptd8kn8qk2hpk07qopr86'
    },
    // API: {
    //     endpoints: [
    //         {
    //             name: 'WildRydesAPI',
    //             endpoint: '', // example: 'https://u8swuvl00f.execute-api.us-east-2.amazonaws.com/prod'
    //             region: '' // example: 'us-east-2'
    //         }
    //     ]
    // },
    // Storage: {
    //     bucket: '', //example: 'wildrydesbackend-profilepicturesbucket-1wgssc97ekdph'
    //     region: '' // example: 'us-east-2'
    // }
}

Amplify.configure(awsConfig);

const isAuthenticated = () => Amplify.Auth.user !== null;

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            isAuthenticated() === true
                ? <Component {...props} />
                : <Redirect to='/signin' />
        )} />
)

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={SignUp} />
                    {/* <Route path="/faq" component={FAQ} />
                    <Route path="/investors" component={Investors} />
                    <Route path="/unicorns" component={Unicorns} />
                    <Route path="/register" component={SignUp} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/profile" component={Profile} />
                    <PrivateRoute path="/app" component={MainApp} /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;