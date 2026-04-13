import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

type GSAPObject = { [key: string]: unknown };

export type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "chars, words" | "words, lines";
  from?: GSAPObject;
  to?: GSAPObject;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  id?: string;
  onLetterAnimationComplete?: () => void;
  once?: boolean;
};

export function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  id,
  onLetterAnimationComplete,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text || !fontsLoaded) return;

    // Prevent re-animation if already completed
    if (animationCompletedRef.current) return;

    // Clean up any existing split instance
    if ((el as any)._rbsplitInstance) {
      try {
        (el as any)._rbsplitInstance.revert();
      } catch (_) {
        /* noop */
      }
      (el as any)._rbsplitInstance = null;
    }

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
    const sign =
      marginValue === 0
        ? ""
        : marginValue < 0
        ? `-=${Math.abs(marginValue)}${marginUnit}`
        : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    let targets: HTMLElement[];
    const assignTargets = (self: GSAPSplitText) => {
      if (splitType.includes("chars") && self.chars.length) targets = self.chars as HTMLElement[];
      if (!targets && splitType.includes("words") && self.words.length) targets = self.words as HTMLElement[];
      if (!targets && splitType.includes("lines") && self.lines.length) targets = self.lines as HTMLElement[];
      if (!targets) targets = (self.chars || self.words || self.lines) as HTMLElement[];
    };

    const splitInstance = new GSAPSplitText(el, {
      type: splitType,
      smartWrap: true,
      autoSplit: splitType === "lines",
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char",
      reduceWhiteSpace: false,
      onSplit: (self) => {
        assignTargets(self);
        const tween = gsap.fromTo(
          targets,
          { ...from },
          {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            scrollTrigger: {
              trigger: el,
              start,
              once,
              fastScrollEnd: true,
              anticipatePin: 0.4,
            },
            onComplete: () => {
              animationCompletedRef.current = true;
              onCompleteRef.current?.();
            },
            willChange: "transform, opacity",
            force3D: true,
          }
        );
        return tween;
      },
    });

    (el as any)._rbsplitInstance = splitInstance;

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      try {
        splitInstance.revert();
      } catch (_) {
        /* noop */
      }
      (el as any)._rbsplitInstance = null;
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    JSON.stringify(from),
    JSON.stringify(to),
    threshold,
    rootMargin,
    fontsLoaded,
    once,
  ]);

  const style = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "normal" as const,
    wordWrap: "break-word" as const,
    willChange: "transform, opacity" as const,
  };
  const classes = `split-parent ${className}`;

  switch (tag) {
    case "h1":
      return <h1 id={id} ref={ref as any} className={classes} style={style}>{text}</h1>;
    case "h2":
      return <h2 id={id} ref={ref as any} className={classes} style={style}>{text}</h2>;
    case "h3":
      return <h3 id={id} ref={ref as any} className={classes} style={style}>{text}</h3>;
    case "h4":
      return <h4 id={id} ref={ref as any} className={classes} style={style}>{text}</h4>;
    case "h5":
      return <h5 id={id} ref={ref as any} className={classes} style={style}>{text}</h5>;
    case "h6":
      return <h6 id={id} ref={ref as any} className={classes} style={style}>{text}</h6>;
    case "span":
      return <span id={id} ref={ref as any} className={classes} style={style}>{text}</span>;
    case "div":
      return <div id={id} ref={ref as any} className={classes} style={style}>{text}</div>;
    default:
      return <p id={id} ref={ref as any} className={classes} style={style}>{text}</p>;
  }
}

export default SplitText;
