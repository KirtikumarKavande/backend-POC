import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import fs from "fs";
function generateSignedUrl({ url, expiresIn = 300 }) {
    try {
        const privateKey = fs.readFileSync("../private_key.pem", "utf-8");
        const signedUrl = getSignedUrl({
            keyPairId: "KUMGY6POTU060",
            url,
            privateKey,
            dateLessThan: new Date(Date.now() + expiresIn * 1000),
        });

        return signedUrl;
    } catch (error) {
        console.error("Signed URL generation failed:", error);
        throw new Error("Failed to generate signed URL");
    }
}
const signedUrl = generateSignedUrl({ url: "https://d2np6arsr3em2x.cloudfront.net/rating1.png" })
console.log(signedUrl)
