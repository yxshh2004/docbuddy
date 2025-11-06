// app/importDoctors.js
import admin from "firebase-admin";
import fs from "fs";

// ✅ Use ESM-safe paths
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("../secrets/firebase-admin.json", import.meta.url), "utf8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Load doctors.json
const doctors = JSON.parse(
  fs.readFileSync(new URL("../doctors.json", import.meta.url), "utf8")
);

async function importDoctors() {
  console.log("⏳ Checking and importing doctors...");
  const batch = db.batch();
  let addedCount = 0;
  let skippedCount = 0;

  for (const doctor of doctors) {
    // Check for duplicates (same name + city)
    const snapshot = await db
      .collection("doctors")
      .where("name", "==", doctor.name)
      .where("city", "==", doctor.city)
      .get();

    if (snapshot.empty) {
      const docRef = db.collection("doctors").doc(); // Auto ID
      batch.set(docRef, doctor);
      addedCount++;
    } else {
      console.log(`⚠ Skipped duplicate: ${doctor.name} (${doctor.city})`);
      skippedCount++;
    }
  }

  if (addedCount > 0) {
    await batch.commit();
  }

  console.log(`✅ Import finished: Added ${addedCount}, Skipped ${skippedCount}`);
  process.exit();
}

importDoctors();

