import React, {useEffect} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useDispatch, useSelector} from 'react-redux'
import { deleteUser, loadUsers } from '../redux/action';
import {useNavigate} from 'react-router-dom'

        

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
const Home = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const {users} = useSelector(state => state.data)  // use to fetch state

    useEffect(() => {
        dispatch(loadUsers())
    }, [])

const handleDelete = (id) => {
if(window.confirm('Are you sure you want to delete the user')) {
    dispatch(deleteUser(id))
}
}

  return (
    <div>
        <div style={{marginTop: '2rem'}}>
        <Button 
        variant='contained' color="primary"
        onClick={()=> navigate('/addUser')}
        >
        Add User
        </Button>
        </div>

         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900}} style={{marginTop:100}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.contact}</StyledTableCell>
              <StyledTableCell align="center">{user.address}</StyledTableCell>
              <StyledTableCell align="center">
              <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <Button 
                color="secondary" 
                style={{width: '6rem', margin: '0.1rem'}}
                onClick={() => handleDelete(user.id)}
                >Delete</Button>
                <Button color="primary" style={{width: '6rem', margin: '0.1rem'}} onClick={() => navigate(`/editUser/${user.id}`)}>Edit</Button>
                </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Home
