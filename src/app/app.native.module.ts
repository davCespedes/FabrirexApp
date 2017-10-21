import { NgModule,ModuleWithProviders } from "@angular/core";
import { Toast } from '@ionic-native/toast';

@NgModule()
export class AppNativeModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AppNativeModule,
			providers: [
				Toast
			]
		};
	}
}