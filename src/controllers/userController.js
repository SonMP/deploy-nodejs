import UserService from '../services/UserService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await UserService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required params',
            users: []
        })
    }
    let users = await UserService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    console.log('req.body:', req.body);
    let message = await UserService.createNewUser(req.body);
    console.log('Check email:', req.body.email);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await UserService.editUser(data);
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    let userId = await req.body.id;
    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing params!'
        })
    }
    let message = await UserService.deleteUser(userId);

    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await UserService.getAllCodeService(req.query.type);
        return res.status(200).json(data)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = { handleLogin, handleGetAllUsers, handleCreateNewUser, handleEditUser, handleDeleteUser, getAllCode }