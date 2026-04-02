import { generateText } from "ai";
import { createZhipu } from 'zhipu-ai-provider';

const apiKey = process.env.ZHIPU_API_KEY

const zhipu = createZhipu({
  // baseURL: "https://open.bigmodel.cn/api/paas/v4",
  // baseURL: "https://api.z.ai/api/coding/paas/v4",
  baseURL: "http://localhost:8081/api/coding/paas/v4",
  apiKey
});

const { text } = await generateText({
  model: zhipu("glm-4.5"),
  prompt: "Tell me a dad joke",
});

console.log(text);
