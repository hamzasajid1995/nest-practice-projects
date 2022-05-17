import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}

  computeData(a: number, b: number) {
    console.log('Drawing power of 10 watts');
    this.powerService.supplyPower(10);
    return a + b;
  }
}
