import { setQueryParam } from './queryParams';

describe('Query params module', () => {
  describe('setQueryParam should add a query parameter to url', () => {
    it("with prefix & if it's not the only parameter", () => {
      expect(setQueryParam('some-mock-url?limit=5', {after: 5})).toBe("some-mock-url?limit=5&after=5");
    });
    it("with prefix ? if url doesn't contain any query parameters", () => {
      expect(setQueryParam('some-mock-url', {limit: 5, after: 5})).toBe("some-mock-url?limit=5&after=5");
    });
  });

  it('should not add empty parameter', () => {
    expect(setQueryParam('some-mock-url', {limit: 5, after: 5, emptyString: ''})).toBe("some-mock-url?limit=5&after=5");
    expect(setQueryParam('some-mock-url', {limit: 5, after: 5, null: null})).toBe("some-mock-url?limit=5&after=5");
    expect(setQueryParam('some-mock-url', {limit: 5, after: 5, undef: undefined})).toBe("some-mock-url?limit=5&after=5");
  });
});