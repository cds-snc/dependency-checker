import { webhook } from "./__mocks__/webhook";

export const localPayload = async () => {
  const event = await webhook;
  return handle(event);
};

export const handle = async event => {
  return event;
};
