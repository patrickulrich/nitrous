import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LoginForm from 'app/components/modules/LoginForm';
import tt from 'counterpart';

class Login extends React.Component {
    componentWillMount() {
        const { username, loggedIn } = this.props;
        console.log('component will mount..');
        if (loggedIn) {
            if (process.env.BROWSER) {
                browserHistory.replace(`/@${username}/transfers`);
            }
        }
    }

    componentDidUpdate(prevProps) {
        console.log('component did update..');
        const { username, loggedIn } = this.props;
        if (!prevProps.loggedIn && loggedIn) {
            if (process.env.BROWSER) {
                browserHistory.replace(`/@${username}/transfers`);
            }
        }
    }

    render() {
        if (!process.env.BROWSER) {
            // don't render this page on the server
            return (
                <div className="row">
                    <div className="column">{tt('g.loading')}..</div>
                </div>
            );
        }
        return (
            <div className="Login row">
                <div className="column">
                    <LoginForm />
                </div>
            </div>
        );
    }
}

module.exports = {
    path: 'login.html',
    component: connect((state, ownProps) => {
        const username = state.user.getIn(['current', 'username']);
        const loggedIn = !!username;
        return {
            username,
            loggedIn,
        };
    })(Login),
};
