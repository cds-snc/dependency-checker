require = require("esm")(module); // eslint-disable-line no-global-assign
const handleCreate = require("./handler").handleCreate;
const handlePush = require("./handler").handlePush;
const localCreatePayload = require("./handler").localCreatePayload;
const localPushPayload = require("./handler").localPushPayload;

const scanPackages = async (request, response) => {
  console.log(request.headers);
  switch (request.headers["x-github-event"]) {
    case "create":
      await handleCreate(request);
      response.status(200).send("Processed create.");
      break;
    case "push":
      await handlePush(request);
      response.status(200).send("Processed push event request.");
      break;
    default:
      response.status(200).send("No action taken.");
      break;
  }
};

// used for local testing
(async () => {
  const argv = require("minimist")(process.argv.slice(2));
  const { mockCreatePayload, mockPushPayload } = argv;
  if (mockPushPayload) {
    const result = await localPushPayload();
    console.log(result);
  }
  if (mockCreatePayload) {
    const result = await localCreatePayload();
    console.log(result);
  }
})();

module.exports.scanPackages = scanPackages;
