import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './baisc.less';
import feedback from '../index.js';

class Button extends Component {
    render() {
        return <button className="basic-button">Test</button>;
    }
}

const WithFeedbackButton = feedback('button-feedback')(Button);

ReactDOM.render(<WithFeedbackButton />, document.getElementById('root'));
