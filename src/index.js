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
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={()  => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    nextMarker() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    get history() {
        return this.state.history;
    }

    get current() {
        return this.history[this.state.stepNumber].squares;
    }

    statusText() {
        const winner = calculateWinner(this.current);
        return winner ? `Winner: ${winner}` : `Next player: ${this.nextMarker()}`;
    }

    handleClick(i) {
        const nextStep = this.state.stepNumber + 1;
        const forwardHistory = this.history.slice(0, nextStep);
        const squares = this.current.slice();

        // Do nothing for winners or if square is already taken
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.nextMarker();
        this.setState({
            history: forwardHistory.concat([{squares}]),
            stepNumber: forwardHistory.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    historyButtons() {
        return this.history.map((step, move) => {
            const description = move ?
                `Go to move #${move}` :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{description}</button>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={this.current}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{ this.statusText() }</div>
                    <ol>{this.historyButtons()}</ol>
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
