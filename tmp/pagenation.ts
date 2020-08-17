import React, { FC } from "react";
import clsx from "clsx";
import styles from "./index.module.scss";

type Props = {
  className?: string;
  activePage: number;
  pageSize: number;
  onChange: (page: number) => void;
};

// TODO: page数が増えた時の省略方法がデザインにないので未実装
const Pagenation: FC<Props> = ({
  className,
  activePage,
  pageSize,
  onChange,
}) => (
  <div className={clsx(className, styles.root)}>
    <button
      className={styles.button}
      type="button"
      onClick={() => onChange(activePage - 1)}
      disabled={activePage <= 1}
    >
      &lt;
    </button>
    {Array.from({ length: pageSize }, (v, k) => k + 1).map((index) => (
      <button
        key={index}
        type="button"
        className={clsx(styles.button, {
          [styles.active]: index === activePage,
        })}
        onClick={() => onChange(index)}
      >
        {index}
      </button>
    ))}
    <button
      className={styles.button}
      type="button"
      onClick={() => onChange(activePage + 1)}
      disabled={activePage >= pageSize}
    >
      &gt;
    </button>
  </div>
);

export default Pagenation;

