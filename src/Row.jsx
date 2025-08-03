import React,{useEffect} from 'react'
function Row({guess,word,Submitted,setScore,ith_guess}) {
    let score=0;
    const tile=[]

    for(let i=0;i<5;i++){
        let className="box";
        if (Submitted){
            if (word.includes(guess[i])){
                if(word[i]===guess[i]){
                    className+=" correct";
                    score += 10 / (ith_guess+1);
                }
                else{
                    className+=" close";
                    score += 5 / (ith_guess+1);
                }
            }
            else{
                score -= 2;
                className+=" wrong";
            }
        }
        tile.push(<div key={i} className={className}>{guess[i]}</div>)
    }
    useEffect(()=>{
        setScore(prev => prev + score);
    }, [score]);
    return (
    <div className="row">
        {tile}
    </div>
    )
}

export default Row;