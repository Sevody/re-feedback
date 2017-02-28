import React from 'react';
import TouchFeedback from './touch-feedback';

function feedback(classname='feedback') {
    return function(WrappedComponent) {
        const wrappedComponentName = WrappedComponent.displayName ||
            WrappedComponent.name || 'Component';
        return class FeedbackComponent extends React.Component {
            static displayName = `feedback(${wrappedComponentName})`;
            constructor(props) {
                super(props);
            }
            componentDidMount() {
                new TouchFeedback(this.el, {bindProp: 'data-feedback', feedbackClass: classname});
            }
            render() {
                return (
                    <div ref={(el)=>this.el = el} className='feedback-wrapper' data-feedback='true'>
                        <WrappedComponent {...this.props} />
                    </div>
                )
            }

        }
    }
}

export default feedback;
