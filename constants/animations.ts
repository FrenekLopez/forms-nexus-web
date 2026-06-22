import { Variants } from "framer-motion";

// MOTION & ANIMATION PRESETS
// Reusable motion design variants for viewport transitions and staging sequences

/**
 * Linear offset entry for individual component blocks
 */
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

/**
 * Parent container orchestration layout for delayed rendering arrays
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

/**
 * Horizontal offset entry target for iterated matrix elements
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};
