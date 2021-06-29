import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { GameSquare } from "./GameSquare";
import "./board.css";
import {WORD_NUMS } from '../../constants';
import QuestionModal from './QuestionModal';
import styled from "styled-components";
import Dialog from "./Dialog";

export const TOKEN= "playerDetails";

export default function GameBoard() {
  const num_squares: Array<number> = Array.from(Array(40));

	const [playerPosition, setPlayerPosition] = useState(0)
	const [playerScore, setPlayerScore] = useState(0)

	const [roll, setRoll] = useState(1)
	const [dieRolling, setDieRolling] = useState(false)
	const [playerRole, setPlayerRole] = useState({})
	const [gameTrack,setGameTrack] = useState({
		// yetToStart:true,
		// question:null,
		// allPosition:[],
		// leader:false,
		// justGameStarted:false
	});

	const [questionModalOpen, setQuestionModalOpen] = useState(false)
	const [n,setn] = useState(5);
	const [roleSelection,setRoleSelection] = useState(false);
	const [questionData, setQuestionData] = useState({});

  let dieClasses = `Die fas fa-dice-${WORD_NUMS[roll - 1]} fa-5x`;
	if (dieRolling) dieClasses += ' Die-rolling';

  
	const rollDie = () => {
		setDieRolling(true)
		const result = Math.floor(Math.random() * (6)) + 1;
		console.log("FE die result: ",result);
		axios.post(`http://localhost:1007/track/dice`,{
		//leaderId:playerRole.id,
		boardId:"1",
		position:playerPosition + result,
		pointScored:playerScore,
		isDiceRolled:true,
		NumberOnDice:result
		}).then((response)=>{
        console.log("in dice res: ",response);
		});
		  axios.post(`http://localhost:1007/draw/question`,{
			//teamId:playerRole.id,
			teamName:"y",
			boardId:"1",
			position:playerPosition + result,
			pointsScored:playerScore,
			isDiceRolled:true,
			NumberOnDice:result,
			result:"",
			blockColor:playerPosition + result%2==0 ? "GREY":"RED",
			questionCounter:Math.floor(Math.random() * (6)) + 1
		  }).then((response)=>{
			  console.log("in question res: ",response);
			  setQuestionData(response.data);
			  });
		setRoll(result)
		setPlayerPosition(playerPosition + result)
		setTimeout(() => { setDieRolling(false); setQuestionModalOpen(true) }, 1000)
	}

	const submitAnswer = (answer: any,answerSubmitted:any) => {
		console.log("in sub ans: answer: ",answer," answersub: ",answerSubmitted);
		axios.post(`http://localhost:1007/validate/answer`,{
			//teamId:playerRole.id,
			teamName:"y",
			boardId:"1",
			position:playerPosition,
			pointsScored:playerScore,
			diceRolled:true,
			numberOnDice:roll,
			result:"",
			blockColor:playerPosition %2 ==0 ? "GREY":"RED",
			optionSelected : answer,
			questionAnswered: answerSubmitted.submitted,
		//	questionKey: questionData.questionKey
		  }).then((response)=>{
			  setPlayerScore(response.data.pointsScored)
			  console.log("in Answer res: ",response);
			  });
	}

	const setData = (gameTrack: any) =>{
		setPlayerPosition(parseInt(gameTrack.allPosition[0].positionInBoard)); 
		setPlayerScore(gameTrack.allPosition[0].gamePoint);
		setRoll((gameTrack.allPosition[0].numberOnDice) ?? 1);
	}

	// useEffect(()=>{
	// 	console.log("gameTrack: ",gameTrack);
	// 	gameTrack?.allPosition?.length>0 && setData(gameTrack);
	// 	if(gameTrack.question)
	// 	{
	// 		setQuestionData(gameTrack.question);
	// 		setQuestionModalOpen(true);
	// 	}
	// },[gameTrack]);

	

	useEffect(()=>{
		const details = JSON.parse(localStorage.getItem(TOKEN) ?? "");
		if(!details)
		{
			const json = JSON.stringify({role:"Guest",id:-1});
			localStorage.setItem(TOKEN,json);
		}
		console.log("local data: ",details);
		if(details?.role == "Leader")
		{
			// setPlayerRole({role:details.role,id:details.id});
		axios.get(`http://localhost:1007/track/team/${details.id}`).then((response)=>{
			console.log("in track teamL: ",response);
		//	if(!response.data.leader) setPlayerRole({role:"Guest",id:-1});
			setGameTrack(response.data);

			});
		}
		else
		{
			setPlayerRole({role:"Guest",id:-1});
		axios.get(`http://localhost:1007/track/team/-1`).then((response)=>{
			console.log("in track team: ",response.data);
			setGameTrack(response.data);
			});
		}
	},[]);

	// useEffect(()=>{
	// 	console.log("player role : ",playerRole);
	// 	const json = JSON.stringify(playerRole);
  //   localStorage.setItem(TOKEN,json);
	// },[playerRole]);

	useEffect(()=>{
		playerPosition > 32 && setPlayerPosition(playerPosition%36)
		
	},[playerPosition]);
  
  return (
    <React.Fragment>
      <div className="board">
        {num_squares.map((n, index) => {
          const id: number = index + 1;
          return (<GameSquare
            id={id}
            key={id}
            playerPosition = {playerPosition+1}
          />)
        })}
		<ScoreDisplay>
			Score: {playerScore}					
		</ScoreDisplay>
        <RoleDisplay>
			{/* <RoleText>Role: {playerRole.role}</RoleText> */}
			<RoleChange onClick = {()=> setRoleSelection(true)}>Change Role</RoleChange>
		</RoleDisplay>
		{roleSelection && <Dialog setRoleSelection = {setRoleSelection} setRole = {setPlayerRole}/>}
         <i className={dieClasses} onClick={rollDie}></i>
         <QuestionModal submitAnswer = {submitAnswer} questionData = {questionData} questionModalOpen={questionModalOpen} setQuestionModalOpen={setQuestionModalOpen} playerScore={playerScore} setPlayerScore={setPlayerScore} />
        <div className="center-square square">
          <div className="center-txt">
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const RoleText = styled.h2`

`
const RoleChange = styled.a`
cursor: pointer;
&:hover {
	color: red;
  }
`
const RoleDisplay = styled.div`
font-size: 20px;
position: absolute;
color: white;
display: flex;
flex-direction: column;
top: 15%;
left:80%;
z-index: 2000;
`
const ScoreDisplay = styled.div`
position: absolute;
font-size: xx-large;
color:  white;
white-space: nowrap;
top: 15%;
left:15%;
z-index: 2000;
`