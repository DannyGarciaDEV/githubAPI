import React, { useEffect, useState } from "react";

import './App.css';

function GitHubUser({ name, location, avatar, blog, followers, following, twitter, company, user }) {
  return (
    <div className="github-user-container">
      <h1 className="user-info">Name: {name}</h1>
      <p className="user-info">Location: {location}</p>
      <img src={avatar} className="user-avatar" alt={name} />
      <p className="user-info">Blog: <a href="{blog}" > Click here</a></p>
      <p className="user-info">Followers: {followers} Following: {following}</p>
      <p className="user-info">Twitter: {twitter}</p>
      <p className="user-info">Company: {company}</p>
      <p className="user-info">
        <a href={`https://github.com/${user}?tab=repositories`} target="_blank" className="repo-link">
          https://github.com/{user}?tab=repositories
        </a>
      </p>
    
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
    <div className="app-container">
    <div className="header-container">
      <h1>Search for Github user</h1>
      <img className="githubLogo" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub Logo" />
    </div>
  <div className="header-container">
  <img className="searchImg" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/search-512.png" alt="Search icon" />
<input
  type="text"
  value={gitName}
  onChange={handleInputChange}
  className="input-field"
  placeholder="Enter GitHub username"
/>
      </div>
      {data ? (
        <GitHubUser
          name={data.name}
          location={data.location}
          avatar={data.avatar_url}
          blog={data.blog}
          followers={data.followers}
          following={data.following}
          twitter={data.twitter_username}
          company={data.company}
          user={data.login}
          
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