import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);

// 🎯 LÍMITES GENEROSOS (gracias a Gemini)
const LIMITS = {
  MAX_MESSAGES_PER_SESSION: 30,    // 30 mensajes por sesión ✨
  MAX_INPUT_LENGTH: 1000,          // 1000 caracteres por mensaje
  RATE_LIMIT_WINDOW: 60000,        // 1 minuto
  MAX_REQUESTS_PER_MINUTE: 10,     // 10 requests por minuto
};

// Store en memoria para rate limiting
const requestTracker = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = requestTracker.get(ip) || [];
  
  const recentRequests = userRequests.filter(
    timestamp => now - timestamp < LIMITS.RATE_LIMIT_WINDOW
  );
  
  if (recentRequests.length >= LIMITS.MAX_REQUESTS_PER_MINUTE) {
    return false;
  }
  
  recentRequests.push(now);
  requestTracker.set(ip, recentRequests);
  
  return true;
}

// Limpiar tracker cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [ip, requests] of requestTracker.entries()) {
    const recentRequests = requests.filter(
      timestamp => now - timestamp < LIMITS.RATE_LIMIT_WINDOW
    );
    if (recentRequests.length === 0) {
      requestTracker.delete(ip);
    } else {
      requestTracker.set(ip, recentRequests);
    }
  }
}, 300000);

export async function POST({ request, clientAddress }) {
  try {
    // Rate Limiting
    const ip = clientAddress || 'unknown';
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({
        error: 'Límite de requests alcanzado',
        message: 'Por favor espera un momento antes de continuar. ⏱️'
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { messages } = await request.json();
    
    // Verificar límite de mensajes por sesión
    if (messages.length > LIMITS.MAX_MESSAGES_PER_SESSION) {
      return new Response(JSON.stringify({
        error: 'Sesión muy larga',
        message: 'Has alcanzado el límite de 30 mensajes por sesión. Por favor inicia una nueva conversación. 🔄'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verificar tamaño del último mensaje
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage.content.length > LIMITS.MAX_INPUT_LENGTH) {
      return new Response(JSON.stringify({
        error: 'Mensaje muy largo',
        message: `Por favor envía mensajes de máximo ${LIMITS.MAX_INPUT_LENGTH} caracteres. 📝`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Inicializar el modelo
    const model = genAI.getGenerativeModel({ 
      model: import.meta.env.GEMINI_MODEL || 'gemini-1.5-flash',
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

    // Convertir mensajes al formato de Gemini
    const chatHistory = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    });

    // Enviar el último mensaje
    const result = await chat.sendMessage(lastUserMessage.content);
    const response = await result.response;
    const text = response.text();

    // Log para monitoreo
    console.log(`[Gemini API] IP: ${ip}, Messages: ${messages.length}`);

    return new Response(JSON.stringify({
      content: text
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error);
    
    // Manejar errores específicos
    if (error.message?.includes('quota') || error.message?.includes('limit')) {
      return new Response(JSON.stringify({
        error: 'Límite de API alcanzado',
        message: 'El servicio ha alcanzado su límite temporalmente. Por favor intenta en unos minutos. 🕐'
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      error: 'Error al procesar la solicitud',
      message: 'Ocurrió un error. Por favor intenta nuevamente.',
      details: import.meta.env.DEV ? error.message : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}