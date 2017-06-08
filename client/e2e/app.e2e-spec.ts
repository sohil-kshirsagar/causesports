import { CausesportsPage } from './app.po';

describe('causesports App', () => {
  let page: CausesportsPage;

  beforeEach(() => {
    page = new CausesportsPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
