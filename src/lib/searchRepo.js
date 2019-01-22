import { authenticate } from "./githubAuth";

export const searchRepo = async (octokit, body) => {
  const id = body.installation.id;
  const name = body.repositories[0].full_name;
  const client = await authenticate(octokit, id);
  const query = {
    q: `filename:package.json repo:${name}`
  };
  const result = await client.search.code(query);
  if (result.data.total_count === 0) {
    return false;
  }

  return result.data.items.map(i => i.path);
};
