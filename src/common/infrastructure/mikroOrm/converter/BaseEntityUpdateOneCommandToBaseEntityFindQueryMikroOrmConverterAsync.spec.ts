import { ObjectQuery } from '@mikro-orm/core';

import { BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync } from './BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync';
import { BaseEntityUpdateOneCommand } from '../../../domain/command/BaseEntityUpdateOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityUpdateOneCommandFixtures } from '../../../fixtures/domain/command/BaseEntityUpdateOneCommandFixtures';
import { BaseEntityFindQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

describe(BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync.name, () => {
  let baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<BaseEntityFindQuery, ObjectQuery<BaseEntityMikroOrm>>
  >;
  let baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync: BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync<
    BaseEntityUpdateOneCommand,
    ObjectQuery<BaseEntityMikroOrm>
  >;

  beforeAll(() => {
    baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync =
      new BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync(
        baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityUpdateOneCommandFixture: BaseEntityUpdateOneCommand;
      let baseEntityFindQueryMikroOrmFixture: ObjectQuery<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityUpdateOneCommandFixture = BaseEntityUpdateOneCommandFixtures.any;
        baseEntityFindQueryMikroOrmFixture = BaseEntityFindQueryMikroOrmFixtures.any;

        baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          baseEntityFindQueryMikroOrmFixture,
        );

        result = await baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync.convert(
          baseEntityUpdateOneCommandFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          baseEntityUpdateOneCommandFixture.findQuery,
        );
      });

      it('should return a ObjectQuery<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityFindQueryMikroOrmFixture);
      });
    });
  });
});
