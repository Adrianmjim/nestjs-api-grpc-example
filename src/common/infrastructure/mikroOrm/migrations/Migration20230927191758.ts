import { Migration } from '@mikro-orm/migrations';

export class Migration20230927191758 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Cat" ("id" uuid not null, "created_at" timestamptz(3) not null, "updated_at" timestamptz(3) null, "version" int not null default 1, "born_date" timestamptz(3) not null, "color" varchar(128) not null, "name" varchar(128) not null, constraint "Cat_pkey" primary key ("id"));');
  }

}
