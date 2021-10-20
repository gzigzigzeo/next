import { Flex } from "components";

/**
 * Returns side-by-side code windows for easy comparison. Currently optimized for 2 windows.
 */

export interface SplitCodeProps {
  children: React.ReactNode;
}

export const SplitCode = ({ children }: SplitCodeProps) => {
  return (
    <Flex flexDirection={["column", "row"]} width="100%" mt={[0, 5]}>
      {children}
    </Flex>
  );
};

interface ItemProps {
  title: string;
  children: React.ReactNode;
}
const SplitCodeItem = ({ title, children, ...props }: ItemProps) => {
  return (
    <Flex
      flexDirection="column"
      width={["auto", "50%"]}
      alignItems="flex-start"
      mx={3}
      mt={[3, 0]}
      {...props}
    >
      <Flex fontWeight="bold" fontSize="text-lg" mb={2}>
        {title}
      </Flex>
      <Flex color="white" bg="code" width="100%" borderRadius="default">
        {children}
      </Flex>
    </Flex>
  );
};

SplitCode.Item = SplitCodeItem;
