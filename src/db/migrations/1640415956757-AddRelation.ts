import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelation1640415956757 implements MigrationInterface {
    name = 'AddRelation1640415956757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dosen\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`dosen\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`alamat\` \`alamat\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`nomor_hp\` \`nomor_hp\` varchar(15) NULL`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`dosen1_id\` \`dosen1_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`dosen2_id\` \`dosen2_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`judul\` \`judul\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00''`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`judul\` \`judul\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`dosen2_id\` \`dosen2_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`dosen1_id\` \`dosen1_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`nomor_hp\` \`nomor_hp\` varchar(15) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` CHANGE \`alamat\` \`alamat\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`dosen\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00''`);
        await queryRunner.query(`ALTER TABLE \`dosen\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
    }

}
