"use client";

import React, { useState, useEffect, useRef } from 'react'
import {LexicalComposer} from '@lexical/react/LexicalComposer';

import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import styles from "../styles/components/textEditor.module.css"

export function GMSTextEditor(props) {
    const [editorState, setEditorState]=useState();
    useEffect(()=>{
        props.setTempObj({
            ...props.tempObj,
            [props.inputIndex]: editorState
        })
    },[editorState])
    function onChange(editorState) {
        const editorStateJSON = editorState.toJSON();
        let stringifiedState=JSON.stringify(editorStateJSON)
        if(stringifiedState){
            setEditorState(stringifiedState);    
        }
    }

    function MyOnChangePlugin({ onChange }) {
        const [editor] = useLexicalComposerContext();
        useEffect(() => {
            return editor.registerUpdateListener(({editorState}) => {
                onChange(editorState);
            });
        }, [editor, onChange]);
        return null;
    }

    function MyCustomAutoFocusPlugin() {
        const [editor] = useLexicalComposerContext();
        useEffect(() => {
                editor.focus();
            }, [editor]);
            return null;
    }

    return (<>
        <div >
        <LexicalComposer initialConfig={{readOnly: true}}>
            <RichTextPlugin
                contentEditable={<ContentEditable className={styles.inputBox} />}
                placeholder={<i className={styles.inputPlaceholder}>- text</i>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <MyOnChangePlugin onChange={onChange}/>
            <MyCustomAutoFocusPlugin />
        </LexicalComposer>
        </div>
    </>);
}


export function GenTextDisplayer(props){


    // working off of Lexical, output wasn';t easy to digest. Needed to create a parallel "digestor func, to take in data and displayit according to formats. each format pretty easy to read and display once traversed."



    const [theText,setTheText]=useState()
    useEffect(()=>{
        if(props.theValue){
            setTheText(JSON.parse(props.theValue))
        }
    },[props.theValue])

    const formatSwitcher=(eachChild)=>{
        console.log(eachChild, "Each Child")
        switch (eachChild.format){
            case 0:
            return(<>
                {eachChild.text}{" "}&nbsp;
                </>)
            case 1:
            return(<>
                <strong>{eachChild.text}</strong>&nbsp;
                </>)
            case 2:
            return(<>
                <i>{eachChild.text}</i>&nbsp;
                </>)
        }

    }

    const lexicalDigestor=(rootMaterial)=>{
        if(rootMaterial?.root?.children[0]?.children[0]?.text){
        return(<>
            {rootMaterial?.root?.children?.map((elem, i)=><React.Fragment key={i}>
                <div className={styles.eachTextLine}>
                    {elem?.children.map((elemzz,it)=><React.Fragment key={it}>
                        {formatSwitcher(elemzz)}
                    </React.Fragment>)}
                </div>
            </React.Fragment> )}
        </>)
        }
    }


    return(<>
        <div className={styles.genTextCont}>
            {lexicalDigestor(theText)}
        </div>
    </>)
}