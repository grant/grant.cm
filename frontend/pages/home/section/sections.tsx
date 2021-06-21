import styles from './sections.module.scss';

export default function Sections(props) {
  return <div className={styles.sections}>{props.children}</div>;
}
