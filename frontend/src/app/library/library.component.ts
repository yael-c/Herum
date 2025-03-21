import { Component, OnInit } from '@angular/core';
import { LibraryQueries } from '../shared/services/graphql-queries';
import { User, UserData, Collection, CollectionPreview } from './types';
import { GraphqlGeneralService } from '../shared/services/graph-ql.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  currentUser: UserData | null = null;
  subscribedCollections: CollectionPreview[] = [];
  allCollections: Collection[] = [];
  topics: string[] = [];
  loading: boolean = true;
  error: any;
  selectedTopicIndex: number = 0;

  config = {
    id: 'custom',
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(private graphqlService: GraphqlGeneralService) {}

  get selectedTopic() {
    return this.topics[this.selectedTopicIndex];
  }

  ngOnInit(): void {
    forkJoin({
      userData: this.graphqlService.executeQuery<any, any>(
        '',
        LibraryQueries.GET_CURRENT_USER_SUBSCRIPTIONS,
        {},
      ),
      collections: this.graphqlService.executeQuery<any, any>(
        '',
        LibraryQueries.GET_ALL_COLLECTIONS,
        {},
      ),
    })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (results) => {
          if (results.userData) {
            this.currentUser = results.userData as UserData;
            this.subscribedCollections =
              this.currentUser?.user?.subscribedCollections?.map(
                (sub: { collectionPreview: any }) => sub.collectionPreview,
              ) || [];
          }

          if (results.collections) {
            const collections = results.collections;
            if (collections) {
              this.allCollections = collections.collections;
              this.topics = [...new Set(this.allCollections.map((c) => c.topics || []).flat())];
              this.config.totalItems = this.filteredCollections.length;
            }
          }
        },
        error: (err) => {
          this.error = err;
          console.error('Error loading data:', err);
        },
      });
  }

  filterCategory(topicIndex: number) {
    this.selectedTopicIndex = topicIndex;
    this.config.currentPage = 1;
    this.config.totalItems = this.filteredCollections.length;
  }

  get filteredCollections() {
    return this.allCollections.filter((collection) =>
      collection.topics?.includes(this.selectedTopic),
    );
  }
}
