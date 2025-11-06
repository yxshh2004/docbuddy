import admin from "firebase-admin";
import fs from "fs";

// Load service account
const serviceAccount = JSON.parse(
  fs.readFileSync("./secrets/firebase-admin.json", "utf8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Load medicines JSON
let medicines = JSON.parse(fs.readFileSync("./medicines.json", "utf8"));

// ⚡ Update all medicines to use the target user UID
// Replace with your logged-in Firebase Auth UID
const TARGET_USER_UID = "PUT_YOUR_FIREBASE_UID_HERE";

medicines = medicines.map((med) => ({
  ...med,
  userId: TARGET_USER_UID,
}));

async function importMedicines() {
  console.log("⏳ Importing medicine reminders...");

  const batch = db.batch();
  medicines.forEach((med) => {
    const docRef = db.collection("medicines").doc(); // Auto ID
    batch.set(docRef, med);
  });

  await batch.commit();
  console.log(`✅ Imported ${medicines.length} medicines for UID: ${TARGET_USER_UID}`);
  process.exit();
}

importMedicines();

