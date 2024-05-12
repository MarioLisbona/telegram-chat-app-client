import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDoc,
  doc,
  setDoc,
  collection,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY4ULvF_Ej9KzxhmhncrJnz0mtsUlX0QE",
  authDomain: "telegram-chat-app-9cdaf.firebaseapp.com",
  projectId: "telegram-chat-app-9cdaf",
  storageBucket: "telegram-chat-app-9cdaf.appspot.com",
  messagingSenderId: "317338133891",
  appId: "1:317338133891:web:c36d3a76ae1d9cf48242b6",
  measurementId: "G-TE95QYNC3P",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    // Update user's online status in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        // Add a field to indicate the user is online
        online: true,
      },
      { merge: true }
    ); // Merge with existing document if it exists

    // Check if the user exists and add them if they don't
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        online: true,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      online: true,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

function moveObjectWithUIDToStart(array, uid) {
  const index = array.findIndex((item) => item.uid === uid);
  if (index !== -1) {
    const objToMove = array.splice(index, 1)[0]; // Remove the object from its current position
    array.unshift(objToMove); // Move the object to the beginning of the array
  }
  return array;
}

const getOnlineUsers = async (setOnlineUsers, user) => {
  if (!user) {
    // Handle the case where the user object is null
    return;
  }

  const q = query(collection(db, "users"), where("online", "==", true));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const updatedOnlineUsers = [];
    snapshot.forEach((doc) => {
      updatedOnlineUsers.push(doc.data());
    });
    // sort array with this user at position 1 at top of active users list
    const sortedArray = moveObjectWithUIDToStart(updatedOnlineUsers, user.uid);
    // set state for onlineUsers
    setOnlineUsers(sortedArray);
  });
  return unsubscribe;
};

const signOutUser = async (navigate) => {
  try {
    const user = auth.currentUser; // Get the current user before signing out
    await signOut(auth);

    // Update user's online status in Firestore to false
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { online: false }, { merge: true });
    }
    navigate("/");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  getOnlineUsers,
  signOutUser,
};
