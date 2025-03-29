import { createDirectus, graphql, staticToken } from "@directus/sdk";
// import { Schema } from "./schema";

export class ContentAPI {
  /**
   * Client instance - Directus SDK
   */
  private client;

  /**
   * ContentApi Instance
   */
  private static instance: ContentAPI;

  /**
   * Get connection data
   */

  private getConnectionData() {
    const CMS_ENDPOINT = process.env.NEXT_PUBLIC_CMS_ENDPOINT;
    const CMS_TOKEN = process.env.NEXT_PUBLIC_CMS_TOKEN;

    if (!CMS_ENDPOINT || !CMS_TOKEN)
      throw new Error(
        "Missing CMS_ENDPOINT and CMS_TOKEN environment variables"
      );

    return {
      CMS_ENDPOINT,
      CMS_TOKEN,
    };
  }

  /**
   * Creates an instance of ContentAPI.
   * @constructor
   * @private
   */
  private constructor() {
    const { CMS_ENDPOINT, CMS_TOKEN } = this.getConnectionData();
    this.client = createDirectus<any>(CMS_ENDPOINT, {
      globals: { fetch: fetch },
    })
      .with(staticToken(CMS_TOKEN))
      .with(graphql());
  }

  /**
   * Generate a custom fetch in order to add next.js cache capabilities
   */
  private generateFetch(tags?: string[]) {
    return function (input: RequestInfo, init?: RequestInit) {
      const tagConfig =
        tags &&
        ({
          next: {
            tags,
          },
        } as RequestInit);
      const initData = { ...init, ...tagConfig };

      return fetch(input, initData);
    };
  }

  /**
   * Get current instance or create instance
   */
  public static getInstance(): ContentAPI {
    if (!ContentAPI.instance) ContentAPI.instance = new ContentAPI();
    return ContentAPI.instance;
  }

  /**
   * GraphQL Query Function
   */
  public query<T extends object>(
    query: string,
    variables?: Record<string, unknown>,
    cacheTags?: string[]
  ) {
    this.client.globals.fetch = this.generateFetch(cacheTags);
    return this.client.query<T>(query, variables, "items");
  }
}

