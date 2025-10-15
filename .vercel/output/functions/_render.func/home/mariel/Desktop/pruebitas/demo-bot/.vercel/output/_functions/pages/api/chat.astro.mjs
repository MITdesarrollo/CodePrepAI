import { GoogleGenerativeAI } from '@google/generative-ai';
export { renderers } from '../../renderers.mjs';

const genAI = new GoogleGenerativeAI("AIzaSyD-rGPBQwNn7vI0PPe3GeRL1S-ZqEtDZ2Q");
const LIMITS = {
  MAX_MESSAGES_PER_SESSION: 30,
  // 30 mensajes por sesión ✨
  MAX_INPUT_LENGTH: 1e3,
  // 1000 caracteres por mensaje
  RATE_LIMIT_WINDOW: 6e4,
  // 1 minuto
  MAX_REQUESTS_PER_MINUTE: 10
  // 10 requests por minuto
};
const requestTracker = /* @__PURE__ */ new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = requestTracker.get(ip) || [];
  const recentRequests = userRequests.filter(
    (timestamp) => now - timestamp < LIMITS.RATE_LIMIT_WINDOW
  );
  if (recentRequests.length >= LIMITS.MAX_REQUESTS_PER_MINUTE) {
    return false;
  }
  recentRequests.push(now);
  requestTracker.set(ip, recentRequests);
  return true;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, requests] of requestTracker.entries()) {
    const recentRequests = requests.filter(
      (timestamp) => now - timestamp < LIMITS.RATE_LIMIT_WINDOW
    );
    if (recentRequests.length === 0) {
      requestTracker.delete(ip);
    } else {
      requestTracker.set(ip, recentRequests);
    }
  }
}, 3e5);
async function POST({ request, clientAddress }) {
  try {
    const ip = clientAddress || "unknown";
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({
        error: "Límite de requests alcanzado",
        message: "Por favor espera un momento antes de continuar. ⏱️"
      }), {
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { messages } = await request.json();
    if (messages.length > LIMITS.MAX_MESSAGES_PER_SESSION) {
      return new Response(JSON.stringify({
        error: "Sesión muy larga",
        message: "Has alcanzado el límite de 30 mensajes por sesión. Por favor inicia una nueva conversación. 🔄"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage.content.length > LIMITS.MAX_INPUT_LENGTH) {
      return new Response(JSON.stringify({
        error: "Mensaje muy largo",
        message: `Por favor envía mensajes de máximo ${LIMITS.MAX_INPUT_LENGTH} caracteres. 📝`
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Eres "CodePrep AI", un asistente experto en preparación para entrevistas técnicas de desarrollo frontend. 

Tu objetivo es ayudar a candidatos a prepararse para entrevistas laborales mediante:

1. Simulación de preguntas técnicas y conductuales
2. Análisis de respuestas con feedback constructivo y detallado
3. Sugerencias de mejora específicas y ejemplos prácticos
4. Estructuración de respuestas usando el método STAR

IMPORTANTE: 
- Sé profesional pero cercano
- Da feedback constructivo, nunca crítico
- Usa formato claro con emojis: ✅ (bien), ⚠️ (mejorar), 💡 (ejemplo)
- Proporciona ejemplos concretos y accionables
- Adapta las preguntas al stack tecnológico mencionado
- Si es el primer mensaje, pregunta para qué empresa/posición se prepara

METODOLOGÍA para feedback:
✅ QUÉ ESTUVO BIEN: [aspectos positivos específicos]
⚠️ PARA MEJORAR: [áreas de oportunidad concretas]
💡 RESPUESTA MEJORADA: [ejemplo estructurado y completo]
📚 RECURSOS: [si aplica, sugerir qué estudiar]`
    });
    const chatHistory = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7
      }
    });
    const result = await chat.sendMessage(lastUserMessage.content);
    const response = await result.response;
    const text = response.text();
    console.log(`[Gemini API] IP: ${ip}, Messages: ${messages.length}`);
    return new Response(JSON.stringify({
      content: text
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error:", error);
    if (error.message?.includes("quota") || error.message?.includes("limit")) {
      return new Response(JSON.stringify({
        error: "Límite de API alcanzado",
        message: "El servicio ha alcanzado su límite temporalmente. Por favor intenta en unos minutos. 🕐"
      }), {
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      error: "Error al procesar la solicitud",
      message: "Ocurrió un error. Por favor intenta nuevamente.",
      details: void 0
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
