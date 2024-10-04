
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditButton from "../../components/Buttons/EditButton";
import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line
const TableComponent = ({ rows, headers }) => {
    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#b9d8f7',
            color: "#061e35"
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
    const navigate = useNavigate();
    const handleEdit = (id) => {
        return navigate(`/order/${id}`);
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow >
                        {/* eslint-disable-next-line */}
                        {headers.map((header) => (
                            <StyledTableCell align="left" key={header}>{header}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* eslint-disable-next-line */}
                    {rows.map((row, rowIndex) => (
                        <StyledTableRow key={rowIndex}>
                            {/* eslint-disable-next-line */}
                            {headers.map((header, colIndex) => (
                                <React.Fragment key={colIndex}>
                                    {header === "action" ? (
                                        <StyledTableCell align="left">
                                            <EditButton text="Details" onClickFunction={() => handleEdit(row.id)} />
                                        </StyledTableCell>
                                    ) : (
                                        <StyledTableCell align="left">
                                            {row[header]}
                                        </StyledTableCell>
                                    )}
                                </React.Fragment>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    )
}

export default TableComponent;