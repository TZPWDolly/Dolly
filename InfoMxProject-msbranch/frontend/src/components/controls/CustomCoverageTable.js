import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import tableData from '../../utils/tableData.json'

const useStyles = makeStyles({
    table: {
      overflow: 'auto',
      display: 'block-inline',
    },
    container: {
      maxHeight: '500px',
      width: '100%',
      marginBottom: '10px'
    },
  });

export default function CustomCoverageTable(props) {

    const {tableID, tData} = props
    const classes = useStyles();

    return (
        
            <TableContainer component={Paper} className={classes.container}>
            <Table  id={tableID} stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="tableHead" style={{background:'#f8dadd'}}>
                    <TableRow>
                        <TableCell align="center" style={{background:'#fcf0f2',color: '#53344d',fontWeight:'bold'}}>Project</TableCell>
                        <TableCell align="center" style={{background:'#fcf0f2',color: '#53344d',fontWeight:'bold'}}>Organization</TableCell>
                        <TableCell align="center" style={{background:'#fcf0f2',color: '#53344d',fontWeight:'bold'}}>No. of Clinic</TableCell>
                        <TableCell align="center" style={{background:'#fcf0f2',color: '#53344d',fontWeight:'bold'}}>No. of Village</TableCell>
                        <TableCell align="center" style={{background:'#fcf0f2',color: '#53344d',fontWeight:'bold'}}>Total Population</TableCell>
                        <TableCell align="center" style={{background:'#fcf0f2',color: '#53344d',fontWeight:'bold'}}>No. of Household</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tData.map((row) => (
                        <TableRow
                            key={row.project}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" align="center">
                                {row.PROJECTNAME}
                            </TableCell>
                            <TableCell align="center">{row.ORGNAME}</TableCell>
                            <TableCell align="center">{row.TOTALCLINIC}</TableCell>
                            <TableCell align="center">{row.TOTALVILLAGE}</TableCell>
                            <TableCell align="center">{row.TOTALPOP}</TableCell>
                            <TableCell align="center">{row.TOTALHHOLD}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
       
        
    )
}