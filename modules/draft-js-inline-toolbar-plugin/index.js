import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from '../create-store';
import Buttons from '../draft-js-buttons';
import DefaultToolbar from './Component/Toolbar';

const { Alignment, Bold, Italic, Underline, Strike, Heading } = Buttons;

const createInlineToolbarPlugin = (config = {}) => {
  const store = createStore({ isVisible: false });
  const {
    buttons = [Alignment, Bold, Italic, Underline, Strike, Heading],
    Toolbar = DefaultToolbar,
    toolbarWidth,
    toolbarHeight,
  } = config;
  return {
    initialize: ({ getEditorState, setEditorState, getEditorRef }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('getEditorRef', getEditorRef);
    },
    // Re-Render the text-toolbar on selection change
    onChange: (editorState) => {
      const selection = editorState.getSelection();
      if (selection.getHasFocus() && !selection.isCollapsed()) {
        store.updateItem('getEditorState', () => editorState);
        store.updateItem('isVisible', true, true);
      } else {
        store.updateItem('isVisible', false);
      }
      return editorState;
    },
    InlineToolbar: decorateComponentWithProps(Toolbar, { store, buttons, toolbarWidth, toolbarHeight }),
  };
};

export default createInlineToolbarPlugin;
export { DefaultToolbar as Toolbar };
