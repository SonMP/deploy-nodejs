
import db from "../models/index";
import CRUDservice from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }

}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let getPiKaChu = (req, res) => {
    return res.render('test/pikachu.ejs');
}

let postCRUD = async (req, res) => {
    await CRUDservice.createNewUser(req.body);
    // console.log(message);
    console.log(req.body);
    return res.send('post crud');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    console.log(data);
    return res.render('displayCRUD.ejs', { dataTable: data });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);
        // console.log(userData);
        return res.render('editCRUD.ejs', { user: userData });
    } else {
        return res.send('User not found!')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDservice.updateUserData(data);
    return res.render('displayCRUD.ejs', { dataTable: allUser });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let userData = await CRUDservice.deleteUserById(id);
        return res.render('displayCRUD.ejs', { dataTable: userData });
    } else {
        return res.send('User not found!');
    }

}
//object:{key:value}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    getPiKaChu: getPiKaChu,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
};