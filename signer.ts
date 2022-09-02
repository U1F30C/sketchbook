import crypto from 'crypto';
import fs from 'fs';

export class PaymentValidationController {
  private async verifySignature(
    body: any,
    signatureSignedByPrivateKey: string,
  ) {
    const serializedBody = JSON.stringify(body);

    let publicKeyPath = 'public.pem';
    let pem = fs.readFileSync(publicKeyPath);
    let publicKey = crypto.createPublicKey({
      key: pem,
      format: 'pem',
    });
    const verifier = crypto.createVerify('RSA-SHA256');

    verifier.update(serializedBody, 'utf8');

    const signatureBuf = Buffer.from(signatureSignedByPrivateKey, 'base64');
    const signatureIsValid = verifier.verify(publicKey, signatureBuf);

    return signatureIsValid;
  }

  async sign(body: any) {
    const serializedBody = JSON.stringify(body);

    let privateKeyPath = 'private.pem';
    let privatePem = fs.readFileSync(privateKeyPath);
    let key = crypto.createPrivateKey({
      key: privatePem,
      format: 'pem',
    });
    let sign = crypto.createSign('RSA-SHA256');
    sign.update(serializedBody);
    let signature = sign.sign(key, 'base64');

    return signature;
  }
}