import React, { useContext } from 'react';
import { Payload, State } from '../../../global/state/type';
import context from '../../../global/state/context';
import style from './style.module.sass';

const Profile: React.FC = (): JSX.Element => {
  const [{ user }] = useContext<[State, Payload]>(context);

  return (
    <section>
      <div className={style.profile}>
        <div className={style.profile__container}>
          <div>
            <h1>Perfil</h1>
          </div>
          <div>
            <img src={user?.photo} alt="User Profile Picture" className={style.profile__picture} />
          </div>
          <div className={style.profile__info}>
            <ul className={style.profile__details}>
              <li className={style.profile__name}>
                <strong>Nombre:</strong> {user?.name}
              </li>
              <li className={style.profile__last_name}>
                <strong>Apellido:</strong> {user?.lastName}
              </li>
              <li>
                <strong>Email:</strong> {user?.email}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
