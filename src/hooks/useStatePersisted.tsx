import { useCallback, useMemo, useState } from "react";

export function useStatePersisted(key: string, initialState: any) {
  const initState = useMemo(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : initialState;
  }, [initialState, key]);

  const [state, setState] = useState(initState);

  const setStateAndPersist = useCallback(
    (newState: any) => {
      localStorage.setItem(key, JSON.stringify(newState));
      setState(newState);
    },
    [key]
  );

  return [state, setStateAndPersist];
}
