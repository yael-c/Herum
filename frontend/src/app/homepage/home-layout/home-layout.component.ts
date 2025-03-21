import { EducationStatus } from '../molecules/education-status-item/education-status-item.component';
import { educationStatuses } from '../tsObjects/educationStatuses';
import { CollectionSubscription } from '../../models/User/CollectionSubscription';
import { UserProfileInfo } from '../../models/User/UserProfileInfo';
import {
  BasicUserDetails,
  createDisplayFromBasicUserDetails,
  KeyValue,
} from '../../models/User/BasicUserDetails';
import {
  createDisplayFromUserDetails,
  UserPersonalGeneralDetailsResponse,
} from '../../models/User/UserPersonalGeneralDetails';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, ObservedValueOf } from 'rxjs';
import { GraphqlGeneralService } from '../../shared/services/graph-ql.service';
import { HomePageQueries } from '../../shared/services/graphql-queries';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  userBasicDetails!: any; // todo ObservedValueOf<Observable<{ getUserBasicDetails: BasicUserDetails }>>;
  userCollectionsSubscriptions!: CollectionSubscription[];
  userPersonalGeneralDetails!: ObservedValueOf<
    Observable<{
      getUserPersonalGeneralDetails: UserPersonalGeneralDetailsResponse;
    }>
  >;
  userProfileInfo!: UserProfileInfo;

  constructor(private graphqlService: GraphqlGeneralService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    forkJoin({
      userBasicDetails: this.graphqlService.fetchData<
        { getUserBasicDetails: BasicUserDetails },
        BasicUserDetails
      >('', HomePageQueries.GET_USER_BASIC_DETAILS),
      collections: this.graphqlService.fetchData<
        { subscribedCollections: CollectionSubscription[] },
        {
          subscribedCollections: CollectionSubscription[];
        }
      >('', HomePageQueries.GET_USER_COLLECTIONS_SUBSCRIPTIONS),

      // todo: fetch the data from the server, if existed
      // educationStatuses: this.graphqlService.fetchData<{ educationStatuses: EducationStatus[] }, {
      //     educationStatuses: EducationStatus[]
      // }>('/graphql', GET_EDUCATION_STATUSES),

      userPersonalGeneralDetails: this.graphqlService.fetchData<
        { getUserPersonalGeneralDetails: UserPersonalGeneralDetailsResponse },
        { getUserPersonalGeneralDetails: UserPersonalGeneralDetailsResponse }
      >('', HomePageQueries.GET_USER_GENERAL_DETAILS),
      userProfileInfo: this.graphqlService.fetchData<
        { getUserProfileInfo: UserProfileInfo },
        UserProfileInfo
      >('', HomePageQueries.GET_USER_PROFILE_INFO),
    }).subscribe({
      next: ({ userBasicDetails, collections, userPersonalGeneralDetails, userProfileInfo }) => {
        this.userBasicDetails = { ...userBasicDetails }; // todo check format, response type like collections
        this.userCollectionsSubscriptions = collections?.subscribedCollections; // todo understand why nothing returns
        this.userPersonalGeneralDetails = userPersonalGeneralDetails;
        this.userProfileInfo = userProfileInfo;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  }

  get educationsItems(): EducationStatus[] {
    return educationStatuses; // todo: there is no server data right now so i left it like this
  }

  get userBasicDetailsData(): KeyValue[] {
    if (!this.userBasicDetails) return [];
    const formatter = new Intl.DateTimeFormat('en-GB');
    if (this.userBasicDetails.birthDate.length > 10) {
      this.userBasicDetails.birthDate = formatter.format(new Date(this.userBasicDetails.birthDate));
    }
    return createDisplayFromBasicUserDetails(this.userBasicDetails);
  }

  get userPersonalGeneralDetailsData(): { iconPath: string; label: string }[] {
    return createDisplayFromUserDetails(this.userPersonalGeneralDetails);
  }

  get userCollectionsSubscriptionsData(): CollectionSubscription[] {
    return this.userCollectionsSubscriptions;
  }

  // todo: i would fetch the avatar photo if it was stored in the server
  // get userAvatarUrl(): string {
  //     return this.userProfileInfo?.avatarUrl || 'assets/homepage/userAvatar.png';
  // }

  get userFullName(): string {
    return `${this.userProfileInfo?.firstName} ${this.userProfileInfo?.lastName}` || 'שם היוזר';
  }

  get userProfession(): string {
    return this.userProfileInfo?.profession || 'תפקיד';
  }

  // todo: if the data existed in the server, i would calculate readiness level according to the subscribed collections data
  // (this is a hypothetical calculation)
  // get userReadinessLevels(): UserReadinessLevels {
  //     if (!this.userCollectionsSubscriptions || this.userCollectionsSubscriptions.length === 0) {
  //         return {frontalReadiness: 0, digitalReadiness: 0};
  //     }
  //     let totalWeightedGrade = 0;
  //     let totalHours = 0;
  //     for (const subscription of this.userCollectionsSubscriptions) {
  //         if (subscription.grade !== undefined && subscription.hours !== undefined) {
  //             totalWeightedGrade += subscription.grade * subscription.hours;
  //             totalHours += subscription.hours;
  //         }
  //     }
  //     return {
  //         frontalReadiness: totalHours > 0 ? totalWeightedGrade / totalHours : 0,
  //         digitalReadiness: totalHours > 0 ? totalWeightedGrade / totalHours : 0
  //     };
  // }
}
