type Series = {
  mtu: number; //1..24
  edate: number; //241121
  prop1: number;
  prop2: number;
  prop3: number;
}

type DataResponse = {
  data: Record<string, Series[]>
}

type RequestBody = {
  query: string[]
}