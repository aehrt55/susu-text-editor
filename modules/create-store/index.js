export default function createStore(initialState) {
  const state = initialState || {};
  const onUpdateListeners = {};
  return {
    subscribe: (key, callback) => {
      onUpdateListeners[key] = onUpdateListeners[key] || new Set();
      onUpdateListeners[key].add(callback);
    },
    unSubscribe: (key, callback) => {
      return onUpdateListeners[key].delete(callback);
    },
    updateItem: (key, item, forceUpdate = false) => {
      if (!forceUpdate && state[key] === item) {
        return;
      }
      state[key] = item;
      if (onUpdateListeners[key]) {
        onUpdateListeners[key].forEach((callback) => callback(item));
      }
    },
    getItem: (key) => state[key],
  };
}
