export declare type TRouteLink = {
  label: string;
  to?: string;
}

/**
 * Este tipo se debe ir actualizando conforme se van agregando mas rutas.
 */
export declare type TRouteNames = {
  AUTH_LOGIN: string;
  DASHBOARD: string;
  USERS_INDEX: string;
  REDIRECT_DASHBOARD: string;
  BREAKING_INDEX: string;
  POKEMON_INDEX: string,
}

export declare type TPaginationQuery = {
  page: number;
  items: number;
  sort_by?: string;
  sort_dir?: string;
  search?: string;
}

export declare type TModel = {
  readonly id: number;
  readonly created_at: string | null;
  readonly updated_at: string | null;
  readonly deleted_at: string | null;
}

export declare type TModelDeleted = {
  readonly id: number;
  readonly deleted_at: string | null;
}
