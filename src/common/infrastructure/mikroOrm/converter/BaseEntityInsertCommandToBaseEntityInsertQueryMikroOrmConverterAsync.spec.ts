import { RequiredEntityData } from '@mikro-orm/core';

import { BaseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync } from './BaseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync';
import { BaseEntityInsertCommand } from '../../../domain/command/BaseEntityInsertCommand';
import { BaseEntityInsertOneCommand } from '../../../domain/command/BaseEntityInsertOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityInsertCommandFixtures } from '../../../fixtures/domain/command/BaseEntityInsertCommandFixtures';
import { BaseEntityInsertQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/BaseEntityInsertQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

describe(BaseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync.name, () => {
  let baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<BaseEntityInsertOneCommand, RequiredEntityData<BaseEntityMikroOrm>>
  >;

  let baseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync: BaseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync<
    BaseEntityInsertCommand,
    RequiredEntityData<BaseEntityMikroOrm>[]
  >;

  beforeAll(() => {
    baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    baseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync =
      new BaseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync(
        baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityInsertCommandFixture: BaseEntityInsertCommand;
      let baseEntityInsertQueryMikroOrmFixture: RequiredEntityData<BaseEntityMikroOrm>[];
      let result: unknown;

      beforeAll(async () => {
        baseEntityInsertCommandFixture = BaseEntityInsertCommandFixtures.withCommandsNotEmpty;
        baseEntityInsertQueryMikroOrmFixture =
          BaseEntityInsertQueryMikroOrmFixtures.withBaseEntityInsertOneQueryMikroOrm;

        for (let nthCall: number = 1; nthCall <= baseEntityInsertCommandFixture.commands.length; nthCall++) {
          baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
            baseEntityInsertQueryMikroOrmFixture[nthCall - 1] as RequiredEntityData<BaseEntityMikroOrm>,
          );
        }

        result =
          await baseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync.convert(
            baseEntityInsertCommandFixture,
          );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync.convert()', () => {
        expect(
          baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncMock.convert,
        ).toHaveBeenCalledTimes(baseEntityInsertCommandFixture.commands.length);

        for (let nthCall: number = 1; nthCall <= baseEntityInsertCommandFixture.commands.length; nthCall++) {
          expect(
            baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsyncMock.convert,
          ).toHaveBeenNthCalledWith(nthCall, baseEntityInsertCommandFixture.commands[nthCall - 1]);
        }
      });

      it('should return a RequiredEntityData<BaseEntityMikroOrm>[]', () => {
        expect(result).toStrictEqual(baseEntityInsertQueryMikroOrmFixture);
      });
    });
  });
});
