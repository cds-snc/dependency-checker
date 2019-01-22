import { getSuspicious, getRepoDependencies } from "./lib";
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
    const suspicious = await getSuspicious(packages);
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
    console.log(suspicious);
  } catch (e) {
    console.log(e.message);
  }
  return "done";
};
