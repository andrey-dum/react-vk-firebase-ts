import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore/lite";

const auth = getAuth();

export const AuthApi = {
    register: async(email: string, password: string) => {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response.user
    },

    login: async(email: string, password: string) => {
  
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response.user;
       
    }

}

// Get a list of cities from your database
// export async function getPosts(db: any) {
//     const citiesCol = collection(db, 'posts');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//   }
