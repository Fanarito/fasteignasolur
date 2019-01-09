export default interface Fee {
  readonly shortExplanation: string;
  totalFee(): number;
  explanation(): string;
}
