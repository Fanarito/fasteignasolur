export default interface Fee {
  readonly includedInTotal: boolean;
  readonly shortExplanation: string;
  totalFee(): number;
  explanation(): string;
}
