import React, { Component } from 'react';

class NavBar extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <nav className="navbar navbar-light bg-success">
                    <span className="navbar-brand mb-0 h1">TokoFlix</span>
                </nav>
            </React.Fragment>
         );
    }
}
 
export default NavBar;