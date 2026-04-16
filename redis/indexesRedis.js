import { createClient } from "redis";
const redis = createClient();
await redis.connect();
// await redis.ft.create(
//     "userIdx", // index name
//     {
//         "$.name": {
//             type: "TAG",
//             AS: "name",
//         },
        
//     },
//     {
//         ON: "JSON",
//         PREFIX: "users:",
//     }
// );

    const result = await redis.ft.search("userIdx", "@name:{kumar}");
    console.dir(result)
    result.documents.forEach((data)=>{
        console.log("🚀 ~ data:", data.value)
    })
// OR - multiple cities
redis.close()



