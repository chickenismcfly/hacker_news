import { AnimatePresence } from "framer-motion";
import { MotionBox } from "@/app/components/MotionBox";
import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import { FunctionComponent, Key } from "react";

export type AnimatedGridProps = SimpleGridProps & { motionKey: Key };

export const AnimatedGrid: FunctionComponent<AnimatedGridProps> = (props) => {
  const { motionKey, ...rest } = props;
  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key={motionKey}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
      >
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6} {...rest} />
      </MotionBox>
    </AnimatePresence>
  );
};
