import { webhook } from "./__mocks__/webhook";

export const localPayload = async () => {
  const event = await webhook;
  return handle(event);
};

export const handle = async event => {
  /*
    1. Check if repo has been scanned before
    1a. If not scan repo for packages.json file
    1b. If yes, check if packages.json is in in added or modified
    2. If processing packages.json, collate dependendencies and devDependencies
    3. Pull data from DB per dependency and repo  on previous analysis
    4. Iterate through list and run analysis on dependency and version if it has changed
    5. Store results in DB for repo and dependency
    6. Open issues for suspect dependencies if they have not been flagged before  
  */
  return event;
};
