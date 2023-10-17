import { renderHook, act, waitFor } from '@testing-library/react';
import useCableTypes from './useCableTypes';
import useHttpClient from '../../../hooks/useHttpClient';

const response = {
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

jest.mock("../../../hooks/useHttpClient", () => jest.fn());

describe('useCableTypes hook', () => {
  it('should return the initial values for data, error and loading', async () => {
    const mockResolvedPromise = jest.fn(() => Promise.resolve(response));
    (useHttpClient as jest.Mock).mockImplementation(() => ({
      get: mockResolvedPromise
    }));
    const { result } = renderHook(() => useCableTypes(10, 0, 'some-search-value'));

    expect(result.current).toMatchObject({ isLoading: true, error: null, list: [], total: 0 });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    
    expect(mockResolvedPromise).toHaveBeenCalledWith('/cable/type?limit=10&after=0&searchValue=some-search-value');
    expect(result.current.list).toMatchObject(response.entities);
    expect(result.current.error).toBeNull();
    expect(result.current.total).toBe(response.total);
  });

  it('should return error', async () => {
    (useHttpClient as jest.Mock).mockImplementation(() => ({
      get: jest.fn(() => Promise.reject('Some error'))
    }));

    const { result } = renderHook(() => useCableTypes(10, 0, ''));

    expect(result.current).toMatchObject({ isLoading: true, error: null, list: [], total: 0 });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.list.length).toBe(0);
    expect(result.current.error).toBe('Some error');
    expect(result.current.total).toBe(0);
  });
});