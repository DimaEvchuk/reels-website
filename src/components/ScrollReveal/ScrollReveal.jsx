import React, { useEffect, useRef, useState } from "react";
import "./ScrollReveal.css";

function motionReduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Появление блока при попадании в зону видимости при прокрутке.
 */
function ScrollReveal({
  as: Tag = "div",
  children,
  className = "",
  variant = "fade-up",
  delayMs = 0,
  once = true,
  threshold = 0.12,
  rootMargin = "0px 0px -8% 0px",
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(motionReduced);

  useEffect(() => {
    if (motionReduced()) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  const combinedClass = [
    "scrollReveal",
    `scrollReveal--${variant}`,
    visible ? "scrollReveal--visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const mergedStyle =
    delayMs > 0 && !motionReduced()
      ? { ...style, transitionDelay: `${delayMs}ms` }
      : style;

  return (
    <Tag ref={ref} className={combinedClass} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}

export default ScrollReveal;
