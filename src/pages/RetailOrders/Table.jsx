import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditButton from '../../components/Buttons/EditButton';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


const TableComponent = ({ rows, headers }) => {
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#b9d8f7',
      color: '#061e35',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const navigate = useNavigate();

  const handleEdit = (id) => {
    return navigate(`/retail/sell/${id}`);
  };



  const renderCellContent = (header, row, rowIndex) => {
    if (header.toLowerCase() === 'action' && row.ordertable === 'SAFAL') {
      return (
        <>
          <EditButton text="Edit" onClickFunction={() => handleEdit(row.safalorderuniqueid)} />
        </>
      );
    } if (header.toLowerCase() === 'action' && row.ordertable === 'AGENT') {
      return (
        <>
          <Button variant="contained" color="success" disabled size="small">Edit</Button>
        </>
      );
    }
    else if (header.toLowerCase() === 'orderstatus') {
      return (
        <>
          {row.orderstatus}
        </>
      )
    }
    else if (header.toLowerCase() === 'paymentmode' && row.ordertable === 'SAFAL') {

      if (row.paymentmode === 0) {
        return "COD";
      } else {
        return "Online";
      }
    }
    if(header.toLowerCase() === 'date') {
      return new Date(row[header.toLowerCase()]).toLocaleDateString('en-GB');
    }

    else {
      return row[header.toLowerCase()];
    }
  };



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <StyledTableCell align="left" key={header}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <StyledTableRow key={row.id || rowIndex}>
              {headers.map((header, colIndex) => (
                <StyledTableCell align="left" key={colIndex}>
                  {renderCellContent(header, row, rowIndex)}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
