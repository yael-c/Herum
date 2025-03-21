import {UserPreview} from './UserPreview';


export type CollectionPreview = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  creatingUser?: UserPreview;
  topics?: string[];
};
