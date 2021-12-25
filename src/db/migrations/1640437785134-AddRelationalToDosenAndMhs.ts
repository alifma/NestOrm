import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationalToDosenAndMhs1640437785134 implements MigrationInterface {
    name = 'AddRelationalToDosenAndMhs1640437785134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`mahasiswa\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nim\` varchar(10) NOT NULL, \`nama\` varchar(50) NOT NULL, \`alamat\` text NULL, \`nomor_hp\` varchar(15) NULL, \`judul\` varchar(255) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL, \`dosen1DosenId\` int NULL, \`dosen2DosenId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dosen\` (\`dosen_id\` int NOT NULL AUTO_INCREMENT, \`dosen_nama\` varchar(50) NOT NULL, \`dosen_tipe\` enum ('NIP', 'NIDN') NOT NULL DEFAULT 'NIP', \`dosen_nomor\` varchar(20) NULL DEFAULT '', \`dosen_created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`dosen_updated_at\` timestamp NOT NULL, PRIMARY KEY (\`dosen_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`userId\` int NULL, \`user2Id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` ADD CONSTRAINT \`FK_c5df12dfd2c42daa5a25293871c\` FOREIGN KEY (\`dosen1DosenId\`) REFERENCES \`dosen\`(\`dosen_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` ADD CONSTRAINT \`FK_69c1deda9016c1664f855fa508f\` FOREIGN KEY (\`dosen2DosenId\`) REFERENCES \`dosen\`(\`dosen_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_4494006ff358f754d07df5ccc87\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_40874be5203d71b03920793f14b\` FOREIGN KEY (\`user2Id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_40874be5203d71b03920793f14b\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_4494006ff358f754d07df5ccc87\``);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` DROP FOREIGN KEY \`FK_69c1deda9016c1664f855fa508f\``);
        await queryRunner.query(`ALTER TABLE \`mahasiswa\` DROP FOREIGN KEY \`FK_c5df12dfd2c42daa5a25293871c\``);
        await queryRunner.query(`DROP TABLE \`photo\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`dosen\``);
        await queryRunner.query(`DROP TABLE \`mahasiswa\``);
    }

}
