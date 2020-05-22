import React from 'react';

/********
 * React.js Tic Tac Toe Game in 30 Minutes: https://www.youtube.com/watch?v=it54tShOsuI&t=829s
 * I followed the instructions and logic on how to determine the winner and how to create a tic tac toe game with react.js
 * *********/



function refreshPage() {
    window.location.reload(false);
}


function Element(props) {
    return (
        <button className="elementSquare" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


function calculateWinner(elements) {
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
        if (elements[a] && elements[a] === elements[b] && elements[a] === elements[c]) {
            return elements[a];
        }
    }
    return null;
}

class Board extends React.Component {
    renderelement(i) {
        return (
            <Element
                key={i}
                value={this.props.elements[i]}
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
                                return this.renderelement(rowIndex * colLength + colIndex);
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
                    elements: Array(9).fill(null),
                    position: [null, null]
                }
            ],
            xIsNext: true,
            stepNumber: 0
        };
    }


    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const elements = current.elements.slice();

        if (calculateWinner(elements) || elements[i]) {
            return;
        }

        elements[i] = this.state.xIsNext ? "X" : "O";

        const col = (i % this.colSize) + 1;
        const row = Math.ceil((i + 1) / this.colSize);

        this.setState({
            history: history.concat([{ elements: elements, position: [col, row] }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.elements);

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
                        elements={current.elements}
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
