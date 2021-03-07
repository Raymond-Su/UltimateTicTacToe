export class LoggerService {
  public static log(title: string, message: any) {
    console.log(`[Message]`, `\t${title}`, `\t${message}`);
  }

  public static logError(title: string, message: any) {
    console.log(`[Error]`, `\t${title}`, `\t${message}`);
  }

  public static gameLog(title: string, message: any) {
    console.log(`[Game]`, `\t${title}`, `\t${message}`);
  }
}
