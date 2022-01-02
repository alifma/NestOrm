import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DosenService } from 'src/dosen/dosen.service';
import {
  ItemMailDTO,
  MailDTO,
  NewSerahTerimaDTO,
  PrintSerahTerimaDTO,
} from 'src/dto/mail.dto';
import {
  ExecResponseDTO,
  StandardResponseDTO,
} from 'src/dto/standard-response.dto';
import { Dosen } from 'src/entity/dosen.entity';
import { Mail, MailType } from 'src/entity/mail.entity';
import { MahasiswaService } from 'src/mahasiswa/mahasiswa.service';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail) private mailRepository: Repository<Mail>,
    private dosenService: DosenService,
    private mhswService: MahasiswaService,
  ) {}

  async getKalabData(): Promise<Dosen> {
    return await this.dosenService.getOneById(11);
  }

  async getMailData(reqId: number): Promise<MailDTO> {
    try {
      return await this.mailRepository.manager
        .query(
          `
        SELECT 
          mail.id as id,
          mail.mail_number as surat_nomor,
          mail.tipe as tipe,
          mail.mahasiswaId as mahasiswaId,
          mhsw.nama as mhsw_nama,
          mhsw.nim as mhsw_nim,
          mhsw.judul as mhsw_judul,
          mhsw.tanggal_lulus as mhsw_tanggal_lulus,
          mhsw.dosen1Id as dosen1Id,
          mhsw.dosen2Id as dosen2Id,
          mhsw.ketuaPengujiId as ketuaPengujiId,
          mail.created_at as surat_tanggal_cetak
        FROM mail
        LEFT JOIN mahasiswa mhsw ON mhsw.id = mail.mahasiswaId
        WHERE mail.id = ?`,
          [reqId],
        )
        .then((res: MailDTO[]) => {
          return res[0];
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  formatNomorSuratSerahTerima(num: number): string {
    let year = new Date().getFullYear();
    return `${this.addZero(num, 3)}/UN43.2.05.1/PK/${year}`;
  }

  addZero(num: number, size: number): string {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }

  convertIndonesianTime(tanggal: Date, type: string): string {
    const day = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ];
    const month = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    let date = new Date(tanggal);
    let hari = day[date.getDay()];
    let bulan = month[date.getMonth()];
    if (type == 'long') {
      return `${hari}, ${date.getDate()} ${bulan} ${date.getFullYear()}`;
    } else {
      return `${date.getDate()} ${bulan} ${date.getFullYear()}`;
    }
  }

  async printSerahTerima(id: number): Promise<PrintSerahTerimaDTO> {
    try {
      let dataSurat = await this.getMailData(id);
      if (!dataSurat) {
        throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND);
      }
      let kalab = await this.getKalabData();
      let dataKetuaPenguji = await this.dosenService.getOneById(
        dataSurat.ketuaPengujiId,
      );
      let dataDosen1 = await this.dosenService.getOneById(dataSurat.dosen1Id);
      let dataDosen2 = await this.dosenService.getOneById(dataSurat.dosen2Id);
      let res: PrintSerahTerimaDTO = {
        surat_nomor: dataSurat.surat_nomor,
        kalab_nama: kalab.nama,
        kalab_jenis: kalab.tipe,
        kalab_nip: kalab.nomor,
        mhsw_nama: dataSurat.mhsw_nama,
        mhsw_nim: dataSurat.mhsw_nim,
        mhsw_judul: dataSurat.mhsw_judul,
        mhsw_tanggal_lulus: this.convertIndonesianTime(
          dataSurat.mhsw_tanggal_lulus,
          'short',
        ),
        ketua_penguji_nama: dataKetuaPenguji.nama,
        dosen1_nama: dataDosen1.nama,
        dosen2_nama: dataDosen2.nama,
        surat_tanggal_cetak: this.convertIndonesianTime(
          dataSurat.surat_tanggal_cetak,
          'long',
        ),
      };
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getCount(tipe: string): Promise<number> {
    if (tipe == MailType.bebasPustaka || tipe == MailType.serahTerima) {
      return await this.mailRepository.count({ where: { tipe: tipe } });
    }
    return await this.mailRepository.count();
  }

  async getLastId(): Promise<number> {
    let lastMail = await this.mailRepository.findOne({
      order: { created_at: 'DESC' },
    });
    return lastMail.id;
  }

  async UpdateSerahTerima(
    id: string,
    req: NewSerahTerimaDTO,
  ): Promise<ExecResponseDTO> {
    if (!req.number) {
      req.number = (await this.getLastId()) + 1;
    }
    if (!(req.tipe in MailType)) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    const mhswData = await this.mhswService.getDetailed(req.mahasiswaId);
    if (!mhswData) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    try {
      this.mailRepository
        .createQueryBuilder('mail')
        .update(Mail)
        .set({
          number: req.number,
          mail_number: this.formatNomorSuratSerahTerima(req.number),
          tipe: req.tipe,
          mahasiswa: req.mahasiswaId,
          user: req.user,
          created_at: req.created_at,
          updated_at: () => 'CURRENT_TIMESTAMP',
        })
        .where('id = :id', {
          id: id,
        })
        .execute();
      return {
        status: true,
        description: `Mail ${id} updated`,
      };
    } catch (error) {
      return {
        status: false,
        description: `Update mail failed, ${error}`,
      };
    }
  }
  async createSerahTerima(req: NewSerahTerimaDTO): Promise<ExecResponseDTO> {
    if (!req.number) {
      req.number = (await this.getLastId()) + 1;
    }
    if (!(req.tipe in MailType)) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    if (!req.created_at) {
      req.created_at = new Date();
    }
    const mhswData = await this.mhswService.getDetailed(req.mahasiswaId);
    if (!mhswData) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    const newMail = this.mailRepository.create({
      number: req.number,
      mail_number: this.formatNomorSuratSerahTerima(req.number),
      tipe: req.tipe,
      mahasiswa: req.mahasiswaId,
      user: req.user,
      created_at: req.created_at,
    });
    try {
      this.mailRepository.save(newMail);
      return {
        status: true,
        description: `New user is created`,
      };
    } catch (error) {
      return {
        status: false,
        description: `Create user failed, ${error}`,
      };
    }
  }

  async getAll(
    limit: number,
    page: number,
    sort: string,
    tipe: string,
  ): Promise<StandardResponseDTO> {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 20;
    }
    if (
      !sort ||
      (sort.toUpperCase() !== 'ASC' && sort.toUpperCase() !== 'DESC')
    ) {
      sort = 'ASC';
    }
    const count: number = await this.getCount(tipe);
    let mainQuery = `
    SELECT 
      mail.id as id,
      mail.mail_number as surat_nomor,
      mail.tipe as tipe,
      mhsw.nama as mhsw_nama,
      mhsw.nim as mhsw_nim,
      user.nama as user_nama,
      mail.created_at as surat_tanggal_cetak
    FROM mail
    LEFT JOIN mahasiswa mhsw ON mhsw.id = mail.mahasiswaId
    LEFT JOIN user ON mail.userId = user.id
    `;
    if (tipe == MailType.bebasPustaka || tipe == MailType.serahTerima) {
      mainQuery += ` WHERE mail.tipe = '${tipe}' `;
    }
    const totalPage: number = Math.ceil(count / limit);
    try {
      let finalRes: StandardResponseDTO;
      await this.mailRepository.manager
        .query(
          mainQuery +
            ` ORDER BY mail.created_at ` +
            sort +
            ` LIMIT ? OFFSET ? 
      `,
          [limit, limit * (page - 1)],
        )
        .then((res: ItemMailDTO[]) => {
          finalRes = {
            total_pages: totalPage,
            per_page: limit,
            total_data: count,
            page: page,
            list: res,
          };
        })
        .catch((err) => {
          throw err;
        });
      return finalRes;
    } catch (error) {
      throw error;
    }
  }
}
