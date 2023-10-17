import { useState, useEffect, useCallback } from "react";
import { CableType, CableTypeResponse } from "../../../../shared/types";
import { setQueryParam } from "../../../libs/queryParams";
import useHttpClient from "../../../hooks/useHttpClient";

type UseCableTypes = {
  isLoading: boolean; 
  error: string | null; 
  list: CableType[]; 
  total: number;
}

const useCableTypes = (limit: number, after: number, searchValue: string): UseCableTypes => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [list, setList] = useState<CableType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { get } = useHttpClient();

  const sendQuery = useCallback(async (url: string) => get<CableTypeResponse>(url), []);

  useEffect(() => {
    const url = setQueryParam('/cable/type', {limit, after, searchValue});
    setIsLoading(true);
    setError(null);
      
    sendQuery(url)
      .then(res => {
        setList(res!.entities);
        setTotal(res!.total);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [limit, after, searchValue, sendQuery]);

  return { isLoading, error, list, total };
}

export {type CableType};
export default useCableTypes;