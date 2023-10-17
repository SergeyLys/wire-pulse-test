import renderer from 'react-test-renderer';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import CableTypesList, {DEFAULT_PAGE_SIZE} from './CableTypesList';
import * as useCableTypes from '../../hooks/useCableTypes';

const mockEntity = {
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
    "created": new Date("2020-10-13T21:31:51.259Z"),
    "modified": new Date("2020-10-13T21:31:51.259Z"),
    "user": {
      "id": "5f3bc9e2502422053e08f9f1",
      "username": "test@reelsense.io"
    }
  }
};

jest.mock("../../hooks/useCableTypes", () => jest.fn(() => {
  return {
    list: [mockEntity],
    isLoading: false,
    error: null,
    total: 1
  }
}));

const setupComponent = () => <CableTypesList />

describe('CableTypesList component', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('renders correctly', () => {
    const tree = renderer.create(
      setupComponent()
    ).toJSON();
    render(setupComponent());

    expect(tree).toMatchSnapshot();
    expect(screen.getByText(mockEntity.catid)).toBeInTheDocument();
  });

  it('should react on input change after debounce timer', async () => {
    const spy = jest.spyOn(useCableTypes, 'default').mockImplementation(() => {
      return {
        list: [],
        isLoading: false,
        error: null,
        total: 0
      }
    });

    render(setupComponent());

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.input(screen.getByTestId('cable-types-list-search-input'), {
        target: {
          value: 'test input'
        }
      });
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(DEFAULT_PAGE_SIZE, 0, '');
      jest.advanceTimersByTime(500);
    });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(DEFAULT_PAGE_SIZE, 0, 'test input');
  });

  it('should react on pagination changes after debounce timer', async () => {
    const spy = jest.spyOn(useCableTypes, 'default').mockImplementation(() => {
      return {
        list: [],
        isLoading: false,
        error: null,
        total: 100
      }
    });

    render(setupComponent());

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.click(screen.getByTestId('pagination-arrow-next'));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(DEFAULT_PAGE_SIZE, 0, '');
      jest.advanceTimersByTime(500);
    });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(DEFAULT_PAGE_SIZE, 10, '');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.click(screen.getByTestId('pagination-arrow-prev'));
      jest.advanceTimersByTime(500);
    });

    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledWith(DEFAULT_PAGE_SIZE, 0, '');

    fireEvent.click(screen.getByTestId('pagination-page-size-selector'));
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.click(screen.getAllByTestId('pagination-page-size-selector-item')[1]);
      jest.advanceTimersByTime(500);
    });

    expect(spy).toHaveBeenCalledTimes(4);
    expect(spy).toHaveBeenCalledWith(20, 0, '');
  });
});
