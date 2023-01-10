const datastr = (a) => {
  return a.map(f => `'${f}'`).join(',');
}

const filter = (a) => {
  let filter = '';
  a?.proj ? (typeof a.proj === 'string' ? filter = `${filter}projectCode in ('${a.proj}') and ` : filter = `${filter}projectCode in (${datastr(a.proj)}) and `) : null;
  a?.org ? (typeof a.org === 'string' ? filter = `${filter}orgCode in ('${a.org}') and ` : filter = `${filter}orgCode in (${datastr(a.org)}) and `) : null;
  a?.cln ? (typeof a.cln === 'string' ? filter = `${filter}clnCode in ('${a.cln}') and ` : filter = `${filter}clnCode in (${datastr(a.cln)}) and `) : null;
  a?.state ? (typeof a.state === 'string' ? filter = `${filter}divcode in ('${a.state}') and ` : filter = `${filter}divcode in (${datastr(a.state)}) and `) : null;
  a?.tsp ? (typeof a.tsp === 'string' ? filter = `${filter}tspCode in ('${a.tsp}') and ` : filter = `${filter}tspCode in (${datastr(a.tsp)}) and `) : null;
  return filter;
}

const covFilter = (a) => {
  let filter = '';

  const clnLength = a?.cln ? (typeof a.cln === 'string' ? 1 : datastr(a.cln).split(',').length) : null;
  const orgLength = a?.org ? (typeof a.org === 'string' ? 1 : datastr(a.org).split(',').length) : null;
  const projLength = a?.proj ? (typeof a.proj === 'string' ? 1 : datastr(a.proj).split(',').length) : null;
  const stateLength = a?.state ? (typeof a.state === 'string' ? 1 : datastr(a.state).split(',').length) : null;
  const tspLength = a?.tsp ? (typeof a.tsp === 'string' ? 1 : datastr(a.tsp).split(',').length) : null;
  let totalParaNumber = clnLength + orgLength + projLength + stateLength + tspLength;
  console.log("Length of parameters in a coverage Table =======> " + totalParaNumber)

  a?.proj ?
    (projLength === totalParaNumber ? (typeof a.proj === 'string' ? filter = `${filter}projectCode in ('${a.proj}') ` : filter = `${filter}projectCode in (${datastr(a.proj)}) `) :
      (typeof a.proj === 'string' ? filter = `${filter}projectCode in ('${a.proj}') and ` : filter = `${filter}projectCode in (${datastr(a.proj)}) and `)) : null;

  a?.org ?
    ((projLength + orgLength) === totalParaNumber ? (typeof a.org === 'string' ? filter = `${filter}orgCode in ('${a.org}') ` : filter = `${filter}orgCode in (${datastr(a.org)}) `) :
      (typeof a.org === 'string' ? filter = `${filter}orgCode in ('${a.org}') and ` : filter = `${filter}orgCode in (${datastr(a.org)}) and `)) : null;

  a?.cln ?
    ((projLength + orgLength + clnLength) === totalParaNumber ? (typeof a.cln === 'string' ? filter = `${filter}clnCode in ('${a.cln}') ` : filter = `${filter}clnCode in (${datastr(a.cln)}) `) :
      (typeof a.cln === 'string' ? filter = `${filter}clnCode in ('${a.cln}') and ` : filter = `${filter}clnCode in (${datastr(a.cln)}) and `)) : null;

  a?.state ?
    ((projLength + orgLength + clnLength + stateLength) === totalParaNumber ? (typeof a.state === 'string' ? filter = `${filter}divcode in ('${a.state}') ` : filter = `${filter}divcode in (${datastr(a.state)}) `) :
      (typeof a.state === 'string' ? filter = `${filter}divcode in ('${a.state}') and ` : filter = `${filter}divcode in (${datastr(a.state)}) and `)) : null;

  a?.tsp ?
    ((projLength + orgLength + clnLength + stateLength + tspLength) === totalParaNumber ? (typeof a.tsp === 'string' ? filter = `${filter}tspCode in ('${a.tsp}') ` : filter = `${filter}tspCode in (${datastr(a.tsp)}) `) :
      (typeof a.tsp === 'string' ? filter = `${filter}tspCode in ('${a.tsp}') and ` : filter = `${filter}tspCode in (${datastr(a.tsp)}) and `)) : null;
  return filter;
}

const covTableFilter = (a) => {
  let filter = '';
  a?.proj ? (typeof a.proj === 'string' ? filter = `${filter}projectCode in ('${a.proj}') and ` : filter = `${filter}projectCode in (${datastr(a.proj)}) and `) : null;
  a?.org ? (typeof a.org === 'string' ? filter = `${filter}orgCode in ('${a.org}') and ` : filter = `${filter}orgCode in (${datastr(a.org)}) and `) : null;
  a?.cln ? (typeof a.cln === 'string' ? filter = `${filter}clnCode in ('${a.cln}') and ` : filter = `${filter}clnCode in (${datastr(a.cln)}) and `) : null;
  a?.state ? (typeof a.state === 'string' ? filter = `${filter}divcode in ('${a.state}') and ` : filter = `${filter}divcode in (${datastr(a.state)}) and `) : null;
  a?.tsp ? (typeof a.tsp === 'string' ? filter = `${filter}tspCode in ('${a.tsp}') ` : filter = `${filter}tspCode in (${datastr(a.tsp)}) `) : null;
  return filter;
}



const orgfilter = (a) => {
  let filter = '';
  a?.org ? (typeof a.org === 'string' ? filter = `${filter}pnorg in ('${a.org}') and ` : filter = `${filter}pnorg in (${datastr(a.org)}) and `) : null;
  return filter;
}

const delifilter = (a) => {
  let filter = '';
  a?.org ? (typeof a.org === 'string' ? filter = `${filter}deliorg in ('${a.org}') and ` : filter = `${filter}deliorg in (${datastr(a.org)}) and `) : null;
  return filter;
}

const ancfilter = (a) => {
  let filter = '';
  a?.org ? (typeof a.org === 'string' ? filter = `${filter}anorg in ('${a.org}') and ` : filter = `${filter}anorg in (${datastr(a.org)}) and `) : null;
  return filter;
}

  /* const orgfilter = (a) => {
    let filter = '';
    a?.org ? (typeof a.org === 'string' ? filter = `${filter}pnorg in ('${a.org}') and ` : filter = `${filter}pnorg in (${datastr(a.org)}) and `) : null;
    return filter;
  } */

  /* const delifilter = (a) => {
    let filter = '';
    a?.org ? (typeof a.org === 'string' ? filter = `${filter}deliorg in ('${a.org}') and ` : filter = `${filter}deliorg in (${datastr(a.org)}) and `) : null;
    return filter;
  } */

  /* const ancfilter = (a) => {
    let filter = '';
    a?.org ? (typeof a.org === 'string' ? filter = `${filter}ancorg in ('${a.org}') and ` : filter = `${filter}ancorg in (${datastr(a.org)}) and `) : null;
    return filter;
  }
 */

module.exports = { datastr, filter, covFilter, covTableFilter, orgfilter, delifilter, ancfilter }

