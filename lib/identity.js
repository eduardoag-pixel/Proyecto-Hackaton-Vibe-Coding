export function requestIdentity(request){
 const id=request.headers.get('oai-authenticated-user-id');
 const email=request.headers.get('oai-authenticated-user-email');
 if(!id||!email)return {id:null,email:null,name:'Servicio de Atlante',kind:'service'};
 let name=request.headers.get('oai-authenticated-user-full-name')||email;
 try{if(request.headers.get('oai-authenticated-user-full-name-encoding')==='percent-encoded-utf-8')name=decodeURIComponent(name);}catch{name=email;}
 return {id,email,name:name.slice(0,160),kind:'user'};
}
export function actorFields(identity){return typeof identity==='string'?{actor:identity,actorId:null,actorEmail:null,actorKind:'service'}:{actor:identity.name,actorId:identity.id,actorEmail:identity.email,actorKind:identity.kind};}
