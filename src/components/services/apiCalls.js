
setDice = (playerRole, boardId, playerPosition, result) => {

axios.post(`http://localhost:1007/track/dice`,{
    leaderId:playerRole.id,
    boardId:boardId,
    position:playerPosition + result,
    pointScored:playerScore,
    isDiceRolled:true,
    NumberOnDice:result
    }).then((response)=>{
    console.log("in dice res: ",response);
    
    });

}

export {setDice};