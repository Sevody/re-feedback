# re-feedback

a high order component for adding feedback effect inspired by [touchFeedback](https://github.com/backToNature/touchFeedback)

## Usage

```js
WithFeedbackComponent = feedback(customClass)(WrappedComponent)
```


```javascript
// basic.jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './baisc.less';
import feedback from 'feedback.js';

class Button extends Component {
    render() {
        return <button className="basic-button">Test</button>;
    }
}

const WithFeedbackButton = feedback('button-feedback')(Button);

ReactDOM.render(<WithFeedbackButton />, document.getElementById('root'));
```

```less
// basic.less
.basic-button {
    background-color: red;
}
.button-feedback {
   .basic-button{
         background-color: green;
    }
}
```

## LICENSE

MIT
