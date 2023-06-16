require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const chat = async (req, res) => {
  const userMessage = req.body.message;
  
  try {
    let context = `Soy ChatGPT, un modelo de lenguaje avanzado diseñado por OpenAI. Estoy programado con un enfoque especial en estadística, listo para resolver problemas y ejercicios de este campo. `;
    context += `Estoy aquí para proporcionarte los pasos detallados y explicarte cómo llegar a la solución. `;
    context += `Este es el problema que se me ha presentado: ${userMessage}\n`;

    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: context,
      max_tokens: 1000,
      n: 1,
      stop: null,
      temperature: 0.8,
    });

    const generatedMessage = response.data.choices[0].text;
    res.json({ message: generatedMessage });
  } catch (error) {
    console.error("Error en la API de OpenAI:", error);
    res.status(500).json({ message: "Error al generar la respuesta." });
  }
};

module.exports = { chat };
