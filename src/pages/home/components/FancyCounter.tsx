import { useEffect, useState, useRef } from "react";

type Props = {
  target: number;
};

const FancyCounter = ({ target }: Props) => {
  const [count, setCount] = useState(0);
  const [startAnim, setStartAnim] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // 👀 Trigger when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnim(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // 🎯 Smooth counter animation
  useEffect(() => {
    if (!startAnim) return;

    let start = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [startAnim, target]);

  return (
    <div ref={ref}>
      <h2 className="text-5xl md:text-6xl font-extrabold text-emerald-400 
      tracking-wide ">
        +{count}
      </h2>
    </div>
  );
};

export default FancyCounter;