import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={ props.onClick }>
            { props.value }
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    nextMarker() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        // Do nothing for winners or if square is already taken
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.nextMarker();
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={ ()  => this.handleClick(i) }
            />
        );
    }

    gameStatusText() {
        const winner = calculateWinner(this.state.squares);
        return winner ? `Winner: ${winner}` : `Next player: ${this.nextMarker()}`;
    }

    render() {
        return (
            <div>
                <div className="status">{this.gameStatusText()}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const winningPermutations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningPermutations.length; i++) {
      const [a, b, c] = winningPermutations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
