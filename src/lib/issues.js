import { authenticate } from "./githubAuth";
import octokit from "./index";

export const createIssue = async (body, issue) => {
  const id = body.installation.id;
  const repoOwner = body.repository.owner.name;
  const repoName = body.repository.name;

  const client = await authenticate(octokit, id);

  const issueObj = {
    owner: repoOwner,
    repo: repoName,
    title: issue.title,
    body: issue.body
  };

  const result = await client.issues.create(issueObj);

  return result;
};
