import { CompanyData } from "./types";
import data from "./clients.yaml";

let companies: CompanyData[] = [];

if (isCompanies(data)) {
  companies = data;
}

export default companies;

function isCompanies(maybeCompanies: unknown): maybeCompanies is CompanyData[] {
  if (!Array.isArray(maybeCompanies)) {
    throw new Error("company:data is not a list");
  }

  // we should add an accurate validation here if applicable

  return true;
}
