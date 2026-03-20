export const fmt = (n: number): string => '₹' + Number(n).toLocaleString('en-IN');

export const dc = (orig: number, price: number): number => Math.round((orig - price) / orig * 100);

export const uid = (): string => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
