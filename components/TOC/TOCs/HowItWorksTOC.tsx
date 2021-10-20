import { useRouter } from "next/router";
import styled from "styled-components";
import { all, StyledSystemProps } from "components/system";
import { Box, Link } from "components";
import { TOCItemList } from "./ItemsLists";

interface HowItWorksTOCProps {
  title: string;
  header?: string;
  footer?: boolean;
  itemList: Array<TOCItemList>;
}

export const HowItWorksTOC = ({
  title,
  header,
  footer = false,
  itemList,
}: HowItWorksTOCProps) => {
  const router = useRouter();

  return (
    <Box height={footer ? "560px" : "300px"} minWidth="300px">
      {header && (
        <Box mt={3} py={6} pl={[0, 1]} fontSize="header-3" color="light-purple">
          {header}
        </Box>
      )}
      <Box
        fontSize="text-md"
        ml={[0, 2]}
        mb={-1}
        fontWeight="bold"
        color="darkest"
      >
        {title}
      </Box>
      <ol>
        {itemList.map((e) => {
          return router.asPath === e.url ? (
            <StyledLI1
              pb={footer ? 2 : 0}
              fontSize={footer ? "15px" : "text-md"}
              key={e.item}
              lineHeight="lg"
            >
              {e.item}
            </StyledLI1>
          ) : (
            <StyledLI2 pb={footer ? 2 : 0} key={e.item}>
              <Link
                lineHeight="lg"
                fontSize={footer ? "15px" : "text-md"}
                scheme="site"
                href={e.url}
              >
                {e.item}
              </Link>
            </StyledLI2>
          );
        })}
      </ol>
    </Box>
  );
};

const StyledLI1 = styled("li")<StyledSystemProps>(
  {
    color: "darkest",
    fontWeight: "bold",
  },
  all
);

const StyledLI2 = styled("li")<StyledSystemProps>(all);
