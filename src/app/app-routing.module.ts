import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent} from './FrontOffice/all-template-front/all-template-front.component';
import { ListCompetitionComponent } from './BackOffice/list-competition/list-competition.component';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ListCompetitionsComponent } from './FrontOffice/list-competitions/list-competitions.component';
import { AddEventComponent } from './FrontOffice/add-event/add-event.component';
import { GetjuriesComponent } from './BackOffice/getjuries/getjuries.component';
import { CompetitionDetailsComponent } from './BackOffice/competition-details/competition-details.component';
import { JuryaffectationComponent } from './BackOffice/juryaffectation/juryaffectation.component';
import { JudgingCriteriaComponent } from './BackOffice/judging-criteria/judging-criteria.component';
import { ShowaffectedjuriesComponent } from './BackOffice/showaffectedjuries/showaffectedjuries.component';
import { ShowAprrovedJuriesComponent } from './BackOffice/show-aprroved-juries/show-aprroved-juries.component';
import { FilterPipe } from './filter.pipe';
import { RegisterjuryComponent } from './registerjury/registerjury.component';
import {NoteComponent} from './FrontOffice/note/note.component';
import {ParticipantScoreComponent} from './FrontOffice/participant-score/participant-score.component';
import {GroupCreationComponent} from './FrontOffice/group-creation/group-creation.component';
import {AllGroupsComponent} from './FrontOffice/all-groups/all-groups.component';
import{MyGroupComponent} from './FrontOffice/my-group/my-group.component';
import { GroupsQuizComponent } from './FrontOffice/groups-quiz/groups-quiz.component';
import { SuggestedGroupsComponent } from './FrontOffice/suggested-groups/suggested-groups.component';

const routes: Routes = [
{ path:"",
  component: AllTemplateFrontComponent,
  children:[
    {path:'homepage', component: HomeComponent },
    {path:'competitions', component:ListCompetitionsComponent},
    {path:'addevent', component:AddEventComponent},
    {path:'uploading-score', component:NoteComponent},
    {path:'participant-score', component:ParticipantScoreComponent},
    {path:'group-creation', component:GroupCreationComponent},
    {path:'all-groups', component:AllGroupsComponent},//
    {path:'my-group', component:MyGroupComponent},
    {path:'groupsQuiz',component:GroupsQuizComponent},
    {path:'suggestedgroups',component:SuggestedGroupsComponent}//

  ]
},
{
  path:"registerjury",component:RegisterjuryComponent
  
},

{
  path:"admin",
  component: AllTemplateBackComponent,
  children: [
    { path: 'list-competition', component: ListCompetitionComponent },
    { path: 'add-competition', component: AddCompetitionComponent },
    { path: 'list-event', component: AddCompetitionComponent },
    { path:'jurieslist',component:GetjuriesComponent},
    { path: 'competitionsmanaging', component: CompetitionDetailsComponent },
    { path:'jurieslistaffectation/:competitionId', component:JuryaffectationComponent },
    {path:'showAffectedJuries/:competitionId',component:ShowaffectedjuriesComponent},
    {path:'ApprovedJuries',component:ShowAprrovedJuriesComponent},
    { path: 'judgingcreteriaaffectation/:competitionId',component: JudgingCriteriaComponent},
    

    
  ]
}
];

@NgModule({
  declarations: [
    FilterPipe 
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
