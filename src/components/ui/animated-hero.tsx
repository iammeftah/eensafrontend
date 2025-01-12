import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, BrainCircuit, Sparkles } from "lucide-react";
import { Button } from "./button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
      () => ["smarter", "faster", "easier", "personalized", "AI-powered"],
      []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
      <div className="w-full min-h-screen flex items-center justify-center pt-24">
        <section className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 py-12 lg:py-24 items-center justify-center h-full flex-col">
            <div className="flex gap-6 flex-col">
              <div className="flex items-center justify-center mb-2">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Enhanced Learning Platform
              </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl max-w-3xl tracking-tight text-center font-bold">
              <span className="text-stone-900 dark:text-stone-100">
                Learning becomes
              </span>
                <span className="relative flex w-full justify-center overflow-hidden text-center h-20 md:h-24">
                {titles.map((title, index) => (
                    <motion.span
                        key={index}
                        className="absolute font-bold bg-gradient-to-r from-amber-800 to-orange-700 dark:from-amber-600 dark:to-orange-500 text-transparent bg-clip-text"
                        initial={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", stiffness: 50 }}
                        animate={
                          titleNumber === index
                              ? {
                                y: 0,
                                opacity: 1,
                              }
                              : {
                                y: titleNumber > index ? "-100%" : "100%",
                                opacity: 0,
                              }
                        }
                    >
                      {title}
                    </motion.span>
                ))}
              </span>
              </h1>

              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-stone-600 dark:text-stone-300 max-w-2xl text-center mx-auto">
                Transform your educational journey with our AI-powered learning platform.
                Access personalized courses, smart study tools, and innovative solutions
                designed to help you excel in your academic pursuits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mt-4 px-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/80 dark:bg-stone-800/50 shadow-sm border border-amber-100 dark:border-stone-700">
                <BookOpen className="w-6 h-6 text-amber-800 dark:text-amber-500" />
                <span className="text-sm font-medium text-stone-800 dark:text-stone-100">Interactive Courses</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/80 dark:bg-stone-800/50 shadow-sm border border-amber-100 dark:border-stone-700">
                <BrainCircuit className="w-6 h-6 text-amber-800 dark:text-amber-500" />
                <span className="text-sm font-medium text-stone-800 dark:text-stone-100">AI Tutoring</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/80 dark:bg-stone-800/50 shadow-sm border border-amber-100 dark:border-stone-700">
                <Sparkles className="w-6 h-6 text-amber-800 dark:text-amber-500" />
                <span className="text-sm font-medium text-stone-800 dark:text-stone-100">Smart Study Tools</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                  size="lg"
                  className="gap-2 bg-amber-800 hover:bg-amber-900 text-white dark:bg-amber-700 dark:hover:bg-amber-800 px-6 py-2"
              >
                Start Learning Now
                <BookOpen className="w-4 h-4" />
              </Button>
              <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-[#8B4513] text-[#8B4513] text-amber-900 dark:text-stone-100 hover:bg-amber-50 dark:hover:bg-stone-800 px-6 py-2"
              >
                Explore Courses
                <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
  );
}

export { Hero };