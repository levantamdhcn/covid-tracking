import React,{ useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  Avatar,
  Typography,
  Toolbar,
  makeStyles,
  InputBase,
} from '@material-ui/core'
import { ThemeContext } from '../../../contexts/ThemeContext' 

const BasicTable = ({ data }) => {
  const [orderDirection,setOrderDirection] = useState('asc')
  const [valueToOrderBy,setValueToOrderBy] = useState('name')
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(5)
  const [searchValue,setSearchValue] = useState('')
  const { theme } = React.useContext(ThemeContext)

  const useStyle = makeStyles({
    container: (props) => ({
      backgroundColor: props.theme.item.backgroundColor,
    }),
    tooltip: (props) => ({
          "& p": {
            fontSize: '18px',
            fontWeight: '600',
          },
          padding: '20px',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
          borderBottom: '1px solid',
          borderBottomColor: 'rgba(0, 0, 0, 0.05)',
          backgroundColor: props.theme.item.backgroundColor,
          color: props.theme.item.textColor,
    }),
    label: (props) => ({
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '16px',
      color: props.theme.item.iconColor
    }),
    cell: (props) => ({
      padding: '8px 16px',
      backgroundColor: props.theme.item.backgroundColor,
    }),
    pagination: (props) => ({
      "& p:first-child": {
        textAilgn: 'left',
      },
      backgroundColor: props.theme.item.backgroundColor,
      color: props.theme.item.iconColor
    }),
    searchWrapper: (props) => ({
      padding: '8px 16px',
      boxShadow: 'unset',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderBottom: '1px solid #e0e0e0',
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
      borderRadius: 'unset',
      backgroundColor: props.theme.item.backgroundColor,
      color: props.theme.item.iconColor
    }),
    searchField: (props) => ({
      backgroundColor: props.theme.container.backgroundColor,
      color: props.theme.item.iconColor,
      borderRadius: '5px',
      padding: '0px 10px',
      marginLeft: '5px',
      fontSize: '14px',
    }),
    oddRow: (props) => ({
      backgroundColor: `${props.theme.item.backgroundColor} !important`,
      "& td:first-child": {
        color: props.theme.item.iconColor
      }
    }),
    evenRow: (props) => ({
      backgroundColor: `${props.theme.container.backgroundColor} !important`,
      "& td:first-child": {
        color: props.theme.item.iconColor
      }
    }),
    country: (props) => ({
      fontWeight: 'bold',
      color: props.theme.item.iconColor
    }),
    cases: {
      color: '#7B6FFF',
    },
    todayCases: {
      color: '#7B6FFF',
    },
    deaths: {
      color: '#F5385A',
    },
    todayDeaths: {
      color: '#F5385A',
    },
    recovered: {
      color: '#2DCE99',
    },
    todayRecovered: {
      color: '#2DCE99',
    },
    active: {
      color: '#FE9431',
    },
  })  

  const classes = useStyle({ theme })

  function createData(flag,country,cases,todayCases,deaths,todayDeaths,recovered,todayRecovered,active) {
    return { flag,country,cases,todayCases,deaths,todayDeaths,recovered,todayRecovered,active };
  }

  const rows = [];
  if (data.length > 0) {
    data.forEach((element) => {
      rows.push(createData(
          element.countryInfo.flag,
          element.country,
          element.cases,
          element.todayCases,
          element.deaths,
          element.todayDeaths,
          element.recovered,
          element.todayRecovered,
          element.active
        ))
    })
  }

  const handleRequestSort = (event,property) => {
    const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? 'desc' : 'asc')
  }

  const createSortHandle = (property) => (event) => {
    handleRequestSort(event,property)
  }

  const descendingComparator = (a,b,orderBy) => {
    if(b[orderBy] < a[orderBy]){
      return -1
    }
    if(b[orderBy] > a[orderBy]){
      return 1
    }
    return 0
  }

  const getComparator = (order,orderBy) => {
    return order === 'desc'
          ? (a,b) => descendingComparator(a,b,orderBy) 
          : (a,b) => -descendingComparator(a,b,orderBy) 
  }

  const sortedRows = (rows,comparator) => {
    const stablizedRowsArray = rows.map((el,index) => [el,index])
    stablizedRowsArray.sort((a,b) => {
      const order  = comparator(a[0],b[0])
      if(order !== 0 ) return order
      return a[1] - b[1]
    })
    return stablizedRowsArray.map((el) => el[0])
  }

  const handleChangePage = (event,newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage((event.target.value),10)
    setPage(0)
  }

  function defaultLabelDisplayedRows({ from, to, count }) {
    return `Showing ${from}-${to} of ${count !== -1 ? count : `more than ${to}`} entries`; 
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <>
    <Toolbar className={classes.tooltip}>
        <Typography
        >
          Asia
        </Typography>
    </Toolbar>
      <TableContainer component={Paper} className={classes.container}>
        <Paper component="div" className={classes.searchWrapper}>
          <Typography component='p'>Search: </Typography>
        <InputBase
          inputProps={{ 'aria-label': 'S' }}
          onChange={handleSearchChange}
          className={classes.searchField}
          placeholder='Enter a country name'
        />
      </Paper>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow>
              <TableCell align="left" className={classes.label}>
                  SERIAL
                </TableCell>
                <TableCell align="left" className={classes.label}>
                  FLAG
                </TableCell>
                <TableCell align="center" className={classes.label}>
                  <TableSortLabel
                    active={valueToOrderBy === 'name'}
                    direction={valueToOrderBy === 'name' ? orderDirection: 'asc'}
                    onClick={createSortHandle('name')}
                  >
                    COUNTRY
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" className={classes.label}>
                  <TableSortLabel
                    active={valueToOrderBy === 'cases'}
                    direction={valueToOrderBy === 'cases' ? orderDirection: 'asc'}
                    onClick={createSortHandle('cases')}

                  >
                    CASES
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" className={classes.label}>
                  <TableSortLabel
                    active={valueToOrderBy === 'todayCases'}
                    direction={valueToOrderBy === 'todayCases' ? orderDirection: 'asc'}
                    onClick={createSortHandle('todayCases')}
                  >
                    NEW CASES
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" className={classes.label}>
                  <TableSortLabel
                    active={valueToOrderBy === 'deaths'}
                    direction={valueToOrderBy === 'deaths' ? orderDirection: 'asc'}
                    onClick={createSortHandle('deaths')}
                  >
                    DEATHS
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" className={classes.label}>
                  <TableSortLabel
                    active={valueToOrderBy === 'todayDeaths'}
                    direction={valueToOrderBy === 'todayDeaths' ? orderDirection: 'asc'}
                    onClick={createSortHandle('todayDeaths')}
                  >
                    NEW DEATHS
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" className={classes.label}>
                  <TableSortLabel
                    active={valueToOrderBy === 'recovered'}
                    direction={valueToOrderBy === 'recovered' ? orderDirection: 'asc'}
                    onClick={createSortHandle('recovered')}
                  >
                    RECOVERED
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" className={classes.label}>
                  <TableSortLabel
                    active={valueToOrderBy === 'todayRecovered'}
                    direction={valueToOrderBy === 'todayRecovered' ? orderDirection: 'asc'}
                    onClick={createSortHandle('todayRecovered')}
                  >
                    ACTIVE
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows(rows,getComparator(orderDirection,valueToOrderBy))
              .filter((row) => row.country.toLowerCase().includes(searchValue.toLowerCase()))
              .slice(page*rowsPerPage,page * rowsPerPage + rowsPerPage)
              .map((row,index) => (
                <TableRow
                  key={row.country}
                  className={index % 2 === 0 ? classes.oddRow : classes.evenRow }
                >
                  <TableCell align="left" className={classes.cell}>{index+1}</TableCell>
                  <TableCell align="left" className={classes.cell}>
                    <Avatar variant={"rounded"} alt="logo" src={row.flag} style={{
                          width: 30,
                          height: 16,
                          borderRadius: 0,
                    }}/>
                  </TableCell>
                  <TableCell align="left" className={`${classes.cell} ${classes.country}`}>
                    {row.country}
                  </TableCell>
                  <TableCell align="right" className={`${classes.cell} ${classes.cases}`}>
                    {row.cases}
                  </TableCell>
                  <TableCell align="right" className={`${classes.cell} ${classes.todayCases}`}>
                    {row.todayCases}
                  </TableCell>
                  <TableCell align="right" className={`${classes.cell} ${classes.deaths}`}>
                    {row.deaths}
                  </TableCell>
                  <TableCell align="right" className={`${classes.cell} ${classes.todayDeaths}`}>
                    {row.todayDeaths}
                  </TableCell>
                  <TableCell align="right" className={`${classes.cell} ${classes.recovered}`}>
                    {row.recovered}
                  </TableCell>
                  <TableCell align="right" className={`${classes.cell} ${classes.active}`}>
                    {row.active}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5,10]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Show'
          labelDisplayedRows={
            defaultLabelDisplayedRows
          }
          className={classes.pagination}
        >

        </TablePagination>
    </>
  );
}

export default React.memo(BasicTable)