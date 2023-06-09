export enum Status {
  ACTIVE = 'A',
  INACTIVE = 'I',
  PENDING = 'P',
  UNKNOWN = 'UN',
}

export function statusFromValue(value: string): Status {
  const index = Object.values(Status).indexOf(value as Status);

  return index === -1 ? Status.UNKNOWN : Status[Object.keys(Status)[index] as keyof typeof Status];
}
