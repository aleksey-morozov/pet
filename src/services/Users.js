import { auth } from '../plugins/firebase';

export default {
  async getUserByCredentials(email, password) {
    const result = await auth.signInWithEmailAndPassword(email, password);
    return result.user;
  },
  async createUser(email, password) {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    return result.user;
  },
  async logOut() {
    return auth.signOut();
  },
};
