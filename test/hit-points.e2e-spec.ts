import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DefaultPlayerService } from '../src/hit-points/default-player/default-player.service';

describe('HitPointsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const defaultPlayerService = app.get(DefaultPlayerService);

    await app.init();
    await defaultPlayerService.deleteDefaultPlayer();
    await defaultPlayerService.createDefaultPlayer();
  });

  describe('/hit-points/deal-damage', () => {
    it('with immunity', async () => {
      const response = await request(app.getHttpServer())
        .post('/hit-points/deal-damage')
        .send({ damage: 5, damageType: 'fire' })
        .expect(201);
      expect(response.body).toEqual({
        message: 'No damage (immunity)',
      });
    });
    it('with resistance', async () => {
      const response = await request(app.getHttpServer())
        .post('/hit-points/deal-damage')
        .send({ damage: 10, damageType: 'slashing' })
        .expect(201);
      expect(response.body).toEqual({
        message: 'Deal manage 5 slashing damage',
        hitPoints: 20,
        temporaryHitPoints: 0,
      });
    });
    it('with no resistance or immunity', async () => {
      const response = await request(app.getHttpServer())
        .post('/hit-points/deal-damage')
        .send({ damage: 10, damageType: 'radiant' })
        .expect(201);
      expect(response.body).toEqual({
        message: 'Deal manage 10 radiant damage',
        hitPoints: 15,
        temporaryHitPoints: 0,
      });
    });
    it('with temporary hit points', async () => {
      const req = request(app.getHttpServer());

      await req.post('/hit-points/add-temporary').send({ hitPoints: 5 });

      const response = await req
        .post('/hit-points/deal-damage')
        .send({ damage: 10, damageType: 'radiant' })
        .expect(201);
      expect(response.body).toEqual({
        message: 'Deal manage 5 radiant damage',
        hitPoints: 20,
        temporaryHitPoints: 0,
      });
    });
  });

  describe('/hit-points/heal', () => {
    it('heal', async () => {
      const response = await request(app.getHttpServer())
        .post('/hit-points/heal')
        .send({ heal: 5 })
        .expect(201);
      expect(response.body).toEqual({
        message: 'Heal 5 hit points',
        hitPoints: 30,
        temporaryHitPoints: 0,
      });
    });
  });

  describe('/hit-points/add-temporary', () => {
    it('add temporary hit points', async () => {
      const response = await request(app.getHttpServer())
        .post('/hit-points/add-temporary')
        .send({ hitPoints: 5 })
        .expect(201);
      expect(response.body).toEqual({
        message: 'Add 5 temporary hit points',
        hitPoints: 25,
        temporaryHitPoints: 5,
      });
    });
  });
});
