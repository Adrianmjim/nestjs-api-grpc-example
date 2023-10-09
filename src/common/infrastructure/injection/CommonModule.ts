import { Module, Provider } from '@nestjs/common';

import { Converter } from '../../domain/converter/Converter';
import { OrderTypeToQueryOrderMikroOrmConverter } from '../mikroOrm/converter/OrderTypeToQueryOrderMikroOrmConverter';

const converters: Provider<Converter<unknown, unknown>>[] = [OrderTypeToQueryOrderMikroOrmConverter];

@Module({
  exports: [...converters],
  providers: [...converters],
})
export class CommonModule {}
