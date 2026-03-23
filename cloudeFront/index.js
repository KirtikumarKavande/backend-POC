import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import crypto from "crypto";

const cloudFrontClient = new CloudFrontClient({
});
 async function invalidateCloudFrontCache({ distributionId, paths }) {


  const normalizedPaths = paths.map((p) =>
    p.startsWith("/") ? p : `/${p}`
  );

  const command = new CreateInvalidationCommand({
    DistributionId: distributionId,
    InvalidationBatch: {
      CallerReference: `${Date.now()}-${crypto.randomUUID()}`, 
      Paths: {
        Quantity: normalizedPaths.length,
        Items: normalizedPaths,
      },
    },
  });

  try {
    const response = await cloudFrontClient.send(command);
    console.log("done with invalidation")
    return {
      invalidationId: response.Invalidation?.Id,
      status: response.Invalidation?.Status,
      createTime: response.Invalidation?.CreateTime,
    };
  } catch (error) {
    console.error("CloudFront Invalidation Error:", error);
  }
}

invalidateCloudFrontCache({distributionId:"E38DCIYVF2JSDP",paths:["/h2%20mobile%20new.png"]})