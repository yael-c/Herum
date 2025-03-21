import { Component, Input, OnInit } from '@angular/core';
import { Collection, CollectionPreview } from '../../types';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss'],
})
export class CollectionCardComponent implements OnInit {
  @Input() collection!: Collection | CollectionPreview;

  constructor() {}

  ngOnInit(): void {}

  get collectionCreator() {
    if (!isCollection(this.collection)) return '?';
    return `${this.collection.creatingUser?.firstName || ''} ${this.collection.creatingUser?.lastName || ''}`;
  }

  get resourceCount() {
    if (!isCollection(this.collection)) return '?';
    return this.collection.resources.length;
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/default-collection.jpg';
  }

  get action() {
    return isCollection(this.collection) ? 'התחל הכשרה' : 'נהל מארזי למידה';
  }
}

const isCollection = (collection: Collection | CollectionPreview): collection is Collection => {
  return (collection as Collection).creationTime !== undefined;
};
