import styles from './Button.module.css';

export function Button({
  children,
  type,
  classes,
  onClick,
  refLink,
}: {
  children: JSX.Element | string;
  type: 'button' | 'submit';
  classes?: string[];
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  refLink?: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <button
      ref={refLink}
      onClick={onClick}
      type={type}
      className={`${styles.btn} ${classes?.join(' ')}`}
    >
      {children}
    </button>
  );
}
