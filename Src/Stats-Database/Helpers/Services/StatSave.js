const _0x3e946d=_0x3c15;function _0x3c15(_0x25cacd,_0x32b72e){const _0x5bbcca=_0x5bbc();return _0x3c15=function(_0x3c151b,_0x1f3189){_0x3c151b=_0x3c151b-0x1f3;let _0x29cc05=_0x5bbcca[_0x3c151b];return _0x29cc05;},_0x3c15(_0x25cacd,_0x32b72e);}(function(_0x4d1361,_0x12f3b6){const _0x4cc979=_0x3c15,_0x3a1761=_0x4d1361();while(!![]){try{const _0x2003d4=-parseInt(_0x4cc979(0x231))/0x1*(parseInt(_0x4cc979(0x221))/0x2)+parseInt(_0x4cc979(0x21f))/0x3+parseInt(_0x4cc979(0x215))/0x4+-parseInt(_0x4cc979(0x205))/0x5+-parseInt(_0x4cc979(0x210))/0x6+-parseInt(_0x4cc979(0x232))/0x7*(-parseInt(_0x4cc979(0x213))/0x8)+parseInt(_0x4cc979(0x225))/0x9*(-parseInt(_0x4cc979(0x20d))/0xa);if(_0x2003d4===_0x12f3b6)break;else _0x3a1761['push'](_0x3a1761['shift']());}catch(_0xacc7c){_0x3a1761['push'](_0x3a1761['shift']());}}}(_0x5bbc,0xa7fd1));function _0x5bbc(){const _0x10a28c=['.DailyChannelDuration','log','findOne','exports','allStreamer.ChannelData.','Veritabanı\x20güncelleme\x20hatası:\x20','allVoice.User.DailyDuration','allStreamer.TotalDuration','.TotalDuration','.TotalMessage','UserSeensSave','WeeklyDuration','Voice','allCamera.TotalDuration','allVoice.User.TotalDuration','.TotalChannelDuration','allMessage.ChannelMessageData.','now','Streamer','allStreamer.DailyDuration','TotalDuration','378830WDlgsP','allCamera.WeeklyDuration','Eksik\x20veya\x20geçersiz\x20parametreler.\x20-\x20UserMessageStatsSave()\x20','Eksik\x20veya\x20geçersiz\x20parametreler.','push','Messages','.DailyDuration','message','2740fhTYEj','Veritabanı\x20güncelleme\x20hatası:','allVoice.User.CategoryStat.','2628936iyRvHr','forEach','.Duration','716768MfBtkr','all','5357624sbqeLh','allCamera.ChannelData.','.Date','isArray','DeleteData','Streamers.','error','Camera','deleteOne','updateOne','3308880dJLPZb','allStreamer.WeeklyDuration','2JOBlVQ','allCamera.DailyDuration','DB_SAVE','Messages.','22545SlMVkk','Camera.','allVoice.User.WeeklyDuration','JoinSave','allVoice.User.ChannelData.','.WeeklyChannelDuration','Voices','../../../../Providers/Database/Models/General','Streamers','UserMessageStatsSave','Gelen\x20duration\x20verisi\x200\x20olduğundan\x20dolayı\x20işlem\x20yapmadım.\x20-\x20UserSeensSave()','Voices.','912377TCBbrx','28nigcOB'];_0x5bbc=function(){return _0x10a28c;};return _0x5bbc();}const {GeneralUserStats,Seens,JoinedChannel}=require(_0x3e946d(0x22c));class MysDataBase{static async[_0x3e946d(0x228)](_0x4f5e2f,_0x2ea350,_0x3a8946){const _0x46632f=_0x3e946d;if(!_0x4f5e2f||!_0x2ea350||!Array['isArray'](_0x3a8946))throw new Error(_0x46632f(0x208));try{const _0x277be0={};_0x3a8946[_0x46632f(0x211)](_0x268ccb=>{const _0x1d0d98=_0x46632f;switch(_0x268ccb){case _0x1d0d98(0x202):_0x277be0[_0x1d0d98(0x202)]=Date[_0x1d0d98(0x201)]();break;case _0x1d0d98(0x21c):_0x277be0[_0x1d0d98(0x21c)]=Date[_0x1d0d98(0x201)]();break;case _0x1d0d98(0x1fc):_0x277be0[_0x1d0d98(0x1fc)]=Date[_0x1d0d98(0x201)]();break;default:break;}});const _0x30b1e7={'guildID':_0x4f5e2f,'userID':_0x2ea350},_0x4fb533={'upsert':!![]};await JoinedChannel[_0x46632f(0x21e)](_0x30b1e7,{'$set':_0x277be0},_0x4fb533);}catch(_0x468ed0){console[_0x46632f(0x21b)]('Veritabanı\x20güncelleme\x20hatası:',_0x468ed0);throw new Error(_0x46632f(0x1f5)+_0x468ed0[_0x46632f(0x20c)]);}}static async[_0x3e946d(0x219)](_0x3aae13,_0x52575e,_0x2f03c9){const _0xeda539=_0x3e946d;if(!_0x3aae13||!_0x52575e||!Array[_0xeda539(0x218)](_0x2f03c9))throw new Error(_0xeda539(0x208));try{const _0x1c46df=await JoinedChannel[_0xeda539(0x235)]({'guildID':_0x3aae13,'userID':_0x52575e});if(!_0x1c46df)return;let _0x43cbfd=[];for(const _0x3931f8 of _0x2f03c9){switch(_0x3931f8){case'Streamer':if(_0x1c46df['Streamer'])_0x43cbfd[_0xeda539(0x209)]('Streamer');break;case _0xeda539(0x21c):if(_0x1c46df[_0xeda539(0x21c)])_0x43cbfd[_0xeda539(0x209)](_0xeda539(0x21c));break;case _0xeda539(0x1fc):if(!_0x1c46df[_0xeda539(0x202)]&&!_0x1c46df['Camera']&&_0x1c46df['Voice']){await JoinedChannel[_0xeda539(0x21d)]({'guildID':_0x3aae13,'userID':_0x52575e});return;}if(_0x1c46df[_0xeda539(0x1fc)])_0x43cbfd['push'](_0xeda539(0x1fc));break;default:throw new Error('Geçersiz\x20tür\x20(Type).');}}const _0x42f76d=_0x43cbfd['reduce']((_0x3d9b76,_0x585dd9)=>{return _0x3d9b76[_0x585dd9]=undefined,_0x3d9b76;},{});await JoinedChannel[_0xeda539(0x21e)]({'guildID':_0x3aae13,'userID':_0x52575e},{'$unset':_0x42f76d});}catch(_0x2600c7){console['error'](_0xeda539(0x20e),_0x2600c7[_0xeda539(0x20c)]);throw new Error(_0xeda539(0x1f5)+_0x2600c7[_0xeda539(0x20c)]);}}static async[_0x3e946d(0x223)](_0x3e3fdf,_0x5dd588,_0x2f5a71,_0x800688,_0x526d0c,_0x331d4a){const _0x226a5c=_0x3e946d;try{if(!_0x3e3fdf||!_0x5dd588||!_0x2f5a71||!_0x800688||!_0x331d4a||!_0x526d0c)throw new Error('Eksik\x20veya\x20geçersiz\x20parametreler.\x20-\x20DB_SAVE()');const _0x290dff=await _0x2f5a71['DailyDuration']||0x0,_0x488565=await _0x2f5a71[_0x226a5c(0x1fb)]||0x0,_0x511ea8=await _0x2f5a71['TotalDuration']||0x0;if(_0x511ea8===0x0||_0x290dff===0x0||_0x488565===0x0)return console['log']('Gelen\x20duration\x20verisi\x200\x20olduğundan\x20dolayı\x20işlem\x20yapmadım.\x20-\x20UserStatsSave()');let _0x3e5421;switch(_0x526d0c){case _0x226a5c(0x1fc):_0x3e5421={'$inc':{[_0x226a5c(0x1fe)]:_0x511ea8,[_0x226a5c(0x1f6)]:_0x290dff,[_0x226a5c(0x227)]:_0x488565,['allVoice.User.ChannelData.'+_0x800688+_0x226a5c(0x1ff)]:_0x511ea8,['allVoice.User.ChannelData.'+_0x800688+'.DailyChannelDuration']:_0x290dff,[_0x226a5c(0x229)+_0x800688+_0x226a5c(0x22a)]:_0x488565,[_0x226a5c(0x20f)+_0x331d4a+_0x226a5c(0x1f8)]:_0x511ea8,[_0x226a5c(0x20f)+_0x331d4a+_0x226a5c(0x20b)]:_0x290dff,[_0x226a5c(0x20f)+_0x331d4a+'.WeeklyDuration']:_0x488565}};break;case _0x226a5c(0x202):_0x3e5421={'$inc':{[_0x226a5c(0x1f7)]:_0x511ea8,[_0x226a5c(0x203)]:_0x290dff,[_0x226a5c(0x220)]:_0x488565,[_0x226a5c(0x1f4)+_0x800688+_0x226a5c(0x1ff)]:_0x511ea8,[_0x226a5c(0x1f4)+_0x800688+'.DailyChannelDuration']:_0x290dff,['allStreamer.ChannelData.'+_0x800688+'.WeeklyChannelDuration']:_0x488565}};break;case _0x226a5c(0x21c):_0x3e5421={'$inc':{[_0x226a5c(0x1fd)]:_0x511ea8,[_0x226a5c(0x222)]:_0x290dff,[_0x226a5c(0x206)]:_0x488565,[_0x226a5c(0x216)+_0x800688+_0x226a5c(0x1ff)]:_0x511ea8,[_0x226a5c(0x216)+_0x800688+_0x226a5c(0x233)]:_0x290dff,[_0x226a5c(0x216)+_0x800688+_0x226a5c(0x22a)]:_0x488565}};break;default:break;}await GeneralUserStats['updateOne']({'guildID':_0x3e3fdf,'userID':_0x5dd588},_0x3e5421,{'upsert':!![]});}catch(_0x4a241a){console['log'](_0x226a5c(0x1f5)+_0x4a241a[_0x226a5c(0x20c)]);}}static async[_0x3e946d(0x22e)](_0x83171,_0xca09d,_0x3b2f0a){const _0x5cff71=_0x3e946d;try{if(!_0x83171||!_0xca09d)throw new Error(_0x5cff71(0x207));const _0x5c641f=await Seens[_0x5cff71(0x235)]({'guildID':_0x83171,'userID':_0xca09d});_0x5c641f?.[_0x5cff71(0x20a)]&&await Seens[_0x5cff71(0x21e)]({'guildID':_0x83171,'userID':_0xca09d},{'$unset':{'Messages':''}});const _0x268f87={'$inc':{'allMessage.MessageData.TotalMessage':0x1,'allMessage.MessageData.DailyMessage':0x1,'allMessage.MessageData.WeeklyMessage':0x1,['allMessage.ChannelMessageData.'+_0x3b2f0a+_0x5cff71(0x1f9)]:0x1,[_0x5cff71(0x200)+_0x3b2f0a+'.DailyMessage']:0x1,['allMessage.ChannelMessageData.'+_0x3b2f0a+'.WeeklyMessage']:0x1}},_0x43a454={'$set':{[_0x5cff71(0x224)+_0x3b2f0a+_0x5cff71(0x217)]:Date[_0x5cff71(0x201)]()}},_0x14a731={'upsert':!![]};await Promise[_0x5cff71(0x214)]([GeneralUserStats['updateOne']({'guildID':_0x83171,'userID':_0xca09d},_0x268f87,_0x14a731),Seens[_0x5cff71(0x21e)]({'guildID':_0x83171,'userID':_0xca09d},_0x43a454,_0x14a731)]);}catch(_0x158b70){throw new Error(_0x5cff71(0x1f5)+_0x158b70['message']);}}static async[_0x3e946d(0x1fa)](_0x42b13a,_0x19bd39,_0x5a1dee,_0xe7e432,_0x23acff){const _0x1c6d20=_0x3e946d;try{if(!_0x42b13a||!_0x19bd39||!_0x5a1dee||!_0xe7e432||!_0x23acff)throw new Error(_0x1c6d20(0x208));const _0x57ce83=await Seens[_0x1c6d20(0x235)]({'guildID':_0x42b13a,'userID':_0x19bd39}),_0x1a0469=await _0x5a1dee[_0x1c6d20(0x204)]||0x0;if(_0x1a0469===0x0)return console[_0x1c6d20(0x234)](_0x1c6d20(0x22f));let _0x4278a5;switch(_0x23acff){case _0x1c6d20(0x1fc):_0x57ce83?.[_0x1c6d20(0x22b)]&&await Seens[_0x1c6d20(0x21e)]({'guildID':_0x42b13a,'userID':_0x19bd39},{'$unset':{'Voices':''}});_0x4278a5={'$set':{[_0x1c6d20(0x230)+_0xe7e432+'.Duration']:_0x1a0469}};break;case _0x1c6d20(0x202):_0x57ce83?.[_0x1c6d20(0x22d)]&&await Seens[_0x1c6d20(0x21e)]({'guildID':_0x42b13a,'userID':_0x19bd39},{'$unset':{'Streamers':''}});_0x4278a5={'$set':{[_0x1c6d20(0x21a)+_0xe7e432+_0x1c6d20(0x212)]:_0x1a0469}};break;case'Camera':_0x57ce83?.['Camera']&&await Seens[_0x1c6d20(0x21e)]({'guildID':_0x42b13a,'userID':_0x19bd39},{'$unset':{'Camera':''}});_0x4278a5={'$set':{[_0x1c6d20(0x226)+_0xe7e432+_0x1c6d20(0x212)]:_0x1a0469}};break;default:break;}await Seens[_0x1c6d20(0x21e)]({'guildID':_0x42b13a,'userID':_0x19bd39},_0x4278a5,{'upsert':!![]});}catch(_0x3f217b){throw new Error('Veritabanı\x20güncelleme\x20hatası:\x20'+_0x3f217b[_0x1c6d20(0x20c)]);}}}module[_0x3e946d(0x1f3)]={'MysDataBase':MysDataBase};

// Makine kodu ile yazılmış koddur sakın silme yoksa bot çalışmaz.