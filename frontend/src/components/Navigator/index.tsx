import { Link, Outlet } from 'react-router-dom';
import React, { useMemo, useRef, useState } from 'react';
import { defaultTabs } from './data';
import { Tab } from './type';
import style from './style.module.sass'
import Image from '../Image';
import Footer from '../Footer';
import GoogleDriveImage from '../Image';

interface Props {
  tabs?: Tab[];
};

const Navigator: React.FC<Props> = ({ tabs = defaultTabs }): JSX.Element => {
  const year: number = useMemo(() => new Date().getFullYear(), []);
  const [canOpen, setCanOpen] = useState<boolean>(false);
  const nav: React.MutableRefObject<null> = useRef(null);

  const onOpenNavMobile = () => {
    const newState: boolean = !canOpen;

    if (nav.current) {
      //@ts-ignore
      nav.current.classList.toggle(style.navigator__open, newState);
    }

    setCanOpen(newState);
  }

  return (
    <>
      <nav className={style.navigator} ref={nav}>
        <div>
          <GoogleDriveImage id="1Le1RvHt1b3TDv9Tf_hFRdSD2u6tHAyWK" alt="logo" />
        </div>
        <ul className={style.navigator__links}>
          {tabs.map(({ path, value }: Tab, index: number): JSX.Element => (
            <li key={index} className={style.navigator__link_container}>
              <Link className={style.navigator__link} to={path}>{value}</Link>
            </li>
          ))}
        </ul>
        <div
          className={style.navigator__hamburger}
          onClick={onOpenNavMobile}
        >
          <div className={style.navigator__line}></div>
          <div className={style.navigator__line}></div>
          <div className={style.navigator__line}></div>
        </div>
      </nav>
      <Outlet />
      <Footer title={`Copyright © ${year} Easy Online English`} />
    </>
  );
}

export default Navigator;
