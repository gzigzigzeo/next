import styled from "styled-components";
import css from "@styled-system/css";
import { useState } from "react";
import Flex from "components/Flex";
import Box, { BoxProps } from "components/Box";
import { Centrator } from "components/Layout";
import Company, { CompanyId, data } from "components/Company";
import { StyledSystemProps } from "components/system";
import { Dropdown } from "components/Dropdown";
import wave from "./assets/wave.svg";

type Props = {
  clients: CompanyId[];
  contrasted: true;
  needLink?: boolean;
  allClients?: boolean;
} & BoxProps;

const rawIndustryOptions: Set<string> = new Set();
data.forEach(
  (elem) =>
    elem.industry && elem.industry.forEach((ind) => rawIndustryOptions.add(ind))
);
rawIndustryOptions.add("All");
const industryOptions = Array.from(rawIndustryOptions).sort();

export default function ClientsList({
  clients,
  contrasted,
  needLink,
  allClients,
  ...props
}: Props) {
  const [checkedValue, setCheckedValue] = useState<string>("All");
  const Wrapper = allClients ? WaveWrapper : Box;
  let filteredClientsList = clients;
  if (checkedValue !== "All") {
    filteredClientsList = clients.filter((id) => {
      const { industry } = data.find((compName) => compName.id === id);
      return !!industry && industry.includes(checkedValue);
    });
  }

  return (
    <Wrapper
      as="section"
      bg={contrasted ? "page-bg" : "white"}
      pt={[3, 6]}
      pb={[3, 10]}
      {...props}
    >
      <Centrator>
        <Flex flexDirection="column" alignItems="center" width="100%">
          <Box as="h2" fontSize="0" color="white">
            Clients
          </Box>
          {allClients ? (
            <Box alignSelf="flex-start" width={["100%", "auto"]}>
              <Box as="p" textTransform="uppercase">
                FILTER BY INDUSTRY:
              </Box>
              <Dropdown
                width={["50%", "228px"]}
                textTransform="uppercase"
                mt="2"
                value={checkedValue}
                options={industryOptions}
                onChange={setCheckedValue}
                color="dark-purple"
                needBg
              />
            </Box>
          ) : (
            <Box
              as="p"
              fontSize="text-lg"
              lineHeight="lg"
              fontWeight="bold"
              color={contrasted ? "dark-gray" : "black"}
            >
              Trusted by leading organizations
            </Box>
          )}
          <StyledList>
            {filteredClientsList.map((id) => (
              <StyledItem key={id}>
                <Company id={id} px="4" py="3" needLink={needLink} />
              </StyledItem>
            ))}
          </StyledList>
        </Flex>
      </Centrator>
    </Wrapper>
  );
}

const WaveWrapper = styled(Box)<StyledSystemProps>(
  css({
    backgroundImage: ["none", `url(${wave})`],
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top -140px left",
    backgroundSize: "100%",
  })
);

const StyledItem = styled("li")<StyledSystemProps>(
  css({
    boxSizing: "border-box",
    maxHeight: ["120px", "auto"],
    height: ["auto", "100px"],
    width: "100%",
    borderRadius: "default",
    boxShadow: ["none", "0 1px 3px rgba(0, 0, 0, 0.24)"],
    "&:nth-child(5n+1)": {
      ml: [0, 0],
    },
  })
);

const StyledList = styled("ul")<StyledSystemProps>(
  css({
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    columnGap: 4,
    rowGap: 5,
    width: "100%",
    listStyle: "none",
    m: 0,
    p: 0,
    mt: [2, 6],
  })
);
