import firebase from 'firebase';

const registerUser = async (email: string, password: string, displayName: string) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  await firebase.auth().signInWithEmailAndPassword(email, password);
  const user = firebase.auth().currentUser;
  if (user) {
    await user.updateProfile({
      displayName,
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
  sendResetPasswordEmail,
};
