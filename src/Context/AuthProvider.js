import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }){
    const [user, setUser] = useState({});
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log({user});
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName, email, uid, photoURL
                });
                setIsLoading(false);
                history.push('/');
                return;
            } else {
                setIsLoading(false);
                history.push('/login');
                return;
            }
        });

        //clean function
        return () =>{
            unsubscribe();
        }
    }, [history])

    return (
        <AuthContext.Provider value={{user}}>
            {isLoading ? <Spin/> :  children}
        </AuthContext.Provider>
    )
}