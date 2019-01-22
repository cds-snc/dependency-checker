import { authenticate } from "./githubAuth";

export const createIssue = async body => {
  const id = body.installation.id;
  const repoOwner = body.repository.owner.name;
  const repoName = body.repository.name;

  const client = await authenticate(id);

  const issueObj = {
    owner: repoOwner,
    repo: repoName,
    title: `Some issue ${Date.now()}`
  };

  const result = await client.issues.create(issueObj);

  return result;
};
