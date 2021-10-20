//Add Table of Contents Items Lists here

export interface TOCItemList {
  item: string;
  url: string;
}

export const HowItWorksItems: Array<TOCItemList> = [
  { item: "Basic Concepts", url: "/how-it-works/" },
  {
    item: "Certificate-Based Authentication",
    url: "/how-it-works/certificate-based-authentication-ssh-kubernetes/",
  },
  {
    item: "Database Access",
    url: "/how-it-works/database-access/",
  },
  {
    item: "Kubernetes Access",
    url: "/how-it-works/secure-kubernetes-access/",
  },
  {
    item: "Edge Access",
    url: "/how-it-works/ssh-kubernetes-access-on-the-edge/",
  },
  {
    item: "Audit Logging",
    url: "/how-it-works/audit-logging-for-ssh-and-kubernetes/",
  },
  {
    item: "SOC2 Compliance",
    url: "/how-it-works/soc2-ssh-kubernetes/",
  },
  {
    item: "FedRAMP Compliance",
    url: "/how-it-works/fedramp-ssh-kubernetes/",
  },
  {
    item: "HIPAA Compliance",
    url: "/how-it-works/hipaa-compliance/",
  },
];
