import React from 'react'
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  // btn:{
  //   fontSize:60,
  //   backgroundColor:'violet',
  //   '&:hover':{
  //     backgroundColor:'blue'
  //   }
  // },
  // title:{
  //   textDecoration : 'underline',
  //   marginBottom : 20
  // }

  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Create() {

  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category ,setCategory] = useState('todos')
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title == '') {
      setTitleError(true)
    }
    if (details == '') {
      setDetailsError(true)
    }

    if (title && details){
      console.log(title, details ,category);
      
      fetch('http://localhost:8000/notes',{
        method: 'POST',
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify({title , details ,category})
      }).then(()=> history.push('/'))
    }
  }


  return (
    <Container>

      {/* <Typography 
      variant='h1'
      color="primary"
      align="center" >
        Create a New Note
      </Typography>

      <Typography
      noWrap>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum atque totam maiores in a quibusdam quas veniam velit qui! Quae quidem voluptatum consequatur voluptate placeat aliquam veritatis voluptatibus repellat explicabo!
      </Typography> */}


      <Typography
        className={classes.title}
        variant='h6'
        color='textSecondary'
        component='h2'
        gutterBottom>
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="note title"
          color="secondary"
          fullWidth
          required
          error={titleError}
          variant="outlined"></TextField>

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
          variant="outlined"></TextField>

        <FormControl className={classes.field}>
        <FormLabel>Note category</FormLabel>
        <RadioGroup value={category} onChange={(e)=>setCategory(e.target.value)}>
          {/* <Radio value="Hello"></Radio>
          <Radio value="goodbye"></Radio> */}

            <FormControlLabel value="money" control={<Radio/>} label='money'></FormControlLabel>
            <FormControlLabel value="todos" control={<Radio/>} label='todos'></FormControlLabel>
             <FormControlLabel value="reminders" control={<Radio/>} label='reminder'></FormControlLabel>
             <FormControlLabel value="work" control={<Radio/>} label='work'></FormControlLabel>
        </RadioGroup>
        </FormControl>

        <Button
          className={classes.btn}
          onClick={() => { 'You clicked me' }}
          type='submit'
          color='secondary'
          variant='contained'
          /*startIcon={<SendIcon/>}*/
          endIcon={<ArrowForwardIosIcon />}>Submit</Button>

      </form>
      {/* <Button
        type='submit'
        color='secondary'
        variant='outlined'>Submit</Button> */}


      {/* <ButtonGroup color='secondary' variant='contained'>
          <Button>one</Button>
          <Button>one</Button>
          <Button>one</Button>
        </ButtonGroup> */}

      {/*icons*/}
      <br />
      {/* <AcUnitIcon/>
        <AcUnitIcon color='secondary' fontSize='large'/> */}

    </Container>
  )
}
