import React from 'react';
// import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import './LoadingIndicator.css';
import Spinner from 'react-bootstrap/Spinner'

function LoadingIndicator(props) {
    var show = props.show
    // console.log(show)
    return (
        show ?

        <div className="Loader">
            <Spinner animation="border" variant="primary" />
            {/* <Segment>
                <Dimmer className="Loader" active>
                    <Loader className="loading-text">
                        Loading...
                    </Loader>
                </Dimmer>
            </Segment>  */}
        </div>           
            : null
    )

}


export default LoadingIndicator;