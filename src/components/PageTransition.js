import { motion } from "framer-motion";

export default function PageTransition({ children, duration = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, ease: "easeInOut" }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

