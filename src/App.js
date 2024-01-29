import React, { useState } from "react";
import logo from "./assets/github-mark-white.svg";
import "./App.css";
import GithubUrlInput from "./components/GithubUrlInput";
import RepoInfo from "./components/RepoInfo";

const App = () => {
  const [repoName, setRepoName] = useState(null);
  const [repoOwner, setRepoOwner] = useState(null);

  const handleRepoNameChange = (repoName) => {
    setRepoName(repoName);
  };

  const handleRepoOwnerChange = (repoOwner) => {
    setRepoOwner(repoOwner);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Github extension reporter</p>
      </header>
      <div className="App-body">
        <h1>Enter a Github repo link</h1>
        <GithubUrlInput
          onRepoNameChange={handleRepoNameChange}
          onRepoOwnerChange={handleRepoOwnerChange}
        />
        <RepoInfo repoOwner={repoOwner} repoName={repoName} />
      </div>
    </div>
  );
};

export default App;
