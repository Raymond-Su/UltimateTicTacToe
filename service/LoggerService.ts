export class LoggerService {
  public static log(title: string, message: any) {
    console.log('\x1b[33m%s\x1b[1m', `[Message]`, `\t${title}`, `\t${message}`);
  }

  public static logError(title: string, message: any) {
    console.log('\x1b[31m%s\x1b[1m', `[Error]`, `\t${title}`, `\t${message}`);
  }

  public static gameLog(title: string, message: any) {
    console.log('\x1b[32m%s\x1b[1m', `[Game]`, `\t${title}`, `\t${message}`);
  }
}
