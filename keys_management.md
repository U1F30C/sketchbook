# Keys management

## Generate keys
Instructions for generating and managing cryptographic keys using OpenSSL. These keys are typically used for secure communication, signing, or encryption in various applications.

``` bash
openssl genrsa -out test_private_key.pem 2048

openssl req -new -x509 -key test_private_key.pem -out test_public_key.pem -subj '/CN=test_key_name'

openssl x509 -noout -fingerprint -sha1 -inform pem -in test_public_key.pem
```

**Generate a Private Key**:
The command openssl genrsa -out test_private_key.pem 2048 generates a 2048-bit RSA private key and saves it to a file named test_private_key.pem. This private key is used for signing or decrypting data.

**Generate a Public Key Certificate**:
The command openssl req -new -x509 -key test_private_key.pem -out test_public_key.pem -subj '/CN=test_key_name' creates a self-signed X.509 certificate using the private key. The certificate is saved as test_public_key.pem and includes a subject name (/CN=test_key_name).

**Verify the Public Key Fingerprint**:
The command openssl x509 -noout -fingerprint -sha1 -inform pem -in test_public_key.pem calculates and displays the SHA-1 fingerprint of the public key certificate. This fingerprint can be used to verify the integrity of the certificate.


## Convert PEM to JWK
This code converts a PEM-encoded public key into a JSON Web Key (JWK) format using the node-jose library.

Reads the PEM File: Loads the public key from test_public_key.pem.
Creates a Keystore: Manages cryptographic keys using jose.JWK.createKeyStore().
Converts to JWK: Adds the PEM key to the keystore and converts it into JWK format.

This process is essential for converting traditional PEM keys into a format compatible with modern web-based cryptographic standards.

``` ts
import jose from "node-jose";

import { readFileSync } from "fs";

// Create a keystore
const keystore = jose.JWK.createKeyStore();

const key = readFileSync("test_public_key.pem", "utf8");

// Generate an RSA key (2048-bit key size)
keystore.add(key, "pem").then(result => {
  // Convert to JWK format
  console.log(JSON.stringify(result.toJSON(), null, 2));
});

```


## Sign JWT
This code generates a signed JSON Web Token (JWT) using the jsonwebtoken library. It reads a private key, defines token parameters (issuer, audience, expiration, etc.), and signs the token using the RS384 algorithm. The resulting token is logged to the console for use in secure authentication or authorization workflows.

``` ts
// use jsonwebtoken to create a signed token
import jwt from "jsonwebtoken";
import { readFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";

const privateKey = readFileSync("test_private_key.pem", "utf8");


const clientID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

const audience = "https://myaudience.com/oauth2/token";

const tokenId = uuidv4();

const nowInSeconds = Math.floor(Date.now() / 1000);

// make sure to check your servers duration limit
const durationInSeconds = 60 * 4;

const token = jwt.sign(
  {
    iss: clientID,
    sub: clientID,
    aud: audience,
    jti: tokenId,
    iat: nowInSeconds,
    exp: nowInSeconds + durationInSeconds,
  },
  privateKey,
  { algorithm: "RS384" }
);

console.log(token);
```