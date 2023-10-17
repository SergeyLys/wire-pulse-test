const data = {
  "entities": [
    {
      "id": "5f3bc9e2502422053e08f9f1",
      "identifier": "10-al-1c-trxple",
      "catid": 1622475,
      "diameter": {
        "published": {
          "value": 22.43,
          "unit": "mAh"
        },
        "actual": {
          "value": 22.43,
          "unit": "mAh"
        }
      },
      "conductor": {
        "number": 0,
        "size": {
          "value": 22.43,
          "unit": "mAh"
        }
      },
      "insulation": {
        "type": "string",
        "shield": "string",
        "jacket": "string",
        "thickness": {
          "value": 22.43,
          "unit": "mAh"
        }
      },
      "material": {
        "aluminum": 0,
        "copper": 0,
        "weight": {
          "net": {
            "value": 22.43,
            "unit": "mAh"
          },
          "calculated": {
            "value": 22.43,
            "unit": "mAh"
          }
        }
      },
      "currentPrice": {
        "value": 22.43,
        "unit": "USD"
      },
      "voltage": {
        "value": 22.43,
        "unit": "mAh"
      },
      "rotationFrequency": {
        "value": 22.43,
        "unit": "mAh"
      },
      "manufacturer": {
        "id": "5f3bc9e2502422053e08f9f1",
        "name": "Kerite"
      },
      "properties": [
        {
          "name": "manufacturedBy",
          "value": {
            "string": "string value",
            "number": 1234.56
          }
        }
      ],
      "customer": {
        "id": "5f3bc9e2502422053e08f9f1",
        "code": "bge"
      },
      "metadata": {
        "created": "2020-10-13T21:31:51.259Z",
        "modified": "2020-10-13T21:31:51.259Z",
        "user": {
          "id": "5f3bc9e2502422053e08f9f1",
          "username": "test@reelsense.io"
        }
      }
    }
  ],
  "total": 1024,
  "page": 1,
  "next": "5f3bc9e2502422053e08f9f1"
};

const names = [
  "Acme Electronics",
  "Techtronix Solutions",
  "Zenith Technologies",
  "Quantum Innovations",
  "ElectroniCorp Inc.",
  "DynaTech Systems",
  "SynthoElectro Ltd.",
  "VoltStar Industries",
  "OmniWave Electronics",
  "PowerTech Solutions",
];

data.entities = Array.from({length: 1024}, (_, i) => ({
  ...data.entities[0],
  num: i,
  catid: Math.ceil(data.entities[0].catid * Math.random()),
  diameter: {
    actual: {
      ...data.entities[0].diameter.actual,
      value: Number((data.entities[0].diameter.actual.value * Math.random()).toFixed(2))
    },
    published: {
      ...data.entities[0].diameter.actual,
      value: Number((data.entities[0].diameter.published.value * Math.random()).toFixed(2))
    }
  },
  manufacturer: {
    id: data.entities[0].manufacturer.id,
    name: names[(Math.random() * names.length) | 0]
  }
}));

module.exports = data;