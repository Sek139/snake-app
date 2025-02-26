import { render, screen, fireEvent } from '@testing-library/react';
import GameState from './GameState';

// filepath: /c:/Users/serge/snake-app/src/components/GameState.test.js

describe('GameState Component', () => {

  test('renders initial score and high score', () => {
    render(<GameState />);
    expect(screen.getAllByText(/Score : 0/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/High Score : 0/i).length).toBeGreaterThan(0);
  });
});