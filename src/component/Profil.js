import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        
        return (
            <>
                {isAuthenticated &&
                    <>
                        <div> HELLO {user.name}</div>
                        <div> The E-mail Address: {user.email}</div>
                        <img src={user.picture} alt={user.name} />
                    </>
                }
            </>
        );
    }
}

export default withAuth0(Profile)