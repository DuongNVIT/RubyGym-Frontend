import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import avatar from './../../store/imgs/avatar.jpg'
import { Popup, MyCalendar } from './../'
import userProfileAPI from './../../api/userProfileAPI'

import styles from './CustomerInfor.module.css'

// Trang này có thể hiển thị với cả học viên, huấn luyện viên và admin
// Thông tin chi tiết của mỗi học viên

function CustomerInfor() {
    let [isPTag, setPTag] = useState(true);


    let [showPopup, setShowPopup] = useState(false);



    let [userProfile, setUserProfile] = useState({
        name: '',
        phone: '',
        birthday: '',
        gender: '',
        address: '',
        created_at: '',
        expired_at: '',
        avatar_url: '',
    });
    let [profileOnChange, setProfileOnChange] = useState({
        name: userProfile.name,
        phone: userProfile.phone,
        birthday: userProfile.birthday,
        gender: userProfile.gender,
        address: userProfile.address,
        created_at: userProfile.created_at,
        expired_at: userProfile.expired_at,
        avatar_url: userProfile.avatar_url
    })
    const handleEdit = () => {
        setPTag(false);
    }
    const handleCancel = () => {
        setPTag(true);
    }

    // Để show Popup sau khi cập nhật thành công
    useEffect(() => {
        if (showPopup) {
            var id = setTimeout(() => {
                setShowPopup(prev => !prev)
            }, 1000)
        }
        return () => {
            clearTimeout(id);
        }
    }, [showPopup])

    // Lấy profile về
    useEffect(() => {
        (async () => {
                const response = await userProfileAPI.getProfile();
                console.log(response);
            if (response && response.status && response.data.status) {
                userProfile = { ...response.data.data };
                setProfileOnChange(userProfile);
                console.log(response);
                setUserProfile(userProfile);
                console.log(userProfile);
            }
        })()
    }, [])

    // Upload Avatar
    const handleUploadAvatar = async (e) => {

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('File', file);

        const response = await userProfileAPI.updateAvatar(formData);
        if (response && response.status && response.data && response.data.data) {
            userProfile = {
                ...userProfile,
                avatar_url: response.data.data.imageURL
            }
            setUserProfile(userProfile);

        }
        if (response && !response.status) {
            alert(response.message)
        }
    }

    //Update Profile
    const handleUpdate = async () => {
        setPTag(true);
        userProfile = {...profileOnChange};
        // setUserProfile(userProfile);
        console.log(userProfile);
        const response = await userProfileAPI.updateProfile(userProfile);
        if (response && response.status) setShowPopup(prev => !prev);
        if (response && !response.status && response.message) {
            alert(response.message);
        }
    }

    return (
        <div className="grid">

            {/* Thông tin cá nhân */}
            <div className={clsx(styles.inforField)}>
                <h1 className={clsx(styles.inforHeading)}>Thông tin cá nhân</h1>
                <div className="row">

                    {/* Avatar */}
                    <div className="col l-5 m-0 c-0">
                        <div
                            className={clsx(styles.avatar)}
                            style={{
                                backgroundImage: userProfile.avatar_url ?
                                    `url(${userProfile.avatar_url})` :
                                    `url(${avatar})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            <label
                                htmlFor="avatarChoose"
                                className={clsx(styles.chooseAvatar)}
                            >
                                <i className={clsx(styles.chooseAvatarIcon, "fas fa-camera")}></i>
                            </label>
                            <input
                                type="file"
                                id="avatarChoose"
                                hidden
                                onChange={handleUploadAvatar}
                            />
                        </div>
                    </div>

                    {/* Thông tin */}
                    <div className="col l-7 m-12 c-12">
                        <div className={clsx(styles.infor)}>
                            <div className={clsx(styles.inforWrapper)}>

                                {/* Tên */}
                                <div className={clsx(styles.inforContent)}>
                                    <h3 className={clsx(styles.inforLabel)}>Họ tên</h3>
                                    {isPTag ? (
                                        <b>{userProfile.name}</b>
                                    ) : (
                                        <input
                                            //readOnly={!nameUpdating}
                                            //ref={nameRef}
                                            type="text"
                                            className={clsx(styles.inforText)}
                                            value={profileOnChange.name}
                                            onChange={(e) => {
                                                setProfileOnChange({
                                                    ...profileOnChange,
                                                    name: e.target.value,
                                                })
                                            }}
                                            id='trainer-name' />
                                    )}
                                </div>
                            </div>

                            {/* Số điện thoại */}
                            <div className={clsx(styles.inforWrapper)}>
                                <div className={clsx(styles.inforContent)}>
                                    <h3 className={clsx(styles.inforLabel)}>Số điện thoại</h3>
                                    {isPTag ? (
                                        <b>{userProfile.phone}</b>
                                    ) : (
                                        <input
                                            // readOnly={!phoneUpdating}
                                            // ref={phoneRef}
                                            type="text"
                                            className={clsx(styles.inforText)}
                                            value={profileOnChange.phone}
                                            onChange={(e) => {
                                                setProfileOnChange({
                                                    ...profileOnChange,
                                                    phone: e.target.value
                                                })
                                            }}
                                            id='trainer-phone' />
                                    )}
                                </div>

                            </div>

                            {/* Ngày sinh */}
                            <div className={clsx(styles.inforWrapper)}>
                                <div className={clsx(styles.inforContent)}>
                                    <h3 className={clsx(styles.inforLabel)}>Ngày sinh</h3>
                                    {isPTag ? (
                                        // <input>{userProfile.birthday.substring(0, 10)}</input>
                                        <input
                                            readOnly={true}
                                            // ref={birthdayRef}
                                            type="date"
                                            className={clsx(styles.inforText)}
                                            value={userProfile.birthday.substring(0, 10)}
                                            onChange={(e) => {
                                                setProfileOnChange({
                                                    ...profileOnChange,
                                                    birthday: e.target.value
                                                })
                                            }}
                                            id='trainer-birthday' />
                                    ) : (
                                        <input
                                            // readOnly={!birthdayUpdating}
                                            // ref={birthdayRef}
                                            type="date"
                                            className={clsx(styles.inforText)}
                                            value={profileOnChange.birthday.substring(0, 10)}
                                            onChange={(e) => {
                                                setProfileOnChange({
                                                    ...profileOnChange,
                                                    birthday: e.target.value
                                                })
                                            }}
                                            id='trainer-birthday' />
                                    )}
                                </div>

                            </div>

                            {/* Giới tính */}
                            <div className={clsx(styles.inforWrapper)}>
                                <div className={clsx(styles.inforContent)}>
                                    <h3 className={clsx(styles.inforLabel)}>Giới tính</h3>
                                    {isPTag ? (
                                        <b>{userProfile.gender}</b>
                                    ) : (
                                        <select
                                            // disabled={!genderUpdating}
                                            // ref={genderRef}
                                            className={clsx(styles.inforText)}
                                            value={profileOnChange.gender}
                                            onChange={(e) => {
                                                setProfileOnChange({
                                                    ...profileOnChange,
                                                    gender: e.target.value
                                                })
                                            }}
                                        >
                                            <option>Nam</option>
                                            <option>Nữ</option>
                                        </select>
                                    )}
                                </div>

                            </div>



                            {/* Địa chỉ */}
                            <div className={clsx(styles.inforWrapper)}>
                                <div className={clsx(styles.inforContent)}>
                                    <h3 className={clsx(styles.inforLabel)}>Địa chỉ</h3>
                                    {isPTag ? (
                                        <b>{userProfile.address}</b>
                                    ) : (
                                        <input
                                            // readOnly={!addressUpdating}
                                            // ref={addressRef}
                                            type="text"
                                            className={clsx(styles.inforText)}
                                            value={profileOnChange.address}
                                            onChange={(e) => {
                                                setProfileOnChange({
                                                    ...profileOnChange,
                                                    address: e.target.value
                                                })
                                            }}
                                            id='trainer-address' />
                                    )}
                                </div>

                            </div>

                            {/* Ngày đăng ký */}
                            <div className={clsx(styles.inforWrapper)}>
                                <div className={clsx(styles.inforContent)}>
                                    <h3 className={clsx(styles.inforLabel)}>Ngày đăng ký</h3>
                                        <input
                                            readOnly={true}
                                            // ref={birthdayRef}
                                            type="date"
                                            className={clsx(styles.inforText)}
                                            value={userProfile.created_at.substring(0, 10)}
                                        />
                                </div>

                            </div>

                            {/* Ngày hết hạn */}
                            <div className={clsx(styles.inforWrapper)}>
                                <div className={clsx(styles.inforContent)}>
                                    <h3 className={clsx(styles.inforLabel)}>Ngày hết hạn</h3>
                                    <input
                                            readOnly={true}
                                            type="date"
                                            className={clsx(styles.inforText)}
                                            value={userProfile.expired_at.substring(0, 10)}
                                        />
                                </div>
                            </div>
                            {isPTag ? (
                                <button onClick={handleEdit}
                                    className="btn btn-primary"
                                >chỉnh sửa</  button>
                            ) : (
                                <div>
                                    <button onClick={handleUpdate}
                                        className="btn btn-success"
                                    >Lưu</  button>
                                    <button onClick={handleCancel}
                                        className="btn btn-danger"
                                    >Huỷ</ button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lịch tập luyện */}
            <div className={clsx(styles.inforField)}>
                <h1 className={clsx(styles.inforHeading)}>Thông tin tập luyện</h1>
                <MyCalendar/>
            </div>

            <Popup trigger={showPopup} message="Cập nhật thành công" />
        </div>
    )
}

export default CustomerInfor 