import React from 'react';
import {Row, Col, Button, Typography} from 'antd';
import firebase, { auth, db } from '../../firebase/config';

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();


export default function Login(){
    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
        
        
        if (additionalUserInfo?.isNewUser) {
            db.collection('users').add({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId

            })
        }
    };

    return (
        <div>
            <Row justify="center" style={{height: 800}}>
            <Col span={8}>
                <Title style={{ textAlign: 'center'}} level={3}>
                    Fun Chat
                </Title>
                <Button style={{ width: '100%', marginBottom: 5 }}> 
                    Dang nhap bang Google
                </Button>
                <Button style={{width: '100%'}} onClick={handleFbLogin}>
                    Dang nhap bang Facebook
                </Button>
            </Col>
            </Row>
        </div>
    )
}