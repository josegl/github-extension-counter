import { useState, useEffect } from "react";

const fetchMainRepoName = async (repoOwner, repoName) => {
  const branchesUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/branches`;
  const branchesResponse = await fetch(branchesUrl);
  const branches = await branchesResponse.json();
  const mainBranchName = branches.find(
    (branch) => branch.name === "master" || branch.name === "main"
  )?.name;
  if (mainBranchName) {
    return mainBranchName;
  } else {
    throw new Error("Main branch not found in this repo");
  }
};

export const useFetchMainBranchName = ({ repoName, repoOwner }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainBranchName, setMainBranchName] = useState(null);

  useEffect(() => {
    if (repoName && repoOwner) {
      setLoading(true);
      fetchMainRepoName(repoOwner, repoName)
        .then((mainBranchName) => {
          setMainBranchName(mainBranchName);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setLoading(false);
      setMainBranchName(null);
      setError(null);
    }
  }, [repoName, repoOwner]);

  return [loading, error, mainBranchName];
};
