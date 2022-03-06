import './../../../styles/challenge.css';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'

class StepThree extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isactive: this.props.isactive
        }
    }

    render () {
        
        return (
            <div className="step-three-inner">
                
            </div>
        )
    }
}

export default StepThree