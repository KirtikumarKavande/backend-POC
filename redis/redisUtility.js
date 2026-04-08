import { createClient } from "redis";

export const redisClient = await createClient().connect();

redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
    process.exit(1)
})

export const SetJSON = async (key, value) => {
    const response = await redisClient.set(key, JSON.stringify(value))
    return response
};

export const GetJSON = async (key) => {
    const data = await redisClient.get(key)
    return JSON.parse(data)
};