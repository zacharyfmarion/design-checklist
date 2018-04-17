import GraphsStore from './GraphsStore';
import AppStore from 'stores/AppStore';

// mock of localStorage and sessionStorage
class StorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  removeItem(key) {
    delete this.store[key];
  }
}

global.sessionStorage = new StorageMock();
global.localStorage = new StorageMock();

describe('GraphsStore', () => {
  let store;
  beforeEach(() => {
    let app = new AppStore();
    store = new GraphsStore(app);
  });

  describe('#stitch', () => {
    it('Correctly stitches two arrays together', () => {
      const a = [{ a: 7 }, { a: 8 }];
      const b = [{ b: 12 }, { b: 4 }];
      const res = [{ a: 7, b: 12 }, { a: 8, b: 4 }];
      // easiest way to compare arrays...not without caveats though
      expect(JSON.stringify(store.stitch(a, b))).toBe(JSON.stringify(res));
    });

    it('Correctly stitches two arrays of different lengths together', () => {
      const a = [{ a: 7 }, { a: 8 }];
      const b = [{ b: 12 }, { b: 4 }, { b: 19 }];
      const res = [{ a: 7, b: 12 }, { a: 8, b: 4 }];
      // easiest way to compare arrays...not without caveats though
      expect(JSON.stringify(store.stitch(a, b))).toBe(JSON.stringify(res));
    });
  });

  describe('#normalize', () => {
    it('Correctly normalizes an array of objects', () => {
      const array = [{ a: 2 }, { a: 5 }, { a: 6 }];
      const res = [
        { a: (2 / 6).toFixed(2) },
        { a: (5 / 6).toFixed(2) },
        { a: (6 / 6).toFixed(2) },
      ];
      expect(JSON.stringify(store.normalize(array, 'a'))).toBe(
        JSON.stringify(res),
      );
    });
  });
});
