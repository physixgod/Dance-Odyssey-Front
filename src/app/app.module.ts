import { NgModule } from '@angular/core';
import { WebcamModule } from 'ngx-webcam';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ListCompetitionComponent } from './BackOffice/list-competition/list-competition.component';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { ListCompetitionsComponent } from './FrontOffice/list-competitions/list-competitions.component';

import { AddEventComponent } from './FrontOffice/add-event/add-event.component';
import { UserRegisterComponent } from './FrontOffice/user-register/user-register.component';
import { TableadminComponent } from './BackOffice/tableadmin/tableadmin.component';
import { UserLoginComponent } from './FrontOffice/user-login/user-login.component';
import { TokenInterceptor } from './services/token.interceptor';

import { ForgotpasswordComponent } from './FrontOffice/forgotpassword/forgotpassword.component';
import { SubscribeComponent } from './FrontOffice/subscribe/subscribe.component';
import { PaymentPageComponent } from './FrontOffice/payment-page/payment-page.component';

import { UserstatComponent } from './BackOffice/userstat/userstat.component';

import { SubstatComponent } from './BackOffice/substat/substat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { UsereditComponent } from './FrontOffice/useredit/useredit.component'; 
import { EventsListComponent } from './FrontOffice/events-list/events-list.component';

import { ArchiveCompetitionsComponent } from './BackOffice/archive-competitions/archive-competitions.component';
import { CompetitionRanksComponent } from './competition-ranks/competition-ranks.component';
import { ReadmoreCompetitionsComponent } from './FrontOffice/readmore-competitions/readmore-competitions.component';
import { ShowCompetitionsDancersComponent } from './BackOffice/show-competitions-dancers/show-competitions-dancers.component';
import { UpdateCompetitionComponent } from './BackOffice/update-competition/update-competition.component';
import { MyCompetitionsComponent } from './FrontOffice/my-competitions/my-competitions.component';
import { MyEventsComponent } from './FrontOffice/my-events/my-events.component';
import { UpgradeEventComponent } from './FrontOffice/upgrade-event/upgrade-event.component';
import { CompetitionPDFComponent } from './BackOffice/competition-pdf/competition-pdf.component';
import { TriviaComponent } from './FrontOffice/trivia/trivia.component';

import { RegisterEventComponent } from './FrontOffice/register-event/register-event.component';
import { EventFlyerComponent } from './event-flyer/event-flyer.component';
import { AddAccommodationComponent } from './FrontOffice/add-accommodation/add-accommodation.component';
import { ShowEventsAccComponent } from './FrontOffice/show-events-acc/show-events-acc.component';
import { RockGameComponent } from './FrontOffice/rock-game/rock-game.component';
import { ResultsComponent } from './FrontOffice/results/results.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    
    AppComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    HomeComponent,
    ListCompetitionComponent,
    AddCompetitionComponent,
    AddEventComponent,
    UserRegisterComponent,
    TableadminComponent,
    UserLoginComponent,
    UsereditComponent,
    ForgotpasswordComponent,
    SubscribeComponent,
    PaymentPageComponent,
   
    UserstatComponent,
    SubstatComponent,
    EventsListComponent,
   
    ArchiveCompetitionsComponent,
    CompetitionRanksComponent,
    ReadmoreCompetitionsComponent,
    ShowCompetitionsDancersComponent,
    UpdateCompetitionComponent,
    MyCompetitionsComponent,
    MyEventsComponent,
    UpgradeEventComponent,
    CompetitionPDFComponent,
    TriviaComponent,
    RegisterEventComponent,
    EventFlyerComponent,
    AddAccommodationComponent,
    ShowEventsAccComponent,
    RockGameComponent,
    ResultsComponent,
    ListCompetitionsComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    WebcamModule,
    NgxChartsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LdCdJMpAAAAAKltrUz-qET2XZVRliujyOkTXmvy'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
