export declare type TPokemon = {
  readonly id: number;
  readonly name: string;
  readonly sprites: {
    other: {
      'official-artwork': {
        'front_default': string;
      }
    }
  };
  readonly image_url: string;
}

export declare type TPokemonPaginationQuery = {
  currentPage: number;
  limit: number;
  offset: number;
}

export declare type TPokemonPaginationResponse = {
  readonly count: number;
  readonly next: string;
  readonly previous: string;
  readonly results: TPokemon[];
}
