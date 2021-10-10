import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { PickupRequest } from '../../modules/pickup_request/pickup_request.entity';
import { NGOPickup } from '../../modules/ngo_pickup/ngo_pickup.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (): Promise<Sequelize> => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, PickupRequest, NGOPickup]);
      await sequelize.sync({});
      return sequelize;
    },
  },
];
