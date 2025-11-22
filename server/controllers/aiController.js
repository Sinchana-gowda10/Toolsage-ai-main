import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import {v2 as cloudinary} from 'cloudinary'
import axios from "axios";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >= 10){
            return res.json({success: false, message: "Limited reached. Upgrade to continue." })
        }


        const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [{
            role: "user",
            content: prompt,
        },
        ],
        temperature: 0.7,
        max_tokens: length, 
        });

    const content = response.choices[0].message.content

    await sql `INSERT INTO creations (user_id, prompt, content, type) 
    VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if(plan !== 'premium'){
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                free_usage:  free_usage + 1

            }
        })
    }

    res.json({success: true, content})



    } catch (error) {

        console.log(error.message)
        res.json({success:false, message: error.message})
        
    }
}

//Blog Titles 

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = await req.auth()
    const { prompt } = req.body
    const plan = req.plan || "free"
    const free_usage = req.free_usage || 0

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. Upgrade to continue." })
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    })

    const content = response.choices[0].message.content

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 }
      })
    }

    res.json({ success: true, content })
  } catch (error) {
    console.error("generateBlogTitle error:", error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}

//Generate Image
export const generateImage = async (req, res) => {
  try {
    const { userId } = await req.auth()
    const { prompt, publish } = req.body
    const plan = req.plan || "free"

    if (plan !== "premium") {
      return res.json({ success: false, message: "This feature is only available for premium subscriptions." })
    }

    const formData = new FormData()
    formData.append("prompt", prompt)

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer"
      }
    )

    const base64Image = `data:image/png;base64,${Buffer.from(data, "binary").toString("base64")}`
    const { secure_url } = await cloudinary.uploader.upload(base64Image)

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `

    res.json({ success: true, content: secure_url })
 } catch (error) {
            console.error('Error message:', error.message);
            res.status(500).json({ message: error.message });
        }
    }


    //Background remove

    
