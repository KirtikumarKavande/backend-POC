import { createClient } from "redis";
const client = createClient();
await client.connect();
const ans = await client.json.get("users:102",
    { path: '$..name' }
)


console.log(ans)
client.close()
