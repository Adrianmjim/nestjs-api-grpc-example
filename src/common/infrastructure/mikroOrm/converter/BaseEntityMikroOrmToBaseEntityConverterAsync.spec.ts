import { BaseEntityMikroOrmToBaseEntityConverterAsync } from './BaseEntityMikroOrmToBaseEntityConverterAsync';
import { BaseEntity } from '../../../domain/model/BaseEntity';
import { BaseEntityFixtures } from '../../../fixtures/domain/model/BaseEntityFixtures';
import { BaseEntityMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/model/BaseEntityMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

class BaseEntityMikroOrmToBaseEntityConverterAsyncTest extends BaseEntityMikroOrmToBaseEntityConverterAsync<
  BaseEntityMikroOrm,
  BaseEntity
> {
  public constructor(private readonly convertToEntityMock: jest.Mock<Promise<BaseEntity>>) {
    super();
  }

  protected async convertToSpecificEntity(input: BaseEntityMikroOrm, baseEntity: BaseEntity): Promise<BaseEntity> {
    return this.convertToEntityMock(input, baseEntity);
  }
}

describe(BaseEntityMikroOrmToBaseEntityConverterAsync.name, () => {
  let convertToEntityMock: jest.Mock<Promise<BaseEntity>>;
  let baseEntityMikroOrmToBaseEntityConverterAsyncTest: BaseEntityMikroOrmToBaseEntityConverterAsyncTest;

  beforeAll(() => {
    convertToEntityMock = jest.fn<Promise<BaseEntity>, unknown[]>();

    baseEntityMikroOrmToBaseEntityConverterAsyncTest = new BaseEntityMikroOrmToBaseEntityConverterAsyncTest(
      convertToEntityMock,
    );
  });

  describe('.convert()', () => {
    describe('when called and BaseEntityMikroOrm.updatedBy is undefined', () => {
      let baseEntityMikroOrmFixture: BaseEntityMikroOrm;
      let baseEntityFixture: BaseEntity;
      let result: unknown;

      beforeAll(async () => {
        baseEntityMikroOrmFixture = BaseEntityMikroOrmFixtures.any;
        baseEntityFixture = BaseEntityFixtures.any;

        convertToEntityMock.mockResolvedValueOnce(baseEntityFixture);

        result = await baseEntityMikroOrmToBaseEntityConverterAsyncTest.convert(baseEntityMikroOrmFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call convertToEntity()', () => {
        expect(convertToEntityMock).toHaveBeenCalledTimes(1);
        expect(convertToEntityMock).toHaveBeenCalledWith(baseEntityMikroOrmFixture, baseEntityFixture);
      });

      it('should return a BaseEntity', () => {
        expect(result).toStrictEqual(baseEntityFixture);
      });
    });

    describe('when called and BaseEntityMikroOrm.updatedBy is not undefined', () => {
      let baseEntityMikroOrmFixture: BaseEntityMikroOrm;
      let baseEntityFixture: BaseEntity;
      let result: unknown;

      beforeAll(async () => {
        baseEntityMikroOrmFixture = BaseEntityMikroOrmFixtures.withUpdatedAt;
        baseEntityFixture = BaseEntityFixtures.withUpdatedAt;

        convertToEntityMock.mockResolvedValueOnce(baseEntityFixture);

        result = await baseEntityMikroOrmToBaseEntityConverterAsyncTest.convert(baseEntityMikroOrmFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call convertToEntity()', () => {
        expect(convertToEntityMock).toHaveBeenCalledTimes(1);
        expect(convertToEntityMock).toHaveBeenCalledWith(baseEntityMikroOrmFixture, baseEntityFixture);
      });

      it('should return a BaseEntity', () => {
        expect(result).toStrictEqual(baseEntityFixture);
      });
    });
  });
});
