import firebase from "firebase";

let firebaseConfig = {
  databaseURl: "https://product-management-3f357-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database();
export { database };
