import { TopRankingComponent } from './FrontProduct/top-ranking/top-ranking.component';
import { MostofferedComponent } from './FrontProduct/mostoffered/mostoffered.component';
import { BestSellersComponent } from './FrontProduct/best-sellers/best-sellers.component';
import { LatestProductsComponent } from './FrontProduct/latest-products/latest-products.component';
import { StoreComponent } from './FrontProduct/store/store.component';
import { ManageOrdersComponent } from './BackOffice/manage-orders/manage-orders.component';
import { HomeProductComponent } from './FrontProduct/home-product/home-product.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { CheckoutComponent } from './FrontProduct/checkout/checkout.component';
import { CartComponent } from './FrontProduct/cart/cart.component';
import { ViewProductComponent } from './FrontProduct/view-product/view-product.component';
import { AlltemplateFrontProductComponent } from './FrontProduct/alltemplate-front-product/alltemplate-front-product.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent} from './FrontOffice/all-template-front/all-template-front.component';
import { ListCompetitionComponent } from './BackOffice/list-competition/list-competition.component';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ListCompetitionsComponent } from './FrontOffice/list-competitions/list-competitions.component';

import { AddProductComponent } from './BackOffice/add-product/add-product.component';
import { ListProductComponent } from './BackOffice/list-product/list-product.component';
import { EditProductComponent } from './BackOffice/edit-product/edit-product.component';
import { CategorieProductComponent } from './BackOffice/categorie-product/categorie-product.component';
import { ListArchivedComponent } from './BackOffice/list-archived/list-archived.component';
import { ListCategoriesComponent } from './BackOffice/list-categories/list-categories.component';

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

import { UserRegisterComponent } from './FrontOffice/user-register/user-register.component';
import { TableadminComponent } from './BackOffice/tableadmin/tableadmin.component';
import { UserLoginComponent } from './FrontOffice/user-login/user-login.component';
import { config } from 'rxjs';
import { AuthGuardService } from './services/AuthGuardService';
import { UsereditComponent } from './FrontOffice/useredit/useredit.component';


import { ForgotpasswordComponent } from './FrontOffice/forgotpassword/forgotpassword.component';
import { SubscribeComponent } from './FrontOffice/subscribe/subscribe.component';
import { PaymentPageComponent } from './FrontOffice/payment-page/payment-page.component';


import { UserstatComponent } from './BackOffice/userstat/userstat.component';

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
import {ShowfeedbackComponent} from "./BackOffice/showfeedback/showfeedback.component";
import {ShowReclamationComponent} from "./BackOffice/show-reclamation/show-reclamation.component";
import {ProgressTrackingComponent} from "./FrontOffice/progress-tracking/progress-tracking.component";
import {AddfeedbackComponent} from "./FrontOffice/addfeedback/addfeedback.component";
import {ReclamationetfeedbackComponent} from "./FrontOffice/reclamationetfeedback/reclamationetfeedback.component";
import {AddReclamtionComponent} from "./FrontOffice/add-reclamation/add-reclamation.component";

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCourseComponent } from './BackOffice/add-course/add-course.component';

import { AddcourseComponent } from './FrontOffice/addcourse/addcourse.component';
import {ListCourseComponent} from "./BackOffice/list-course/list-course.component";
import {ModifCourceComponent} from "./BackOffice/modif-cource/modif-cource.component";
import {AddAnnulationComponent} from "./BackOffice/add-annulation/add-annulation.component";
import {ListeAnnulationComponent} from "./BackOffice/liste-annulation/liste-annulation.component";
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
    {path: 'my-group/:groupId', component:MyGroupComponent},
    {path:'groupsQuiz',component:GroupsQuizComponent},
    {path:'suggestedgroups',component:SuggestedGroupsComponent},

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

    ////////////////////////////////////////////////////////////
    {path:'addreclamtion', component:AddReclamtionComponent},
    {path:'recandfeed', component:ReclamationetfeedbackComponent},
    {path:'addfeedback',component:AddfeedbackComponent},
    { path: 'progress-tracking',component: ProgressTrackingComponent},
      //////////////////////////oumayma/////////////////////
      {path:'front', component:AddcourseComponent},
      {path:'liste', component:ListCourseComponent},
      { path:'modifier/:courseID', component: ModifCourceComponent },
      { path:'addAnnulation/:courseID', component: AddAnnulationComponent },

  ]
},{
  path:'eventFlyer',component:EventFlyerComponent

},

{ path: 'login', component: UserLoginComponent }, // Ad
{ path: 'forgotpassword', component: ForgotpasswordComponent },
{path:'useredit',component:UsereditComponent},
{path:'subscribe',component:SubscribeComponent},
{path:'payment-page',component:PaymentPageComponent},


{
  path:'register',component:UserRegisterComponent
},
{
  path: 'profile',
  component: UsereditComponent
},
{
  path:"product",
  component: AlltemplateFrontProductComponent,
  children: [
    {path:'viewproduct/:id',component:ViewProductComponent},
    {path:'cart',component:CartComponent},
    {path:'checkout',component:CheckoutComponent},
    {path:'homeproduct',component:HomeProductComponent},
    {path:'store/:id',component:StoreComponent},
    {path:'latestProducts',component:LatestProductsComponent},
    {path:'bestsellers',component:BestSellersComponent},
    {path:'most',component:MostofferedComponent},
    {path:'topRanking',component:TopRankingComponent},







  ]



},


{
  path:"registerjury",component:RegisterjuryComponent

},

{
  path:"admin",
  component: AllTemplateBackComponent,
  canActivate:[AuthGuardService],
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


    {path:'add-product',component:AddProductComponent},
    { path:'list-product',component:ListProductComponent},
    {path:'orderslist', component:ManageOrdersComponent},


{path:'edit-product/:id',component:EditProductComponent},
{path:'add-Categoriesproduct',component:CategorieProductComponent},
{path:'list_Archived',component:ListArchivedComponent},
{path:'list_Categories',component:ListCategoriesComponent},




    {path: 'usersList', component: TableadminComponent},
    {path:'useredit',component:UsereditComponent},
    {path:'Userstat',component:UserstatComponent},



    {path: 'usersList', component: TableadminComponent},
    {path:'useredit',component:UsereditComponent},
    { path: 'archivecometitions',component:ArchiveCompetitionsComponent},
    { path: 'leaderboard/:id', component: CompetitionRanksComponent },
    {path:'competitionDancers/:id', component:ShowCompetitionsDancersComponent},
    {path:'updateCompetition/:id',component:UpdateCompetitionComponent},
    {path:'CompetitionPDF/:id',component:CompetitionPDFComponent},
    /////////////////////MONTASAR////////////////////////////////////////
    { path: 'show/:reclamationId', component: ShowReclamationComponent },
    { path: 'showfeedback',component: ShowfeedbackComponent},
      /////////////////////////oumayma////////////////
      { path: 'add-course', component: AddCourseComponent },
      { path: 'liste-annulation', component: ListeAnnulationComponent },




  ]
},

{path:'**', redirectTo : 'homepage'},


];

@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
  providers: [AuthGuardService]

})
export class AppRoutingModule { }
