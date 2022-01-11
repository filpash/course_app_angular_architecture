import { firestore } from "firebase";

export interface Job {
  title: string;
  salary: number;
  created: firestore.FieldValue;
  updated?: firestore.FieldValue;
}
