import type { NextApiRequest, NextApiResponse } from "next";

type Protocol = "4.0" | "5.1"; // Terraform protocol
type OS = "linux" | "darwin" | "linux" | "windows"; // Available OS signatures
type Arch = "arm64" | "amd64" | "x86_64"; // Available arch signatures

// Represents os + arch
type OSArch = {
  os: OS;
  arch: Arch;
};

// Represents provider version
type Provider = {
  version: string;
  protocols: ReadonlyArray<string>;
  platforms: ReadonlyArray<Platform | OSArch>;
};

// Represents provider version for a specific platform
type Platform = OSArch & {
  filename: string;
  download_url: string;
  shasum: string;
  shasums_url: string;
  shasums_signature_url: string;
  signing_keys: {
    gpg_public_keys: ReadonlyArray<GpgKey>;
  };
};

// GpgKey represents signing information for a provider file
type GpgKey = {
  key_id: string;
  ascii_armor: string;
  trust_signature: string;
  source: string;
  source_url: string;
};

// allProtocols contains all available Terraform protocols. Currently this means that provider will
// work with all Terraform versions. It might change after the Terraform Provider Framework version gets released.
const allProtocols: ReadonlyArray<Protocol> = ["4.0", "5.1"];

// Default GPG key used for signing sum file
const defaultGpgKey: GpgKey = {
  key_id: "3B149F1DE8E2212716AE40A5934BD7A74212B093",
  ascii_armor: `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQINBGGWsnQBEAC3zrM6Nz+Gv1jbODg1zzTrU6MpXpU4eiRkPKj/mnLln+HANnfD
DeEGhFhVkI6xbSi9v8Py/xDJnvIzyEcFgZ+dahS1bwecU1gFd+OYrQKB8V+fg14V
swugkVQC5AmJsrxun8mxfEEnM3W9Om4xxJSjd/sozNvlVtCL9FXo/0fsluVHPXlS
Qj7/VeI6MfYud6GLw8hipynehnmPf7/xY8RCaBz9UWYTzii4mOolVczg5aTShTw5
npd3pekZuQlBaxe6se9ky5XmObfsUnZkJgyMttg7cmqSYGUpmtB28gQPzadYVuvj
L8Q8HSKK4vplEYGQScU6IlCbUrYPr8xbIQtAWt5etkvC1f0tFZhLWlp1APpEbetL
GFrPO4GCgk3hqTnCCDcLmCXEPv4eRPLyXgXEwqBAPUGud/plF4+O9noF2Ns9MjRZ
pEuHeCyBAK85IZFtSZvotq+rfeP6VZxZJmG4QmKoAEDP3rYHFRgvQqFb3gmEFR/E
JIW5Lx5dKDM7LRqwi6yBO8UcCtaJ0XxIpAojGqZrdOYJZ7moFh0fWjLJmvF9p7JF
9LBQsVe1bvmb3ZTgKujGCyPpxUOUJ1OuWpNkI9IVXtrk8YFp9hogUyxw3rnjPqeH
2blu1Ta3SxxZIiLSM9ml03x2NNFUMuxitV2lNQbJPce+9wtmIjyB76en9wARAQAB
tCVWSWt0b3IgU29rb2xvdiA8Z3ppZ3ppZ3plb0BnbWFpbC5jb20+iQJSBBMBCAA8
FiEEOxSfHejiIScWrkClk0vXp0ISsJMFAmGWsnQCGwMFCwkIBwIDIgIBBhUKCQgL
AgQWAgMBAh4HAheAAAoJEJNL16dCErCTV9sP/1U+dUo9i3wVMyuYJqEmF2Sa5l2O
Rgs620KRixfIW4iZt0ABIClyLdGgP2PWz+a4Wph8yWaEyasn4SOiFRwk6pAdpJuj
6NzsRI8+UUyUqPThdOEdPKQheecn/ZjleqirixD69ZX1dk4jVwoW73qaj8iLDF/b
e6yf4VozcPCEl6qyZS/XPBpdt8m4r+kYCoMTfHaWDvVbnxmfXvyfwDjT1brkoHjn
KRmcEwsM8AR5ThvUzpHm/aH/bUXeu4QbuTyJj9ijOeC0deTrMq3NWtsHn1S1idhX
1W3pBEPbwGktiVbInCzB+vWInKTOEJs5fpIFqHd3fIHwM7qIWHnvmjfOg0igTQ5G
qY+tjfc+bSShO/W0DnI11Sw7bcJoNOfdRRQq7eAf7Vl2X9LKErfOzH7tBOkBSfE5
S1mrPjc4nm8sYWsaLZd8lYP6U60Cno+/0lZ2fPi3j5R7/5G4PsMPJyl62WOPw3NG
eqUEpMXxFRXHrhrSGXnAfS7d7byCwyLxh+SvUyasy/0DX2J4aU2TJOIgvERvToHF
dYNTbpIrDM6a7UtMCXYHXHeUqjYzePNfAnP9T79U6DKtJ43oxMcDf+Z/TW0HSSAY
Uiz/LHKW/C6wz0lu8qGSH2Hlc0OcndZxL31l32ixpY0ElqvSHFftgZ5mNcujy/Z8
rOL+OEsRFMqNnArX
=LrpJ
-----END PGP PUBLIC KEY BLOCK-----`,
  trust_signature: "",
  source: "Gravitational",
  source_url: "http://gravitational.com/security",
};

// Default GPG keys
const defaultGpgKeys = {
  gpg_public_keys: [defaultGpgKey],
};

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
      shasum:
        "46eba550c06fa2453121475eb23a4cd8fa6d3ecd2b04506890461a56f79fd66e",
      shasums_url: "/terraform-provider-teleport-v8.0.0.sums",
      shasums_signature_url: "/terraform-provider-teleport-v8.0.0.sums.sig",
      signing_keys: defaultGpgKeys,
    },
  ],
});

// allVersions represents an array of all providers
const allVersions: ReadonlyArray<Provider> = new Array<Provider>(...v8_0_0);

const slugVersions = "versions"; // Versions slug
const slugDownload = "download"; // Download slug

// Terraform registry API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query["slug"];

  if (slug[0] == slugVersions && slug.length == 1) {
    return await handleVersions(req, res);
  }

  if (slug[1] == slugDownload && slug.length == 4) {
    return await handleDownload(req, res);
  }

  res.status(404).json("Not found");
}

// Returns /versions response
async function handleVersions(req: NextApiRequest, res: NextApiResponse) {
  // Strip non-required specifics
  const v = allVersions.map<Provider>((provider: Provider): Provider => {
    return <Provider>{
      version: provider.version,
      protocols: provider.protocols,
      platforms: provider.platforms.map<OSArch>(
        (pl: Platform): OSArch => ({ os: pl.os, arch: pl.arch })
      ),
    };
  });

  return res.status(200).json({ versions: v });
}

// Returns /download response
async function handleDownload(req: NextApiRequest, res: NextApiResponse) {
  const version = req.query["slug"][0];
  const os = req.query["slug"][2];
  const arch = req.query["slug"][3];

  // Find desired provider
  const provider = allVersions.find(
    (provider: Provider): Provider =>
      provider.version == version ? provider : undefined
  );

  if (!provider) {
    return res.status(404).json(`Provider version ${version} not found!`);
  }

  // Find desired platform
  const platform = provider.platforms.find((pl: Platform) =>
    pl.os == os && pl.arch == arch ? pl : undefined
  );
  if (!platform) {
    return res
      .status(404)
      .json(`Provider version ${version}, platform ${os}/${arch} not found!`);
  }

  // Respond
  return res.status(200).json({ protocols: provider.protocols, ...platform });
}
