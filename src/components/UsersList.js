import React from 'react';

import User from './User';
import classes from './UsersList.module.css';

const UsersList = (props) => {
  return (
    <ul className={classes['users-list']}>
      {props.users.map((user, index) => (<User
        key={index}
        id={user.id}
        name={user.name}
        last={user.last}
      />
      ))}
    </ul>
  );
};

export default UsersList;
