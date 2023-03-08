export enum Status {
  ACTIVE = 'A',
  INACTIVE = 'I',
  PENDING = 'P',
  UNKNOWN = 'UN',
}

export function statusFromValue(value: string): Status {
  for (let [statusKey, statusValue] of Object.entries(Status)) {
    if (value === statusValue) return Status[statusKey];
  }
}
