import './view.css';
import { gql } from '@apollo/client';
import { useState, useEffect } from 'react';
// import { ApolloClient, InMemoryCache} from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'https://graphqlzero.almansi.me/api',
//   cache: new InMemoryCache(),
// });


const View = (props) => {
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    setUsers(
      users.map((user) => ({
        ...user,
        completed: event.target.checked,
      }))
    );
  };

  const handleSelectuser = (event, id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, completed: event.target.checked } : user
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client =props.client;

        const result = await client.query({
          query: gql`
            query {
              users {
                data {
                  id
                  name
                  username
                  email
                  address{
                    street
                  }
                  phone
                  website
                }
              }
            }
          `
        });
        console.log(result.data.users.data)
        setUsers(result.data.users.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props.client]);




  return (
    <div className='contianer'>
        <div className='title1' >
          <div className="checkbox">
            <input type="checkbox"
              checked={selectAll} onChange={handleSelectAll}
            />
          </div>
          <div className='name'>Name</div>
          <div className='username'>Username</div>
          <div className='email'>Email</div>
          <div className='phone'>Phone</div>
          <div className='website'>Website</div>
          <div className='address' >Address</div>
        </div>
      {users.map((user) => (
        <div key={user.id}>
          <div className='title2'key={user.id}>
              <div className='checkbox'>
                <input type="checkbox" 
                checked={user.completed}
                onChange={(event) => handleSelectuser(event, user.id)}
                /></div>
              <div className='name'>{user.name}</div>
              <div className='username'>{user.username}</div>
              <div className='email'>{user.email}</div>
              <div className='phone'>{user.phone}</div>
              <div className='website'>{user.website}</div>
              <div className='address'>{user.address.street}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default View