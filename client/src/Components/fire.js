import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDyevhdoBIZlIlqn07YF97Uf4m4xiAGRYE",
  authDomain: "product-management-3f357.firebaseapp.com",
  databaseURL: "https://product-management-3f357-default-rtdb.firebaseio.com",
  projectId: "product-management-3f357",
  storageBucket: "gs://product-management-3f357.appspot.com",
  messagingSenderId: "166254708210",
  appId: "1:166254708210:web:8802f79eb2e6023269576b",
};

let app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const productRef = ref(db, "product");
const userRef = ref(db, "user");
const companyRef = ref(db, "company");
const adminRef = ref(db, "admin");
const databaseURL =
  "https://product-management-3f357-default-rtdb.firebaseio.com";

export { productRef, userRef, companyRef, db, databaseURL, adminRef };
export default app;
