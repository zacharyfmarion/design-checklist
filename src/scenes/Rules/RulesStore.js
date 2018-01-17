import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

class RulesStore {
  @observable
  data = {
    Communication: {
      percent: 85.0,
      rules: [
        'squid:S00121 Control structures should use curly braces',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S1488 Local Variables should not be declared and then immediately returned or thrown',
        'squid:S1192 String literals should not be duplicated',
        'squid:S1192 String literals should not be duplicated',
        'squid:S1192 String literals should not be duplicated',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S1192 String literals should not be duplicated',
        'squid:S1192 String literals should not be duplicated',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S1192 String literals should not be duplicated',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S1192 String literals should not be duplicated',
        'squid:S1068 Unused "private" fields should be removed',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S00121 Control structures should use curly braces',
        'squid:S1068 Unused "private" fields should be removed',
        'squid:S1197 Array designators "[]" should be on the type, not the variable',
        'squid:S1197 Array designators "[]" should be on the type, not the variable',
        'squid:S1197 Array designators "[]" should be on the type, not the variable',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
        'squid:S109 Magic numbers should not be used',
      ],
    },
    Modularity: {
      percent: 100.0,
      rules: [],
    },
    Flexibility: {
      percent: 100.0,
      rules: [],
    },
  };

  @action
  getRules = async (): Promise<*> => {
    try {
      const data = await getRequest('/sonartest', {});
      console.log(data);
      this.data = data;
    } catch (err) {
      console.log(err);
    }
  };
}

export default RulesStore;
