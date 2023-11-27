import { useRef, useEffect } from "react";

export type DebounceProps = {
    func: () => void,
    delay:number,
    cleanUp:boolean,
}

const useDebouncedFunction = (func, delay, cleanUp = false):DebounceProps =>{
  const timeoutRef = useRef();

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return (...args) => {
    clearTimer();
    timeoutRef.current = setTimeout(() => func(...args), delay);
  };
}

export default useDebouncedFunction;