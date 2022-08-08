window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    await window.myApi.loadDb(`src/db/mylog.db`)
    console.log(await window.myApi.get())
    console.log(window.myApi)
    //await window.myApi.readTextFile(`src/db/setting.json`)

    const db = new MyLogDb()
//    const downloader = new MyLogDownloader(db)
//    const uploader = new MyLogUploader(db, sqlFile)
    const LENGTH = 140
    const LINE = 15
    Loading.setup()
    const setting = await Setting.load()
    console.log(setting)
    console.log(setting?.mona?.address)
    //uploader.setup()
    if (setting?.mona?.address) { document.getElementById('address').value = setting.mona.address }
    document.getElementById('post-list').innerHTML = await db.toHtml(document.getElementById('address').value)
    document.getElementById('content').focus()
    document.getElementById('content-length').textContent = LENGTH;
    document.querySelector('#post').addEventListener('click', async()=>{
        document.getElementById('post-list').innerHTML = 
            db.insert(document.getElementById('content').value)
            + document.getElementById('post-list').innerHTML
    })
    document.querySelector('#delete').addEventListener('click', async()=>{
        const ids = Array.from(document.querySelectorAll(`#post-list input[type=checkbox][name=delete]:checked`)).map(d=>parseInt(d.value))
        console.debug(ids)
        //window.myApi.delete(ids);
        db.delete(ids)
    })
    /*
    document.querySelector('#download').addEventListener('click', async()=>{
        await downloader.download()
    })
    */
});

