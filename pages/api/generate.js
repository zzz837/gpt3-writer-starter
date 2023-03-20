import { Configuration,OpenAIApi } from "openai";


const conf = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(conf);

const basePromptPrefix = `
generate a journal contains the following words : 
`;

const generateAction = async (req,res) => {

    console.log(`API: ${req.body.userInput}`);

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.7,
        max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();



    const secondPrompt = `
    Take the words and table of contents below and generate a journal , spoken like a president.
    Words: ${req.body.userInput}
    Table of Contents: ${basePromptOutput.text}
    `

    const secondCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}`,
        temperature: 0.8,
        max_tokens: 1000,
    })


    const secondPromptOutput = secondCompletion.data.choices.pop();
    res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;
