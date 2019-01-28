const admin = require("firebase-admin");

let db;

switch (process.env.NODE_ENV) {
  case "dev":
    const serviceAccount = require("../../firestore.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIRESTORE_URL
    });

    db = admin.firestore();
    break;
  case "test":
    const MockCloudFirestore = require("mock-cloud-firestore");
    const { fixtureData } = require("../__mocks__/firestore.js");
    let firebase = new MockCloudFirestore(fixtureData);
    db = firebase.firestore();
    break;
  default:
    const functions = require("firebase-functions");
    admin.initializeApp(functions.config().firebase);
    db = admin.firestore();
}

export const loadPackages = async name => {
  const repoName = sanitizeName(name);
  const data = await db.collection(repoName).get();
  let packages = [];
  data.forEach(p => packages.push(p.data().name));
  return packages;
};

const sanitizeName = name => {
  return name.replace("/", "-");
};

export const savePackage = async (name, p) => {
  const repoName = sanitizeName(name);
  await db
    .collection(repoName)
    .doc(p.name)
    .set(p);
};
