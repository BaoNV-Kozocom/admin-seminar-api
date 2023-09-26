import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveToken1695697867818 implements MigrationInterface {
    name = 'RemoveToken1695697867818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refresh_token\` varchar(255) NULL`);
    }

}
