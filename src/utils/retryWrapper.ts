function wrap<T, U>(
  fnc: (arg: T) => Promise<U>,
  retries: number = 5,
  timeout: number = 1000,
  delay: number = 100
): (arg: T) => Promise<U | undefined> {
  return async (arg: T) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fnc(arg);
      } catch (error) {
        console.error(error);
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };
}

export default wrap;