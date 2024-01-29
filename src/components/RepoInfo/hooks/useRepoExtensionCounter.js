import { useState, useEffect } from "react";

/**
 * This function recursively explores a Github repo
 * The Github API returns an object as specified in this docs:
 * https://docs.github.com/en/rest/git/trees?apiVersion=2022-11-28
 *
 * We want to explore al the trees to count the file extensions
 */
const listTree = async (treeUrl) => {
  const treeResponse = await fetch(treeUrl);
  const { tree } = await treeResponse.json();

  // Now we have a tree. So we are going to update the counters
  // for this tree:
  const counters = tree
    .filter((node) => node.type === "blob") //a blob is a file, we may want to count it
    .reduce((counters, node) => {
      const nodePathSegments = node.path.split(".");
      // A file that starts with a dot like ".env" is not a valid file.
      // as this kind of files are configuration files. That's why when
      // we split the path by ".", we want to discard those which the first
      // segment is an empty string, and then we only want to take the last
      // segment because the last segment is the extension part.
      const extension = nodePathSegments[0] && nodePathSegments.slice(-1)[0];
      // Now, if the file has extension, we check the counters accumulator to
      // see if we already counted any file with the given extension. In such
      // case we increment by 1 the counter for that extension. Otherwise we
      // create the entry for this extension.
      // eslint di
      return {
        ...counters,
        ...((extension && {
          [extension]: (counters[extension] || 0) + 1,
        }) ||
          {}), //This ugly thing here is because of the linter :(
      };
    }, {});

  // We have already the counters for this tree level. Now we want to
  // explore the rest of the trees that this tree may have. For this we
  // are going to keep only the "tree" type nodes, and an optimization
  // we are going to do is to skip the .git and .github directories, as
  // they are metadata for Git and Github respectively and the files
  // inside them only are going to introduce noise.
  const subtreesNodes = tree
    .filter((node) => node.type === "tree")
    .filter((node) => !node.path.startsWith(".git"));
  // There are trees inside this node. Let's explore them
  if (subtreesNodes.length > 0) {
    // Here we go deep recursively inside each subtree
    const subtreesExtensions = await Promise.all(
      subtreesNodes.map((treeNode) => listTree(treeNode.url))
    );
    // Now that we have the subtrees counters we have to aggregate
    // all them together with this tree level counters.
    return subtreesExtensions.reduce((counter, subcounter) => {
      return Object.entries(subcounter).reduce(
        (acc, [extension, count]) => ({
          ...acc,
          [extension]: (acc[extension] || 0) + count,
        }),
        counter
      );
    }, counters);
  } else {
    return counters;
  }
};

export const useRepoExtensionCounter = ({
  repoName,
  repoOwner,
  mainBranchName,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counters, setCounters] = useState(null);

  useEffect(() => {
    if (repoOwner && repoName && mainBranchName) {
      setLoading(true);
      const url = `https://api.github.com/repos/${repoOwner}/${repoName}/git/trees/${mainBranchName}`;
      listTree(url)
        .then((counters) => {
          setLoading(false);
          setCounters(counters);
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      //clear the state
      setCounters(null);
      setError(null);
    }
  }, [repoOwner, repoName, mainBranchName]);

  return [loading, error, counters];
};
