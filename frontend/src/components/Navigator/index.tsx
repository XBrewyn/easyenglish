import { Link, Outlet } from 'react-router-dom';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { defaultTabs } from './data';
import { Tab } from './type';
import style from './style.module.sass'
import Footer from '../Footer';
import GoogleDriveImage from '../Image';
import { Payload, State } from '../../global/state/type';
import context from '../../global/state/context';

interface Props {
  tabs?: Tab[];
};

const Navigator: React.FC<Props> = ({ tabs = defaultTabs }): JSX.Element => {
  const [{ user }] = useContext<[State, Payload]>(context);
  const year: number = useMemo(() => new Date().getFullYear(), []);
  const [canOpen, setCanOpen] = useState<boolean>(false);
  const nav: React.MutableRefObject<null> = useRef<null>(null);

  const onOpenNavMobile = (): void => {
    const newState: boolean = !canOpen;

    if (nav.current) {
      //@ts-ignore
      nav.current.classList.toggle(style.navigator__open, newState);
    }

    setCanOpen(newState);
  }

  const toUpperCaseFirstLetter = (value: string): string =>
    value.charAt(0).toUpperCase() + value.slice(1);

  const getUser = (): string =>
    `${toUpperCaseFirstLetter(user.name)} ${toUpperCaseFirstLetter(user.lastName)}`;

  const Links = () =>
    tabs.map(({ path, value }: Tab, index: number): JSX.Element => (
      <li key={index} className={style.navigator__link_container}>
        <Link className={style.navigator__link} to={path}>
          {value}
        </Link>
      </li>
    ));

  return (
    <>
      <nav className={style.navigator} ref={nav}>
        <div>
          <GoogleDriveImage id="1Le1RvHt1b3TDv9Tf_hFRdSD2u6tHAyWK" alt="logo" />
        </div>
        <ul className={style.navigator__links}>
          {user && (
            <li className={style.navigator__user}>
              <img
                className={style.navigator__logo}
                src={user.photo}
              />
              <span className={style.navigator__user_name}>
                {getUser()}
              </span>
              <ul className={style.navigator__user_links} >
                <Links />
              </ul>
            </li>
          )}
          <Links />
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
