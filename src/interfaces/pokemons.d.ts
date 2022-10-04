export declare interface IPokemonPagination {
  currentPage: number;
  limit: number;
  offset: number;
}

export declare interface IPokemonCollection {
  readonly count: number;
  readonly next: string;
  readonly previous: string;
  readonly results: IPokemonCollectionItem[];
}

export declare interface IPokemonCollectionItem {
  readonly name: string;
  readonly url: string;
}

export declare interface IPokemon {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
}
