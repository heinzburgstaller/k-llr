import { KLlrPage } from './app.po';

describe('k-llr App', () => {
  let page: KLlrPage;

  beforeEach(() => {
    page = new KLlrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
