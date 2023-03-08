export declare type TBreakingBadCharacter = {
  readonly id: number;
  readonly name: string;
  readonly image_url: string;
}

export declare type TBreakingBadPaginationResponse = {
  readonly total: number;
  readonly characters: TBreakingBadCharacter[];
}
