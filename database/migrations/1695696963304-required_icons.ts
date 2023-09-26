import { MigrationInterface, QueryRunner } from "typeorm";

export class RequiredIcons1695696963304 implements MigrationInterface {
    name = 'RequiredIcons1695696963304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`link\` CHANGE \`icon\` \`icon\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`link\` CHANGE \`icon\` \`icon\` varchar(255) NULL`);
    }

}
