import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  console.log("req.body.message", req.body.message);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    //model: "davinci:ft-personal-2023-01-27-06-00-49",
    prompt: generatePrompt(req.body.message),
    temperature: 0.1,
    max_tokens: 200,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["You:"],
  });
  res.status(200).json({ message: completion.data.choices[0].text });
}

function generatePrompt(message) {
  console.log("prompt ==>", message);
  if (
    message[message?.length - 1].includes("How to") ||
    message[message?.length - 1].includes("how to")
  ) {
    console.log("true");
    return `how to ${message} step by step in details from dubai municipality services? ->`;
  } else {
    console.log("false");
    return `${message}`;
  }
}
