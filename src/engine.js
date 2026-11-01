export function random(seed=42){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
export function dataset(kind='grades',noise=10){const r=random(42);return Array.from({length:60},(_,i)=>{const x=1+r()*9;return {x,y:kind==='houses'?45+x*24+(r()-.5)*noise*7:30+x*6+(r()-.5)*noise,id:i,test:i%5===0};});}
export function fit(points){const n=points.length,mx=points.reduce((a,p)=>a+p.x,0)/n,my=points.reduce((a,p)=>a+p.y,0)/n;const slope=points.reduce((a,p)=>a+(p.x-mx)*(p.y-my),0)/(points.reduce((a,p)=>a+(p.x-mx)**2,0)||1);return {slope,intercept:my-slope*mx,predict:x=>my+slope*(x-mx)};}
export function mae(points,model){return points.reduce((a,p)=>a+Math.abs(p.y-model.predict(p.x)),0)/points.length;}
export const headlines=['الفريق يفوز ببطولة كرة القدم','لاعبو كرة السلة يستعدون للنهائي','مدرّب جديد ينضم إلى المنتخب','الدوري يعلن جدول المباريات','نادٍ محلي يتعاقد مع لاعب جديد','بطل التنس يحرز لقبًا آخر','ارتفاع الأسواق مع عودة المستثمرين','البنك المركزي يغيّر أسعار الفائدة','الشركات تعلن أرباحها السنوية','استثمار جديد يدعم الأعمال المحلية','التضخّم يؤثّر في إنفاق الأسر','اتفاقية تجارية تدعم الاقتصاد','باحثون يطوّرون نموذج ذكاء اصطناعي','هاتف جديد يضم شرائح أسرع','تحديث برمجي يحسّن الأمان','الجامعة تفتتح مختبرًا للروبوتات','علماء يطوّرون جهاز حوسبة','تطبيق جديد يساعد الطلاب على التعلّم'];
export function newsPoints(){const r=random(7);return headlines.map((title,i)=>({x:([2,7,4.6][Math.floor(i/6)])+(r()-.5)*2.5,y:([7,6,2][Math.floor(i/6)])+(r()-.5)*2.5,title,id:i}));}
export function kstep(points,centers){const assigned=points.map(p=>({...p,cluster:centers.map(c=>(p.x-c.x)**2+(p.y-c.y)**2).reduce((best,d,i,a)=>d<a[best]?i:best,0)}));return {points:assigned,centers:centers.map((c,i)=>{const group=assigned.filter(p=>p.cluster===i);return group.length?{x:group.reduce((a,p)=>a+p.x,0)/group.length,y:group.reduce((a,p)=>a+p.y,0)/group.length}:c;})};}
export const mail=[['win free prize now',1],['claim your free cash offer',1],['urgent win cash today',1],['exclusive prize click offer',1],['meeting schedule for tomorrow',0],['please review the project report',0],['class notes and assignment',0],['your university meeting reminder',0]];
export function spam(text){const tokens=text.toLowerCase().match(/[a-z]+/g)||[];const vocab=[...new Set(mail.flatMap(([t])=>t.split(' ')))];const score=[0,1].map(label=>{const words=mail.filter(m=>m[1]===label).flatMap(m=>m[0].split(' '));return tokens.filter(t=>vocab.includes(t)).reduce((s,t)=>s+Math.log((words.filter(w=>w===t).length+1)/(words.length+vocab.length)),Math.log(.5));});return 1/(1+Math.exp(score[0]-score[1]));}
export function semiData(){const r=random(9);return Array.from({length:60},(_,i)=>({id:i,x:(i<30?3:7)+(r()-.5)*4,y:2+r()*6,truth:i<30?0:1}));}
export function pseudo(points,count,threshold){const seeds=points.filter((p,i)=>i%30<count);return points.map(p=>{if(seeds.includes(p))return {...p,label:p.truth,seed:true,confidence:1};const neighbors=seeds.map(s=>({s,d:Math.hypot(s.x-p.x,s.y-p.y)})).sort((a,b)=>a.d-b.d).slice(0,3);const weights=[0,0];neighbors.forEach(({s,d})=>weights[s.truth]+=1/(d+.1));const confidence=Math.max(...weights)/(weights[0]+weights[1]);return {...p,label:confidence>=threshold?Number(weights[1]>weights[0]):null,confidence};});}
export function qlearn(episodes=100,epsilon=.25){const q=Array.from({length:25},()=>[0,0,0,0]),r=random(4),rewards=[];const next=(s,a)=>{const x=s%5,y=Math.floor(s/5);return [y>0?s-5:s,x<4?s+1:s,y<4?s+5:s,x>0?s-1:s][a];};for(let e=0;e<episodes;e++){let s=0,total=0;for(let t=0;t<100;t++){const a=r()<epsilon?Math.floor(r()*4):q[s].indexOf(Math.max(...q[s]));const ns=next(s,a),reward=ns===24?20:[7,12,17].includes(ns)?-10:-1;q[s][a]+=.25*(reward+.9*Math.max(...q[ns])-q[s][a]);total+=reward;s=ns;if(s===24||[7,12,17].includes(s))break;}rewards.push(total);}let s=0,path=[0];for(let i=0;i<30&&s!==24;i++){const ns=next(s,q[s].indexOf(Math.max(...q[s])));if(path.includes(ns))break;path.push(ns);s=ns;}return {q,rewards,path};}
export function neuralData(){const r=random(3);return Array.from({length:100},()=>{const x=r()*2-1,y=r()*2-1;return {x,y,label:Number(x*y>0)};});}
export function network(width=6){const r=random(6);const w=Array.from({length:width},()=>[r()*2-1,r()*2-1,r()-.5]),v=Array.from({length:width},()=>r()*2-1);let b=0;const predict=(x,y)=>{const h=w.map(a=>Math.tanh(a[0]*x+a[1]*y+a[2]));return {h,p:1/(1+Math.exp(-(h.reduce((s,a,i)=>s+a*v[i],b))))};};return {w,v,predict,train(points,epochs,rate){for(let e=0;e<epochs;e++)for(const p of points){const {h,p:out}=predict(p.x,p.y),d=out-p.label;const old=[...v];for(let j=0;j<width;j++){v[j]-=rate*d*h[j];const g=d*old[j]*(1-h[j]**2);w[j][0]-=rate*g*p.x;w[j][1]-=rate*g*p.y;w[j][2]-=rate*g;}b-=rate*d;}return -points.reduce((s,p)=>{const v=Math.min(1-1e-9,Math.max(1e-9,predict(p.x,p.y).p));return s+p.label*Math.log(v)+(1-p.label)*Math.log(1-v);},0)/points.length;}};}

// Seeded Fisher–Yates split: stable identities, no overlap, no mutation.
export function splitData(rows,trainPercent=80,seed=42){
 const shuffled=[...rows],rng=random(seed);
 for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}
 const n=Math.max(1,Math.min(rows.length-1,Math.round(rows.length*trainPercent/100)));
 const ids=new Set(shuffled.slice(0,n).map(p=>p.id));
 return rows.map(p=>({...p,test:!ids.has(p.id)}));
}
export function nearestModel(rows){return p=>{const neighbors=rows.map(s=>({s,d:Math.hypot(s.x-p.x,s.y-p.y)})).sort((a,b)=>a.d-b.d).slice(0,3);let votes=[0,0];neighbors.forEach(({s,d})=>votes[s.label]+=1/(d+.1));return {label:Number(votes[1]>votes[0]),confidence:Math.max(...votes)/(votes[0]+votes[1])};};}
export function createAgent(seed=4){
 const q=Array.from({length:25},()=>[0,0,0,0]),rng=random(seed);let state=0,total=0,steps=0,done=false;const rewards=[];
 const move=(s,a)=>{const x=s%5,y=Math.floor(s/5);return [y>0?s-5:s,x<4?s+1:s,y<4?s+5:s,x>0?s-1:s][a];};
 function restart(){state=0;total=0;steps=0;done=false;}
 function step(epsilon=.25,manual=null,learn=true){
  if(done)restart();const from=state,explore=manual===null&&rng()<epsilon;
  const a=manual??(explore?Math.floor(rng()*4):q[state].indexOf(Math.max(...q[state])));
  const to=move(state,a),terminal=to===24||[7,12,17].includes(to),reward=to===24?20:[7,12,17].includes(to)?-10:-1;
  const old=q[from][a],future=terminal?0:Math.max(...q[to]),target=reward+.9*future;
  if(learn)q[from][a]+=.25*(target-old);
  state=to;total+=reward;steps++;done=terminal||steps>=100;
  if(done&&learn)rewards.push(total);
  return {from,to,a,reward,old,future,target,value:q[from][a],total,done,terminal,explore,manual:manual!==null,learn};
 }
 return {q,rewards,restart,step,get state(){return state;},get done(){return done;},get total(){return total;},train(n,epsilon){restart();for(let i=0;i<n;i++){while(!done)step(epsilon);if(i<n-1)restart();}}};
}
