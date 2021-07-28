import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Spin } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import debounce from 'lodash.debounce';
import Avatar from 'antd/lib/avatar/avatar';
import { db } from '../../firebase/config';


function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    //Search

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }

        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {
                // [{label, value, photoURL}]
                options.map(opt => (
                    <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                        <Avatar size="small" src={opt.photoURL}>
                            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        {` ${opt.label}`}
                    </Select.Option>
                ))
            }
        </Select>
    )
}


async function fetchUserList(search) {
    return db
        .collection('users')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc =>({
                label: doc.data().displayName,
                value: doc.data().uid,
                photoURL: doc.data().photoURL
            }))
        });
}

export default function InviteMemberModal() {
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();


    const handleOk = () => {

        //reset form value
        form.resetFields();


        //update member 
        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        });
        setIsInviteMemberVisible(false);
    }

    const handleCancel = () => {
        form.resetFields();
        setIsInviteMemberVisible(false);
    }

    console.log({value});
    return (
        <div>
            <Modal
                title="Mời thêm thành viên"
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode="multiple"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên thành viên"
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{ width: '100%' }}
                    />
                </Form>
            </Modal>

        </div>
    )
}