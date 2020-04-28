import styles from './note.cssm';

import React, { useState } from 'react';
import Immutable from 'immutable';
import { Key } from 'constants/KeyConstants';
import { Note as NoteRecord } from 'helpers/NoteHelpers';

import { Input } from 'antd';

export default function Note({ note = {}, onChange }) {
    const [text, setNote] = useState(note.text || '');

    function onKeyUp(event) {
        if (Key.ENTER === event.keyCode && event.shiftKey) {
            console.log('updating note');
            if (!note) {
                // create new note
                onChange(NoteRecord({ text }));
            } else {
                // update note
            }

            //props.onChange
        } else {
            console.log(event.keyCode, event.key);
        }
    }

    return (
        <div className={styles.note} onKeyUp={onKeyUp}>
            <Input
                name="note"
                placeholder="Start typing here"
                value={text}
                onKeyUp={onKeyUp}
                onChange={e => setNote(e.target.value)}
            />
        </div>
    );
}
