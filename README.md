# Unmarshall response from AWS DynamoDB

A response from AWS DynamoDB (for example using the `aws` cli) returns the data type of each field, e.g.

```sh
aws dynamodb query --table-name my-table --expression-attribute-values '{":value": {"S": "2023-06-15" }}' --key-condition-expression "occuredAt >= :value"
```

```json
{
  "HandledAt": {
    "NULL": true
  },
  "EventData": {
    "M": {
      "Metadata": {
        "M": {
          "FlowId": {
            "S": "d7e22086-e920-4f07-a5cf-e1da10709ce1"
          },
          "OriginalEventType": {
            "S": "lead-generation-efset-prospects.prospect-created"
          },
          "insertDate": {
            "S": "2023-06-15T08:02:05.114Z"
          }
        }
      },
      "Payload": {
        "M": {
          "bd_year": {
            "S": "2002"
          }
        }
      }
    }
  }
}
```

This cli transforms it into the original data structure, e.g.

```json
{
  "HandledAt": null,
  "EventData": {
    "Metadata": {
      "FlowId": "d7e22086-e920-4f07-a5cf-e1da10709ce1",
      "OriginalEventType": "lead-generation-efset-prospects.prospect-created",
      "insertDate": "2023-06-15T08:02:05.114Z"
    },
    "Payload": {
      "bd_year": "2002"
    }
  }
}
```
## Prerequisites
- node
- npm

## Installation

```sh
git clone
cd unmarshall-dynamodb-document
npm i -g
```

## Usage

You can pass the json as json string or as content of a file

### Passing json directly
```sh
json=$(cat simple.json)
unmarshall-dynamodb-document json $json
```

### Passing json in a file

```sh
unmarshall-dynamodb-document file simple.json
```

### Examples
There are two files with examples, one with a simple nested object (simple.json) another with an array with two objects (simple-array.json).



### Limitations
Passing the json through pipe is not yet supported.

