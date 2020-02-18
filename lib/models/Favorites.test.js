const Favorites = require('./Favorites');
const User = require('./User');

describe('Favorites Model', () => {
  it('requires a word', () => {
    const favorite = new Favorites();
    const { errors } = favorite.validateSync();

    expect(errors.word.message).toEqual('Path `word` is required.');
  });

  it('requires a word', () => {
    const favorite = new Favorites();
    const { errors } = favorite.validateSync();

    expect(errors.userId.message).toEqual('Path `userId` is required.');
  });
});
