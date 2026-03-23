import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
});

export async function getUploadPresignedUrl({
    bucket,
    Key,
    expiresIn = 300,
}) {
    try {

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: Key,
        });

        const url = await getSignedUrl(s3Client, command, {
            expiresIn,
        });

        return {
            url,
        };
    } catch (error) {
        console.error("Error generating presigned URL", {
            message: error.message,
            stack: error.stack,
        });

        throw new Error("Failed to generate upload URL");
    }
}

getUploadPresignedUrl({
    bucket: "kirtiprivatebucket",
    Key: "mysecond image",
}).then((url) => {
    console.log(url)
})