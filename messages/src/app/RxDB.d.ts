import { RxCollection, RxDatabase, RxDocument } from 'rxdb';
import { RxMessageDocumentType } from './models/message.model';

export type RxMessageDocument = RxDocument<RxMessageDocumentType, {}>;
export type RxMessageCollection = RxCollection<RxMessageDocumentType, {}, {}>;
export type RxMessageCollections = {
  messages: RxMessageCollection;
};
export type RxMessageDatabase = RxDatabase<RxMessageCollections, {}>;
