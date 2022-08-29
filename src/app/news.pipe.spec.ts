import { News } from './news.pipe';

describe('news', () => {
  it('create an instance', () => {
    const pipe = new News();
    expect(pipe).toBeTruthy();
  });
});
