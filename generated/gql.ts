/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query GetProductsSlugs {\n  products {\n    slug\n  }\n}\n\nquery GetProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    slug\n    name\n    price\n    description\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery GetProductsList($first: Int, $offset: Int) {\n  products(first: $first, skip: $offset) {\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}": types.GetProductsSlugsDocument,
};

export function graphql(source: "query GetProductsSlugs {\n  products {\n    slug\n  }\n}\n\nquery GetProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    slug\n    name\n    price\n    description\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery GetProductsList($first: Int, $offset: Int) {\n  products(first: $first, skip: $offset) {\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}"): (typeof documents)["query GetProductsSlugs {\n  products {\n    slug\n  }\n}\n\nquery GetProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    slug\n    name\n    price\n    description\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery GetProductsList($first: Int, $offset: Int) {\n  products(first: $first, skip: $offset) {\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;