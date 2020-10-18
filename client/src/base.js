import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCR3vlvAXwaUxsywx1_kCwnUdz_paAuaHY",
  authDomain: "hackgt-a4d08.firebaseapp.com",
  databaseURL: "https://hackgt-a4d08.firebaseio.com",
  projectId: "hackgt-a4d08",
  storageBucket: "hackgt-a4d08.appspot.com",
  messagingSenderId: "311091044717",
  appId: "1:311091044717:web:040390a0171862f7d67a64",
  measurementId: "G-V0LBZTTZ3G"
});

export default app;
