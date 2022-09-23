const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev'); // To check if electron is in development mode
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite')

let mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1000, // width of window
        height: 600, // height of window
        webPreferences: {
            // The preload file where we will perform our app communication
            preload: isDev
                ? path.join(app.getAppPath(), './public/preload.js') // Loading it from the public folder for dev
                : path.join(app.getAppPath(), './build/preload.js'), // Loading it from the build folder for production
            worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
            contextIsolation: true, // Isolating context so our app is not exposed to random javascript executions making it safer.
        
        },
    });
        mainWindow.removeMenu()

    // Loading a webpage inside the electron window we just created
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000' // Loading localhost if dev mode
            : `file://${path.join(__dirname, '../build/index.html')}` // Loading build file if in production
    );

    
    // In development mode, if the window has loaded, then load the dev tools.
    if (isDev) {
        mainWindow.webContents.on('did-frame-finish-load', () => {
            mainWindow.webContents.openDevTools({ mode: 'detach' });
        });

    }
    //mainWindow.webContents.send('asynchronous-message', process.resourcesPath);
};

app.setPath(
    'userData',
    isDev
        ? path.join(app.getAppPath(), 'userdata/') // In development it creates the userdata folder where package.json is
        : path.join(process.resourcesPath, 'userdata/') // In production it creates userdata folder in the resources folder
);

app.whenReady().then(createWindow);
// Exiting the app
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Activating the app
app.on('activate', () => {
    if (mainWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Logging any exceptions
process.on('uncaughtException', (error) => {
    console.log(`Exception: ${error}`);
    if (process.platform !== 'darwin') {
        app.quit();
    }
})


 const dbPath =    isDev
        ? path.join(__dirname, '../db/cylinderValues.db') // my root folder if in dev mode
        : path.join(process.resourcesPath, '/cylinderValues.db') // the resources path if in production build
   
// console.log(process.resourcesPath)


ipcMain.handle('get-nextref',async (event,args) => {

   let id = await open({
        filename: dbPath,
        driver: sqlite3.Database
    }).then(async (db) => {

       const data = await db.get('SELECT * FROM cylinder_values WHERE Id = (SELECT MAX(Id) FROM cylinder_values)')
 
        return data.Id 

       
    }).catch((err)=>{return null})
    return id
   
});

ipcMain.handle('addEntry', async (event, args) => {

 await open({
        filename: dbPath,
        driver: sqlite3.Database
    }).then(async (db) => {


        db.get('INSERT INTO cylinder_values VALUES (:ref,:tubeSize ,:date,:party,:cylinderNo,:make,:mfr,:specNo,:originalWeight,:currWeight,:waterWeight,:testPressure,:C1,:C2,:C3,:cylWaterCapacity,:gas,:cylinderCapacity)',[...args])
        


    }).catch((err) => { console.log(err); })


    })

    ipcMain.handle('updateEntry', async (event, args) => {
    
        await open({
            filename: dbPath,
            driver: sqlite3.Database
        }).then(async (db) => {

            db.run("UPDATE cylinder_values SET TubeSize = ?, Date = ?, PartyName= ?, Cylinder = ? , Make = ?,MFR =?,Spfno = ?, OrgWg = ?, CrtWg= ?, wtrWg = ?, TestPrs = ?, C1 = ?,C2 =?, C3 =?, Cylwatercap = ?, gas=?,CylCap= ? WHERE Id= ?", args)
 
    //         db.run("UPDATE cylinder_values SET TubeSize = :tubeSize  WHERE Id= :Id ",{':tubeSize' :190,':Id':1})
.catch((err) => { throw err})



        }).catch((err) => { console.log("e",err); })

        
    });


ipcMain.handle('getAllEntries', async (event, args) => {
    let data = await open({
        filename: dbPath,
        driver: sqlite3.Database
    }).then(async (db) => {
        const data = await db.all('SELECT * FROM cylinder_values WHERE Id BETWEEN ? AND ?',args)
        // console.log(data);
        return data


    }).catch((err) => { console.log(err); return null })
    return data

});

ipcMain.handle('getEntrybyRef', async (event, args) => {

    let data = await open({
        filename: dbPath,
        driver: sqlite3.Database
    }).then(async (db) => {
        const data = await db.get('SELECT * FROM cylinder_values WHERE Id=?', args)
  
        return data


    }).catch((err) => { console.log(err); return null })
    return data

});


ipcMain.handle('deleteEntry', async (event, args) => {

    let data = await open({
        filename: dbPath,
        driver: sqlite3.Database
    }).then(async (db) => {
       db.run('DELETE FROM cylinder_values WHERE Id=?', args).then(()=> {return "success"})
       .catch((err)=>{throw err})
       

    }).catch((err) => {  return null })
    return data

})