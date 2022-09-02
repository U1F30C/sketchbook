import crypto from "crypto";
import fs from "fs";

export class Signer {
  private async verifySignature(body: any, signatureOfBody: string) {
    const serializedBody = JSON.stringify(body);

    let pemKeyPath = "public.pem";
    let pemKeyFileContent = fs.readFileSync(pemKeyPath);
    let publicKey = crypto.createPublicKey({
      key: pemKeyFileContent,
      format: "pem",
    });
    const verifier = crypto.createVerify("RSA-SHA256");

    verifier.update(serializedBody, "utf8");

    const signatureBuf = Buffer.from(signatureOfBody, "base64");
    const signatureIsValid = verifier.verify(publicKey, signatureBuf);

    return signatureIsValid;
  }

  async sign(body: any) {
    const serializedBody = JSON.stringify(body);

    let pemKeyPath = "private.pem";
    let pemKeyFileContent = fs.readFileSync(pemKeyPath);
    let key = crypto.createPrivateKey({
      key: pemKeyFileContent,
      format: "pem",
    });
    let sign = crypto.createSign("RSA-SHA256");
    sign.update(serializedBody);
    let signature = sign.sign(key, "base64");

    return signature;
  }
}
