import classNames from 'classnames';
import styles from './blocksStyle.css';

const blockStyleFn = (contentBlock) => {
  const metaData = contentBlock.getData();
  return classNames({
    [styles.suTextCenter]: metaData.get('ALIGN_CENTER', false),
  });
}

export { blockStyleFn };
