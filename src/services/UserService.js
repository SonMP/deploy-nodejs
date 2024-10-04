import { where } from "sequelize";
import db from "../models";
import bcrypt, { compareSync } from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'email', 'roleId', 'passWord', 'firstName', 'lastName'],
                    raw: true

                })
                if (user) {
                    let check = bcrypt.compareSync(password, user.passWord);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = 'OK';
                        delete user.passWord;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = `Wrong password!`
                    }

                } else {
                    userData.errCode = 2;
                    userData.message = `User's not found!`;
                }
            } else {
                userData.errCode = 1;
                userData.message = `Your's email isn't exist your system`;
            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })

}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let email = await db.User.findOne({
                where: { email: userEmail }
            })
            if (email) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['passWord']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['passWord']
                    }
                })
                console.log(users)
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is used!, plz use another email!',
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.passWord);
                // console.log(data.image);
                await db.User.create({
                    email: data.email,
                    passWord: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.image
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (password) {
                let hashPassword = await bcrypt.hashSync(password, salt);
                resolve(hashPassword);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundUser = await db.User.findOne({
                where: { id: userId }
            })
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not exist'
                })
            }
            // if (foundUser) {
            //     await foundUser.destroy();
            // }
            await db.User.destroy({
                where: { id: userId }
            })
            resolve({
                errCode: 0,
                errMessage: 'User deleted!'
            });

        } catch (e) {
            reject(e);
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('da den day')
            if (!data.id || !data.gender || !data.roleId || !data.positionId) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                // console.log('check', data.image);
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                if (data.image) {
                    user.image = data.image;
                }
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'User updated!'
                })
            } else (
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                })
            )

        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }

        } catch (e) {
            reject(e);
        }
    })
}
module.exports = { handleUserLogin, getAllUsers, createNewUser, deleteUser, editUser, getAllCodeService }