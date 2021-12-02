import HTTP from '../modules/http';

export default abstract class BaseAPI {
  protected http: HTTP;

  protected constructor(endpoint: string) {
    this.http = new HTTP(endpoint);
  }

  public abstract create?<Request, Response>(data: Request): Promise<Response>;

  public abstract read?<Response>(id?: string): Promise<Response>;

  public abstract update?<Request, Response>(id: string, data: Request): Promise<Response>;

  public abstract delete?<Response>(id: string): Promise<Response>;
}
