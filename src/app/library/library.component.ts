import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LibraryQueries } from '../shared/services/graphql-queries';
import {User, Collection, CollectionSubscription, CollectionPreview} from './models';
import gql from 'graphql-tag';

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
    currentUser: User | null = null;
    subscribedCollections: CollectionPreview[] = [];
    allCollections: Collection[] = [];
    topics: string[] = [];
    loading: boolean = true;
    error: any;
    selectedTopicIndex: number = 0;

    constructor(private apollo: Apollo) {}

    get selectedTopic() {
        return this.topics[this.selectedTopicIndex];
    }

    ngOnInit(): void {
        this.fetchCurrentUser();
        this.fetchAllCollections();
    }

    fetchCurrentUser(): void {
        this.apollo.watchQuery<{ user: User }>({
            query: gql`${LibraryQueries.GET_CURRENT_USER}`
        }).valueChanges.subscribe(({ data, loading, error }) => {
            this.loading = loading;
            this.error = error;
            if (data) {
                console.log(data)
                this.currentUser = data.user;
                console.log(this.currentUser.subscribedCollections);
                let my_good = this.currentUser.subscribedCollections?.map(
                    subscription => subscription.collectionPreview
                )
                console.log(my_good)
                this.subscribedCollections = this.currentUser.subscribedCollections?.map(
                    subscription => subscription.collectionPreview
                ) || [];
            }
        });
    }

    fetchAllCollections(): void {
        this.apollo.watchQuery<{ collections: Collection[] }>({
            query: gql`${LibraryQueries.GET_ALL_COLLECTIONS}`
        }).valueChanges.subscribe(({ data, loading, error }) => {
            this.loading = loading;
            this.error = error;
            if (data) {
                console.log({data});
                this.allCollections = data.collections;
                // this.topics = [...new Set(this.subscribedCollections.map(collection => collection.topics).flat())];
                this.topics = [...new Set(this.allCollections.map(collection => collection.topics).flat())];
                // console.log(t);
            }
        });
    }

    trackById(index: number, item: any): string {
        return item.Id;
    }

    filterCategory(topicIndex: number) {
        this.selectedTopicIndex = topicIndex;
    }

    isTopicSelected(collection: any): boolean {
        return collection.topics?.includes(this.selectedTopic);
    }

}