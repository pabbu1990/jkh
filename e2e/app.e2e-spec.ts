import { PluralSightQuizPage } from './app.po';

describe('plural-sight-quiz App', () => {
  let page: PluralSightQuizPage;

  beforeEach(() => {
    page = new PluralSightQuizPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
