import moment from 'moment'
const formatDate = (date)=> {
    return date.toLocaleDateString("en-US", { day: 'numeric' }) + '/'
        + date.toLocaleDateString("en-US", { month: 'numeric' }) + '/'
        + date.toLocaleDateString("en-US", { year: 'numeric' });
}
const after5 = (date) => {
    date = new Date(date)

    let cYear = date.getFullYear()
    date= new Date(cYear + 5, date.getMonth(), date.getDate())
    return date.toLocaleDateString("en-US", { day: 'numeric' }) + '/'
        + date.toLocaleDateString("en-US", { month: 'numeric' }) + '/'
        + date.toLocaleDateString("en-US", { year: 'numeric' });
}
const capitalize = (str)=> {
    return str.toUpperCase() ;
}

const convertMoment = (date)=>{

    return moment(date)
}
const permenantExp = (entry)=>{
   
    return (entry.C1 - entry.C3) * entry.TubeSize
}

const tempExpansion = (entry)=>{

    let wcf = (4.12 * entry.TestPrs * entry.Cylwatercap) / 100
    let te = (entry.C1- entry.C2)*entry.TubeSize

    return te-wcf
}
const weightlossPercentage = (entry)=>{

    return (entry.OrgWg-entry.CrtWg)*100/entry.OrgWg
}

export { formatDate, after5,capitalize,convertMoment, permenantExp,tempExpansion,weightlossPercentage}