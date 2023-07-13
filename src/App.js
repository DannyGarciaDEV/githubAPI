import React, { useEffect, useState } from "react";
import './App.css';

function GitHubUser({ name, location, avatar, blog, followers, following, twitter, company, user, updated}) {
  return (
    <div className="github-user-container"> 
      <h1> Name:{name}</h1>
      <p> Location: {location}</p>
      <img src={avatar} height={150} alt={name} />
      <p> Blog: {blog} </p>
      <p> Followers:{followers} Following:{following} </p>
    <p> Twitter: {twitter} </p>
    <p> Company:{company} </p>
    <p>
  <a href={`https://github.com/${user}?tab=repositories`} target="_blank">
    https://github.com/{user}?tab=repositories
  </a>
</p>
   
    <p> Last Update:{updated} </p>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [gitName, setGitName] = useState('');

  useEffect(() => {
    if (gitName) {
      fetch(`https://api.github.com/users/${gitName}`)
        .then((response) => response.json())
        .then(setData)
        .catch((error) => {
          console.log("Error fetching user data:", error);
          setData(null);
        });
    } else {
      setData(null);
    }
  }, [gitName]);

  const handleInputChange = (event) => {
    setGitName(event.target.value);
  };

  return (
    <div className="container"> 
      <input
        type="text"
        value={gitName}
        onChange={handleInputChange}
        className="input-field"
      />
      {data ? (
        <GitHubUser
          name={data.name}
          location={data.location}
          avatar={data.avatar_url}
          blog={data.blog}
          followers={data.followers}
          following={data.following}
          twitter= {data.twitter_username}
          company={data.company}
        user={data.login}
          updated={data.updated_at}
        />
      ) : (
        <div>
        <h1 className="no-data">No data available</h1>
     
        </div>
      )}
    </div>
  );
}

export default App;