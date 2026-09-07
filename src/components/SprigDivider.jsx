import { motion } from "framer-motion";

export default function SprigDivider({ className = "" }) {
  return (
    <motion.svg
      viewBox="0 0 380 40"
      fill="none"
      className={`divider-sprig mx-auto block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      aria-hidden="true"
    >
      <motion.path
        d="M 10 20 C 60 7, 120 33, 190 20 C 260 7, 320 33, 370 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.2, ease: "easeInOut" },
          },
        }}
      />
      {[25, 60, 95, 130, 165, 215, 250, 285, 320, 355].map((x, i) => (
        <motion.path
          key={x}
          d={
            i % 2 === 0
              ? `M${x} 20 q 7 -10 14 -11`
              : `M${x} 20 q 7 10 14 11`
          }
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.45, delay: 0.4 + i * 0.06 },
            },
          }}
        />
      ))}
    </motion.svg>
  );
}
