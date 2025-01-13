// src/components/InfiniteSlideUp.tsx
import React from "react";
import { motion } from "framer-motion";

const InfiniteSlideUp = () => {
    return (
        <motion.div
            className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#8B4513] to-transparent dark:from-[#333333] dark:to-transparent"
            initial={{ y: -100 }}
            animate={{ y: "100vh" }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
};

export default InfiniteSlideUp;