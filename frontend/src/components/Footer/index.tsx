import React from 'react';
import style from './style.module.sass';

interface Props {
 title: string;
};

const Footer: React.FC<Props> = ({ title }): JSX.Element => (
  <footer className={style.footer}>
    <h6 className={style.title}>{title}</h6>
  </footer>
);

export default Footer;
