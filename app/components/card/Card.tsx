import {
  Card as ChakraCard,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Link,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { CardSkeleton } from "@/app/components/card/CardSkeleton";

export type CardBaseProps = {
  id?: number;
  url?: string;
  title?: string;
  by?: string;
  pointsCount?: number;
  commentsCount?: number;
};

export type CardProps<T extends CardBaseProps> =
  | { loading: true }
  | { loading: false; item?: T };

export const Card = <T extends CardBaseProps>(props: CardProps<T>) => {
  const { loading } = props;

  if (loading) {
    return <CardSkeleton />;
  }

  const { id, url, title, by, pointsCount, commentsCount } = props.item as T;

  return (
    <ChakraCard.Root key={id} variant="outline" borderRadius="md">
      <CardHeader minHeight={10} flex={3}>
        <Heading size="md">
          <Link href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </Link>
        </Heading>
      </CardHeader>
      <CardBody flex={2}>
        <Stack gap={2}>
          <Text fontSize="sm" color="gray.600">
            by {by}
          </Text>
          <Flex justifyContent="space-between">
            <Text fontSize="sm">{pointsCount} points</Text>
            <Text fontSize="sm">{commentsCount} comments</Text>
          </Flex>
        </Stack>
      </CardBody>
      <CardFooter flex={1}>
        <Tag.Root>
          <Tag.Label>#{id}</Tag.Label>
        </Tag.Root>
      </CardFooter>
    </ChakraCard.Root>
  );
};
