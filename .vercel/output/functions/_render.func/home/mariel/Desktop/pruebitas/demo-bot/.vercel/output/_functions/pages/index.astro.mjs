import { c as createComponent, a as createAstro, b as addAttribute, r as renderHead, e as renderSlot, f as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CEWY_R4y.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
import React, { useState, useRef, useEffect } from 'react';
import { Brain, RefreshCw, X, AlertCircle, Send, MessageCircle, Sparkles, Heart, Target, Zap, BarChart, TrendingUp, CheckCircle } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="CodePrep AI - Asistente de IA para preparar entrevistas técnicas"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/mariel/Desktop/pruebitas/demo-bot/src/layouts/Layout.astro", void 0);

const MAX_MESSAGES = 30;
function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (messages.length >= MAX_MESSAGES - 5) {
      setShowWarning(true);
    }
  }, [messages.length]);
  useEffect(() => {
    const handleOpenChat = () => {
      startChat();
    };
    window.addEventListener("openChat", handleOpenChat);
    return () => {
      window.removeEventListener("openChat", handleOpenChat);
    };
  }, []);
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    if (messages.length >= MAX_MESSAGES) {
      const limitMessage = {
        role: "assistant",
        content: '⚠️ Has alcanzado el límite de 30 mensajes por sesión. Por favor, inicia una nueva conversación haciendo clic en "🔄 Reiniciar". ¡Gracias! 😊',
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, limitMessage]);
      return;
    }
    if (inputValue.length > 1e3) {
      alert("Por favor envía mensajes de máximo 1000 caracteres.");
      return;
    }
    const userMessage = {
      role: "user",
      content: inputValue,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    try {
      const apiMessages = messages.concat(userMessage).map((msg) => ({
        role: msg.role,
        content: msg.content
      }));
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: apiMessages })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error en la respuesta");
      }
      const botMessage = {
        role: "assistant",
        content: data.content,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: error.message || "Lo siento, hubo un error. Por favor, intenta de nuevo en unos momentos.",
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  const startChat = () => {
    setIsChatOpen(true);
    if (messages.length === 0) {
      const welcomeMessage = {
        role: "assistant",
        content: "¡Hola! Soy CodePrep AI 🚀\n\n¿Para qué empresa o posición te estás preparando? Contame todo lo que puedas: stack, tipo de rol, lo que sea. Mientras más info, mejor puedo ayudarte.\n\n💡 Tip: Tenés hasta 30 mensajes por sesión para practicar tranqui.",
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages([welcomeMessage]);
    }
  };
  const resetChat = () => {
    setMessages([]);
    setShowWarning(false);
    startChat();
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, isChatOpen && /* @__PURE__ */ React.createElement("div", { className: "fixed bottom-6 right-6 w-96 h-[600px] bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 flex flex-col z-50 max-w-[calc(100vw-3rem)]" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-t-2xl" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 bg-white/20 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Brain, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold" }, "CodePrep AI"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-white/80" }, "Powered by Gemini AI and Claude"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: resetChat,
      className: "hover:bg-white/20 p-2 rounded-lg transition-colors",
      title: "Reiniciar conversación"
    },
    /* @__PURE__ */ React.createElement(RefreshCw, { className: "w-4 h-4" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsChatOpen(false),
      className: "hover:bg-white/20 p-2 rounded-lg transition-colors"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs text-white/70" }, /* @__PURE__ */ React.createElement("span", null, "Mensajes: ", messages.length, "/", MAX_MESSAGES), showWarning && /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1 text-yellow-300" }, /* @__PURE__ */ React.createElement(AlertCircle, { className: "w-3 h-3" }), "Cerca del límite"))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto p-4 space-y-4" }, messages.map((message, index) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: index,
      className: `flex ${message.role === "user" ? "justify-end" : "justify-start"}`
    },
    /* @__PURE__ */ React.createElement("div", { className: `max-w-[80%] ${message.role === "user" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "bg-slate-800 text-slate-200"} rounded-2xl px-4 py-3` }, /* @__PURE__ */ React.createElement("p", { className: "text-sm whitespace-pre-line" }, message.content), /* @__PURE__ */ React.createElement("p", { className: "text-xs opacity-70 mt-1" }, message.timestamp))
  )), isTyping && /* @__PURE__ */ React.createElement("div", { className: "flex justify-start" }, /* @__PURE__ */ React.createElement("div", { className: "bg-slate-800 rounded-2xl px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 bg-purple-400 rounded-full animate-bounce", style: { animationDelay: "0ms" } }), /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 bg-purple-400 rounded-full animate-bounce", style: { animationDelay: "150ms" } }), /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 bg-purple-400 rounded-full animate-bounce", style: { animationDelay: "300ms" } })))), /* @__PURE__ */ React.createElement("div", { ref: messagesEndRef })), /* @__PURE__ */ React.createElement("div", { className: "p-4 border-t border-purple-500/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: inputValue,
      onChange: (e) => setInputValue(e.target.value),
      onKeyPress: (e) => e.key === "Enter" && handleSendMessage(),
      placeholder: "Escribe tu mensaje... (máx 1000 caracteres)",
      maxLength: 1e3,
      disabled: messages.length >= MAX_MESSAGES,
      className: "flex-1 bg-slate-800 border border-purple-500/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-slate-500 disabled:opacity-50"
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleSendMessage,
      disabled: messages.length >= MAX_MESSAGES,
      className: "bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    },
    /* @__PURE__ */ React.createElement(Send, { className: "w-5 h-5" })
  )), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-2 text-center" }, inputValue.length, "/1000 caracteres"))), !isChatOpen && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: startChat,
      className: "fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl shadow-purple-500/50 flex items-center justify-center hover:scale-110 transition-transform z-50"
    },
    /* @__PURE__ */ React.createElement(MessageCircle, { className: "w-8 h-8" })
  ));
}

function StartChatButton({ text = "Probar ahora", large = false }) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("openChat"));
  };
  const sizeClasses = large ? "px-12 py-5 text-xl" : "px-8 py-4 text-lg";
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleClick,
      className: `bg-gradient-to-r from-purple-600 to-blue-600 ${sizeClasses} rounded-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all font-semibold flex items-center justify-center gap-2 cursor-pointer`
    },
    /* @__PURE__ */ React.createElement(MessageCircle, { className: "w-5 h-5" }),
    text
  );
}

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "CodePrep AI - Practica tus entrevistas t\xE9cnicas" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white"> <!-- Navigation --> <nav class="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-purple-500/20 z-40"> <div class="max-w-7xl mx-auto px-6 py-4"> <div class="flex items-center justify-between"> <div class="flex items-center gap-2"> <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center"> ${renderComponent($$result2, "Brain", Brain, { "class": "w-6 h-6" })} </div> <span class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
CodePrep AI
</span> </div> <div class="hidden md:flex items-center gap-8"> <a href="#sobre-esto" class="hover:text-purple-400 transition-colors">Sobre esto</a> <a href="#como-funciona" class="hover:text-purple-400 transition-colors">Cómo funciona</a> <a href="#por-que" class="hover:text-purple-400 transition-colors">Por qué lo hice</a> </div> </div> </div> </nav> <!-- Hero Section --> <section class="pt-32 pb-20 px-6"> <div class="max-w-7xl mx-auto"> <div class="grid md:grid-cols-2 gap-12 items-center"> <div> <div class="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6"> ${renderComponent($$result2, "Sparkles", Sparkles, { "class": "w-4 h-4 text-purple-400" })} <span class="text-sm text-purple-300">Proyecto de aprendizaje + IA</span> </div> <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
Practica tus
<span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> entrevistas técnicas </span>
sin presión
</h1> <p class="text-xl text-slate-300 mb-6">
Esto nació de una clase de IA y de acordarme lo perdida que me sentía preparando mis primeras entrevistas. ¿Qué repaso? ¿Cómo respondo esa pregunta trampa? ¿Estoy lista?
</p> <p class="text-lg text-slate-400 mb-8">
Entonces hice esto: un bot que te hace preguntas técnicas y conductuales, te da feedback real, y te ayuda a estructurar mejores respuestas. No es perfecto, pero es gratis y ojalá te sirva.
</p> <div class="flex flex-col sm:flex-row gap-4"> ${renderComponent($$result2, "StartChatButton", StartChatButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/mariel/Desktop/pruebitas/demo-bot/src/components/StartChatButton.jsx", "client:component-export": "default" })} </div> <div class="mt-12 flex items-center gap-8"> <div> <div class="text-3xl font-bold text-purple-400">100%</div> <div class="text-sm text-slate-400">Gratis</div> </div> <div> <div class="text-3xl font-bold text-blue-400">Open</div> <div class="text-sm text-slate-400">Para la comunidad</div> </div> <div> <div class="text-3xl font-bold text-purple-400"> ${renderComponent($$result2, "Heart", Heart, { "class": "w-8 h-8 inline-block" })} </div> <div class="text-sm text-slate-400">Hecho con amor</div> </div> </div> </div> <div class="relative"> <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl"></div> <div class="relative bg-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 shadow-2xl"> <div class="flex items-center gap-2 mb-6"> <div class="w-3 h-3 rounded-full bg-red-500"></div> <div class="w-3 h-3 rounded-full bg-yellow-500"></div> <div class="w-3 h-3 rounded-full bg-green-500"></div> </div> <div class="space-y-4"> <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4"> <div class="flex items-start gap-3"> <div class="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0"> ${renderComponent($$result2, "Brain", Brain, { "class": "w-5 h-5" })} </div> <div class="flex-1"> <p class="text-sm text-slate-300">
¿Cuál es la diferencia entre SSR y SSG en Next.js?
</p> </div> </div> </div> <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4"> <div class="flex items-start gap-3"> <div class="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0"> <span class="text-sm">👤</span> </div> <div class="flex-1"> <p class="text-sm text-slate-300">
SSR renderiza en cada request, SSG en build time...
</p> </div> </div> </div> <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4"> <div class="flex items-start gap-3"> <div class="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0"> ${renderComponent($$result2, "Brain", Brain, { "class": "w-5 h-5" })} </div> <div class="flex-1"> <p class="text-sm text-slate-300">
✅ Bien! Ahora agregá un ejemplo de tu experiencia...
</p> </div> </div> </div> </div> </div> </div> </div> </div> </section> <!-- Sobre esto Section --> <section id="sobre-esto" class="py-20 px-6 bg-slate-900/50"> <div class="max-w-7xl mx-auto"> <div class="text-center mb-16"> <h2 class="text-4xl font-bold mb-4">Qué hace esto (y qué no)</h2> <p class="text-xl text-slate-400">Seamos honestos sobre lo que es</p> </div> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8"> <div class="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all"> <div class="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center mb-4 text-purple-400"> ${renderComponent($$result2, "Target", Target, { "class": "w-8 h-8" })} </div> <h3 class="text-xl font-semibold mb-2">Preguntas adaptadas</h3> <p class="text-slate-400">El bot se adapta a lo que le cuentes sobre la posición. React, Next, Vue, lo que sea.</p> </div> <div class="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all"> <div class="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center mb-4 text-purple-400"> ${renderComponent($$result2, "Zap", Zap, { "class": "w-8 h-8" })} </div> <h3 class="text-xl font-semibold mb-2">Feedback al toque</h3> <p class="text-slate-400">Te dice qué estuvo bien, qué podés mejorar, y te da un ejemplo de cómo decirlo mejor.</p> </div> <div class="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all"> <div class="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center mb-4 text-purple-400"> ${renderComponent($$result2, "BarChart", BarChart, { "class": "w-8 h-8" })} </div> <h3 class="text-xl font-semibold mb-2">Método STAR</h3> <p class="text-slate-400">Para esas preguntas de "contame una vez que..." te ayuda a estructurar la respuesta.</p> </div> <div class="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all"> <div class="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center mb-4 text-purple-400"> ${renderComponent($$result2, "TrendingUp", TrendingUp, { "class": "w-8 h-8" })} </div> <h3 class="text-xl font-semibold mb-2">Practica sin miedo</h3> <p class="text-slate-400">No hay nadie del otro lado juzgándote. Equivocate mil veces, nadie se entera.</p> </div> </div> </div> </section> <!-- Cómo funciona Section --> <section id="como-funciona" class="py-20 px-6"> <div class="max-w-5xl mx-auto"> <div class="text-center mb-16"> <h2 class="text-4xl font-bold mb-4">Cómo funciona esto</h2> <p class="text-xl text-slate-400">Es re simple</p> </div> <div class="space-y-8"> <div class="flex gap-8 items-start group"> <div class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
01
</div> <div class="flex-1 pt-2"> <h3 class="text-2xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">Contale al bot para qué te preparás</h3> <p class="text-slate-400 text-lg">Empresa, posición, stack que piden. Mientras más info, mejor se adapta.</p> </div> </div> <div class="flex gap-8 items-start group"> <div class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
02
</div> <div class="flex-1 pt-2"> <h3 class="text-2xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">Elegí qué querés practicar</h3> <p class="text-slate-400 text-lg">Preguntas técnicas tipo "explícame hooks", o conductuales tipo "contame de un bug complicado que resolviste".</p> </div> </div> <div class="flex gap-8 items-start group"> <div class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
03
</div> <div class="flex-1 pt-2"> <h3 class="text-2xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">Respondé y recibí feedback</h3> <p class="text-slate-400 text-lg">El bot te dice qué sumó puntos en tu respuesta y qué podrías mejorar. Con ejemplos concretos.</p> </div> </div> <div class="flex gap-8 items-start group"> <div class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
04
</div> <div class="flex-1 pt-2"> <h3 class="text-2xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">Repetí hasta sentirte segura/o</h3> <p class="text-slate-400 text-lg">Podés reiniciar y probar distintas respuestas. La idea es que llegues a la entrevista real sintiendo que ya lo hiciste mil veces.</p> </div> </div> </div> </div> </section> <!-- Por qué lo hice Section --> <section id="por-que" class="py-20 px-6 bg-slate-900/50"> <div class="max-w-4xl mx-auto"> <div class="text-center mb-12"> <h2 class="text-4xl font-bold mb-4">Por qué hice esto</h2> <p class="text-xl text-slate-400">La historia real</p> </div> <div class="bg-slate-800/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 space-y-6 text-slate-300 text-lg leading-relaxed"> <p>
Estoy haciendo un curso de IA y una de las consignas era crear algo útil con lo que aprendimos. Automáticamente me acordé de cuando estaba buscando mi primer laburo como dev.
</p> <p>
Me la pasaba googleando "preguntas típicas de entrevista React", practicando sola adelante de la computadora, grabándome con el celu para ver si sonaba convincente. Era un montón. Y ni hablar de esas preguntas conductuales tipo "contame de un conflicto con un compañero"... ¿cómo se responde eso sin sonar falsa?
</p> <p>
Entonces pensé: che, si ahora tengo acceso a APIs de IA que pueden simular un entrevistador, ¿por qué no hacer algo que me hubiera re servido en ese momento?
</p> <p>
No es un producto. Es más bien una herramienta que hice aprendiendo, para compartir con gente que está en la misma. Si te sirve, genial. Si le encontrás bugs o querés sugerir mejoras, también genial. El código está en GitHub.
</p> <p class="text-purple-300 font-semibold">
— Mariel
</p> </div> <div class="mt-12 grid md:grid-cols-3 gap-6"> <div class="flex items-center gap-3 bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-lg p-4"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "class": "w-6 h-6 text-green-400 flex-shrink-0" })} <span class="text-slate-300">Gratis y va a seguir siéndolo</span> </div> <div class="flex items-center gap-3 bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-lg p-4"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "class": "w-6 h-6 text-green-400 flex-shrink-0" })} <span class="text-slate-300">Open source en GitHub</span> </div> <div class="flex items-center gap-3 bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-lg p-4"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "class": "w-6 h-6 text-green-400 flex-shrink-0" })} <span class="text-slate-300">Hecho con Astro + Gemini AI</span> </div> </div> </div> </section> <!-- CTA Section --> <section class="py-20 px-6"> <div class="max-w-4xl mx-auto text-center"> <div class="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-12"> <h2 class="text-4xl font-bold mb-6">Dale, probalo</h2> <p class="text-xl text-slate-300 mb-8">
Es gratis, no hace falta registrarse, y podés practicar las veces que quieras. Ojalá te sirva tanto como me hubiera servido a mí.
</p> <div class="flex justify-center"> ${renderComponent($$result2, "StartChatButton", StartChatButton, { "text": "Empezar a practicar", "large": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/mariel/Desktop/pruebitas/demo-bot/src/components/StartChatButton.jsx", "client:component-export": "default" })} </div> </div> </div> </section> <!-- Footer --> <footer class="border-t border-purple-500/20 py-8 px-6"> <div class="max-w-7xl mx-auto"> <div class="text-center text-slate-400 space-y-3"> <p class="text-sm text-purple-300">
🔌 Este bot puede usar Claude, Gemini, OpenAI o cualquier LLM. Actualmente usa <strong>Google Gemini</strong> porque el tier gratuito es más generoso.
</p> <p>
Hecho con 💜 por <a href="https://www.mariel-torres.website" target="_blank" class="text-purple-400 hover:text-purple-300 transition-colors">Mariel Torres</a> </p> <p class="text-sm">
• 2025 •
</p> <p class="text-xs text-slate-500 mt-4">
El código está en <a href="https://github.com/MITdesarrollo/demo-bot" target="_blank" class="text-purple-400 hover:text-purple-300 transition-colors">GitHub</a> por si querés chusmear cómo está hecho
</p> </div> </div> </footer> <!-- ChatBot Component --> ${renderComponent($$result2, "ChatBot", ChatBot, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/mariel/Desktop/pruebitas/demo-bot/src/components/ChatBot.jsx", "client:component-export": "default" })} </div> ` })}`;
}, "/home/mariel/Desktop/pruebitas/demo-bot/src/pages/index.astro", void 0);

const $$file = "/home/mariel/Desktop/pruebitas/demo-bot/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
