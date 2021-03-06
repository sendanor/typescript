import RequestMethod from "./request/types/RequestMethod";
import Json from "./Json";
import RequestClientInterface from "./requestClient/RequestClientInterface";
import LogService from "./LogService";
import {REQUEST_CLIENT_FETCH_ENABLED, REQUEST_CLIENT_NODE_ENABLED} from "./requestClient/request-client-constants";
import NodeRequestClient from "./requestClient/node/NodeRequestClient";
import FetchRequestClient from "./requestClient/fetch/FetchRequestClient";

export const HTTP = REQUEST_CLIENT_NODE_ENABLED ? require('http') : undefined;

const LOG = LogService.createLogger('RequestClient');

export class RequestClient {

    private static _client : RequestClientInterface = RequestClient._initClient();

    public static jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: Json
    ) : Promise<Json| undefined> {
        return this._client.jsonRequest(method, url, headers, data);
    }

    public static getJson (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<Json| undefined> {
        LOG.debug('.getJson: ', url, headers);
        return this._client.jsonRequest(RequestMethod.GET, url, headers);
    }

    public static postJson (
        url      : string,
        data    ?: Json,
        headers ?: {[key: string]: string}
    ) : Promise<Json| undefined> {
        LOG.debug('.postJson: ', url, data, headers);
        return this._client.jsonRequest(RequestMethod.POST, url, headers, data);
    }

    public static putJson (
        url      : string,
        data    ?: Json,
        headers ?: {[key: string]: string}
    ) : Promise<Json| undefined> {
        LOG.debug('.putJson: ', url, data, headers);
        return this._client.jsonRequest(RequestMethod.PUT, url, headers, data);
    }

    public static deleteJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: Json
    ) : Promise<Json| undefined> {
        LOG.debug('.deleteJson: ', url, data, headers);
        return this._client.jsonRequest(RequestMethod.DELETE, url, headers, data);
    }

    private static _initClient () : RequestClientInterface {

        if ( REQUEST_CLIENT_FETCH_ENABLED ) {
            LOG.debug('Detected browser environment');
            return new FetchRequestClient( window.fetch.bind(window) );
        }

        if ( REQUEST_CLIENT_NODE_ENABLED ) {
            LOG.debug('Detected NodeJS environment');
            return new NodeRequestClient(HTTP);
        }

        throw new TypeError(`Could not detect request client implementation`);

    }

}

export default RequestClient;
