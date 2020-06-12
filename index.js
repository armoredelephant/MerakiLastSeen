const availNetworks = require("./availNetworks").availNetworks;

const args = process.argv.slice(2);

const filePath = args[0];

(async () => {
  try {
    await availNetworks(filePath);
  } catch (error) {
    throw new Error(error);
  }
})();
