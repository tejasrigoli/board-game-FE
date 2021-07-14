
const getPlayerId = (teamName, allPosition) => {
    var id;
    if(allPosition.length <= 0) return 0;
    allPosition.forEach((element,index) => {
        if(element.teamName == teamName) id = index;
    });

    return id;
}

const getPlayerPosition = (teamName, allPosition) => {
    
    if(allPosition.length <= 0) return 0;
    return allPosition[getPlayerId(teamName, allPosition)].positionInBoard;

}

export {getPlayerId, getPlayerPosition};