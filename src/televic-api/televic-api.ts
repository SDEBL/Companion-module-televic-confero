import fetch, { HeadersInit, Response } from 'node-fetch'
//const node_fetch_1 = __importDefault(require("node-fetch"));

class HTTPResponseError extends Error {
	response: any
	constructor(response: Response) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`)
		this.response = response
	}
}

interface TelevicMicStatusResponse{
    microphoneOn: boolean
    requestingToSpeak: boolean
}

export default class TelevicApi {
	private _host: string
	private _port: number
	private _token: string
    private _defaultHeaders: HeadersInit

	constructor(host: string, port: number, token: string) {
		this._host = host
		this._port = port
		this._token = token
		this._defaultHeaders = {
			Accept: 'application/json',
			Authorization: `Bearer ${this._token}`
		}
	}

	private checkStatus(response: Response) {
		if (response.ok) {
			// response.status >= 200 && response.status < 300
			return response
		} else {
			throw new HTTPResponseError(response)
		}
	}
	public async GetSeat(seatNbr: number) { //: Promise<InUseStatus>
		const url = `http://${this._host}:${this._port}/api/discussion/seats/${seatNbr}`
		const response = await fetch(url, {
			method: 'get',
			headers: this._defaultHeaders,
		})
		this.checkStatus(response)
		const data = (await response.json()) as TelevicMicStatusResponse
		return {
			microphoneOn: data.microphoneOn,
			requestingToSpeak: data.requestingToSpeak,
		}
	}
	
	public async SetSeat(seatNbr: number, state: boolean, request: boolean){ //: Promise<InUseStatus> {
		const url = `http://${this._host}:${this._port}/api/discussion/seats/${seatNbr}`
		const response = await fetch(url, {
			method: 'put',
			headers: this._defaultHeaders,
			body: JSON.stringify({microphoneOn: state, "requestingToSpeak": request})
		})
		return this.checkStatus(response)
		
	}
}
