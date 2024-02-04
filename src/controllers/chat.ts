import { NextFunction, Request, Response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

export async function handleChatMesssage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = req.body.message;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant and your name is Leo",
      },
      {
        role: "user",
        content: message
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const response = completion.choices[0];
  return res.status(200).json({ message, response });
}
