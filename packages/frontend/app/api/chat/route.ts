import { streamText } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { createChatTools } from '@/lib/ai-tools';

const provider = createOpenAICompatible({
  baseURL: process.env.AI_PROXY_URL?.replace('/chat/completions', '') || 'https://proxy.gestionturismo.xyz/v1',
  apiKey: process.env.AI_PROXY_KEY || '',
  name: 'micro-proxy',
});

const SYSTEM_PROMPT = `Sos el asesor de ContratoJusto, un servicio de ahorro laboral para trabajadores.

PERSONALIDAD:
- Sos calido y profesional, como un asesor financiero que genuinamente se preocupa.
- Hablas en castellano argentino (usa "vos", "tenes", "queres").
- Sos directo y claro. No usas jerga tecnica.

REGLAS ESTRICTAS:
- NUNCA digas "USDC", "Soroban", "blockchain", "smart contract", "Stellar", "token", "wallet", "XDR", "hash".
- Siempre decis "dolares" en lugar de "USDC".
- NUNCA uses emojis.
- NUNCA seas condescendiente.
- Si el usuario pregunta algo tecnico, responde en terminos simples: "tu ahorro esta guardado de forma segura".

HERRAMIENTAS:
- Usa consultarBalance cuando el usuario pregunta por su dinero, ahorro, o cuanto tiene.
- Usa consultarEstado cuando pregunta por el estado de su contrato.
- Usa prepararReclamo cuando quiere sacar su ahorro.
- Usa prepararDeposito cuando el empleador quiere depositar.

FORMATO:
- Respuestas cortas (maximo 3 oraciones).
- Cuando prepares una transaccion, explica cuanto dinero se mueve y pedi confirmacion.
- Siempre tranquiliza: "Tus fondos estan protegidos" cuando haya duda.`;

export async function POST(req: Request) {
  if (!process.env.AI_PROXY_KEY) {
    return new Response(
      JSON.stringify({ error: 'AI_PROXY_KEY no configurada. Consulta el README para setup.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const {
    messages: rawMessages,
    actorAddress,
    contractId = process.env.NEXT_PUBLIC_CONTRACT_ID || '',
  } = await req.json();
  const tools = createChatTools({ contractId, actorAddress });

  // Filter out tool-call messages from history - kimi can't handle them.
  // Keep only user and assistant text messages for context.
  const messages = rawMessages.filter((m: { role: string; toolInvocations?: unknown; tool_call_id?: string }) =>
    m.role === 'user' || (m.role === 'assistant' && !m.toolInvocations) || m.role === 'system'
  ).filter((m: { role: string; content?: string }) =>
    m.role !== 'assistant' || (m.content && m.content.trim() !== '')
  );

  const result = streamText({
    model: provider(process.env.AI_MODEL || 'kimi'),
    system: SYSTEM_PROMPT,
    messages,
    tools,
    maxSteps: 3,
  });

  const response = result.toDataStreamResponse();
  response.headers.set('Connection', 'close');
  return response;
}
