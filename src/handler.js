import {
  getSuspicious,
  getRepoDependencies,
  loadPackages,
  savePackage,
  createIssue,
  deleteCollection
} from "./lib";

import { createWebhook } from "./__mocks__/createWebhook";
import { pushWebhook } from "./__mocks__/pushWebhook";

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
const repoName = event => {
  if (event.after) {
    return event.repository.full_name;
  }

  if (event.repositories) {
    return event.repositories[0].full_name;
  }
};

const clearCollection = async event => {
  const name = event.repository.full_name;
  const result = await deleteCollection(name, 100);
  return result;
};

export const localCreatePayload = async () => {
  const event = await createWebhook;
  const result = handleCreate(event);
  await clearCollection(event);
  return result;
};

export const localPushPayload = async () => {
  const event = await pushWebhook;
  const result = handlePush(event);
  await clearCollection(event);
  return result;
};

const createIssueMessage = (packageName, score = "") => {
  return `We have detected that you have installed a package that has a low package score\n\n
  ${packageName} ${score}
  `;
};

const handleEvent = async event => {
  try {
    const packages = await getRepoDependencies(event);
    const suspicious = await getSuspicious(packages);
    const existing = await loadPackages(repoName(event));
    await asyncForEach(suspicious, async p => {
      if (!existing.includes(p.name)) {
        await savePackage(repoName(event), p);
        await createIssue(event, {
          title: `Suspicious package found: ${p.name}`,
          body: createIssueMessage(p.name, p.score.final)
        });
      }
    });
  } catch (e) {
    console.log(e.message);
  }
  return "done";
};

export const handleCreate = async event => {
  return handleEvent(event);
};

export const handlePush = async event => {
  return handleEvent(event);
};
