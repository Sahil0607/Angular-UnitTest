import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FirstStrArrayComponent } from './first-str-array/first-str-array.component';
import { SecondStateChangeComponent } from './second-state-change/second-state-change.component';
import { ThirdServiceComponent } from './third-service/third-service.component';
import { FourthFormEventConformComponent } from './fourth-form-event-conform/fourth-form-event-conform.component';
import { FifthSpyInteractionComponent } from './fifth-spy-interaction/fifth-spy-interaction.component';
import { SixthIntegrPropertyEventbindingComponent } from './sixth-integr-property-eventbinding/sixth-integr-property-eventbinding.component';
import { SeventhDependancyComponent } from './seventh-dependancy/seventh-dependancy.component';
import { EigthRouterActivatedrouterComponent } from './eigth-router-activatedrouter/eigth-router-activatedrouter.component';
import { NinthAsyncDirectiveAttrComponent } from './ninth-async-directive-attr/ninth-async-directive-attr.component';
import { TenthFakeAsyncTickComponent } from './tenth-fake-async-tick/tenth-fake-async-tick.component';
import { JoeFormTestComponent } from './joe-form-test/joe-form-test.component';

import { HighlightDirective } from './ninth-async-directive-attr/directive-attr/highlight.directive';
import { NewDirectiveDirective } from './ninth-async-directive-attr/new-directive/new-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    FirstStrArrayComponent,
    SecondStateChangeComponent,
    ThirdServiceComponent,
    FourthFormEventConformComponent,
    FifthSpyInteractionComponent,
    SixthIntegrPropertyEventbindingComponent,
    SeventhDependancyComponent,
    EigthRouterActivatedrouterComponent,
    NinthAsyncDirectiveAttrComponent,
    HighlightDirective,
    NewDirectiveDirective,
    TenthFakeAsyncTickComponent,
    JoeFormTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
     ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
