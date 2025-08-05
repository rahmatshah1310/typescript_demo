import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setDoc,
  doc,
  auth,
  db,
  getAuth,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "@/firebase";

export const signupUser = async (email: string, password: string, username: string, fullName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: fullName });

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email,
    username,
    fullName,
    createdAt: new Date().toISOString(),
  });
  console.log(user);
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const loginCredintial = await signInWithEmailAndPassword(auth, email, password);
  const credintial = loginCredintial.user;
  console.log(credintial);
  return credintial;
};

export const logoutUser = async () => {
  const auth = getAuth();
  return signOut(auth);
};

export const forgotPassword = async (email: string) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};

export const resetPassword = async ({ oobCode, newPassword }: { oobCode: string; newPassword: string }) => {
  await confirmPasswordReset(auth, oobCode, newPassword);
};
