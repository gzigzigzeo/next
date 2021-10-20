import { Box } from "components";

interface SidebarProps {
  // side?: string;
  title?: string;
  bg?: string;
  image?: boolean;
  width?: number;
  height?: number;
  hiddenOnMobile?: boolean;
  children: React.ReactNode;
}

//may require some margin updates if a left-hand sidebar is selected
//width & height properties require image = true to operate

export const Sidebar = ({
  // side = "right",
  title,
  image = false,
  width,
  height,
  hiddenOnMobile = true,
  bg = "lightest-gray",
  children,
}: SidebarProps) => {
  return (
    <Box
      display={[hiddenOnMobile ? "none" : "block", "block"]}
      position={image ? "relative" : "static"}
      backgroundColor={bg}
      maxWidth="320px"
      width={image ? width : "auto"}
      height={image ? height : "auto"}
      float="right"
      borderRadius="md"
      fontSize="text-sm"
      lineHeight="md"
      top={image ? -20 : 0}
      p={3}
      ml={4}
      mt={3}
      mb={[3, 0]}
    >
      {title && (
        <Box as="h5" mb={2} fontSize={["text-lg", "text-md"]}>
          {title}
        </Box>
      )}
      {children}
    </Box>
  );
};
