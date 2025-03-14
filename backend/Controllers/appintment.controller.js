import { appointmentmodel } from "../Models/Appointment.model";
import Doctor from "../models/doctorModel";
export const createappointment=async(req,res)=>{
    try {
        const {patientid,doctor}=req.body;
const doc=await Doctor.findOne({name:doctor});
const appointment =await appointmentmodel.create({
    patient:patientid,
    doctor:doc._id
})
return res.status(201).json({appointment:appointment})
    } catch (error) {
        res.status(400),json({error:error})
    }
}
export const confirmappointment=async(req,res)=>{
    try {
        const {appointmentid}=req.query;
  const app=await appointmentmodel.findByIdAndUpdate(appointmentid,
            { status:true },
            { new: true, runValidators: true }
        )
        return res.status(201).json({appointmentstatus:app})
    } catch (error) {
        
    }
}