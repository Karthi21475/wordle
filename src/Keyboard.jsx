import React from 'react'

function Keyboard({guesses,word,isGameWon,isGameover}) {
    let keys=`QWERTYUIOP↵ASDFGHJKLZXCVBNM⌫`;
    let tile= {};
    keys.split('').map((k,index) => {
        let className=`box ${k}`;
        for (let i of guesses){
            if (i!=null && i.toLowerCase().includes(k.toLowerCase()) && !isGameWon && !isGameover){
                if (word.includes(k.toLowerCase())) {
                    if (word[i.toLowerCase().indexOf(k.toLowerCase())] === k.toLowerCase()) {
                        className += " correct";
                    } else {
                        className += " close";
                    }
                } else {
                    className += " wrong";
                }
            }
            tile[index]=<div key={index} className={className}>{k}</div>;
        }
    })
    return (
        <div className='keyboard'>
            {Object.values(tile)}
        </div>
    )
}

export default Keyboard