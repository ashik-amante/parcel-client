import React, { Children, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    const signInWithGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const updateUserProfile = profileInfo=>{
        return updateProfile(auth.currentUser, profileInfo)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currrentUser=>{
            setUser(currrentUser)
            setLoading(false)
        })
        return()=>{
            unsubscribe()
        }
    },[])

    const authInfo = {
        createUser,signIn,user,loading,logOut,signInWithGoogle,updateUserProfile
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
};

export default AuthProvider;