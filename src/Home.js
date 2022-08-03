import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { MyContext } from './Contexts/Main';
import './Home.css';
import Error from './Error';

const style = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  minHeight: '60vh',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  backgroundImage: 'url("https://c.tenor.com/aV0h3VAHWUAAAAAC/gradient.gif")',
  backgroundRepeat: 'no-repeat',
  backgroundSize:'cover',
};


const Home = () => {
  const context = useContext(MyContext);
  
  const goHome = () => {
    document.getElementById('search').value = "";
    document.getElementById('search').focus();
    context.bookPos[1]('');
    context.booksArray[1]([]);
  }

  const searchBook = () => {
    var input = document.getElementById('search').value;
    if(input.length === 0)
    {
      goHome();
      return;
    }
    fetch(`https://openlibrary.org/search.json?q=${input}&mode=ebooks&has_fulltext=true`).then((result) => result.json()).then((json) => context.booksArray[1](json));
    context.check[1](true);
  }
  
  const openDetails = (e) => {
    var id = e.target.parentNode.id;
    context.bookPos[1](id);
    context.modal[1](true);
  }
  const handleClose = () => {
    context.modal[1](false);
  }

  useEffect(() => {
    context.check[1](false);
  }, [context.booksArray[0]])
  
  return (
    <div className="Home">
      <div className="topRow">
        <Button sx={{fontFamily: 'Mochiy Pop One, sans-serif', color: ''}} variant="text" onClick={goHome}>Home</Button>
        <TextField sx={{width: '50%'}} id="search" label="Search a book..." variant="standard" />
        <Button variant="outlined" onClick={searchBook}>Search</Button>
      </div>
      {context.check[0] ? <LinearProgress sx={{width: '100%', bgcolor:'#17fc86', marginTop: '2%'}}/> : null}
      <div className="bottomRow">
        {context.booksArray[0].length === 0 ? <><h1>Your One Stop Solution to Online book reading</h1><img className='model' src="http://strikersreadingzone.weebly.com/uploads/2/3/0/4/23047136/7243945_orig.gif" alt=""/><h3>Knowledge is power</h3></> : context.booksArray[0].numFound === 0 ? <Error /> :
        <div className="CardArea">
          {context.booksArray[0]['docs'].map((item,index) => <div id={index} key={index} className='Card'>
          <img src={`https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-L.jpg`} alt="item.cover_edition_key" />
          <h3>{item.title}</h3>
          <p style={{marginBottom: '2%', textAlign: 'center'}}>{item.author_name}</p>
          <Button sx={{marginBottom: '5%',  backgroundImage: 'linear-gradient(to top, #ffea00,#ff7e38)'}} variant="contained" onClick={openDetails} >Know More</Button>
          </div>)}
        </div>
        }
      {context.bookPos[0] === '' ? null : 
      <div>
      <Modal
        open={context.modal[0]}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2"> 
            <img style={{width: '100%', minHeight: '35vh'}} src={`https://covers.openlibrary.org/b/olid/${context.booksArray[0]['docs'][context.bookPos[0]].cover_edition_key}-M.jpg`} alt="" />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mx: 5 }}>
            <h4 style={{fontFamily: "'Mochiy Pop One', sans-serif", fontSize: '25px'}}>{context.booksArray[0]['docs'][context.bookPos[0]].title}</h4>
            <p style={{fontFamily: "'Mochiy Pop One', sans-serif",fontSize: '12px'}}> Publish Year : {context.booksArray[0]['docs'][context.bookPos[0]].first_publish_year}</p>
            <p style={{fontFamily: "'Mochiy Pop One', sans-serif",fontSize: '12px'}}> Author : {context.booksArray[0]['docs'][context.bookPos[0]].author_name[0]}</p>
            <p style={{fontFamily: "'Mochiy Pop One', sans-serif",fontSize: '12px'}}> Pages : {context.booksArray[0]['docs'][context.bookPos[0]].number_of_pages_median}</p>
            <a target="blank" href={`https://openlibrary.org/${context.booksArray[0]['docs'][context.bookPos[0]].key}`} style={{fontFamily: "'Mochiy Pop One', sans-serif", color: 'black', textDecoration:'none'}}>View In OpenLibrary</a>
          </Typography>
        </Box>
      </Modal>
      </div>
      }  
      </div>
    </div>
  )
}

export default Home