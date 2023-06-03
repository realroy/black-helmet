export function formatCurrency(value: number) {

  return (value * 1.0).toLocaleString('en-GB', { minimumFractionDigits: 2 });
}
export * from './generate-doc-no'