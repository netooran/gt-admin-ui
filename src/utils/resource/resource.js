const createResource = (promise) => {
  let status = 'loading';
  let result;

  const suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  return {
    read() {
      if (status === 'loading') throw suspender;
      else if (status === 'error') throw result;
      else return result;
    },
  };
};

export const createMockResource = (data, error) => ({
  loading: {
    read: () => {
      throw Promise.resolve();
    },
  },
  error: {
    read: () => {
      throw new Error(error);
    },
  },
  success: {
    read: () => data,
  },
});

export default createResource;
