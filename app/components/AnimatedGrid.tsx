import { AnimatePresence } from "framer-motion";
import { MotionBox } from "@/app/components/MotionBox";
import { FunctionComponent, Key, ReactNode } from "react";

export type AnimatedGridProps = {
  motionKey: Key;
  children: ReactNode;
};

export const AnimatedGrid: FunctionComponent<AnimatedGridProps> = ({
  motionKey,
  children,
}) => {
  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key={motionKey}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {children}
        </div>
      </MotionBox>
    </AnimatePresence>
  );
};
