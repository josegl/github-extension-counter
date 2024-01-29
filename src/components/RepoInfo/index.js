import React, { useEffect, useState } from "react";
import "./index.css";
import { useFetchMainBranchName } from "./hooks/useFetchMainBranchName";
import { useRepoExtensionCounter } from "./hooks/useRepoExtensionCounter";

const RepoInfo = ({ repoName, repoOwner }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [loadingMainBranchName, mainBranchNameError, mainBranchName] =
    useFetchMainBranchName({
      repoName,
      repoOwner,
    });

  const [loadingCounter, countersError, counters] = useRepoExtensionCounter({
    repoName,
    repoOwner,
    mainBranchName,
  });

  /* This effect will take care of the global loading status */
  useEffect(() => {
    setLoading(loadingMainBranchName || loadingCounter);
  }, [loadingMainBranchName, loadingCounter]);

  /* This effect will take care of the error status*/
  useEffect(() => {
    setError(mainBranchNameError || countersError);
  }, [mainBranchNameError, countersError]);

  if (!(repoName && repoOwner)) {
    return <div></div>;
  }

  if (error) {
    return <div className="repoInfoError">{error.message}</div>;
  }

  return (
    <div className="repoInfo">
      <div className="header">
        <label>Repo Owner:</label>
        <span>{repoOwner}</span>
        <span className="separator">|</span>
        <label>Repo name:</label>
        <span>{repoName}</span>
      </div>
      {loading ? (
        <div className="loading" />
      ) : (
        <div className="list">
          <ul>
            {Object.entries(counters).map(([ext, count]) => (
              <li>
                <label>{ext}:</label>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RepoInfo;
