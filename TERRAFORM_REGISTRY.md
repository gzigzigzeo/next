# Terraform Private Provider Registry

## How to run locally

Prerequisites:

1. `mkcert`
2. `nodejs`
3. `npx`

Run in a temporary folder:

```
mkcert -key-file key.pem -cert-file cert.pem example.com "*.example.com" example.test localhost 127.0.0.1 ::1
NODE_EXTRA_CA_CERTS="$(mkcert -CAROOT)/rootCA.pem" npx local-ssl-proxy --key key.pem --cert cert.pem --source 3001 --target 3000
```

Add the Teleport provider to your Terraform `required_providers`. For example, add the following to `main.tf`:

```
terraform {
  required_providers {
    teleport = {
      version = "8.0.0"
      source  = "localhost:3001/teleport/teleport"
    }
  }
}
```

## Initial setup

[[[...slug.ts]]](pages/api/teleport/teleport/[[...slug.ts]]) contains array of available Terraform provider versions and registry configuration:

```
const defaultGpgKey: GpgKey = {
  key_id: "3B149F1DE8E2212716AE40A5934BD7A74212B093",
  ascii_armor: `-----BEGIN PGP PUBLIC KEY BLOCK-----
-----END PGP PUBLIC KEY BLOCK-----`,
  trust_signature: "",
  source: "Gravitational",
  source_url: "http://gravitational.com/security",
};
```

1. Generate signing key. Please note that `ed25559` type is not supported by Terraform.

```
gpg --full-generate-key
```

2. Export generated public key:

```
gpg --armor --export 8C1D36D3B6BBF2B550C799FC62D1AA50C183C658 
```

where `8C1D36D3B6BBF2B550C799FC62D1AA50C183C658` is the new key id.

set `defaultGpgKey.key_id` and `defaultGpgKey.ascii_armor`.

## How to add the new release

[[[...slug.ts]]](pages/api/teleport/teleport/[[...slug.ts]]) contains array of available Terraform provider versions:

```
// v8.0.0
const v8_0_0: ReadonlyArray<Provider> = new Array<Provider>({
  version: "8.0.0",
  protocols: allProtocols,
  platforms: [
    {
      os: "darwin",
      arch: "arm64",
      filename: "terraform-provider-teleport-v8.0.0-darwin-arm64-bin.zip",
      download_url: "/terraform-provider-teleport-v8.0.0-darwin-arm64-bin.zip",
      shasum: "46eba550c06fa2453121475eb23a4cd8fa6d3ecd2b04506890461a56f79fd66e",
      shasums_url: "/terraform-provider-teleport-v8.0.0.sums",
      shasums_signature_url: "/terraform-provider-teleport-v8.0.0.sums.sig",
      signing_keys: defaultGpgKeys,
    },
  ],
});

// allVersions represents an array of all providers
const allVersions: ReadonlyArray<Provider> = new Array<Provider>(...v8_0_0);
```

1. Add the new element representing new provider version to this array.
2. Replace `download_url` and `filename` with the new provider archive URL (file must be `.zip`).
3. Calculate sha256 sum of the new provider:

```
shasum -a 256 terraform-provider-teleport-v8.0.0-darwin-arm64-bin.zip
```

will produce:

`c32a4ff69ac8c1ecaf9da5c2e61cdeb8d93a80bc76c34d6a0767383025cbf47b  terraform-provider-teleport-v8.0.0-darwin-arm64-bin.tar.gz`

Set `shasum` and add a new entry to the `public/terraform-provider-teleport-v8.0.0.sums` which is referenced in `shasums_url`.

4. Repeat the above for all platform and OSes.
5. Regenerate sum signature file: `public/terraform-provider-teleport-v8.0.0.sums.sig`:

```
gpg --detach-sign --default-key your@key public/terraform-provider-teleport-v8.0.0.sums
```

`default-key` must be the same as you used for initial configuration.