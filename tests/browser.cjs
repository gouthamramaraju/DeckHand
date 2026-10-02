const { chromium, firefox, webkit } = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES + '/playwright' : 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async()=>{
const results=[];
for(const [name,engine] of Object.entries({chromium,firefox,webkit})) {
 let browser;
 try {browser=await engine.launch({headless:true});}catch(e){results.push({engine:name,status:'unavailable',reason:e.message.split('\n')[0]});continue;}
 for(const [size,viewport] of Object.entries({desktop:{width:1440,height:1000},mobile:{width:390,height:844}})) {
  const page=await browser.newPage({viewport});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  try {
   await page.goto('http://127.0.0.1:8765/');
   await page.waitForFunction(()=>document.getElementById('office').value.length>0);
   assert.equal(await page.locator('#ai').isDisabled(),true);
   await page.locator('[data-query="My VPN connection fails"]').click();
   await page.locator('#send').click();
   await page.waitForFunction(()=>document.querySelectorAll('.bubble').length===2);
   assert.match(await page.locator('#messages').innerText(),/KB-001/);
   await page.locator('#escalate').click();
   await page.locator('#handoff').waitFor({state:'visible'});
   const downloadPromise=page.waitForEvent('download');await page.locator('#download').click();
   const download=await downloadPromise;assert.equal(download.suggestedFilename(),'deskhand-escalation.txt');
   await page.locator('#clear').click();assert.equal(await page.locator('.bubble').count(),0);
   await page.locator('#query').fill('<img src=x onerror=alert(1)> printer');await page.locator('#send').click();
   await page.waitForFunction(()=>document.querySelectorAll('.bubble').length===2);
   assert.equal(await page.locator('#messages img').count(),0);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);
   await page.reload();await page.waitForFunction(()=>document.getElementById('office').value.length>0);
   assert.equal(await page.locator('.bubble').count(),0);
   await page.locator('#config').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{bad')});
   await page.waitForFunction(()=>document.getElementById('status').className==='error');
   await page.locator('#config').setInputFiles({name:'office.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({office:'Test office',support_team:'Test IT',articles:[{id:'TEST-1',title:'WiFi support',owner:'IT',review_date:'2099-01-01',keywords:['wifi'],steps:['Check the approved WiFi name.']}]}))});
   await page.waitForFunction(()=>document.getElementById('office').value==='Test office');
   await page.locator('#query').fill('wifi unavailable');await page.locator('#send').click();
   await page.waitForFunction(()=>document.querySelectorAll('.bubble').length===2);
   assert.match(await page.locator('#messages').innerText(),/TEST-1/);
   assert.deepEqual(errors,[]);
   if(name==='chromium' && size==='desktop')await page.screenshot({path:__dirname+'/../screenshot.png',fullPage:true});
   results.push({engine:name,viewport:size,status:'passed',checks:11});
  } catch(e){results.push({engine:name,viewport:size,status:'failed',reason:e.message});}
  await page.close();
 }
 await browser.close();
}
fs.writeFileSync(__dirname+'/../browser-results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
if(results.some(r=>r.status==='failed')) process.exitCode=1;
else if(results.some(r=>r.status==='unavailable')) process.exitCode=2;
})();
