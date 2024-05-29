import { motion } from "framer-motion";
import { useAppearanceDelay } from "../lib/react";
import { Spinner } from "./spinner";

export function FullPageSpinner({ isLoading = true }: { isLoading?: boolean }) {
  const show = useAppearanceDelay(isLoading);

  if (show) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="inset-0 flex items-center justify-center absolute bg-background  z-10"
      >
        <Spinner
          className="w-10 h-10 text-primary"
          aria-label="Загрузка страницы"
        />
      </motion.div>
    );
  }

  return null;
}
