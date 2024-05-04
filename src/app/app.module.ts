import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
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
import { HttpClientModule } from '@angular/common/http';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { FormsModule } from '@angular/forms';
import { ListCompetitionsComponent } from './FrontOffice/list-competitions/list-competitions.component';
import { AddEventComponent } from './FrontOffice/add-event/add-event.component';
import { GetjuriesComponent } from './BackOffice/getjuries/getjuries.component';
import { CompetitionDetailsComponent } from './BackOffice/competition-details/competition-details.component';
import { JuryaffectationComponent } from './BackOffice/juryaffectation/juryaffectation.component';
import { JudgingCriteriaComponent } from './BackOffice/judging-criteria/judging-criteria.component';
import { ShowaffectedjuriesComponent } from './BackOffice/showaffectedjuries/showaffectedjuries.component';
import { ShowAprrovedJuriesComponent } from './BackOffice/show-aprroved-juries/show-aprroved-juries.component';
import { RegisterjuryComponent } from './registerjury/registerjury.component';
import { NoteComponent } from './FrontOffice/note/note.component';
import { ParticipantScoreComponent } from './FrontOffice/participant-score/participant-score.component';
import { GroupCreationComponent } from './FrontOffice/group-creation/group-creation.component';
import { AllGroupsComponent } from './FrontOffice/all-groups/all-groups.component';
import { MyGroupComponent } from './FrontOffice/my-group/my-group.component';
import { GroupsQuizComponent } from './FrontOffice/groups-quiz/groups-quiz.component';
import { SuggestedGroupsComponent } from './FrontOffice/suggested-groups/suggested-groups.component';


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
    ListCompetitionsComponent,
    AddEventComponent,
    GetjuriesComponent,
    CompetitionDetailsComponent,
    JuryaffectationComponent,
    JudgingCriteriaComponent,
    ShowaffectedjuriesComponent,
    ShowAprrovedJuriesComponent,
    RegisterjuryComponent,
    NoteComponent,
    ParticipantScoreComponent,
    GroupCreationComponent,
    AllGroupsComponent,
    MyGroupComponent,
    GroupsQuizComponent,
    SuggestedGroupsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
