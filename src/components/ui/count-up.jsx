import { useEffect, useState } from 'react';

export default function CountUp({
  start = 0,
  end = 0,
  duration = 1,
  decimals = 0,
  prefix = '',
  suffix = ''
}) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const current = progress * (end - start) + start;
      setCount(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [start, end, duration]);

  // Format count representation
  const formattedCount = count.toFixed(decimals);

  return (
    <span>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}
