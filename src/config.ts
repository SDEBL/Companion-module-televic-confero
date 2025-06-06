import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface TelevicConferoConfig {
	host: string
	port: number
	token: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Confero IP',
			width: 8,
			regex: Regex.IP,
		},
		{
			type: 'number',
			id: 'port',
			label: 'Target Port',
			width: 4,
			min: 1,
			max: 65535,
			default: 9080,
		},
		{
			type: 'textinput',
			id: 'token',
			label: 'API Bearer token',
			width: 25,
		},
	]
}
