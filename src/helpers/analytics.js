// @flow
import GoogleAnalytics from 'react-ga';
// Fake analytics class with stubbed methods so that data is
// not sent in dev mode
class FakeAnalytics {
  static initialize(id: string, options: Object) {}
  static set() {}
  static pageview() {}
  static event(options: Object) {}
}

export default (process.env.NODE_ENV === 'production'
  ? GoogleAnalytics
  : FakeAnalytics);
