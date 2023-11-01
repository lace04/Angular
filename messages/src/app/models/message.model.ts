import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  toTypedRxJsonSchema,
  RxJsonSchema,
} from 'rxdb';

export const MESSAGE_SCHEMA_LITERAL = {
  title: 'message schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', primary: true, maxLength: 105 },
    content: { type: 'string', maxLength: 105 },
    timestamp: { type: 'date-time' },
  },
  required: ['id', 'content', 'timestamp'],
};

const schemaTyped = toTypedRxJsonSchema(MESSAGE_SCHEMA_LITERAL);
export type RxMessageDocumentType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

export const MESSAGE_SCHEMA: RxJsonSchema<RxMessageDocumentType> = schemaTyped;
