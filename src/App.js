import React, { useState, useEffect, useCallback } from 'react';

import UsersList from './components/UsersList';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState(users);
  const [text, setText] = React.useState("");

  const fetchUsersHandler = useCallback(async () => {
    const response = await fetch('https://randomuser.me/api/?results=10');
    const data = await response.json();
    console.log(data);

    const transformedUsers = data.results.map((userData) => {
      return {
        id: userData.id,
        name: userData.name.first,
        last: userData.name.last,
      };
    });
    setUsers(transformedUsers);
    setFilteredData(transformedUsers);
  }, []);

  // for rendering:
  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  const inputChangeHandler = (event) => {
    setText(event.target.value);
    let result = [];
    console.log(text);
    result = users.filter((data) => {
      return data.name.search(text) !== -1 || data.last.search(text) !== -1;
    });
    setFilteredData(result);
  }

  return (
    <React.Fragment>
      <div className='search'>
        <label>Search :   </label>
        <input type="text" onChange={inputChangeHandler} value={text} />
      </div><br />
      <section>
        <UsersList users={filteredData} />
      </section>
    </React.Fragment>
  );
}

export default App;
