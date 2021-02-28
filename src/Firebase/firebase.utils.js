import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import collection from '../pages/collection/collection';

const config = {
    
        apiKey: "AIzaSyDhtLIIBBVXaZ7o9oX9jUoiE1mTJ8ub3EM",
        authDomain: "crwn-db-77dd2.firebaseapp.com",
        databaseURL: "https://crwn-db-77dd2.firebaseio.com",
        projectId: "crwn-db-77dd2",
        storageBucket: "crwn-db-77dd2.appspot.com",
        messagingSenderId: "265930397184",
        appId: "1:265930397184:web:19699e78f0a03dd348eae5",
        measurementId: "G-L9GE8EPTYN"
      
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();
        
        if(!snapShot.exists) {
                const { displayName, email } = userAuth;
                const createdAt = new Date();

                try {
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...additionalData
                        });
                        
                } catch(error) {
                        console.log('error creating user', error.message);
                }
        }

        return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
        const collectionRef = firestore.collection(collectionKey);

        const batch = firestore.batch();
        objectsToAdd.forEach(obj => {
                const newDocRef = collectionRef.doc();
                batch.set(newDocRef, obj);
        });

        return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
        const transformedCollection = collections.docs.map(doc => {
                const { title, items } = doc.data();

                return {
                        routeName: encodeURI(title.toLowerCase()),
                        id: doc.id,
                        title,
                        items
                }
        });

        return transformedCollection.reduce((accumulator, collection) => {
                accumulator[collection.title.toLowerCase()] = collection;
                return accumulator;
        }, {}); 
        
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;