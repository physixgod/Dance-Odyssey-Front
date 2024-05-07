
import { UserRegisterComponent } from './FrontOffice/user-register/user-register.component';
import { TableadminComponent } from './BackOffice/tableadmin/tableadmin.component';
import { UserLoginComponent } from './FrontOffice/user-login/user-login.component';
import { TokenInterceptor } from './services/token.interceptor';

import { ForgotpasswordComponent } from './FrontOffice/forgotpassword/forgotpassword.component';
import { SubscribeComponent } from './FrontOffice/subscribe/subscribe.component';
import { PaymentPageComponent } from './FrontOffice/payment-page/payment-page.component';
import { UserstatComponent } from './BackOffice/userstat/userstat.component';

import { SubstatComponent } from './BackOffice/substat/substat.component';
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
import { RockGameComponent } from './FrontOffice/rock-game/rock-game.component';
import { ResultsComponent } from './FrontOffice/results/results.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule ici
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
import { AddProductComponent } from './BackOffice/add-product/add-product.component';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './BackOffice/list-product/list-product.component';
import { EditProductComponent } from './BackOffice/edit-product/edit-product.component';
import { CategorieProductComponent } from './BackOffice/categorie-product/categorie-product.component';
import { ListArchivedComponent } from './BackOffice/list-archived/list-archived.component';
import { ListCategoriesComponent } from './BackOffice/list-categories/list-categories.component';
import { HeaderComponent } from './FrontProduct/header/header.component';
import { FooterComponent } from './FrontProduct/footer/footer.component';
import { AlltemplateFrontProductComponent } from './FrontProduct/alltemplate-front-product/alltemplate-front-product.component';
import { ShowEventsAccComponent } from './FrontOffice/show-events-acc/show-events-acc.component';
import { ViewProductComponent } from './FrontProduct/view-product/view-product.component';
import { CartComponent } from './FrontProduct/cart/cart.component';
import { CheckoutComponent } from './FrontProduct/checkout/checkout.component';
import { HomeProductComponent } from './FrontProduct/home-product/home-product.component';
import { ManageOrdersComponent } from './BackOffice/manage-orders/manage-orders.component';
import { StoreComponent } from './FrontProduct/store/store.component';
import { LatestProductsComponent } from './FrontProduct/latest-products/latest-products.component';
import { BestSellersComponent } from './FrontProduct/best-sellers/best-sellers.component';
import { MusicComponent } from './FrontProduct/music/music.component';
import { MostofferedComponent } from './FrontProduct/mostoffered/mostoffered.component';


import { TopRankingComponent } from './FrontProduct/top-ranking/top-ranking.component';
import {
  ReclamationDetailsModalComponent
} from "./BackOffice/reclamation-details-modal/reclamation-details-modal.component";
import {AddProgressModalComponent} from "./FrontOffice/add-progress-modal/add-progress-modal.component";
import {ProgressTrackingComponent} from "./FrontOffice/progress-tracking/progress-tracking.component";
import {ShowfeedbackComponent} from "./BackOffice/showfeedback/showfeedback.component";
import {AddfeedbackComponent} from "./FrontOffice/addfeedback/addfeedback.component";
import {ReclamationetfeedbackComponent} from "./FrontOffice/reclamationetfeedback/reclamationetfeedback.component";
import {ShowReclamationComponent} from "./BackOffice/show-reclamation/show-reclamation.component";
import {AddReclamtionComponent} from "./FrontOffice/add-reclamation/add-reclamation.component";
import {UpdateReclamationComponent} from "./FrontOffice/update-reclamation/update-reclamation.component";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {CourseDialogComponent} from "./BackOffice/course-dialog/course-dialog.component";
import {ListCourseComponent} from "./BackOffice/list-course/list-course.component";
import {ModifCourceComponent} from "./BackOffice/modif-cource/modif-cource.component";
import {AddAnnulationComponent} from "./BackOffice/add-annulation/add-annulation.component";
import {ListeAnnulationComponent} from "./BackOffice/liste-annulation/liste-annulation.component";



import { AddCourseComponent } from './BackOffice/add-course/add-course.component';
import { AddcourseComponent } from './FrontOffice/addcourse/addcourse.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';






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
    AddProductComponent,
    ListProductComponent,
    EditProductComponent,
    CategorieProductComponent,
    ShowEventsAccComponent,
    ListArchivedComponent,
    ListCategoriesComponent,
    HeaderComponent,
    FooterComponent,
    AlltemplateFrontProductComponent,
    ViewProductComponent,
    CartComponent,
    CheckoutComponent,
    HomeProductComponent,
    ManageOrdersComponent,
    StoreComponent,
    LatestProductsComponent,
    BestSellersComponent,
    MusicComponent,
    MostofferedComponent,
    TopRankingComponent,
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
    UserRegisterComponent,
    TableadminComponent,
    UserLoginComponent,
    ForgotpasswordComponent,
    SubscribeComponent,
    PaymentPageComponent,
    UserstatComponent,
    SubstatComponent,
    UsereditComponent,
    EventsListComponent,
    ArchiveCompetitionsComponent,
    CompetitionRanksComponent,
    UpdateCompetitionComponent,
    MyCompetitionsComponent,
    MyEventsComponent,
    UpgradeEventComponent,
    CompetitionPDFComponent,
    TriviaComponent,
    RegisterEventComponent,
    EventFlyerComponent,
    AddAccommodationComponent,
    RockGameComponent,
    ResultsComponent,
    ReadmoreCompetitionsComponent,
    ShowCompetitionsDancersComponent,
    AddReclamtionComponent,
    ShowReclamationComponent,
    UpdateReclamationComponent,
    ReclamationetfeedbackComponent,
    AddfeedbackComponent,
    ShowfeedbackComponent,
    ProgressTrackingComponent,
    AddProgressModalComponent,
    ReclamationDetailsModalComponent,
      ////////////////////////
      CourseDialogComponent,
      CourseDialogComponent,
      ListCourseComponent,
      ModifCourceComponent,
      AddAnnulationComponent,
      ListeAnnulationComponent,
      AddcourseComponent,
      AddcourseComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Ajoutez ceci pour utiliser ReactiveFormsModule
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    MatDialogModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    NgxChartsModule,
    NgChartsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgChartsModule,
    RecaptchaModule




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
