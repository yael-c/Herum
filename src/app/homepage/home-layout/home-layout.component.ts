import {Component, OnInit} from '@angular/core';
import {EducationStatus} from '../molecules/education-status-item/education-status-item.component';
import {educationStatuses} from '../tsObjects/educationStatuses';
import {userPersonalBasicData} from '../tsObjects/userPersonalBasicData';
import {usersExample} from 'src/app/feed/components/feed-layout/ObjectExample/UsersExample';
import {userPersonalGeneralDetails} from '../tsObjects/userPersonalGeneralDetails';

import { GraphqlGeneralService } from '../../shared/services/graph-ql.service';
import { forkJoin } from 'rxjs';
import { GET_USER_GENERAL_DETAILS, GET_USER_COLLECTIONS_SUBSCRIPTIONS } from '../../shared/services/graphql-queries';
import { CollectionSubscription } from '../../models/User/CollectionSubscription';
import { BasicUserDetails } from '../../models/User/User';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {

    }

    get educationsItems(): EducationStatus[] {
        return educationStatuses;
    }

    get userGeneralDetails() {
        return userPersonalBasicData;
    }

    get userPersonalGeneralDetails() {
        return userPersonalGeneralDetails;
    }

    get userCollectionsSubscriptions() {
        return usersExample[0].subscribedCollections;
    }
}

// export class HomeLayoutComponent implements OnInit {
//     userGeneralDetails: BasicUserDetails | undefined;
//     userCollectionsSubscriptions: CollectionSubscription[] | undefined;
//
//     constructor(private graphqlService: GraphqlGeneralService) {
//     }
//
//     ngOnInit(): void {
//         forkJoin({
//             generalDetails: this.graphqlService.executeQuery<any, {
//                 getUserGeneralDetails: BasicUserDetails
//             }>('/graphql', GET_USER_GENERAL_DETAILS, {}).pipe(map(result => result.getUserGeneralDetails)),
//             collections: this.graphqlService.executeQuery<any, {
//                 getUserCollectionsSubscriptions: CollectionSubscription[]
//             }>('/graphql', GET_USER_COLLECTIONS_SUBSCRIPTIONS, {}).pipe(map(result => result.getUserCollectionsSubscriptions))
//         }).subscribe(({generalDetails, collections}) => {
//             this.userGeneralDetails = generalDetails;
//             this.userCollectionsSubscriptions = collections;
//         });
//     }
// }
