import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
});

async function listBuckets() {
    try {
        const command = new ListBucketsCommand({});
        const response = await s3Client.send(command);

        return response.Buckets?.map(bucket => ({
            name: bucket.Name,
            createdAt: bucket.CreationDate,
        })) || [];

    } catch (error) {
        console.error("Error listing S3 buckets", {
            message: error.message,
            stack: error.stack,
        });

        throw new Error("Failed to list S3 buckets");
    }
}
listBuckets().then((ans) => { console.log(ans) })