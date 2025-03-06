import { commandData as PingCommandData } from './ping';
import { commandData as DiceCommandData } from './dice';
import { commandData as LottoCommandData } from './lotto';
import { commandData as RegisterCommandData } from './register';

export const commandDatas = [
  PingCommandData,
  DiceCommandData,
  LottoCommandData,
  RegisterCommandData,
];

export { default as PingCommand } from './ping';
export { default as DiceCommand } from './dice';
export { default as LottoCommand } from './lotto';
export { default as RegisterCommand } from './register';
