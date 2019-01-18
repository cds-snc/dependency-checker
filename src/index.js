require = require("esm")(module); // eslint-disable-line no-global-assign

const handleCreate = require("./handler").handleCreate;
const handlePush = require("./handler").handlePush;
const localPayload = require("./handler").localPayload;

const scanPackages = async (request, response) => {
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
  const { mockPayload } = argv;
  if (mockPayload) {
    const result = await localPayload();
    console.log(result);
  }
})();

module.exports.scanPackages = scanPackages;
