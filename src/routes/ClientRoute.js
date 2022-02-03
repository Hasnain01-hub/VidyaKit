/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { db } from "../Firebase";

const ClientRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state => ({ ...state })));
    const [ok, setOk] = useState(false);
    var separatedString;
    useEffect(async () => {
        if (user && user.token) {
            await db.collection('users')
                // .where('uid', '==', user.email)
                .doc(user.email)
                .get()
                .then(doc => {
                    if (doc && doc.exists) {
                        separatedString = doc.data();
                        //use separatedString
                    }
                    if (separatedString.role === 'client') {

                        setOk(true)
                    }
                })
                .catch(err => {
                    alert('client access denied')
                    console.log(err);
                    setOk(false)
                })
        }
    }, [user]);

    return ok
        ? (<Route {...rest} />)
        : (<LoadingToRedirect />)
}

export default ClientRoute;

