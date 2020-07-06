const fs = require("fs");
const csv = require("csv-parser");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "_output/available_networks.csv",
  header: [
    { id: "template", title: "Template" },
    { id: "network", title: "Network" },
    { id: "seen", title: "LastSeen" }
  ]
});

const availNetworks = async filePath => {
  const subnets = [];

  console.log("starting subnet check...");

  const monthsOnly = /\b(\w*months\w*)\b/g;

  await fs
    .createReadStream(filePath)
    .pipe(csv())
    .on("data", data => {
      const lastSeenOnline = data.columnTwo.split(" ");
      const range = data.columnOne.split("_");

      if (
        parseInt(lastSeenOnline[0]) > 3 &&
        lastSeenOnline[1].match(monthsOnly)
      ) {
        let template;
        let templateRange = parseInt(range[0]);
        switch (!!templateRange) {
          case templateRange >= 160 && templateRange <= 191:
            return template = "DAL";
          case templateRange >= 192 && templateRange <= 243:
            return template = "DAL";
          case templateRange >= 128 && templateRange <= 159:
            return template = "ATL";
          case templateRange >= 224 && templateRange <= 254:
            return template = "ATL";
          case templateRange >= 104 && templateRange <= 111:
            return template = "ATL_MX64";
          case templateRange >= 112 && templateRange <= 119:
            return template = "ATL_MX64_2";
          case templateRange >= 24 && templateRange <= 27:
            return template = "ATL_MX64";
          case templateRange >= 28 && templateRange <= 31:
            return template = "ATL_MX64_2";
          default:
            console.log(`No assignable template for ${data.columnOne}`);
            return template = `NO_ASSIGNABLE_TEMPLATE`;
        }
        subnets.push({
          template: template,
          network: data.columnOne,
          seen: data.columnTwo
        });
      }
    })
    .on("end", () => {
      return csvWriter.writeRecords(subnets);
    });

  console.log("network list has successfully been created...");
};

exports.availNetworks = availNetworks;
