import ClinicService from "../services/ClinicService";

let createClinic = async (req, res) => {
    try {
        let infor = await ClinicService.createClinic(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getAllClinic = async (req, res) => {
    try {
        let infor = await ClinicService.getAllClinic();
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let infor = await ClinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
module.exports = { createClinic, getAllClinic, getDetailClinicById }