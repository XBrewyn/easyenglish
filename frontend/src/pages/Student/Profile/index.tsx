import React, { useContext } from 'react';
import { Payload, State } from '../../../global/state/type';
import context from '../../../global/state/context';

const Profile: React.FC = () => {
  const [{ user }] = useContext<[State, Payload]>(context);

  return (
    <section>
      <ul>
        <li>photo: <img src={user?.photo || 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'} /> </li>
        <li>name: {user?.name}</li>
        <li>lastName: {user?.lastName}</li>
        <li>email: {user?.email}</li>
        <li>role: {user?.role}</li>
      </ul>
    </section>
  );
};

export default Profile;
