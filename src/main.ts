import TelevicApi from './televic-api/televic-api.js'
import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type TelevicConferoConfig } from './config.js'
import { UpdateVariableDefinitions } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'

export class TelevicConferoInstance extends InstanceBase<TelevicConferoConfig> {
	config!: TelevicConferoConfig // Setup in init()
	private _api: TelevicApi | null = null


	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: TelevicConferoConfig): Promise<void> {
		this.config = config
		this._api = new TelevicApi(config.host, config.port, config.token)
		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
	}
	// When module gets deleted
	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
	}

	async configUpdated(config: TelevicConferoConfig): Promise<void> {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}

	setSeatState(seatId: number, state: boolean, request: boolean) {
	console.log('Set Microphone State  ', seatId , " to ", state, " [", request, "]" )
		this._api?.SetSeat(seatId, state, request)
	}
}

runEntrypoint(TelevicConferoInstance, UpgradeScripts)
