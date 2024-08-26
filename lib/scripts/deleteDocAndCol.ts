import {
  doc,
  deleteDoc,
  collection,
  limit,
  query,
  getDocs,
  writeBatch,
  WriteBatch,
} from "firebase/firestore";

export async function deleteDocAndCol(
  db: any,
  docPath: string,
  collectionPath: string[]
) {
  // 1. Get reference to the document
  const docRef = doc(db, docPath);

  // 2. Delete the document
  await deleteDoc(docRef);

  // 3. Use helper function to delete the collection of likes and comments
  const batch = writeBatch(db);
  for (let i = 0; i < collectionPath.length; i++) {
    const cPath = collectionPath.pop();
    if (cPath) {
      await deleteCollection(db, batch, cPath);
    }
  }
  batch.commit();
}

async function deleteCollection(db: any, batch: WriteBatch, cPath: string) {
  const collectionRef = collection(db, cPath);
  const snapshot = getDocs(query(collectionRef));

  (await snapshot).docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
}
