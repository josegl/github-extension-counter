import React, { useState, useEffect, useCallback } from "react";
import "./index.css";

const GithubUrlInput = ({ onRepoOwnerChange, onRepoNameChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [url, setUrl] = useState(null);
  const [repoOwner, setRepoOwner] = useState(null);
  const [repoName, setRepoName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    onRepoOwnerChange(repoOwner);
  }, [repoOwner, onRepoOwnerChange]);

  useEffect(() => {
    onRepoNameChange(repoName);
  }, [repoName, onRepoNameChange]);

  useEffect(() => {
    if (url) {
      if (url.host === "github.com") {
        const [, repoOwner, repoName] = url.pathname.split("/");
        setRepoOwner(repoOwner); //Clear repoOwner
        setRepoName(repoName); //Clear repoName
      } else {
        const msg = "Invalid repo hostname. Only Github repos allowed";
        const error = new Error(msg);
        setError(error);
      }
    } else {
      //Url cleared.
      setRepoOwner(null); //Clear repoOwner
      setRepoName(null); //Clear repoName
    }
  }, [url]);

  const handleInput = useCallback(
    (txt) => {
      setInputValue(txt);
      if (txt) {
        try {
          const url = new URL(txt);
          setUrl(url);
          if (error) {
            setError(null);
          }
        } catch (error) {
          setError(error);
        }
      } else {
        setUrl(null);
        setError(null);
      }
    },
    [error]
  );

  if (error) {
    return (
      <div className="GithubUrlInput error">
        <p>{error.message}</p>
        <input
          value={inputValue}
          onChange={(e) => handleInput(e.target.value)}
          type="text"
          placeholder="Github repo url"
        />
      </div>
    );
  } else {
    return (
      <div className="GithubUrlInput">
        <input
          value={inputValue}
          onChange={(e) => handleInput(e.target.value)}
          type="text"
          placeholder="Github repo url"
        />
      </div>
    );
  }

  /*
  return (
    <div className={error ? "GithubUrlInput error" : "GithubUrlInput"}>
      {error ? (
        <div className="error">
          <p>{error.message}</p>
          <input
            onChange={(e) => handleInput(e.target.value)}
            type="text"
            placeholder="Github repo url"
          />
        </div>
      ) : (
        <input
          onChange={(e) => handleInput(e.target.value)}
          type="text"
          placeholder="Github repo url"
        />
      )}
    </div>
  );
  */
};

export default GithubUrlInput;
