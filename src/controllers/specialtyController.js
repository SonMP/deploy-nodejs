import SpecialtyService from "../services/SpecialtyService";
let createSpecialty = async (req, res) => {
    try {
        let infor = await SpecialtyService.createSpecialty(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let getSpecialty = async (req, res) => {
    try {
        let infor = await SpecialtyService.getSpecialty();
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let editSpecialty = async (req, res) => {
    try {
        let infor = await SpecialtyService.editSpecialty(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let getDetailSpecialtyById = async (req, res) => {
    try {
        let infor = await SpecialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
module.exports = { createSpecialty, getSpecialty, editSpecialty, getDetailSpecialtyById, getDetailSpecialtyById }