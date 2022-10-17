import { status } from '../app';

describe('game', () => {
  it('tie 1', function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 3,
          height: 2,
        },
        status: [
          [0, 1, 1],
          [0, 0, 1],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: 'tie',
      winningPlayer: null,
    });
  });
  test('tie 2', function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 3,
          height: 3,
        },
        status: [
          [0, 1, 0],
          [0, 1, 1],
          [1, 0, 0],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: 'tie',
      winningPlayer: null,
    });
  });
  test('tie 3', function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 4,
          height: 4,
        },
        status: [
          [0, 1, 0, 0],
          [1, 1, 0, 1],
          [0, 0, 1, 1],
          [1, 0, 1, 0],
        ],
      },
      players_number: 2,
      winning_sequence_length: 4,
    });
    expect(result).toEqual({
      status: 'tie',
      winningPlayer: null,
    });
  });
  test('invalid 1', function () {
    const result = status({
      next_player: 1,
      board: {
        size: {
          width: 3,
          height: 2,
        },
        status: [
          [0, 0, 1],
          [0, 0, 1],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: 'invalid',
      winningPlayer: null,
    });
  });
  test('invalid 2', function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 3,
          height: 3,
        },
        status: [
          [1, 1, 1],
          [0, 1, 0],
          [1, 1, 1],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: 'invalid',
      winningPlayer: null,
    });
  });
  test('invalid 3', function () {
    const result = status({
      next_player: 1,
      board: {
        size: {
          width: 4,
          height: 4,
        },
        status: [
          [1, 0, 1, 0],
          [0, 0, 0, 0],
          [1, 0, 0, 0],
          [0, 0, 1, 0],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: 'invalid',
      winningPlayer: null,
    });
  });
  test('won 1', function () {
    const result = status({
      next_player: 1,
      board: {
        size: {
          width: 3,
          height: 2,
        },
        status: [
          [1, 1, -1],
          [0, 0, 0],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: 'won',
      winningPlayer: 0,
    });
  });
  test('won 2', function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 3,
          height: 3,
        },
        status: [
          [0, 0, 1],
          [0, 1, -1],
          [1, -1, -1],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: 'won',
      winningPlayer: 1,
    });
  });
  test('won 3', function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 4,
          height: 4,
        },
        status: [
          [0, 0, -1, 2],
          [0, 1, 2, -1],
          [1, 2, -1, -1],
          [-1, -1, 1, -1],
        ],
      },
      players_number: 3,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: 'won',
      winningPlayer: 2,
    });
  });
  test('ongoing 1', function () {
    const result = status({
      next_player: 1,
      board: {
        size: {
          width: 3,
          height: 2,
        },
        status: [
          [-1, -1, 0],
          [-1, 1, 0],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: 'ongoing',
      winningPlayer: null,
    });
  });
  test('ongoing 2', function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 3,
          height: 3,
        },
        status: [
          [-1, -1, 0],
          [-1, 1, -1],
          [-1, -1, -1],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: 'ongoing',
      winningPlayer: null,
    });
  });
  test('ongoing 3', function () {
    const result = status({
      next_player: 2,
      board: {
        size: {
          width: 4,
          height: 4,
        },
        status: [
          [0, 0, -1, -1],
          [-1, 1, 1, -1],
          [2, -1, -1, -1],
          [-1, -1, -1, -1],
        ],
      },
      players_number: 3,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: 'ongoing',
      winningPlayer: null,
    });
  });
});
