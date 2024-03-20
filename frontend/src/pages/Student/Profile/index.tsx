import React, { useContext } from 'react';
import { Payload, State } from '../../../global/state/type';
import context from '../../../global/state/context';
import style from './style.module.sass';

const Profile: React.FC = () => {
  const [{ user }] = useContext<[State, Payload]>(context);

  return (
    <section>
      <div className={style.profile}>
        <img src={user?.photo} alt="User Profile Picture" className={style.profile__picture} />
        <div className={style.profile__info}>
          <h1 className={style.profile__name}>{user?.name} </h1>
          <p className={style.profile__bio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit elit vel mauris consectetur, et ultrices mi ultricies.</p>
          <ul className={style.profile__details}>
            <li><strong>Email:</strong> {user?.email}</li>
            <li><strong>Last Name:</strong> {user?.lastName}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Profile;
