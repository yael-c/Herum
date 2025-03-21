import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LibraryQueries } from '../shared/services/graphql-queries';
import { User, Collection, CollectionSubscription, CollectionPreview } from './types';
import gql from 'graphql-tag';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
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

  config = {
    id: 'custom',
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 0,
  };

  ngOnInit(): void {
    this.loadUserSubscriptions();
    this.fetchAllCollections();
  }

  loadUserSubscriptions(): void {
    this.apollo
      .watchQuery<{ user: User }>({
        query: gql`
          ${LibraryQueries.GET_CURRENT_USER_SUBSCRIPTIONS}
        `,
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        this.loading = loading;
        this.error = error;
        if (!data) return;
        this.currentUser = data.user;
        this.subscribedCollections =
          data.user.subscribedCollections.map((sub) => sub.collectionPreview) || [];
      });
  }

  fetchAllCollections(): void {
    this.apollo
      .watchQuery<{ collections: Collection[] }>({
        query: gql`
          ${LibraryQueries.GET_ALL_COLLECTIONS}
        `,
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        this.loading = loading;
        this.error = error;
        if (!data) return;
        this.allCollections = data.collections;
        this.topics = [
          ...new Set(this.allCollections.map((collection) => collection.topics).flat()),
        ];
      });
  }

  trackById(index: number, item: any): string {
    return item.Id;
  }

  filterCategory(topicIndex: number) {
    this.selectedTopicIndex = topicIndex;
    this.config.currentPage = 1;
    this.config.totalItems = this.filteredCollections.length;
  }

  isTopicSelected(collection: any): boolean {
    this.config.totalItems = this.allCollections.filter((collection) =>
      collection.topics?.includes(this.selectedTopic),
    ).length;
    return collection.topics?.includes(this.selectedTopic);
  }

  get filteredCollections() {
    return this.allCollections.filter((collection) =>
      collection.topics?.includes(this.selectedTopic),
    );
  }
}
