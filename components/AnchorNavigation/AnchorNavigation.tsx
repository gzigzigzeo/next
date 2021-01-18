import css from "@styled-system/css";
import Box from "components/Box";
import Link from "components/Link";

export interface HeaderMeta {
  rank: number;
  id: string;
  title: string;
}

interface AnchorNavigationProps {
  headers: HeaderMeta[];
}

const AnchorNavigation = ({ headers }: AnchorNavigationProps) => {
  return (
    <Box width="240px" p={4} flexShrink={0} position="sticky" top="0">
      <Box
        text="text-sm"
        mx={1}
        mb={1}
        py={1}
        fontWeight="bold"
        color="darkest"
        borderBottom="1px solid"
        borderColor="lightest-gray"
      >
        Table of Contents
      </Box>
      {headers.map(({ id, title }) => {
        return (
          <Link
            key={id}
            href={`#${id}`}
            display="block"
            fontSize="text-sm"
            lineHeight="sm"
            color="dark-gray"
            p={1}
            css={css({
              textDecoration: "none",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              "&:focus, &:hover, &:active": {
                bg: "lightest-gray",
                borderRadius: "default",
              },
            })}
          >
            {title}
          </Link>
        );
      })}
    </Box>
  );
};

export default AnchorNavigation;
