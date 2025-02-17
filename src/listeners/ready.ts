import DiceCommand from '../commands/dice';
import LottoCommand from '../commands/lotto';
import PingCommand from '../commands/ping';
import {
  chatInputCommandMap,
  registerChatInputCommand,
} from '../utils/commandMap';

async function readyListener() {
  console.log('Load all commands..');
  registerChatInputCommand(new PingCommand());
  registerChatInputCommand(new DiceCommand());
  registerChatInputCommand(new LottoCommand());
  console.log(`${chatInputCommandMap.size} commands are loaded!`);
}

export default readyListener;
