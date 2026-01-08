import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChefRecommendation = async (
  query: string,
  products: Product[]
): Promise<string> => {
  try {
    const menuContext = products
      .map((p) => `${p.name} ($${p.price}): ${p.description}`)
      .join("\n");

    const systemInstruction = `You are the Head Chef at "Royal Bites", a premium fast-food restaurant. 
    Your tone is polite, professional, yet warm and appetizing.
    Recommend items from our menu based on the user's request. 
    If they ask about something not on the menu, politely steer them to what we have.
    Keep answers concise (under 50 words) unless asked for a detailed description.
    
    Menu:
    ${menuContext}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I apologize, I am currently busy in the kitchen. Please ask our staff.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble checking the recipes right now. Please try again.";
  }
};
