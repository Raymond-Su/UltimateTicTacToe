export class LoggerService {
  public static log(title: string, message: any) {
    console.log(`[Server]`, `${title}`, `${message}`);
  }

  public static logError(title: string, message: any) {
    console.log(`[Error]`, `${title}`, `${message}`);
  }

  public static gameLog(title: string, message: any) {
    console.log(`[Game]`, `${title}`, `${message}`);
  }
}
