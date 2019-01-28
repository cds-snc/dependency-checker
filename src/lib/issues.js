import { authenticate } from "./githubAuth";

export const createIssue = async (title = "Suspicious package found", body) => {
  const id = body.installation.id;
  const repoOwner = body.repository.owner.name;
  const repoName = body.repository.name;

  const client = await authenticate(id);

  const issueObj = {
    owner: repoOwner,
    repo: repoName,
    title: `$title ${Date.now()}`
  };

  const result = await client.issues.create(issueObj);

  return result;
};
