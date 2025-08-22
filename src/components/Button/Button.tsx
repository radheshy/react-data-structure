import styles from "./Button.module.scss";

export default function Button({ label }: { label: string }) {
  return <button className={styles.btn}>{label}</button>;
}