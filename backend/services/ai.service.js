import { GoogleGenerativeAI } from "@google/generative-ai"

const key="AIzaSyAowgJOXblYyZidVx1YDeAYLdwvyuiqz8Q"
//const hh={ds};//import doctor info from doctor routes
const genAI = new GoogleGenerativeAI(key);
const date=new Date()
const options = { weekday: 'long' };
const day= date.toLocaleDateString('en-US', options);
const doctors = [
    {
        name: "Dr. Ritesh",
        specialty: "Physician",
        experience: "10 years",
        schedule: {
          Monday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
          Tuesday: ["2:00 PM - 5:00 PM"],
          Wednesday: [],
          Thursday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
          Friday: [],
          Saturday: ["10:00 AM - 1:00 PM"],
          Sunday: [],
        },
      },
      {
        name: "Dr. Shubham",
        specialty: "Physician",
        experience: "10 years",
        schedule: {
          Monday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
          Tuesday: ["2:00 PM - 5:00 PM"],
          Wednesday: ["9:00 AM - 10:00 PM"],
          Thursday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
          Friday: [],
          Saturday: ["10:00 AM - 1:00 PM"],
          Sunday: [],
        },
      },
    {
      name: "Dr. Smith",
      specialty: "Cardiology",
      experience: "10 years",
      schedule: {
        Monday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
        Tuesday: ["2:00 PM - 5:00 PM"],
        Wednesday: ["9:00 AM - 12:00 PM"],
        Thursday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
        Friday: [],
        Saturday: ["10:00 AM - 1:00 PM"],
        Sunday: [],
      },
    },
    {
      name: "Dr. Jones",
      specialty: "Dermatology",
      experience: "8 years",
      schedule: {
        Monday: [],
        Tuesday: ["9:00 AM - 12:00 PM"],
        Wednesday: ["2:00 PM - 5:00 PM"],
        Thursday: [],
        Friday: ["10:00 AM - 1:00 PM", "2:00 PM - 4:00 PM"],
        Saturday: [],
        Sunday: ["1:00 PM - 3:00 PM"],
      },
    },
    {
      name: "Dr. Lee",
      specialty: "Orthopedics",
      experience: "12 years",
      schedule: {
        Monday: ["1:00 PM - 5:00 PM"],
        Tuesday: [],
        Wednesday: ["9:00 AM - 1:00 PM"],
        Thursday: ["1:00 PM - 5:00 PM"],
        Friday: ["9:00 AM - 1:00 PM"],
        Saturday: [],
        Sunday: [],
      },
    },
    {
        name: "Dr. Patel",
        specialty: "Cardiology",
        experience: "15 years",
        schedule: {
          Monday: ["9:00 AM - 12:00 PM"],
          Tuesday: ["2:00 PM - 5:00 PM"],
          Wednesday: [],
          Thursday: ["9:00 AM - 12:00 PM"],
          Friday: ["2:00 PM - 5:00 PM"],
          Saturday: ["10:00 AM - 1:00 PM"],
          Sunday: [],
        },
        
    },
  ];
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.4,
    },
    systemInstruction: `You are a doctor assigner. You suggest a doctor based on the user's symptoms, the doctor's specialty, and the doctor's availability for today.
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
    "schedule": ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] // Only schedule for today.
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
    "schedule": ["2:00 PM - 5:00 PM"] //only wednesday schedule if today is wednesday.
  },
  "message": "Dr. Jones, a dermatologist, is available today. Here are their available times."
}
`,
});

export const generateResult = async (prompt) => {
    console.log(process.env.GOOGLE_AI_KEY,"key");
    console.log(prompt);
    console.log(day);
    
        const result = await model.generateContent(prompt);
    
        return result.response.text()
    }