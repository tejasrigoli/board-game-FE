import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { GameSquare } from "./GameSquare";
import "./board.css";
import {WORD_NUMS } from '../../constants';
import QuestionModal from './QuestionModal';
import styled from "styled-components";
import Dialog from "./Dialog";
import RegistrationComponent from "../registration/RegistrationComponent";
import Header from "../registration/Header";
import { SquareConfigData, squareGroupColorMapCaps } from "./SquareData";
import { SquareType } from "./SquareType";
import GameOver from "./GameOver";

export const TOKEN= "playerDetails";

export default function GameBoard() {
  const num_squares = Array.from(Array(40)); //: Array<number>

	const [playerPosition, setPlayerPosition] = useState(0)
	const [playerScore, setPlayerScore] = useState(0)

	const [roll, setRoll] = useState(1)
	const [dieRolling, setDieRolling] = useState(false)
	const [playerRole, setPlayerRole] = useState({})
	const [gameTrack,setGameTrack] = useState({
		yetToStart:true,
		question:null,
		allPosition:[],
		leader:false,
		justGameStarted:false
	});
	const [boardId, setBoardId] = useState(1)
	const [answerData,setAnswerData] = useState({});

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
		leaderId:playerRole.id,
		boardId:boardId,
		position:playerPosition + result,
		pointScored:playerScore,
		isDiceRolled:true,
		NumberOnDice:result
		}).then((response)=>{
        console.log("in dice res: ",response);
		});
		const blockColor = squareGroupColorMapCaps.get(SquareConfigData.get(playerPosition +1)?.groupId);
		console.log("player pos",playerPosition +1);
		console.log("groupId",SquareConfigData.get(playerPosition +1).groupId);
		console.log("blockColor",blockColor);
		  axios.post(`http://localhost:1007/draw/question`,{
			teamId:playerRole.id,
			teamName:"TEAM_1",
			boardId:boardId,
			position:playerPosition + result,
			pointsScored:playerScore,
			isDiceRolled:true,
			NumberOnDice:result,
			result:"",
			blockColor:blockColor ?? "GREY",
			questionCounter:""
		  }).then((response)=>{
			  console.log("in question res: ",response);
			  setQuestionData(response.data);
			  });
		setRoll(result)
		setPlayerPosition(playerPosition + result)
		setTimeout(() => { setDieRolling(false); setQuestionModalOpen(true) }, 1000)
	}

	const submitAnswer = (answer,answerSubmitted) => {
		const blockColor = squareGroupColorMapCaps.get(SquareConfigData.get(playerPosition +1)?.groupId);
		const squareType = SquareConfigData.get(playerPosition +1)?.type;
		console.log("in sub ans: answer: ",answer," answersub: ",answerSubmitted);
		
		axios.post(`http://localhost:1007/validate/answer`,{
			teamId:playerRole.id,
			teamName:"TEAM_1",
			boardId:boardId,
			position:playerPosition,
			pointsScored:playerScore,
			diceRolled:true,
			numberOnDice:roll,
			result:"",
			blockColor:blockColor ?? "GREY",
			optionSelected : answer,
			isQuestionAnswered: answerSubmitted.submitted,
			questionKey: questionData.questionKey,
			noNegetiveMarked:  squareType === SquareType.PitStop
		  }).then((response)=>{
			  setAnswerData(response.data)
			  setPlayerScore(response.data.pointsScored)
			  console.log("in Answer res: ",response);
			  });
	}

	const setData = (gameTrack) =>{
		setPlayerPosition(parseInt(gameTrack.allPosition[0].positionInBoard)); 
		setPlayerScore(gameTrack.allPosition[0].gamePoint);
		setRoll((gameTrack.allPosition[0].numberOnDice) ?? 1);
	}

	useEffect(()=>{
		console.log("gameTrack: ",gameTrack);
		if(gameTrack?.allPosition?.length>0) 
		{ 
			setData(gameTrack);
			setBoardId(parseInt(gameTrack?.allPosition[0].boardName));
		}
		if(gameTrack.question)
		{
			setQuestionData(gameTrack.question);
			setQuestionModalOpen(true);
		}
	},[gameTrack]);

	

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
		axios.get(`http://localhost:1007/track/team/${details.id}`).then((response)=>{
			console.log("in track teamL: ",response);
			if(response.data.leader) 
			{
				setPlayerRole({role:details.role,id:details.id});
				setGameTrack(response.data);
			}
			else
			setPlayerRole({role:"Guest",id:-1});
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

	useEffect(()=>{
		console.log("player role : ",playerRole);
		const json = JSON.stringify(playerRole);
    localStorage.setItem(TOKEN,json);
	},[playerRole]);

	useEffect(()=>{
		if(playerPosition > 40){
		  setPlayerPosition(playerPosition%40);
			setBoardId(boardId+1);
		}
		if(playerPosition % 10 == 0 && playerPosition !=0)
		setPlayerPosition(playerPosition+1);
	},[playerPosition]);
  
  return (
    <React.Fragment>
	{
		boardId >= 3 ?
		<GameOver playerScore = {playerScore}/> :
	<>
	{(playerRole.role != "Leader" && gameTrack.yetToStart) ?
	<>
	<Header />
	<div className="container d-flex align-items-center flex-column">
	<RegistrationComponent setRole = {setPlayerRole} /></div></> :
      <div className="board">
        {num_squares.map((n, index) => {
          const id = index + 1;
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
			<RoleText>Role: {playerRole.role}</RoleText>
			<RoleChange onClick = {()=> setRoleSelection(true)}>Change Role</RoleChange>
		</RoleDisplay>
		{roleSelection && <Dialog setRoleSelection = {setRoleSelection} setRole = {setPlayerRole}/>}
         <i className={dieClasses} onClick={playerRole.role == "Leader"  && rollDie}></i>
        <ModelContent> <QuestionModal submitAnswer = {submitAnswer} questionData = {questionData} questionModalOpen={questionModalOpen} setQuestionModalOpen={setQuestionModalOpen} answerData = {answerData}/>
		</ModelContent>
        <div className="center-square square">
          <div className="center-txt">
          </div>
        </div>
      </div>
	}
	  </>
	}
    </React.Fragment>
  );
}

const RoleText = styled.div`
font-size: 25px;
padding-bottom: 5px;
`
const RoleChange = styled.a`
cursor: pointer;
&:hover {
	color: red;
  }
`
const RoleDisplay = styled.div`
font-size: 15px;
position: absolute;
color: white;
display: flex;
flex-direction: column;
space-between: 0;
top: 15%;
left:78%;
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

const ModelContent = styled.div`
left: 50%;
`