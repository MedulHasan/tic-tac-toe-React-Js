/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-constant-condition */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Board from './Board';

function calculateWinner(square) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for(let i=0; i<lines.length; i++) {
        const [a, b, c] = lines[i];
        if(square[a] && square[a] === square[b] && square[a] === square[c]) {
            return square[a];
        }
    }
    return null
}

class Game extends React.Component {
    state = {
        history: [{ squares: Array(9).fill(null) }],
        stepNumber: 0,
        xIsNext: true,
    };

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {return}
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares}]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    };

    jumpTo = (step) => {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        })
    }

    render() {
        // const { history } = this.state;
        // eslint-disable-next-line prefer-destructuring
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner  = calculateWinner(current.squares)
        
        const moves = history.map((_, move) => {
            const desc = move ? `Go to move - ${move}` : 'Go to Game start';
            return (
                <li key={move}>
                    <button type="button" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status = '';
        if(winner) {
            status = `Winner ${winner}`;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={this.handleClick} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Game;
