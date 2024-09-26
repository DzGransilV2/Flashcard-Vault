import { createContext, ReactNode, useContext } from "react";
import auth, { updateProfile } from '@react-native-firebase/auth'
import db from '@react-native-firebase/database'
import doc, { addDoc, collection, getFirestore, setDoc } from '@react-native-firebase/firestore'
import { Alert } from "react-native";

type FirebaseContextType = any;

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => {
    return useContext(FirebaseContext);
};

export const firestore = getFirestore();

interface FirebaseProviderProps {
    children: ReactNode;
    // value: FirebaseContextType;
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {

    interface signUpProps {
        email: string,
        password: string,
        username: string
    }


    const signUp = async ({ email, password, username }: signUpProps) => {
        if (email && password) {
            try {
                // Create a new user with email and password
                const response = await auth().createUserWithEmailAndPassword(email, password);
                if (response.user) {
                    console.log("User created:", response.user);
    
                    // Attempt to update the user's display name
                    try {
                        await response.user.updateProfile({
                            displayName: username,
                        });
                    } catch (error) {
                        console.error("Error updating displayName:", error);
                    }
    
                    // Add user information to Firestore
                    try {
                        await addDoc(collection(firestore, 'users'), {
                            userID: response.user.uid,
                            userName: username,
                            userEmail: response.user.email
                        });
                        console.log("User data saved to Firestore:", { userID: response.user.uid, userName: username });
                    } catch (error) {
                        console.error("Error adding document to Firestore:", error);
                    }
    
                    // Reload user data to get the updated information
                    await response.user.reload();
                    console.log("Username set:", response.user.displayName);
                }
                return response; // Return the user response
            } catch (error) {
                Alert.alert('Sign Up Error', 'An error occurred during sign up.');
                console.log("Sign up error:", error); // Log the error for debugging
            }
        } else {
            console.error("Email and password must be provided."); // Ensure email and password are valid
        }
    };

    return (
        <FirebaseContext.Provider value={{ signUp }}>
            {children}
        </FirebaseContext.Provider>
    );
};