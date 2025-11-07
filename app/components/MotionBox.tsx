import { chakra, shouldForwardProp } from "@chakra-ui/system";
import { isValidMotionProp, motion } from "framer-motion";

export const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
