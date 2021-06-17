import React, { useState, useEffect } from 'react';
import { Box, Container } from '@material-ui/core';

import Player from '../images/player.svg'
import RightArrow from '../images/rightArrow.jpg';

import { BLOCKS, WORD_NUMS } from '../constants';
import './Logic.css';
import QuestionModal from './QuestionModal';
import Dialog from './Dialog';
import styled from 'styled-components';
import axios from 'axios';
import { getByLabelText } from '@testing-library/react';

export const TOKEN= "playerDetails";

function Logic() {

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


	const rollDie = () => {
		setDieRolling(true)
		const result = Math.floor(Math.random() * (6)) + 1;
		console.log("FE die result: ",result);
		axios.post(`http://localhost:1007/track/dice`,{
		leaderId:playerRole.id,
		boardId:"1",
		position:playerPosition + result,
		pointScored:playerScore,
		isDiceRolled:true,
		NumberOnDice:result
		}).then((response)=>{
        console.log("in dice res: ",response);
		});
		  axios.post(`http://localhost:1007/draw/question`,{
			teamId:playerRole.id,
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

	const submitAnswer = (answer,answerSubmitted) => {
		console.log("in sub ans: answer: ",answer," answersub: ",answerSubmitted);
		axios.post(`http://localhost:1007/validate/answer`,{
			teamId:playerRole.id,
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
			questionKey: questionData.questionKey
		  }).then((response)=>{
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
		gameTrack?.allPosition?.length>0 && setData(gameTrack);
		if(gameTrack.question)
		{
			setQuestionData(gameTrack.question);
			setQuestionModalOpen(true);
		}
	},[gameTrack]);

	

	useEffect(()=>{
		const details = JSON.parse(localStorage.getItem(TOKEN));
		if(!details)
		{
			const json = JSON.stringify({role:"Guest",id:-1});
			localStorage.setItem(TOKEN,json);
		}
		console.log("local data: ",details);
		if(details?.role == "Leader")
		{
			setPlayerRole({role:details.role,id:details.id});
		axios.get(`http://localhost:1007/track/team/${details.id}`).then((response)=>{
			console.log("in track teamL: ",response);
			if(!response.data.leader) setPlayerRole({role:"Guest",id:-1});
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

	useEffect(()=>{
		console.log("player role : ",playerRole);
		const json = JSON.stringify(playerRole);
    localStorage.setItem(TOKEN,json);
	},[playerRole]);

	useEffect(()=>{
		playerPosition > 32 && setPlayerPosition(playerPosition%36)
		
	},[playerPosition]);

	const getType = (boardNumber,number)=>{
		switch (boardNumber) {
			case 1:
			   return (number%2==0? "black":"yellow");
		   case 2:
			   return (number%2==0? "black":"orange");
		   case 3:
			   return (number%2==0? "black":"red");
			default:
				break;
		} }

	const getLabel = (number) =>{
		if(number == 0) return "start";
		if(number == 11) return "Easy";
		if(number == 23) return "Med";
		if(number == 35) return "Hard";
	}

	
	let number =0;
    const setBoardCol = (m,i,boardNumber) => {
        const k = (i>1 && i<n-2) ? m-1:m;
        return (
            <div>
            {
                [...Array(k)].map((e,j) =>{

                if(i==0 || i==n-1 || j == k-1 || (k==m ? j<2: j<1))
                {
                  if(i==0)(number = j-1);
                  else if(i==n-1)(number = (2*k-j+n-4))
                  else if(j==k-1)(number = i+(parseInt(n/2)))
				  else if((k==m ? j<2: j<1))(number = (2*n-i-1)+(2*parseInt(n/2)-1))
				  boardNumber == 1 && (number = (number + 6)%12)
				  boardNumber == 2 && (number = (number + 2)%12)
				  boardNumber == 3 && (number = (number + 10)%12)
				  boardNumber==2 && (number+=12)
				  boardNumber==3 && (number+=24)
				  const type = ((k==m) && j==0)? "":getType(boardNumber,number);

				  if((boardNumber==1 && number == 11) || (boardNumber==2 && number == 23) || (boardNumber==3 && number == 35) || number == 0 )
					return (
					<li class={`hex ${type}`} >
						{type &&<div className='start'>{
							getLabel(number)
						}{(playerPosition === number && number == 0) && <img className="player" alt="Player" src={Player} />}</div>}
					</li>);		  
					return (  
					<li class={`hex ${type}`} >
						{type && <div className='number'>{number}{playerPosition === number && <img className="player" alt="Player" src={Player} />}</div>}
					</li>);
              }
                else{
					if(i==parseInt(n/2) && i==j && (
					(boardNumber==1 && playerPosition<12) || 
					(boardNumber==2 && playerPosition>11 && playerPosition<24) ||
					(boardNumber==3 && playerPosition>23)))
					return <li class='hex' onClick={playerRole.role=="Leader" && rollDie}><i className={dieClasses}></i></li>
					else if(i==parseInt(n/2)-1 && i+2==j)
					//else if(i==parseInt(n/2)-1 && i+1==j)
					return <li class='hex'><div className="player-score">Score: {playerScore}
							</div></li>
                return (
                  <li class='hex'></li>
				);
				}
            }
                )
            }
            </div>
        );
    }

	const setBoardRow = (boardNumber) => {
		return (
			<div>
			{
				[...Array(n)].map((e,i) =>
			<ol class={i%2==0? "even": "odd"}>
				   { i <= parseInt(n/2) ? setBoardCol(i+((parseInt(n/2))+1)+1,i,boardNumber): setBoardCol((i-(i-parseInt(n/2))*2)+((parseInt(n/2))+1)+1,i,boardNumber)}
			  </ol>)
			}
			</div>
		);
	}

	let dieClasses = `Die fas fa-dice-${WORD_NUMS[roll - 1]} fa-5x`;
	if (dieRolling) dieClasses += ' Die-rolling';




	return (
		<div className = "screen">
		{playerRole == {} ? <h>Loading....</h>:
		<>
		<RoleDisplay>
			<RoleText>Role: {playerRole.role}</RoleText>
			<RoleChange onClick = {()=> setRoleSelection(true)}>Change Role</RoleChange>
		</RoleDisplay>
		<Container>
		{roleSelection && <Dialog setRoleSelection = {setRoleSelection} setRole = {setPlayerRole}/>}

			<Box className="board" mt="5rem">
			<RowContainer>
			 <div class="container">
				{setBoardRow(1)}
			</div>
			{
			<div class="blockMid1">
			<ol>
			<li class={`hex grey`} >
			<div className='number'>{11}{playerPosition === 11 && <img className="player" alt="Player" src={Player} />}</div>
			</li>
			</ol>
			</div>
			}
			<div class="container2">
			{ setBoardRow(2)
			}
		</div>
		</RowContainer>
		{
		<div>
			<div class="blockMid2">
			<ol>
			<li class={`hex grey`} >
			<div className='number'>{35}{playerPosition === 35 && <img className="player" alt="Player" src={Player} />}</div>
			</li>
			</ol>
			</div>
			<div class="blockMid3">
			<ol>
			<li class={`hex grey`} >
			<div className='number'>{23}{playerPosition === 23 && <img className="player" alt="Player" src={Player} />}</div>
			</li>
			</ol>
			</div>
		</div>
		}
		<div class="container3">
			{ setBoardRow(3)
			}
		</div>
			</Box>
			<QuestionModal submitAnswer = {submitAnswer} questionData = {questionData} questionModalOpen={questionModalOpen} setQuestionModalOpen={setQuestionModalOpen} playerScore={playerScore} setPlayerScore={setPlayerScore} />
		</Container>
		</>
		}
		</div>
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
position: absolute;
color: white;
display: flex;
flex-direction: column;
left:90%;
`
const RowContainer = styled.div`
width:100%;
flex-direction: row;
justify-content: space-between;
`

export default Logic;
