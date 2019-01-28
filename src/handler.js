import {
  getSuspicious,
  getRepoDependencies,
  loadPackages,
  savePackage,
  createIssue
} from "./lib";
import { createWebhook } from "./__mocks__/createWebhook";
import { pushWebhook } from "./__mocks__/pushWebhook";

const createIssueMessage = (packageName, score = "") => {
  return `We have detected that you have installed a package that has a low package score\n\n
  
  ${packageName} ${score}
  `;
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

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
    const suspicious = await getSuspicious(packages);
    const existing = await loadPackages(event.repository.full_name);
    await asyncForEach(suspicious, async p => {
      if (!existing.includes(p.name)) {
        await savePackage(event.repository.full_name, p);
        await createIssue(
          "Suspicious package found",
          createIssueMessage(p.name, p.score.final)
        );
      }
    });
    console.log(suspicious);
  } catch (e) {
    console.log(e.message);
  }
  return "done";
};

export const handlePush = async event => {
  try {
    const packages = await getRepoDependencies(event);
    const suspicious = await getSuspicious(packages);
    const existing = await loadPackages(event.repository.full_name);
    await asyncForEach(suspicious, async p => {
      if (!existing.includes(p.name)) {
        await savePackage(event.repository.full_name, p);
      }
    });
  } catch (e) {
    console.log(e.message);
  }
  return "done";
};
