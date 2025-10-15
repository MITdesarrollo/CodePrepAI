# 🤝 Guía para Contribuir al Vault de Preguntas

Gracias por querer ayudar a la comunidad compartiendo tu experiencia de entrevistas. Esta guía te explica cómo contribuir preguntas al vault de CodePrep AI.

## 📝 Dos formas de contribuir

### 1. Google Form (Más fácil)

La forma más rápida si no estás familiarizada/o con Git:

1. Andá a [la página de contribuciones](/contribuir)
2. Completá el formulario con tu pregunta
3. Yo me encargo de agregar tu pregunta al vault

### 2. Pull Request directo (Para devs)

Si sabés de Git y querés contribuir directamente:

#### Paso 1: Fork y Clone

```bash
# Fork el repo en GitHub
# Luego cloná tu fork
git clone https://github.com/TU_USUARIO/demo-bot.git
cd demo-bot
```

#### Paso 2: Crear una rama

```bash
git checkout -b agregar-pregunta-nombre-empresa
```

#### Paso 3: Editar el JSON

Abrí `public/data/preguntas.json` y agregá tu pregunta siguiendo este formato:

```json
{
  "id": "empresa-###",
  "pregunta": "Tu pregunta acá",
  "tipo": "técnica|conductual|system-design|coding-challenge",
  "categoria": "Categoria (ej: React, Soft Skills, Arquitectura)",
  "empresa": "Nombre de la Empresa",
  "stack": ["Tecnología1", "Tecnología2"],
  "nivel": "Junior|Semi-Senior|Senior|Lead/Staff",
  "pais": "País donde fue la entrevista",
  "tips": "Consejos para responder esta pregunta",
  "red_flags": "Cosas que NO hacer al responder"
}
```

**Ejemplo real:**

```json
{
  "id": "meli-003",
  "pregunta": "¿Cómo implementarías un sistema de caché para una API de productos?",
  "tipo": "técnica",
  "categoria": "Backend",
  "empresa": "Mercado Libre",
  "stack": ["Node.js", "Redis", "REST API"],
  "nivel": "Semi-Senior",
  "pais": "Argentina",
  "tips": "Mencioná TTL, invalidación, estrategias de cache (LRU, etc), casos edge",
  "red_flags": "No olvidar el cache invalidation ni los casos de productos sin stock"
}
```

#### Paso 4: Actualizar metadata

En el mismo archivo `preguntas.json`, actualizá la sección `metadata`:

- Incrementá `total_preguntas` en 1
- Actualizá `ultima_actualizacion` con la fecha de hoy (formato: "YYYY-MM-DD")
- Agregá tu nombre en `contribuidores`:

```json
{
  "nombre": "Tu Nombre",
  "tipo": "Contribuidor",
  "fecha": "2025-01-15"
}
```

- Actualizá las estadísticas si corresponde (por tipo de pregunta, empresas únicas, etc.)

#### Paso 5: Commit y Push

```bash
git add public/data/preguntas.json
git commit -m "feat: agregar pregunta de [Empresa] sobre [tema]"
git push origin agregar-pregunta-nombre-empresa
```

#### Paso 6: Crear Pull Request

1. Andá a tu fork en GitHub
2. Click en "Compare & pull request"
3. Describí la pregunta que agregaste
4. Enviá el PR

## ✅ Lineamientos de calidad

### Qué tipo de preguntas SÍ agregar:

- ✅ Preguntas reales de entrevistas que te hicieron
- ✅ Preguntas técnicas específicas y concretas
- ✅ Preguntas conductuales comunes en tech
- ✅ Coding challenges que te dieron
- ✅ Preguntas de system design o arquitectura

### Qué NO agregar:

- ❌ Preguntas inventadas o que nunca te hicieron
- ❌ Información confidencial o NDA de empresas
- ❌ Preguntas demasiado genéricas ("hablame de vos")
- ❌ Datos personales tuyos o de entrevistadores
- ❌ Preguntas ofensivas o inapropiadas

## 📋 Checklist antes de enviar tu PR

- [ ] El `id` es único y sigue el formato `empresa-###`
- [ ] La pregunta está completa y es clara
- [ ] El `tipo` es uno de los valores válidos
- [ ] Agregaste `stack` si es técnica
- [ ] Incluiste `tips` útiles para responderla
- [ ] Incluiste `red_flags` si aplica
- [ ] Actualizaste `total_preguntas` en metadata
- [ ] Actualizaste `ultima_actualizacion` en metadata
- [ ] Te agregaste en `contribuidores`
- [ ] Actualizaste las `estadisticas` si corresponde
- [ ] El JSON es válido (sin errores de sintaxis)

## 🎯 Tips para escribir buenas preguntas

### Pregunta

- Sé específica/o: "¿Cómo optimizarías renders en React?" es mejor que "¿Qué sabés de React?"
- Escribí la pregunta textual como te la hicieron
- Si era en inglés pero querés traducirla, está bien

### Tips

- Mencioná conceptos clave que deberías tocar en la respuesta
- Dá ejemplos de qué tipo de respuesta esperan
- Si hay frameworks tipo STAR que apliquen, mencionalo

### Red Flags

- ¿Qué NO hacer al responder?
- ¿Qué respuestas automáticamente te descalifican?
- ¿Qué errores comunes hay que evitar?

## 🤔 ¿Dudas?

- Abrí un [Issue en GitHub](https://github.com/MITdesarrollo/demo-bot/issues)
- Escribime a: contacto@mariel-torres.website

## 🙏 Gracias

Cada pregunta que agregás ayuda a que alguien más llegue mejor preparada/o a su entrevista. Eso es enorme. Gracias por contribuir. 💜
