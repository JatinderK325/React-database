import React from 'react';

import classes from './User.module.css';

const User = (props) => {
  return (
    <li className={classes.user} >
      <h2>{props.name} {props.last}</h2>
    </li>
  );
};

export default User;
