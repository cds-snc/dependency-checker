import { getRepoDependencies } from "./lib";
import { createWebhook } from "./__mocks__/createWebhook";
import { pushWebhook } from "./__mocks__/pushWebhook";

export const localCreatePayload = async () => {
  const event = await createWebhook;
  return handleCreate(event);
};

export const localPushPayload = async () => {
  const event = await pushWebhook;
  return handlePush(event);
};

export const handleCreate = async event => {
  try {
    const packages = await getRepoDependencies(event);
    console.log(packages);
  } catch (e) {
    console.log(e.message);
  }
  /*
    HANDLE CREATE EVENT
    -------------------
    // 1. Find package.json file
    // 2. If processing packages.json, collate dependendencies and devDependencies
    3. Pull data from DB per dependency and repo  on previous analysis
    4. Iterate through list and run analysis on dependency and version if it has changed
    5. Store results in DB for repo and dependency
    6. Open issues for suspect dependencies if they have not been flagged before  
  */

  return "done";
};

export const handlePush = async event => {
  try {
    const packages = await getRepoDependencies(event);
    console.log(packages);
  } catch (e) {
    console.log(e.message);
  }

  /*
    HANDLE PUSH EVENT
    -----------------
    // 1. Check if packages.json is in added or modified of push event
    // 2. If processing packages.json, collate dependendencies and devDependencies
    3. Pull data from DB per dependency and repo  on previous analysis
    4. Iterate through list and run analysis on dependency and version if it has changed

    5. Store results in DB for repo and dependency

    6. Open issues for suspect dependencies if they have not been flagged before  
  */

  // await createIssue(event);
  return "done";
};
