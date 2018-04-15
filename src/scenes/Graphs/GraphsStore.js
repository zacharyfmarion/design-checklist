// @flow
import { action, computed, observable } from 'mobx';
import { getRequest } from 'helpers/api';
import AppStore from 'stores/AppStore';
import { createDateRange, formatDate } from 'helpers/dates';

type Statistic = 'insertions' | 'deletions' | 'files changed';
type Error = {
  title: string,
  message: string,
};

class GraphsStore {
  app: AppStore;
  @observable dataByCommits: Object;
  @observable dataByLines: Object;
  @observable loading: boolean = true;
  @observable activeStatistic: Statistic = 'insertions';
  @observable
  statistics: Array<Statistic> = ['insertions', 'deletions', 'files changed'];
  @observable error: Error;

  @computed
  get processedDataByCommits(): Array<Object> {
    if (!this.dataByCommits) return [];
    const authors = this.dataByCommits.authors;
    return Object.keys(authors).map(author => {
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
      if (author === 'bounds') continue;
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
    // get a range of dates with each day based on the start and end dates
    const dateRange = createDateRange(new Date(left), new Date(right));
    const res = [];
    // iterate over each date and append to data
    dateRange.forEach(dateObject => {
      // get the string representation of the date
      const date = formatDate(dateObject);
      let entry = { date };
      for (let author in this.dataByLines) {
        if (author === 'bounds') continue;
        const dates = this.dataByLines[author].dates;
        entry[author] = dates.hasOwnProperty(date)
          ? dates[date][this.activeStatistic]
          : 0;
      }
      res.push(entry);
    });
    return res;
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
          group: 'CompSci308_2018Spring',
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
          group: 'CompSci308_2018Spring',
        });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  };

  @action
  getData = async (): Promise<*> => {
    try {
      this.dataByCommits = await this.getDataByCommits();
      this.dataByLines = await this.getDataByLines();
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.error = {
        title: 'Server Error',
        message: 'Your commit data could not be loaded from the server.',
      };
    }
  };

  constructor(app: AppStore) {
    this.app = app;
  }
}

export default GraphsStore;
