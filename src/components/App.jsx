import styles from './app.cssm';

import { hot } from 'react-hot-loader/root';
import React from 'react';

class App extends React.Component {
    render() {
        return <div className={styles.app}>Hello World</div>;
    }
}

export default hot(App);
