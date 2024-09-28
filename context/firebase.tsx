import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import auth, { updateProfile } from '@react-native-firebase/auth'
import { ref } from '@react-native-firebase/database'
import storage, { uploadBytesResumable } from '@react-native-firebase/storage';
import { addDoc, collection, getFirestore, setDoc, doc, query, where, getDocs, updateDoc, arrayUnion } from '@react-native-firebase/firestore'
import { Alert } from "react-native";
// import { nanoid } from 'nanoid';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const [user, setUser] = useState("")

    useEffect(() => {
        console.info("USER", user)
    })

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
                    setUser(response.user.uid)
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

    const signIn = async ({ email, password }: signUpProps) => {
        if (email && password) {
            try {
                const response = await auth().signInWithEmailAndPassword(email, password);
                // setUser(response.user.uid)
                // await AsyncStorage.removeItem('userData');
                await AsyncStorage.setItem('userData', JSON.stringify({ userId: response.user.uid, userName: response.user.displayName, userEmail: response.user.email }));
                return response;
            } catch (error) {
                Alert.alert('Sign In Error', 'An error occurred during sign in.');
                console.log("Sign In error:", error); // Log the error for debugging
            }
        } else {
            console.error("Email and password must be provided."); // Ensure email and password are valid
        }
    };

    const uploadCategoryImage = async (file: string) => {

        const fileUri = file;
        const fileName = file.split('/').pop();
        // const uniqueId = nanoid();
        const uniqueFileName = `${Date.now()}_${fileName}`;

        if (!fileUri) {
            Alert.alert('Error', 'File URI is missing');
            return;
        }

        try {
            const storageRef = storage().ref(`category_images/${user}/${uniqueFileName}`);
            const task = storageRef.putFile(fileUri); // Upload the image using `putFile`

            task.on('state_changed', taskSnapshot => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            });

            await task;
            const downloadURL = await storageRef.getDownloadURL(); // Get the uploaded image URL
            console.log('File uploaded successfully, download URL:', downloadURL);

            // You can now store `downloadURL` in your Firestore or use it as needed
            return downloadURL;

        } catch (error) {
            console.error('File upload error:', error);
            Alert.alert('Error', 'File upload failed');
            return '';
        }
    };

    const createCategory = async (categoryName: string, categoryImage: string, userID: string) => {
        const docRef = await addDoc(collection(firestore, "categories"), {
            categoryName,
            categoryImage,
            // cardId,
            userId: userID,
            card_id: [],
        });
        const category_id = docRef.id;
        await setDoc(doc(firestore, "categories", category_id), { category_id }, { merge: true });
        return category_id;
    }

    interface cardDataProps {
        form: {
            question: string,
            answer: string;
            keywords: string,
            category_id_exists: string,
            categoryImage: string,
            category: string,
            categoryImageExists: string
        };
        category_id?: string | null;
        answer_status_id?: string | null;
    }

    const addCard = async (cardData: cardDataProps) => {
        try {
            console.log("Coming:", cardData)

            const question = cardData.form.question ?? null;
            const answer = cardData.form.answer ?? null;
            const keywords = cardData.form.keywords ?? null;
            const categoryName = cardData.form.category ?? null;
            const categoryImage = cardData.form.categoryImage ?? null;
            const categoryImageExists = cardData.form.categoryImageExists ?? null;
            const category_id = cardData.category_id ?? null;
            const category_id_exists = cardData.form.category_id_exists ?? null;
            const answer_status_id = cardData.answer_status_id ?? null;
            const userID = user;

            if (!question || !answer || !keywords) {
                console.error("Required fields are missing");
                return;
            }
            if (categoryImageExists) {
                const docRef = await addDoc(collection(firestore, "cards"), {
                    question,
                    answer,
                    keywords,
                    category_id: category_id_exists,
                    answer_status_id,
                    userID,
                });
                const card_id = docRef.id;
                await setDoc(doc(firestore, "cards", card_id), { card_id }, { merge: true });

                await updateDoc(doc(firestore, "categories", category_id_exists), {
                    card_id: arrayUnion(card_id),
                });

            } else {
                const docRef = await addDoc(collection(firestore, "cards"), {
                    question,
                    answer,
                    keywords,
                    category_id,
                    answer_status_id,
                    userID,
                });
                const card_id = docRef.id;
                await setDoc(doc(firestore, "cards", card_id), { card_id }, { merge: true });
                const categoryUrl = await uploadCategoryImage(categoryImage);
                if (categoryUrl) {
                    const resCategory = await createCategory(categoryName, categoryUrl, userID);

                    await setDoc(doc(firestore, "categories", resCategory), {
                        card_id: arrayUnion(card_id),
                    }, { merge: true });

                    await setDoc(doc(firestore, "cards", card_id), { category_id: resCategory }, { merge: true });
                } else {
                    console.error("Category URL is undefined. Cannot create category.");
                }
                console.log("Card document written with ID: ", card_id);
                return card_id;
            }
        } catch (e) {
            console.error("Error adding card: ", e);
        }
    };

    interface Category {
        id: string;
        categoryName: string;
        categoryImage: string;
        // cardId: string;
        card_id: string[];
        userId: string;
    }


    const fetchCategoriesByUserId = async (userId: string): Promise<Category[]> => {
        try {
            const categoriesRef = collection(firestore, "categories");

            const q = query(categoriesRef, where("userId", "==", userId));

            const querySnapshot = await getDocs(q);

            const categories: Category[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();

                // Ensure the card_id is treated as an array (empty if not present)
                const card_id = data.card_id ?? [];

                categories.push({
                    id: doc.id,
                    category_id: data.category_id,
                    categoryName: data.categoryName,
                    categoryImage: data.categoryImage,
                    card_id: Array.isArray(card_id) ? card_id : [], // Ensure it's an array
                    userId: data.userId,
                } as Category);
            });

            return categories;
        } catch (error) {
            console.error("Error fetching categories: ", error);
            return [];
        }
    };

    interface Card {
        id: string;
        answer: string;
        answer_status_id: string;
        card_id: string;
        category_id: string;
        keywords: string;
        question:string;
        userID:string
    }

    const fetchCategoryCards = async (category_id: string, userID:string): Promise<Card[]> => {
        try {
            const cardsRef = collection(firestore, "cards");

            const q = query(cardsRef, 
                where("userID", "==", userID),
                where("category_id", "==", category_id)
            );

            const querySnapshot = await getDocs(q);

            const cards: Card[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                cards.push({
                    id: doc.id,
                    answer: data.answer,
                    answer_status_id: data.answer_status_id,
                    card_id: data.card_id,
                    category_id: data.category_id,
                    keywords: data.keywords,
                    question: data.question,
                    userID: data.userID
                } as Card);
            });

            return cards;
        } catch (error) {
            console.error("Error fetching cards: ", error);
            return [];
        }
    };


    return (
        <FirebaseContext.Provider value={{ signUp, signIn, addCard, fetchCategoriesByUserId, user, setUser, fetchCategoryCards }}>
            {children}
        </FirebaseContext.Provider>
    );
};