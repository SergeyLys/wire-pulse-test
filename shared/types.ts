export interface CableTypeResponse {
  entities: CableType[];
  total:    number;
  page:     number;
  next:     string;
}

export interface CableType {
  id:                string;
  identifier:        string;
  catid:             number;
  diameter:          Diameter;
  conductor:         Conductor;
  insulation:        Insulation;
  material:          Material;
  currentPrice:      CurrentPrice;
  voltage:           CurrentPrice;
  rotationFrequency: CurrentPrice;
  manufacturer:      Manufacturer;
  properties:        Property[];
  customer:          Customer;
  metadata:          Metadata;
}

export interface Conductor {
  number: number;
  size:   CurrentPrice;
}

export interface CurrentPrice {
  value: number;
  unit:  string;
}

export interface Customer {
  id:   string;
  code: string;
}

export interface Diameter {
  published: CurrentPrice;
  actual:    CurrentPrice;
}

export interface Insulation {
  type:      string;
  shield:    string;
  jacket:    string;
  thickness: CurrentPrice;
}

export interface Manufacturer {
  id:   string;
  name: string;
}

export interface Material {
  aluminum: number;
  copper:   number;
  weight:   Weight;
}

export interface Weight {
  net:        CurrentPrice;
  calculated: CurrentPrice;
}

export interface Metadata {
  created:  Date;
  modified: Date;
  user:     User;
}

export interface User {
  id:       string;
  username: string;
}

export interface Property {
  name:  string;
  value: Value;
}

export interface Value {
  string: string;
  number: number;
}
