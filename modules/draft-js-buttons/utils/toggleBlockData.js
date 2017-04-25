import DraftModifier from '@sususite/draft-js-utils/lib/DraftModifier';
import EditorState from 'draft-js/lib/EditorState';

export default function toggleBlockData(editorState, dataKey) {
  const content = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  let endKey = selection.getEndKey();
  let target = selection;

  // Triple-click can lead to a selection that includes offset 0 of the
  // following block. The `SelectionState` for this case is accurate, but
  // we should avoid toggling block type for the trailing block because it
  // is a confusing interaction.
  if (startKey !== endKey && selection.getEndOffset() === 0) {
    const blockBefore = content.getBlockBefore(endKey);
    endKey = blockBefore.getKey();
    target = target.merge({
      anchorKey: startKey,
      anchorOffset: selection.getStartOffset(),
      focusKey: endKey,
      focusOffset: blockBefore.getLength(),
      isBackward: false,
    });
  }
  const updater = (data) => data.update(dataKey, (_dataKey = false) => !_dataKey);
  return EditorState.push(
    editorState,
    DraftModifier.updateBlockData(content, target, updater),
    'change-block-data'
  );
}
