import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedSceneResponse, StoryNode } from "../types";

// Safety fallback in case API fails
const FALLBACK_RESPONSE: GeneratedSceneResponse = {
  narrative: "Sistem narasi sedang mengalami gangguan. Namun cerita harus berlanjut... \n\n(Mohon periksa koneksi atau API Key Anda).",
  choices: [
    { id: "fallback_next", text: "Lanjutkan cerita...", effect: "neutral" }
  ]
};

export const generateStoryContent = async (
  currentNode: StoryNode,
  history: string[],
  affinity: number
): Promise<GeneratedSceneResponse> => {
  
  if (!process.env.API_KEY) {
    console.warn("API Key missing");
    return FALLBACK_RESPONSE;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Define schema strictly for JSON output
  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      narrative: {
        type: Type.STRING,
        description: "The narrative text of the story scene, written in novel style (Indonesian language). POV: Erlina.",
      },
      choices: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            text: { type: Type.STRING, description: "The text displayed on the button for the user." },
            effect: { 
              type: Type.STRING, 
              enum: ['neutral', 'positive', 'negative', 'ending_reject', 'ending_fling', 'ending_romance'],
              description: "The emotional impact or narrative direction of this choice." 
            }
          },
          required: ["id", "text", "effect"]
        }
      }
    },
    required: ["narrative", "choices"]
  };

  const isClimax = currentNode.id === '11_climax';
  
  const prompt = `
    Anda adalah penulis novel visual romantis-psikologis interaktif (Bahasa Indonesia).
    
    Konteks Cerita: Hubungan tabu dan rumit antara Erlina (Anak Tiri, 17 tahun, SMA) dan Rizky (Ayah Tiri, 35 tahun, Broker).
    Nuansa: Tegang, romantis, slow-burn, sedikit melankolis, dan penuh gejolak batin. TIDAK BOLEH eksplisit secara seksual (NSFW), gunakan bahasa kiasan dan emosional.
    
    Status Hubungan (Affinity): ${affinity}/100 (Semakin tinggi semakin dekat/romantis).
    Riwayat Pilihan Sebelumnya: ${history.slice(-3).join(' -> ')}.
    
    Instruksi Adegan Saat Ini:
    Judul: ${currentNode.title}
    Deskripsi Plot: ${currentNode.text}
    
    Tugas:
    1. Tulis narasi pendek (sekitar 100-150 kata) dari sudut pandang Erlina. Gambarkan perasaannya, suasana, dan dialog dengan Rizky.
    2. Buat 2 atau 3 pilihan respons untuk Erlina.
       ${isClimax 
         ? "KARENA INI KLIMAKS, BUAT 3 PILIHAN YANG JELAS: 1. Menolak tegas (ending_reject), 2. Ragu-ragu/Coba sebentar (ending_fling), 3. Menerima sepenuh hati (ending_romance)." 
         : "Pilihan harus mencerminkan: Menjaga jarak (negative), Netral (neutral), atau Memberi harapan/Menerima (positive)."
       }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-latest',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8, // Creative writing
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeneratedSceneResponse;

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return {
        ...FALLBACK_RESPONSE,
        narrative: `(AI Error: ${error instanceof Error ? error.message : 'Unknown'}) \n\n${currentNode.text}`
    };
  }
};

export const generateEndingContent = async (endingNode: StoryNode): Promise<string> => {
   if (!process.env.API_KEY) return endingNode.text;

   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
   
   const prompt = `
    Tuliskan paragraf penutup (Epilog) yang emosional dan puitis untuk novel visual ini.
    Bahasa: Indonesia.
    Ending yang dicapai: ${endingNode.title}
    Deskripsi Ending: ${endingNode.text}
    
    Tulis sekitar 150 kata yang menutup kisah Erlina dan Rizky berdasarkan ending tersebut.
   `;

   try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-latest',
        contents: prompt,
    });
    return response.text || endingNode.text;
   } catch (e) {
       return endingNode.text;
   }
}