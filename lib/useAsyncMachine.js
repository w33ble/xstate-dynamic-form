import { useRef } from 'react';
import { createMachine, assign } from 'xstate';
import useFetch from './useFetch';

export default function useAsyncMachine(url) {
  const machineRef = useRef(null); // hacky, but it works
  const { data, error } = useFetch(url);

  if (data) machineRef.current = createMachine(data);

  return {
    loading: !machineRef.current && !error,
    machine: machineRef.current,
    config: data,
    error,
  };
}

export { assign }; // probably a bad idea
