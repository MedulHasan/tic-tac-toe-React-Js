import React from 'react';
import '../App.css';

function Square(props) {
    const { value, onClick } = props;
    return (
        <button className="square" onClick={onClick} type="button">
            {value}
        </button>
    );
}

export default Square;
