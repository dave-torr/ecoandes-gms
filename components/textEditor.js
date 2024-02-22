import {$getRoot, $getSelection} from 'lexical';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';





export function GMSTextEditor(props){

    const theme = {
    // Theme styling goes here
    }

    function MyCustomAutoFocusPlugin() {
        const [editor] = useLexicalComposerContext();
        useEffect(() => {
            editor.focus();
        }, [editor]);

        return null;
    }

    function onError(error) {
        console.error(error);
    }

    function onChange(editorState){
        const editorStateJSON=editorState.toJSON()
        props.setTempObj({
            ...tempObj,
            [inputIndex]:(JSON.stringify(editorStateJSON))
        })
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

    function Editor() {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<div>Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
        <MyOnChangePlugin onChange={onChange}/>
        </LexicalComposer>
    );
    }

    return(<>
        {Editor()}
    </>)
}