import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { classificationPrompt } from "@/utils/prompt";
// import { parsedResponse } from "@/utils/parsedResponse";
// Initialize Gemini AI
const genAI = new GoogleGenerativeAI("api-key");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
  try {
    // Parse the form data
    const data = await request.formData();
    const file: File | null = data.get("file") as File;

    // Check if a file was provided
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read the file content
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse the Excel file
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[1]; // Assuming the data is in the second sheet
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    const paymentData = JSON.stringify(jsonData);

    // Prepare the prompt for Gemini
    const prompt = `${classificationPrompt}\n\nHere is the payment data:\n${paymentData}`;

    // Send the prompt to Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Preprocess the response to remove Markdown formatting
    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parse the cleaned response from Gemini
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch (error) {
      console.error("Failed to parse Gemini response:", error);
      return NextResponse.json(
        { error: "Failed to process the data. Please try again." },
        { status: 500 }
      );
    }

    // Return the parsed response
    return NextResponse.json(parsedResponse, { status: 200 });
  } catch (error) {
    console.error("Error processing the file:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the file." },
      { status: 500 }
    );
  }
}
