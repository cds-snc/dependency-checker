require = require("esm")(module); // eslint-disable-line no-global-assign
require("dotenv-safe").config({ allowEmptyValues: true });

const handle = require("./handler").handle;
const localPayload = require("./handler").localPayload;

const scanPackages = async (request, response) => {
  await handle(request);
  response.status(200).send("Done");
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
