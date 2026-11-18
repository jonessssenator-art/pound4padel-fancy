import {useRef,useState} from 'react';
import {useInView} from 'motion/react';
import ScrambleIn from './components/scramble-in';
import Typewriter from './components/typewriter';
import Letter3DSwap from './components/letter-3d-swap';
import SimpleMarquee from './components/simple-marquee';
import ElasticLine from './components/elastic-line';
import NumberTicker from './components/basic-number-ticker';
const effects=[
 {id:'scramble',name:'Перемешивание',file:'text/scramble-in',hint:'Буквы собираются в слово. Нажми «Повторить», чтобы запустить заново.'},
 {id:'typewriter',name:'Печатная машинка',file:'text/typewriter',hint:'Фраза набирается по буквам. Скорость можно менять ползунком.'},
 {id:'cube',name:'Объёмные буквы',file:'text/letter-3d-swap',hint:'Наведи на слово или нажми на него. На телефоне достаточно касания.'},
 {id:'marquee',name:'Бегущая строка',file:'blocks/simple-marquee',hint:'Потяни строку в сторону. При наведении она замедляется.'},
 {id:'elastic',name:'Упругая линия',file:'physics/elastic-line',hint:'Зацепи линию курсором или пальцем и оттяни. При отпускании она вернётся.'},
 {id:'ticker',name:'Счётчик',file:'text/basic-number-ticker',hint:'Демонстрация анимации числа от 0 до 100. Это тест, не показатель клуба.'}
];
export default function EffectsLab({still}:{still:boolean}){
 const [selected,setSelected]=useState(0),[version,setVersion]=useState(0),[speed,setSpeed]=useState(1),[pause,setPause]=useState(false);
 const ref=useRef<HTMLElement>(null);const visible=useInView(ref,{margin:'100px'});const effect=effects[selected];const stopped=still||pause;const active=visible&&!stopped;
 const move=(index:number)=>{setSelected(index);setVersion(v=>v+1)};
 const fallback=selected===5?'100':selected===4?'Проведи по линии':selected===1?'Твоя игра начинается здесь.':'ТВОЯ ИГРА';
 return <section id="effects" className="effects-lab" ref={ref}><div className="lab-heading"><h2>Попробуй движение.</h2><p>Шесть новых эффектов Fancy.<br/>Выбирай, запускай, сравнивай.</p></div>
 <div className="effect-tabs" role="tablist" aria-label="Эффекты Fancy">{effects.map((e,i)=><button key={e.id} id={'effect-'+e.id} role="tab" aria-selected={selected===i} aria-controls="effect-panel" tabIndex={selected===i?0:-1} onClick={()=>move(i)} onKeyDown={ev=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(ev.key)){ev.preventDefault();const n=ev.key==='Home'?0:ev.key==='End'?5:(i+(ev.key==='ArrowRight'?1:5))%6;move(n);document.getElementById('effect-'+effects[n].id)?.focus()}}}>{e.name}</button>)}</div>
 <div id="effect-panel" role="tabpanel" aria-labelledby={'effect-'+effect.id} className="effect-panel"><div className={'effect-stage stage-'+effect.id} key={effect.id+'-'+version+'-'+speed}>
 {!active?<div className="effect-static">{fallback}</div>:selected===0?<div className="effect-display"><ScrambleIn text="ТВОЯ ИГРА" characters="АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ" scrambleSpeed={80/speed} scrambledLetterCount={3}/></div>:selected===1?<><span className="sr-only">Твоя игра начинается здесь.</span><div className="type-display" aria-hidden="true"><Typewriter text="Твоя игра начинается здесь." speed={80/speed} loop={false} showCursor={false}/></div></>:selected===2?<Letter3DSwap as="button" mainClassName="effect-display cube-word" rotateDirection="top" staggerDuration={.06/speed} transition={{duration:.5/speed,ease:[.23,1,.32,1]}}>ИГРАЙ</Letter3DSwap>:selected===3?<SimpleMarquee direction="left" baseVelocity={4*speed} repeat={4} slowdownOnHover slowDownFactor={.15} draggable dragSensitivity={.08} grabCursor><span className="marquee-word">ИГРАЙ. РАСТИ. ВОЗВРАЩАЙСЯ.</span></SimpleMarquee>:selected===4?<div className="elastic-zone"><ElasticLine grabThreshold={20} releaseThreshold={95} strokeWidth={3} transition={{type:'spring',stiffness:100*speed,damping:10}}/></div>:<div className="ticker-display" aria-label="Демонстрация счётчика до 100"><NumberTicker from={0} target={100} transition={{duration:2.5/speed,ease:[.23,1,.32,1]}}/></div>}
 </div><div className="lab-controls"><button onClick={()=>{setPause(false);setVersion(v=>v+1)}} disabled={still}>Повторить</button><button aria-pressed={pause} onClick={()=>setPause(v=>!v)} disabled={still}>{pause?'Продолжить':'Остановить'}</button><label>Скорость <input aria-label="Скорость эффекта" type="range" min="0.5" max="2" step="0.5" value={speed} onChange={e=>setSpeed(Number(e.target.value))}/><output>{speed}×</output></label></div>
 <div className="effect-description"><p>{still?'Эффекты отключены общим переключателем или настройкой уменьшения движения устройства.':effect.hint}</p><a href={'https://github.com/danielpetho/fancy/blob/main/src/fancy/components/'+effect.file+'.tsx'} target="_blank" rel="noreferrer">Исходник Fancy</a></div></div></section>
}
