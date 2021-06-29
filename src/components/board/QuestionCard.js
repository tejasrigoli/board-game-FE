import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { MATH_QUESTIONS, ANSWER_OPTION_LABELS } from '../../constants';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function QuestionCard({ submitAnswer, question = MATH_QUESTIONS[0], setQuestionModalOpen }) {
  const classes = useStyles();
  const [answer, setAnswer] = useState("")
  const [timer, setTimer] = useState(10)
  const [answerSubmitted, setAnswerSubmitted] = useState({ correct: false, submitted: false })
  const handleChange = e => setAnswer(e.target.value);
  const handleAnswerSubmitted = () => {
    console.log(`${answer} selected`)
    setAnswerSubmitted({ correct: question.rightAnswerOptions[0] === answer, submitted: true })
    submitAnswer(answer,{ correct: question.rightAnswerOptions[0] === answer, submitted: true });
    //setPlayerScore(question.answer === answer ? playerScore + question.points : playerScore - question.points)
  }

  useEffect(() => {
    const t = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1)
      }
    }, 1000)
    return () => {
      clearTimeout(t)
    }
  }, [timer])


  return (
    <Card className={classes.root}>
      <CardContent>
        {!answerSubmitted.submitted ? <><Typography variant="h5" component="h2">
          Q: {question.question}
        </Typography>
          <FormControl component="fieldset">
            <RadioGroup aria-label="answer" name="selection" value={answer} onChange={handleChange}>
              {//question.answers.map((a) => <FormControlLabel value={a} control={<Radio />} label={a} />)
            }
            <FormControlLabel label={question.optionA} control={<Radio />} value={"A"} />
            <FormControlLabel label={question.optionB} control={<Radio />} value={"B"} />
            <FormControlLabel label={question.optionC} control={<Radio />} value={"C"} />
            <FormControlLabel label={question.optionD} control={<Radio />} value={"D"} />
            </RadioGroup>
          </FormControl>
          <Box justifyContent="center" display="flex" flexDirection="column" >
            <Box my={3} display="flex" justifyContent="center">
              {timer > 0 ? <Typography variant="h6" align="center">{`${timer} seconds remaining`}</Typography> : <Typography variant="h6" align="center">Sorry! Time out.</Typography>}
            </Box>
            {timer > 0 ? <Button variant="contained" color="primary" disabled={answer === ""} onClick={handleAnswerSubmitted}>
              Submit
        </Button> : <Button variant="contained" color="secondary" onClick={() => {setQuestionModalOpen(false);submitAnswer(answer,answerSubmitted);}}>
              Close
        </Button>}
          </Box></> : <Box>{answerSubmitted.correct ? <Box>Great you've answered correctly</Box> : <Box>Sorry you've selected an incorrect answer</Box>}
          <Box mt={2} display="flex" justifyContent="center"><Button variant="contained" color="secondary" onClick={() => setQuestionModalOpen(false)}>
            Close
        </Button></Box>
        </Box>}
      </CardContent>
    </Card >
  );
}
