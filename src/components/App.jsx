import styles from './app.cssm';

import { hot } from 'react-hot-loader/root';
import React from 'react';

import Note from './Note';

class App extends React.Component {
    state = {
        note: undefined,
        focusedIndex: 0,
    };

    render() {
        const { note, focusedIndex } = this.state;

        return (
            <FocusContext.Provider value={focusedIndex}>
                <div className={styles.app}>
                    <Note note={note} onChange={this.onSaveNote} />
                </div>
            </FocusContext.Provider>
        );
    }

    onSaveNote = note => {
        this.setState({ note });
    };

    onChangeFocus = focusedIndex => {
        this.setState({ focusedIndex });
    };
}

export default hot(App);
