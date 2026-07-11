/**
 * animated-dock.jsx
 *
 * Adapted from the Next.js / TypeScript original for this Vite + React (JSX) project.
 * Changes:
 *   - `Link` from "next/link" → native <a> element
 *   - TypeScript types removed (pure JSX)
 *   - Uses `motion` package (the successor to framer-motion)
 *   - Explicit B&W colors instead of CSS-variable Tailwind tokens (no shadcn required)
 */

import * as React from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...args) => twMerge(clsx(args));

/**
 * AnimatedDock
 * @param {{ className?: string, items: Array<{ link: string, Icon: React.ReactNode, target?: string }> }} props
 */
export const AnimatedDock = ({ className, items }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "w-fit flex h-16 items-end gap-4 rounded-2xl px-4 pb-3",
        className,
      )}
      style={{
        background: "rgba(255,255,255,0.55)",
        border: "1px solid rgba(0,0,0,0.10)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX}>
          <a
            href={item.link}
            target={item.target}
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
            className="grow flex items-center justify-center w-full h-full"
          >
            {item.Icon}
          </a>
        </DockItem>
      ))}
    </motion.div>
  );
};

export const DockItem = ({ mouseX, children }) => {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconScale = useTransform(width, [40, 80], [1, 1.5]);
  const iconSpring = useSpring(iconScale, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{
        width,
        background: "#000000",
        color: "#ffffff",
      }}
      className="aspect-square rounded-full flex items-center justify-center"
    >
      <motion.div
        style={{ scale: iconSpring, color: "#ffffff" }}
        className="flex items-center justify-center w-full h-full grow"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
