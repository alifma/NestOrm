import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtConfig } from "database.config";
import {ExtractJwt, Strategy} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpirate: true,
      secretOrKey: JwtConfig.toString()
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      name: payload.name
    };
  }
}