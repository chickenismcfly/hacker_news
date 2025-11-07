import {
  Card as ChakraCard,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

export const CardSkeleton = () => {
  return (
    <ChakraCard.Root variant="outline" borderRadius="md">
      <CardHeader minHeight={10} flex={3}>
        <Heading size="md">
          <Skeleton height="24px" width="80%" />
        </Heading>
      </CardHeader>

      <CardBody flex={2}>
        <Stack gap={2}>
          <Skeleton height="16px" width="60%" />
          <Flex justifyContent="space-between">
            <Skeleton height="16px" width="40%" />
            <Skeleton height="16px" width="40%" />
          </Flex>
        </Stack>
      </CardBody>

      <CardFooter flex={1}>
        <Skeleton height="24px" width="60px" borderRadius="full" />
      </CardFooter>
    </ChakraCard.Root>
  );
};
