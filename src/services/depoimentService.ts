import { Timestamp, addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import Notiflix from "notiflix";
import { firestoreDb } from "../lib/firebase";

const depoimentRef = collection(firestoreDb, "depoiments");

export type DepoimentProps = {
  name: string;
  depoiment: string;
}

export type Depoiment = DepoimentProps & {
  id: string;
  createdAt: Timestamp
}

async function createDepoiment(depoiment: DepoimentProps) {
  try {
    const documentRef = await addDoc(depoimentRef, {
      ...depoiment,
      createdAt: Timestamp.now(),
    });

    return documentRef.id;
  } catch (error) {
    const e = error as Error;
    Notiflix.Notify.failure(e.message);
  }
}

async function getDepoiments() {
  try {
    const q = query(depoimentRef, orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);

    const result = querySnapshot.docs.map(doc => {
      const data = doc.data() as Depoiment;
      const {seconds, nanoseconds} = data.createdAt;

      return {
        ...data,
        id: doc.id,
        createdAt: new Timestamp(seconds, nanoseconds).toDate()
      }
    });

    return result;

  } catch (error) {
    const e = error as Error;
    Notiflix.Notify.failure(e.message);
  }
}

export const depoimentService = {
  createDepoiment,
  getDepoiments,
}