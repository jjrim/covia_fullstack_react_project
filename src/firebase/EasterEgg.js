import React from 'react';


function refreshPage() {
    window.location.reload(false);
}


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const rowLength = 3;
        const colLength = 3;
        return (
            <div>
                {[...new Array(rowLength)].map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className="board-row">
                            {[...new Array(colLength)].map((col, colIndex) => {
                                return this.renderSquare(rowIndex * colLength + colIndex);
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.colSize = 3;

        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    position: [null, null]
                }
            ],
            xIsNext: true,
            stepNumber: 0
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";

        const col = (i % this.colSize) + 1;
        const row = Math.ceil((i + 1) / this.colSize);

        this.setState({
            history: history.concat([{ squares: squares, position: [col, row] }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = "Winner is " + winner;
        } else {
            status = "Nobody is winning now";
        }
        return (
            <div>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => {
                            this.handleClick(i);
                        }}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button className = "ui large purple button" id = "eggGoBack" onClick={() => refreshPage()}> Go back</button>
                </div>

            </div>
        );
    }
}



export default Game;
