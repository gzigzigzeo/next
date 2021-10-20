const DiagramData = {
  intro: {
    title: "How Teleport Works",
    description:
      "To learn more about how Teleport works, click on different areas of the diagram.",
    lines: "proxy",
  },
  proxy: {
    title: "Proxy Service",
    description:
      "The proxy is the only service in a cluster visible to the outside world. All user connections for all supported protocols go through the proxy. The proxy also serves the Web UI and allows remote IoT nodes to establish reverse tunnels. Several proxies can be set up for high availability.",
    lines: "proxy",
  },
  authserver: {
    title: "Auth Service",
    description:
      "The auth service acts as a certificate authority (CA) for the cluster. It issues certificates for clients and for nodes, collects the audit information, and stores it in the audit log. Several copies of the auth service can be set up for high availability. The auth service can be configured via `tctl` command line tool.",
    lines: "audit",
  },
  audit: {
    title: "Audit Log",
    description:
      "All nodes in a cluster send security-related events to the auth service, which then stores them in the audit log. Audit log information is stored in a regular file system, but cloud stores like DynamoDB are also supported. There are two types of audit information: recorded user sessions and security events like command execution or network activity.",
    lines: "audit",
  },
  users: {
    title: "Teleport Client",
    description:
      "Teleport comes with a command line client called `tsh`, but it also can be used with `ssh`. In addition to command line, Teleport also offers a web-based client. When accessing Kubernetes clusters, `kubectl` and other K8s-based tools work as usual.",
    lines: "proxy",
  },
  tunnel: {
    title: "Reverse Tunnel",
    description:
      "A remote node creates a reverse tunnel by establishing a permanent connection to the proxy. This tunnel is used to establish connections from clients to remote nodes located behind NAT. Remote nodes always try to re-connect and recreate the tunnel if their internet connectivity is intermittent.",
    lines: "proxy",
  },
  sshnode: {
    title: "Remote SSH Node",
    description:
      "Teleport allows users to establish SSH connections to remote nodes such as IoT devices or self-driving vehicles. Each remote SSH node runs the `teleport` daemon. Click on the tunnel to learn more.",
    lines: "proxy",
  },
  k8scluster: {
    title: "Remote Kubernetes",
    description:
      "Teleport allows users to connect to Kubernetes clusters running on third party networks behind NAT. Retail, energy, defense, and edge computing benefit from this.",
    lines: "proxy",
  },
  webapp: {
    title: "Remote Web App",
    description:
      "Teleport is an identity-aware application proxy that allows users to connect to web apps running inside of remote IoT devices via HTTP/TLS. For example, users can connect to management Web UIs of network equipment that is deployed on third party networks.",
    lines: "proxy",
  },
  database: {
    title: "Remote Database",
    description:
      "Teleport can provide secure and convenient access to database instances behind NAT or on the edge networks. Access events are logged for audit purposes just like with other protocols.",
    lines: "proxy",
  },
  privatedatabase: {
    title: "Database Instance",
    description:
      "Teleport can provide secure and convenient access to database instances behind NAT or on the edge networks. Access events are logged for audit purposes just like with other protocols.",
    lines: "proxy",
  },
  privatesshnode: {
    title: "SSH Node",
    description:
      "An SSH node is a regular Linux machine. It can be bare metal or a cloud instance. The `teleport` SSH daemon is stateless and nearly configuration-free because it is purpose-built for certificate-based authentication. You can also configure the `sshd` daemon that comes with OpenSSH to join a Teleport cluster.",
    lines: "proxy",
  },
  privatek8scluster: {
    title: "Kubernetes Cluster",
    description:
      "Using Teleport allows users to authenticate to SSH hosts and Kubernetes at the same time using the same set of credentials.",
    lines: "proxy",
  },
  privatewebapp: {
    title: "Web App",
    description:
      "Teleport is an identity-aware application proxy. This means that any web application running on LAN/VPC can be exposed to the outside world via an HTTP/TLS endpoint served by a Teleport proxy. This dramatically simplifies managing security and authentication for internal web apps.",
    lines: "proxy",
  },
};

export default DiagramData;
