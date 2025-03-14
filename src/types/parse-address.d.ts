declare module "parse-address" {
  export function parseLocation(address: string): Partial<{
    number: number;
    prefix: string;
    street: string;
    type: string;
    city: string;
    state: string;
    zip: string;
  }>;
}
