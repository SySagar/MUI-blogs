import React from 'react'
import { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { Container } from '@mui/system';
import NoteCard from '../componenets/NoteCard'
import Masonry from 'react-masonry-css'

export default function Notes() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }

  const breakPoints ={
    default:3,
    1100 : 2,
    700 : 1
  }

  return (
    <Container>

      {/* <Grid container>
       <Grid item xs={12} sm={6} md={3}>
        <Paper>1</Paper>
       </Grid>

       <Grid item xs={12} sm={6} md={3}>
        <Paper>2</Paper>
       </Grid>

       <Grid item xs={12} sm={6} md={3}>
        <Paper>3</Paper>
       </Grid>

       <Grid item xs={12} sm={6} md={3}>
        <Paper>4</Paper>
       </Grid>
      </Grid> */}

      <Masonry
      breakpointCols={breakPoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
        {notes.map(note => (
          <div item key={note.id} >
            {/*<Paper>{note.title}</Paper>*/}
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>

    </Container>
  )
}








{/* <Grid container spacing={3}>
{notes.map(note => (
<Grid item key={note.id} xs={12} md={6} lg={4}>
{<Paper>{note.title}</Paper>}
<NoteCard note={note} handleDelete={handleDelete} />
</Grid>
)
)
}
</Grid>  */}
