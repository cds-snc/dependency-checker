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

export const deleteCollection = async (collectionPath, batchSize) => {
  var collectionRef = db.collection(sanitizeName(collectionPath));
  var query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
};

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  try {
    return query
      .get()
      .then(snapshot => {
        // When there are no documents left, we are done
        if (snapshot.size === 0) {
          console.log("all done");
          return 0;
        }

        // Delete documents in a batch
        var batch = db.batch();
        snapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit().then(() => {
          return snapshot.size;
        });
      })
      .then(numDeleted => {
        if (numDeleted === 0) {
          resolve();
          return;
        }

        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
          deleteQueryBatch(db, query, batchSize, resolve, reject);
        });
      });
  } catch (e) {
    console.log(e.message);
    reject();
  }
}

//
