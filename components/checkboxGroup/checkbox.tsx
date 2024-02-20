import styles from "./checkbox.module.css";

export interface TCheckbox {
  title: string;
  checked: boolean;
}

interface Props {
  groupTitle: string;
  data: { [k: string]: TCheckbox };
  onChange: (key: string) => void;
  counter: { [k: string]: number };
}

export function CheckboxGroup({ data, groupTitle, onChange, counter }: Props) {
  return (
    <div className={styles.checkbox}>
      <div className={styles.checkboxTitle}>{groupTitle}</div>
      {Object.keys(data).map((key, i) => (
        <label className={styles.checkboxValue} htmlFor={groupTitle} key={i}>
          <input
          className={styles.checkboxInput}
            type="checkbox"
            checked={data[key].checked}
            onChange={() => onChange(key)}
          />
          <span>{data[key].title}</span>
          <span className={styles.counter}> ({counter[key]})</span>
          
        </label>
      ))}
    </div>
  );
}
