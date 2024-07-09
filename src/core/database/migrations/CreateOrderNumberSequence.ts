import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderNumberSequence1600000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
	DO $$
	BEGIN
	  IF NOT EXISTS (
		SELECT FROM pg_class
		WHERE relkind = 'S'
		AND relname = 'order_number_seq'
	  ) THEN
		CREATE SEQUENCE order_number_seq
		START WITH 1
		INCREMENT BY 1;
	  END IF;
	END
	$$;
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			DROP SEQUENCE order_number_seq;
		`);
  }
}
