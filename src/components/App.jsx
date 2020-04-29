import styles from './app.cssm';

import { hot } from 'react-hot-loader/root';
import React from 'react';
import { List } from 'immutable';

import { Provider as FocusProvider } from 'contexts/FocusContext';

import Note from './Note';
import { Note as NoteRecord } from 'helpers/NoteHelpers';

class App extends React.Component {
    state = {
        note: NoteRecord({
            text: 'Licensing Notes',
            subnotes: List([
                NoteRecord({ text: 'Its already decoupled:' }),
                NoteRecord({ text: '- UI Iframe (5.19) - feature parity remaining.' }),
                NoteRecord({ text: '- contact Uday, Ashwini (ask Pawan Ghildiyal)' }),
                NoteRecord({
                    text:
                        '- Backend (working with Java Gateway team to make it independently upgradeable)',
                }),

                NoteRecord({ text: '#Dependencies:' }),
                NoteRecord({ text: '- Zookeeper' }),
                NoteRecord({ text: '- IDF' }),

                NoteRecord({ text: '#License Agent' }),
                NoteRecord({ text: '- To be release with 5.19' }),

                NoteRecord({ text: '#Status of Product integrations:' }),
                NoteRecord({ text: 'Objects' }),
                NoteRecord({ text: 'Calm' }),
                NoteRecord({ text: 'Prism' }),
                NoteRecord({ text: 'Era (pending)' }),
                NoteRecord({ text: '- Timelines - After 5.19, approx (3-6 months)' }),
                NoteRecord({ text: '- Dependent on license agent completion' }),
                NoteRecord({ text: 'Move - Free/Not licensed' }),

                NoteRecord({ text: 'Currently not RBACed, but its being developed' }),
            ]),
        }),
    };

    render() {
        const { note } = this.state;

        return (
            <FocusProvider>
                <div className={styles.app}>
                    <div className={styles.note}>
                        <Note note={note} onChange={this.onSaveNote} />
                    </div>
                </div>
            </FocusProvider>
        );
    }

    onSaveNote = note => {
        this.setState({ note });
    };
}

export default hot(App);
