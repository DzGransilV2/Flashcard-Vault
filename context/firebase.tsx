import { createContext, ReactNode, useContext } from "react";
import auth from '@react-native-firebase/auth'
import db from '@react-native-firebase/database'
import { Alert } from "react-native";

type FirebaseContextType = any;

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => {
    return useContext(FirebaseContext);
};

interface FirebaseProviderProps {
    children: ReactNode;
    // value: FirebaseContextType;
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {

    interface signUpProps{
        email: string,
        password: string,
        username: string
    }

    const signUp = async ({email, password, username}:signUpProps) => {
        if(email && password){
            try {
                const response = await auth().createUserWithEmailAndPassword(email, password)
                if(response.user){
                    console.log("user created", response.user)
                    db().ref(`/users/${response.user.uid}`).set({username})
                }
            } catch (error) {
                Alert.alert('signUp', 'found error in firebase signUp function');
                console.log(error)
            }
        }
    }

    return (
        <FirebaseContext.Provider value={{signUp}}>
            {children}
        </FirebaseContext.Provider>
    );
};