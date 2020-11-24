import { SecondStateChangeComponent } from './second-state-change.component';

// This Will Fail for state change
xdescribe('SecondStateChangeComponent', () => {
  const component = new SecondStateChangeComponent();

  it('Should increase totalVote when upVote', () => {
    component.voteUp();
    expect(component.totalVote).toBe(1);
  });

  it('Should increase totalVote when upVote', () => {
    component.voteDown();
    expect(component.totalVote).toBe(-1);
  });
});

// Use BeforeEach() To avoid issue
describe('SecondStateChangeComponent With BeforeEach()', () => {
  let component: SecondStateChangeComponent;

  beforeEach(() => {
    component = new SecondStateChangeComponent();
  });

  it('Should increase totalVote when upVote', () => {
    component.voteUp();
    expect(component.totalVote).toBe(1);
  });

  it('Should increase totalVote when upVote', () => {
    component.voteDown();
    expect(component.totalVote).toBe(-1);
  });
});

describe('Test Without ts file', () => {
  let expected = '';
  let notExpected = '';
  let expectedMatch = null;  // It is obj. not string

  beforeEach(() => {
    expected = 'Hello Test';
    notExpected = 'Hello Fest';
    expectedMatch = new RegExp(/^hello/);
  });

  afterEach(() => {
    expected = '';
    notExpected = '';
  });

  it('toBe', () => {
    expect(expected).toBe('Hello Test');
  });

  it('not toBe', () => {
    expect(notExpected).not.toBe('Hello Test');
  });

  it('Equal', () => {
    expect(expected).toEqual('Hello Test');
  });

  it('Regex Match', () => {
    expect('hello').toMatch(expectedMatch);
  });
});
