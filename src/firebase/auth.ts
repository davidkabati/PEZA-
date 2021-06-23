import firebase from 'firebase';
import firebaseInit from '../firebase';

const db = firebaseInit();

const registerUser = async (
  email: string,
  password: string,
  displayName: string,
  phone: string,
) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  await firebase.auth().signInWithEmailAndPassword(email, password);
  const user = firebase.auth().currentUser;
  if (user) {
    await user.updateProfile({
      displayName,
    });
    const userRef = firebase.firestore().collection('user');
    await userRef.doc(user.uid).set({
      id: user.uid,
      email,
      phone,
      img_uri: '',
      is_premium: false,
      whatsapp_link: '',
      full_name: displayName,
      created_at: new Date().toISOString(),
      is_admin: false,
    });
  }
  return user;
};

const signInUser = async (email: string, password: string) => {
  const signedUser = await firebase.auth().signInWithEmailAndPassword(email, password);
  const user = signedUser.user;
  return user;
};

const getUserDetails = () => {
  const user = firebase.auth().currentUser;
  return user;
};

const getUsersFullDetails = async (user_id: string) => {
  const user = await db.collection('user').doc(user_id).get();
  return user.data();
};

const logOutUser = async () => {
  await firebase.auth().signOut();
};

const sendResetPasswordEmail = async (email: string) => {
  await firebase.auth().sendPasswordResetEmail(email);
};

export default {
  registerUser,
  signInUser,
  logOutUser,
  getUserDetails,
  getUsersFullDetails,
  sendResetPasswordEmail,
};
