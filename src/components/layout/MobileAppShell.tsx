import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileAppShellProps {
  activeTab: number;
  onSwipeChange: (newIndex: number) => void;
  children: React.ReactNode;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

export const MobileAppShell: React.FC<MobileAppShellProps> = ({
  activeTab,
  onSwipeChange,
  children
}) => {
  // Handle drag gestures for both touch and mouse
  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    const velocityThreshold = 400;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      // Swiped left -> Next tab
      if (activeTab < 3) {
        onSwipeChange(activeTab + 1);
      }
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      // Swiped right -> Previous tab
      if (activeTab > 0) {
        onSwipeChange(activeTab - 1);
      }
    }
  };

  return (
    <div className="w-full flex-1 overflow-x-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        className="w-full touch-pan-y"
      >
        <AnimatePresence mode="wait" initial={false} custom={activeTab}>
          <motion.div
            key={activeTab}
            custom={activeTab}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-full pb-20"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
