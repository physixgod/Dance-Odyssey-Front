import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent} from './FrontOffice/all-template-front/all-template-front.component';
import { ListCompetitionComponent } from './BackOffice/list-competition/list-competition.component';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ListCompetitionsComponent } from './FrontOffice/list-competitions/list-competitions.component';
import { AddEventComponent } from './FrontOffice/add-event/add-event.component';
import { UserRegisterComponent } from './FrontOffice/user-register/user-register.component';
import { TableadminComponent } from './BackOffice/tableadmin/tableadmin.component';
import { UserLoginComponent } from './FrontOffice/user-login/user-login.component';
import { config } from 'rxjs';
import { AuthGuardService } from './services/AuthGuardService';
import { UsereditComponent } from './FrontOffice/useredit/useredit.component';
import { EventsListComponent } from './FrontOffice/events-list/events-list.component';
import { TestComponent } from './test/test.component';
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





const routes: Routes = [
{ path:"",
  component: AllTemplateFrontComponent,
  children:[
    {path:'homepage', component: HomeComponent },
    {path:'competitions', component:ListCompetitionsComponent},
    {path:'addevent', component:AddEventComponent},
    {path:'listevents', component:EventsListComponent},
    {path:'competition/:id',component:ReadmoreCompetitionsComponent},
    {path:'myCompetitions/:id',component:MyCompetitionsComponent},
    {path:'MyEvents',component:MyEventsComponent},
    {path:'upgradevent/:id',component:UpgradeEventComponent},
    {path:'trivia',component:TriviaComponent},
    {path:'registerEvent/:id',component:RegisterEventComponent},
    {path:'addAcc/:id',component:AddAccommodationComponent},
    {path:'showEventsAcc/:id',component:ShowEventsAccComponent},
    {path:'rockGame',component:RockGameComponent},
    {path: 'results/:updatedScore', component: ResultsComponent },
    {path:'pro',component:TestComponent},



  
  ]
},{
  path:'eventFlyer',component:EventFlyerComponent
  
},
{ path: 'login', component: UserLoginComponent }, // Ad
{
  path:'register',component:UserRegisterComponent
},
{
  path: 'profile',
  component: UsereditComponent
},
{
  path:"admin",
  component: AllTemplateBackComponent,
  canActivate:[AuthGuardService],
  children: [
    { path: 'list-competition', component: ListCompetitionComponent },
    { path: 'add-competition', component: AddCompetitionComponent },
    { path: 'list-event', component: AddCompetitionComponent },

    {path: 'usersList', component: TableadminComponent},
    {path:'useredit',component:UsereditComponent},
    { path: 'archivecometitions',component:ArchiveCompetitionsComponent},
    { path: 'leaderboard/:id', component: CompetitionRanksComponent },
    {path:'competitionDancers/:id', component:ShowCompetitionsDancersComponent},
    {path:'updateCompetition/:id',component:UpdateCompetitionComponent},
    {path:'CompetitionPDF/:id',component:CompetitionPDFComponent},
    
    
  ]
},
{path:'**', redirectTo : 'homepage'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
  providers: [AuthGuardService]

})
export class AppRoutingModule { }
