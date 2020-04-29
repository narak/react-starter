import styles from './note.cssm';

import React, { useState, useContext, useRef, useEffect } from 'react';
import cns from 'classnames';

import { Key } from 'constants/KeyConstants';
import { Note as NoteRecord } from 'helpers/NoteHelpers';
import FocusContext from 'contexts/FocusContext';

// import TextareaAutosize from 'react-textarea-autosize';

/**
 * The note component that renders the notes, and all its children.
 * @param {Object} options.note Note value
 * @param {Function} onChange   The onChange method of the note
 * @returns {Component}         A React Component
 */
export default function Note({ note = {}, onChange, lon = 1 }) {
    const [text, setNote] = useState(note.text || '');
    const focus = useContext(FocusContext);
    const inputRef = useRef(null);
    const isTitle = lon === 1;

    useEffect(() => {
        if (focus.index === lon) {
            inputRef.current.focus();
        }
    }, [focus.index]);

    const [height, setHeight] = useState(null);
    useEffect(() => {
        if (!isTitle) {
            console.log(inputRef.current.scrollHeight);
            inputRef.current.style.height = '22px';
            setHeight(inputRef.current.scrollHeight);
        }
    }, [text]);

    /**
     * Handler for the keyUp event, that does all the dispatches for the keyboard behaviours.
     * @param  {Object} event The event object
     * @returns {void}
     */
    function onKeyDown(event) {
        if (Key.ENTER === event.keyCode && event.shiftKey) {
            console.log('captured');
            event.preventDefault();
            // if (!note) {
            //     // create new note
            //     onChange(NoteRecord({ text }));
            // } else {
            //     // update note
            // }
            if (focus.index === lon) {
                focus.setFocusIndex(lon + 1);
            }

            //props.onChange
            // } else {
            //     console.log(event.keyCode, event.key);
        }
    }

    return (
        <div className={styles.note} onClick={() => focus.setFocusIndex(lon)}>
            {isTitle ? (
                <input
                    type="text"
                    name="note"
                    placeholder="Enter a title for your note"
                    value={text}
                    onKeyDown={onKeyDown}
                    onChange={e => setNote(e.target.value)}
                    ref={inputRef}
                    className={cns(styles.title, styles.input)}
                />
            ) : (
                <textarea
                    name="note"
                    placeholder="Start typing here"
                    value={text}
                    onKeyDown={onKeyDown}
                    onChange={e => setNote(e.target.value)}
                    ref={inputRef}
                    className={cns(styles.input, styles.textarea)}
                    rows={!height ? 1 : undefined}
                    style={height ? { height: height + 'px' } : undefined}
                />
            )}
            {note.subnotes
                ? note.subnotes.map((subnote, index) => (
                      <Note note={subnote} key={index} lon={lon + index + 1} />
                  ))
                : null}
        </div>
    );
}
