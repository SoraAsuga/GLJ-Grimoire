import { useRef, useState } from 'react';

export default function useRefState<T>(initialState: T) {
  const [timestamp, updateTimestamp] = useState(Date.now());
  const state = useRef<T>(initialState);

  const setState = (newState: Partial<T>) => {
    Object.assign(state.current, newState);
    console.log(timestamp);
    updateTimestamp(Date.now());
  };

  return [state.current, setState] as [T, (newState: Partial<T>) => void];
}
