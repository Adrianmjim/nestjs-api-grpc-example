import fs from 'fs';
import path from 'path';

import { str } from 'envalid';

import { LoadDataDotenvAdapter } from './LoadDataDotenvAdapter';
import { EnvToEnvValidatorEnvalidMap } from '../../envalid/model/EnvToEnvValidatorEnvalidMap';

interface DataTest {
  foo: string;
}

describe('LoadDataSyncDotenvAdapter component', () => {
  let envToEnvValidatorEnvalidMap: EnvToEnvValidatorEnvalidMap<DataTest>;
  let envFilepathFixture: string;

  let loadDataSyncDotenvAdapter: LoadDataDotenvAdapter<DataTest>;

  beforeAll(() => {
    envToEnvValidatorEnvalidMap = {
      foo: str(),
    };

    process.env.ENV = `${__dirname.replace(process.cwd(), '')}/LoadDataDotenvAdapter.int.spec`;
    envFilepathFixture = path.join(__dirname, 'LoadDataDotenvAdapter.int.spec.env');

    const fileContentFixture: string = 'foo=bar\n';

    if (!fs.existsSync(envFilepathFixture)) {
      fs.writeFileSync(envFilepathFixture, Buffer.from(fileContentFixture));
    }

    loadDataSyncDotenvAdapter = new LoadDataDotenvAdapter(envToEnvValidatorEnvalidMap);
  });

  describe('.loadData()', () => {
    describe('when called', () => {
      let dataTestFixture: DataTest;

      let result: unknown;

      beforeAll(() => {
        dataTestFixture = {
          foo: 'bar',
        };

        result = loadDataSyncDotenvAdapter.loadData();
      });

      it('should return data', () => {
        expect(result).toStrictEqual(dataTestFixture);
      });
    });
  });
});
