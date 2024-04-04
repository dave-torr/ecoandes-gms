"use client";

import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import {LexicalComposer} from '@lexical/react/LexicalComposer';

import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import styles from "../styles/components/textEditor.module.css"
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';


export function TextEditor(props) {


    const [editorState, setEditorState]=useState()

    useEffect(()=>{
        props.setTempObj({
            ...props.tempObj,
            [props.inputIndex]: editorState
        })
    },[editorState])

    // Still cannot update and add content to days.
    // useEffect(()=>{
    //     ()=>{
    //         const [editor] = useLexicalComposerContext();
    //         editor.update(()=>{
    //             const root = $getRoot();
    //             const paragraphNode = $createParagraphNode();
    //             const textNode = $createTextNode("cucu");
    //             paragraphNode.append(textNode)
    //             root.append(paragraphNode)

    //         })
    //     }

    // },[props.addedText])


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

    return (<>
        <div >
        <div className={styles.spaceBetRow}> 
            <div className={styles.inputLabel}>
            {props.inputLabel}
            </div>
            <i> - rich text </i>
        </div>
        <LexicalComposer initialConfig={{
            editorState: props.prevState
            }}>
            <RichTextPlugin
                contentEditable={<ContentEditable className={styles.inputBox} />}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <MyOnChangePlugin onChange={onChange}/>
        </LexicalComposer>
        </div>
    </>);
}

export function RichTextDisp(props){
    // working off of Lexical, display data according to outputted format, listed by switch func below.

    const [theText,setTheText]=useState()
    
    useEffect(()=>{
        if(props.richTextCont && props.theValue){
            setTheText(JSON.parse(props.theValue))
        } else {
            setTheText(props.theValue)
        }
    },[props.theValue])

    const formatSwitcher=(eachChild)=>{
        switch (eachChild.format){
            case 0:
            return(<>
                {eachChild.text}{" "}
                </>)
            case 1:
            return(<>
                <strong>{eachChild.text}</strong>{" "}
                </>)
            case 2:
            return(<>
                <i>{eachChild.text}</i>{" "}
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
            {props.richTextCont? <> 
                {lexicalDigestor(theText)}
            </>:<>
                {theText}
            </>}
        </div>
    </>)
}


