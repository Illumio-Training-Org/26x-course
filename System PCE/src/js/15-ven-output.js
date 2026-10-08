 // ---- VEN output. Kept in one place so it can be swapped for a captured real pairing log. ----
 const INSTALL_PAUSE_MS=5000; // real "Installing Illumio Packages" pause is ~30s
 function dots(label,n,ms){return {dots:true,label,n,ms};}
 function venSuccess(os,p){
  const v=venVersion(p);
  if(os==='linux'){const rpm=v+'.el9';return [
   ['','  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current'],
   ['','                                 Dload  Upload   Total   Spent    Left  Speed'],
   ['','100 38042    0 38042    0     0   103k      0 --:--:-- --:--:-- --:--:--  103k'],
   ['',''],['','             Installing Illumio'],['','             ------------------'],
   dots('Retrieving Illumio Packages [x86_64][CentOS][9.4] ',10,2200),
   dots('Validating sha256 ',17,1400),
   dots('Installing Illumio Packages ',10,INSTALL_PAUSE_MS),
   ['','EXPECTED_VERSION: '+rpm],['','INSTALLED_VERSION: '+rpm],
   dots('Starting Illumio processes ',16,1800),
   dots('Checking Runtime Environment',10,1200),
   ['','Starting illumio-control:'],
   ['',' - Environment Setting up Illumio VEN Environment:    ...done.'],
   ['',' - venAgentMgr Starting venAgentMgr:    ...done.'],
   ['',' - IPSec Starting IPSec: feature not enabled'],
   ['',' - venPlatformHandler Starting venPlatformHandler:    ...done.'],
   ['',' - venVtapServer Starting venVtapServer:    ...done.'],
   ['',' - venAgentMonitor Starting venAgentMonitor:    ...done.'],
   ['',''],
   dots('Pairing with Illumio ',16,2500),
   ['','Created /opt/illumio_ven_data/tmp/illumio_install.'],
   {pair:true},
   ['',''],['','               Pairing Status'],['','               --------------'],
   ['','Pairing Configuration exists ......SUCCESS'],['','VEN Manager Daemon running ........SUCCESS'],
   ['','Master Configuration retrieval ....SUCCESS'],['','VEN Configuration retrieval .......SUCCESS'],
   ['',''],['','VEN has been SUCCESSFULLY paired with Illumio'],['','']];}
  // Windows and AIX: not yet captured from a live pairing - approximate
  const out=[];
  if(os==='windows')out.push(['','Downloading Illumio VEN pairing script ... done'],['','Checking prerequisites ... done'],['','Downloading VEN package ('+v+') ... done'],dots('Installing Illumio VEN '+v+' ',10,INSTALL_PAUSE_MS),['','Starting Illumio VEN services ... done']);
  else out.push(['','Checking prerequisites ... done'],['','Downloading VEN package ('+v+') ... done'],dots('Installing illumio-ven '+v+' (installp) ',10,INSTALL_PAUSE_MS),['','Starting Illumio VEN services ... done']);
  out.push(dots('Pairing with Illumio ',16,2500),{pair:true},['',''],['','Pairing Status'],['','Pairing Configuration exists ......SUCCESS'],['','VEN Manager Daemon running ........SUCCESS'],
   ['','Master Configuration retrieval ....SUCCESS'],['','VEN Configuration retrieval .......SUCCESS'],['',''],['','VEN has been SUCCESSFULLY paired with Illumio'],['','']);
  return out;
 }
 // not yet captured from a live pairing - approximate
 function venKeyRejected(){return [['','  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current'],['','                                 Dload  Upload   Total   Spent    Left  Speed'],['','100 38042    0 38042    0     0   103k      0 --:--:-- --:--:-- --:--:--  103k'],['',''],dots('Pairing with Illumio ',16,2500),['','ERROR: Activation failed. The pairing key is invalid, expired or has no uses remaining.'],['','Generate a new pairing key in the PCE and run the new pairing script.'],['','']];}
 function venAlreadyPaired(os){return [['err','ERROR: The Illumio VEN is already installed and paired on '+shortHost(os)+'.'],['err','Unpair the VEN before pairing it again.']];}
 function venStatus(os){
  const w=state.workloads.find(w=>w.os===os);
  return [['','Illumio VEN status'],['',''],['','  Hostname ............ '+hostnames[os]],['','  VEN version ......... '+venVersion(w)],['','  PCE ................. '+PCE],['','  Pairing profile ..... '+w.profile],['','  Enforcement ......... '+w.enforcement],['','  Visibility .......... '+w.visibility],['',''],
   ['','venAgentMgr:          ',['ok','running']],['','venPlatformHandler:   ',['ok','running']],['','venVtapServer:        ',['ok','running']],['','venAgentMonitor:      ',['ok','running']]];
 }
 // ---- end of VEN output ----
