import DoctorService from '../services/DoctorService';

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await DoctorService.getTopDoctorHomeService(+limit);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error server...'
        })
    }
}

let getAllDocTor = async (req, res) => {
    try {
        let doctors = await DoctorService.getAllDocTor();
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        let response = await DoctorService.postInforDoctorService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let infor = await DoctorService.getDetailDoctorByIdService(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }

}

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await DoctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }

}

let getScheduleByDate = async (req, res) => {
    try {
        let infor = await DoctorService.getScheduleByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let getDoctorExtraInforById = async (req, res) => {
    try {
        let infor = await DoctorService.getDoctorExtraInforById(req.query.doctorId);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let infor = await DoctorService.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getListPatientForDoctor = async (req, res) => {
    try {
        let infor = await DoctorService.getListPatientForDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let sendRemedy = async (req, res) => {
    try {
        let infor = await DoctorService.sendRemedy(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
module.exports = {
    getTopDoctorHome, getAllDocTor, postInforDoctor,
    getDetailDoctorById, bulkCreateSchedule, getScheduleByDate,
    getDoctorExtraInforById, getProfileDoctorById, getListPatientForDoctor,
    sendRemedy
}