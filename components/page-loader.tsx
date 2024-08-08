"use client";

import { cn } from "@/lib/utils";
import { useAnimate, useSpring, useTransform } from "framer-motion";
import { HTMLAttributes, useEffect, useState } from "react";
 
interface PageLoaderProps extends HTMLAttributes<HTMLDivElement> {
  textClassName?: string;
}
 
const PageLoader = ({ className, textClassName, ...rest }: PageLoaderProps) => {
  const [value, setValue] = useState(0);
  const [scope, animate] = useAnimate();
 
  const number = useSpring(0, { damping: 50, restDelta: 0.5, stiffness: 400 });
 
  number.on("change", (a) => setValue(a));
 
  useEffect(() => {
    number.set(100);
    animate([
      [scope.current, { y: "-80vh" }, { duration: 0.18, ease: "linear" }],
      [
        scope.current,
        { y: "-100vh" },
        { delay: 0, duration: 0.26, ease: "linear" },
      ],
    ]);
  });
 const fetchedImgSrc = '/public/images/kuromi.jpeg'
  return (
    <div
        style={{backgroundImage: `url(${fetchedImgSrc})`}}

      className={cn("w-screen h-screen bg-orange-400 fixed left-0", className)}
      ref={scope}
      {...rest}
    >
      <div className="relative h-full w-full">
        <p
          className={cn(
            `
        text-[#ececec] 
        absolute 
        bottom-4 
        left-5 
        font-semibold
        text-9xl
        tracking-tighter
        `,
            textClassName
          )}
        >
          {parseFloat(value.toString()).toFixed(0)}
          <br></br>MaiHoney
        </p>
      </div>
    </div>
  );
};
 
export default PageLoader;