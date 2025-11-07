"use client";

import { Box, Flex, HStack, Link, Spacer } from "@chakra-ui/react";

const StickyHeader = () => {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="white"
      boxShadow="sm"
      px={4}
      py={3}
    >
      <Flex align="center">
        <Box fontWeight="bold" fontSize="lg">
          Hacker News
        </Box>
        <Spacer />
        <HStack gap={6}>
          <Link href="/top-stories" fontWeight="medium">
            Top Stories
          </Link>
          <Link href="/new-stories" fontWeight="medium">
            New Stories
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default StickyHeader;
