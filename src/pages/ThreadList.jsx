import React, {useEffect, useState} from 'react';

export default function ThreadList({group}){
  const [threads, setThreads] = useState([]);
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');

  useEffect(()=>{ if(group) fetch('/api/thread/'+group._id).then(r=>r.json()).then(setThreads) },[group]);

  const createThread = async ()=>{
    await fetch('/api/thread/'+group._id+'/create',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-auth-token':localStorage.getItem('token')||''},
      body:JSON.stringify({title,content})
    });
    setTitle(''); setContent('');
    const res = await fetch('/api/thread/'+group._id); setThreads(await res.json());
  };

  const like = async (id)=>{
    await fetch('/api/thread/'+id+'/like',{method:'POST','headers':{'x-auth-token':localStorage.getItem('token')||''}});
    const res = await fetch('/api/thread/'+group._1d)?.then(r=>r.json()).catch(()=>null);
    if(res) setThreads(res);
  };

 return (
    <div>
      <h3>{group.name}</h3>
      <div style={{marginBottom:10}}>
        <input placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} style={{width:'100%',padding:8,marginBottom:6}}/>
        <textarea placeholder='Content' value={content} onChange={e=>setContent(e.target.value)} style={{width:'100%',padding:8}}/>
        <button onClick={createThread} style={{marginTop:6}}>Post</button>
      </div>
      {threads.map(t=>(
        <div key={t._id} style={{padding:8,border:'1px solid #ddd',marginBottom:6}}>
          <strong>{t.title}</strong>
          <div>{t.content}</div>
          <div style={{marginTop:6}}>❤️ {t.likes?.length||0}</div>
        </div>
      ))}
    </div>
  );
  
}
