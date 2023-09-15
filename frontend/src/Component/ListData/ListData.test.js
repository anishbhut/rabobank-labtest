import { render, screen } from '@testing-library/react';
import ListData from './ListData';

let testDataWithError = [
  {
      "reference": 183398,
      "accountNumber": "NL56RABO0149876948",
      "description": "Clothes from Richard de Vries",
      "endBalance": 38.89,
      "mutation": 5.55,
      "startBalance": 33.34,
      "message": "There are duplicate transaction exist"
  },
  {
      "reference": 112806,
      "accountNumber": "NL27SNSB0917829871",
      "description": "Subscription from Jan Dekker",
      "endBalance": 19.51,
      "mutation": -19.44,
      "startBalance": 28.95,
      "message": "There are End Balance count mismatch"
  },
  {
      "reference": 112806,
      "accountNumber": "NL43AEGO0773393871",
      "description": "Subscription from Daniël Theuß",
      "endBalance": 113.82,
      "mutation": 11.49,
      "startBalance": 102.33,
      "message": "There are duplicate transaction exist"
  },
  {
      "reference": 112806,
      "accountNumber": "NL74ABNA0248990274",
      "description": "Subscription for Rik Dekker",
      "endBalance": 43.95,
      "mutation": -4.25,
      "startBalance": 48.2,
      "message": "There are duplicate transaction exist"
  },
  {
      "reference": 183398,
      "accountNumber": "NL32RABO0195610843",
      "description": "Tickets for Richard de Vries",
      "endBalance": 110.62,
      "mutation": 44.27,
      "startBalance": 66.35,
      "message": "There are duplicate transaction exist"
  },
  {
      "reference": 112806,
      "accountNumber": "NL27SNSB0917829871",
      "description": "Subscription from Jan Dekker",
      "endBalance": 19.51,
      "mutation": -19.44,
      "startBalance": 28.95,
      "message": "There are End Balance count mismatch"
  }
]

let noRows = []

test('Renders List Data Component with table header', () => {
  const { getByText } = render(<ListData />);
  expect(getByText(/Reference No/i)).toBeInTheDocument();
  expect(getByText(/Account No/i)).toBeInTheDocument();
});


test('Renders List Data with 6 record and match count of renderd data', async() => {
  const {container} = render(<ListData data={testDataWithError}  />);
  const items = container.getElementsByClassName('table-row')
  expect(items).toHaveLength(6);
});

test('Renders List Data with 0  record and match count of renderd data', async() => {
  const {container} = render(<ListData data={noRows}  />);
  const items = container.getElementsByClassName('table-row')
  expect(items).toHaveLength(0);
});

