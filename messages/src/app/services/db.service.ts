import { Injectable } from '@angular/core';
import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { MESSAGE_SCHEMA } from '../models/message.model';
import { RxMessageDatabase } from '../RxDB';

addRxPlugin(RxDBJsonDumpPlugin);

async function createDatabase(): Promise<any> {
  const db = await createRxDatabase<any>({
    name: 'messagesdb',
    storage: getRxStorageDexie(),
  });

  //Collection
  await db.addCollections({
    messages: {
      schema: MESSAGE_SCHEMA,
    },
  });

  // const test = await db.messages.insert({
  //   id: '1',
  //   content: 'Hello World',
  //   timestamp: new Date().toISOString(),
  // });

  const myCollection = db.messages;
  myCollection.exportJSON().then((json: any) => console.dir(json));

  return db;
}

let initState: null | Promise<any> = null;
let DB_INSTANCE: any;

export async function initDatabase() {
  if (!initState) {
    initState = createDatabase().then((db) => {
      DB_INSTANCE = db;
      return db;
    });
  }
  await initState;
}

@Injectable()
export class DBService {
  constructor() {}

  get db(): RxMessageDatabase {
    return DB_INSTANCE;
  }
}
