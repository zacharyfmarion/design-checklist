// @flow
import { action, computed, observable } from 'mobx';
import { message } from 'antd';
import { getRequest } from 'helpers/api';
import AppStore from 'stores/AppStore';
import { applicationPrefix } from 'constants/app';
import { createDateRange, formatDate } from 'helpers/dates';

type Statistic = 'insertions' | 'deletions' | 'files changed';
type Error = {
  title: string,
  message: string,
};

class GraphsStore {
  app: AppStore;
  // This is basically a big list of commits for each author, including the files
  // that the author touched with their edits
  @observable dataByCommits: Object;
  // This is also a list of commits for each author, only this contains just the number
  // of lines added and removed with each commit
  @observable dataByLines: Object;
  @observable loading: boolean = true;
  @observable activeStatistic: Statistic = 'insertions';
  @observable
  statistics: Array<Statistic> = ['insertions', 'deletions', 'files changed'];
  @observable error: Error;

  // Defines authors that we ignore because they are not actually valid
  invalidAuthor = (author: string): boolean => {
    return ['bounds', 'rcd'].includes(author);
  };

  // Stitch the objects in two arrays together so that:
  // a = [{ a: 7 }, { a: 8 }], b = [{ b: 12 }, { b: 4 }]
  // => [{a: 7, b: 12}, { a: 8, b: 4 }]
  stitch = (a: Array<Object>, b: Array<Object>) => {
    let res = [];
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      res.push({
        ...a[i],
        ...b[i],
      });
    }
    return res;
  };

  // normalize data so everything is between 0 and 1
  // data is the data to normalize and key is the object key to use as the data item
  normalize = (data: Array<Object>, key: string): Array<Object> => {
    // First we find the largest item in the array
    const max = Math.max.apply(null, data.map(item => item[key]));
    return data.map(item => ({
      ...item,
      [key]: (item[key] / max).toFixed(2),
    }));
  };

  // The following computed properties (the ones that begin with processed)
  // essentially convert the data that is gotten from the API into a format
  // that recharts can read. They all return an array of objects as specified
  // in the recharts documentation
  @computed
  get processedDataByCommits(): Array<Object> {
    if (!this.dataByCommits) return [];
    const authors = this.dataByCommits.authors;
    return Object.keys(authors)
      .filter(author => !this.invalidAuthor(author))
      .map(author => {
        return {
          name: author,
          commits: authors[author].numofcommits,
        };
      });
  }

  @computed
  get processedDataByLinesOverview(): Array<Object> {
    if (!this.dataByLines) return [];
    const res = [];
    for (let author in this.dataByLines) {
      if (this.invalidAuthor(author)) continue;
      res.push({
        name: author,
        ...this.dataByLines[author].total,
      });
    }
    return res;
  }

  @computed
  get processedDataByLines(): Array<Object> {
    if (!this.dataByLines) return [];
    // contrived start and end dates until they are added to the API
    let { left, right } = this.dataByLines.bounds;
    const start = left[Object.keys(left)[0]];
    const end = right[Object.keys(right)[0]];
    // get a range of dates with each day based on the start and end dates
    const dateRange = createDateRange(new Date(start), new Date(end));
    const res = [];
    // iterate over each date and append to data
    dateRange.forEach(dateObject => {
      // get the string representation of the date
      const date = formatDate(dateObject);
      let entry = { date };
      for (let author in this.dataByLines) {
        if (this.invalidAuthor(author)) continue;
        const dates = this.dataByLines[author].dates;
        entry[author] = dates.hasOwnProperty(date)
          ? dates[date][this.activeStatistic]
          : 0;
      }
      res.push(entry);
    });
    return res;
  }

  @computed
  get averageNumberOfLinesPerCommit(): Array<Object> {
    if (!this.dataByLines) return [];
    let res = [];
    // iterate over each author and
    for (let author in this.dataByLines) {
      if (this.invalidAuthor(author)) continue;
      const authorData = this.dataByLines[author];
      // calculate the average of the average statistic
      let total = 0;
      Object.keys(authorData.dates).forEach((date: string) => {
        total +=
          authorData.dates[date].insertions + authorData.dates[date].deletions;
      });
      res.push({
        name: author,
        average: total / Object.keys(authorData.dates).length,
      });
    }
    return res;
  }

  // Data for a stacked bar chart that compares normalized data for the average number
  // of lines changed per commit and the number of commits
  @computed
  get normalizedData(): Array<Object> {
    const normalizedAverageLinesChanged = this.normalize(
      this.averageNumberOfLinesPerCommit,
      'average',
    );
    const normalizedNumberOfCommits = this.normalize(
      this.processedDataByCommits,
      'commits',
    );
    return this.stitch(
      normalizedAverageLinesChanged,
      normalizedNumberOfCommits,
    );
  }

  @action
  changeActiveStatistic = (
    event: { target: EventTarget } & { target: EventTarget },
  ) => {
    this.activeStatistic = event.target.value;
  };

  @action
  getDataByCommits = (): Promise<*> => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await getRequest('/commit', {
          project: this.app.projectName,
        });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  };

  @action
  getDataByLines = (): Promise<*> => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await getRequest('/commitstat', {
          project: this.app.projectName,
        });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  };

  @action
  getDataIfNotCached = () => {
    if (!this.dataByCommits || !this.dataByLines) {
      this.getData();
    }
  };

  // Get all the data needed to populate the charts
  // TODO: Change this to Promise.all as it is more performant. Only reason
  // it is not like that right now is that an error is randomly thrown.
  @action
  getData = async (): Promise<*> => {
    try {
      this.loading = true;
      this.dataByCommits = await this.getDataByCommits();
      this.dataByLines = await this.getDataByLines();
      sessionStorage.setItem(
        `${applicationPrefix}_commits`,
        JSON.stringify({
          dataByCommits: this.dataByCommits,
          dataByLines: this.dataByLines,
        }),
      );
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.error = {
        title: 'Server Error',
        message: 'Your commit data could not be loaded from the server.',
      };
      this.loading = false;
    }
  };

  constructor(app: AppStore) {
    this.app = app;
    const cached = sessionStorage.getItem(`${applicationPrefix}_commits`);
    if (cached) {
      const { dataByCommits, dataByLines } = JSON.parse(cached);
      this.dataByCommits = dataByCommits;
      this.dataByLines = dataByLines;
      this.loading = false;
      message.warning(
        'Using cached project data. Presh refresh to check for the latest analysis.',
      );
    }
  }
}

export default GraphsStore;
