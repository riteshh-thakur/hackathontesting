import { GoogleGenerativeAI } from "@google/generative-ai"
import { getDoctors } from "../controller/doctorController.js";
import Doctor from "../models/doctorModel.js";
const key="AIzaSyAowgJOXblYyZidVx1YDeAYLdwvyuiqz8Q"
//const hh={ds};//import doctor info from doctor routes
const genAI = new GoogleGenerativeAI(key);
const date=new Date()
const options = { weekday: 'long' };
const day= date.toLocaleDateString('en-US', options);
const fetchDoctors = async () => {
    const doctors = await Doctor.find();
    return doctors;
};

export const generateResult = async (prompt) => {
    console.log(process.env.GOOGLE_AI_KEY, "key");

    const doctors = await fetchDoctors();
    console.log("Fetched Doctors Data:", doctors);

    const systemInstruction = `
        You are a doctor assigner. You suggest a doctor based on the user's symptoms,
        the doctor's specialty, and the doctor's availability for today.if someone ask in hindi give result in hindi
        Today is: ${day}
        Doctor data: ${JSON.stringify(doctors)}

        Response format:
        {
          "doctor": {
            "name": "Doctor's Name",
            "specialty": "Doctor's Specialty",
            "experience": "Doctor's Experience",
            "schedule": ["Available Time 1", "Available Time 2", ...]
          },
          "message": "A helpful message to the user."
        }

        Example:

        User: I have chest pain.
        Response:
        {
          "doctor": {
            "name": "Dr. Smith",
            "specialty": "Cardiology",
            "experience": "10 years",
            "schedule": ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"]
          },
          "message": "Dr. Smith, a cardiologist, is available today. Here are their available times."
        }

        User: I have a rash.
        Response:
        {
          "doctor": {
            "name": "Dr. Jones",
            "specialty": "Dermatology",
            "experience": "8 years",
            "schedule": ["2:00 PM - 5:00 PM"]
          },
          "message": "Dr. Jones, a dermatologist, is available today. Here are their available times."
        }
    `;

    const updatedModel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.4,
        },
        systemInstruction
    });

    const result = await updatedModel.generateContent(prompt);

    return result.response.text();
};