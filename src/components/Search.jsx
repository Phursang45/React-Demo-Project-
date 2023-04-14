import React, { useState, useEffect } from "react";
import "./search.css";
import { gql } from "@apollo/client";

function Search(props) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");



  useEffect(() => {
    const fetchData = async () => {
      try {
        const client =props.client;
        setLoading(true);
        const result = await client.query({
          query: gql`
            query {
              users {
                data {
                  id
                  name
                }
              }
            }
          `
        });
        setUsers(result.data.users.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props.client]);



  return (
    <div className="Search">
      <input
        style={{ width: "100%", height: "25px" }}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      {loading ? (
        <h4>Loading ...</h4>
      ) : (
        users
          .filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            } else {
              return false;
            }
          })
          .map((item) => {return <p className="searchName" key={item.id}>{item.name}</p>})
      )}
    </div>
  );
}

export default Search;