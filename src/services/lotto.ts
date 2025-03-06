import { safeRand } from '../utils/math';
import { lottoSpdProb } from '../constants/lotto';
import { singleton } from 'tsyringe';

@singleton()
class LottoService {
  public buyLottoSpd(count: number): number[] {
    const result: number[] = new Array(count);
    for (let i = 0; i < count; i++) {
      const prob = safeRand();
      for (let j = 1; j <= 6; j++) {
        if (prob <= lottoSpdProb[j]) {
          result[i] = j;
          break;
        }
      }
      result[i] = 6;
    }

    return result;
  }
}

export default LottoService;
