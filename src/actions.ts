// import { Regex } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

export function UpdateActions(self: ModuleInstance):void {
	self.setActionDefinitions({
		setSeatState:{
			name: "Set Microphone State",
			options: [
			{
				id: 'seatID',
				type: 'number',
				label: 'seat Number',
				default: 1,
				min: 1,
				max: 200,
			},
			{
				id: 'state',
				type: 'checkbox',
				label: 'State',
				default: true,
			}
		],
		callback: async ({options}) => {
			const seatID =  await self.parseVariablesInString(options.seatID as string)
			const state = await self.parseVariablesInString(options.state as string)
			console.log('Set Microphone State  ', seatID , " to ", state)
			self.setSeatState(parseInt(seatID), JSON.parse(state))
		},
	}
	})
}
