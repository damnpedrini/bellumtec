var WHATS='5541900000000';
var OFFER_END=new Date('2026-10-11T23:59:59-03:00');
var UNIT=89.9;
var KITS=[{n:1,p:89.9,l:'1 camisa'},{n:2,p:149.9,l:'Kit 2 camisas'},{n:3,p:199.9,l:'Kit 3 camisas',tag:'Mais vendido'}];
var SZ=['P','M','G','GG'];
var PRODUCTS=[
 {id:'glock',name:'Camisa Glock',description:'Estampa Glock',video:'assets/products/glock.mp4'},
 {id:'taurus-g2c',name:'Camisa Taurus G2C',description:'Estampa Taurus G2C 9mm',video:'assets/products/taurus-g2c.mp4'}
];
var kit=3,items=[{product:'taurus-g2c',size:'M'},{product:'taurus-g2c',size:'M'},{product:'taurus-g2c',size:'M'}];
function $(i){return document.getElementById(i)}
function brl(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function kitObj(){return KITS.filter(function(k){return k.n===kit})[0]}
function productObj(id){return PRODUCTS.filter(function(product){return product.id===id})[0]}
function drawProducts(){
 $('products').innerHTML=PRODUCTS.filter(function(product){return product.video}).map(function(product){
    var media='<video controls playsinline preload="metadata"><source src="'+product.video+'" type="video/mp4"></video>';
    return '<article class="product-card"><div class="product-media">'+media+'</div><div class="product-info"><div><h3>'+product.name+'</h3><p>'+product.description+'</p></div><a class="btn product-link" href="#oferta" data-product="'+product.id+'">Escolher</a></div></article>';
 }).join('');
}
function drawItems(){
 $('items').innerHTML=Array.apply(null,Array(kit)).map(function(_,i){
  var modelOptions=PRODUCTS.map(function(product){return '<option value="'+product.id+'"'+(items[i].product===product.id?' selected':'')+'>'+product.name.replace('Camisa ','')+'</option>'}).join('');
  var sizeOptions=SZ.map(function(size){return '<option'+(items[i].size===size?' selected':'')+'>'+size+'</option>'}).join('');
  return '<div class="item-option"><strong>Camisa '+(i+1)+'</strong><div class="item-selects"><div><label for="p'+i+'">Modelo</label><select id="p'+i+'" data-index="'+i+'" data-type="product">'+modelOptions+'</select></div><div><label for="s'+i+'">Tamanho</label><select id="s'+i+'" data-index="'+i+'" data-type="size">'+sizeOptions+'</select></div></div></div>';
 }).join('');
}
function drawKits(){
 $('kits').innerHTML=KITS.map(function(k){var full=UNIT*k.n;return '<label class="kit"><input type="radio" name="kit" value="'+k.n+'"'+(k.n===kit?' checked':'')+'><span class="n">'+k.l+(k.tag?'<span class="tag">'+k.tag+'</span>':'')+'<small>'+brl(k.p/k.n)+' cada</small></span><span class="p">'+brl(k.p)+(k.n>1?'<s>'+brl(full)+'</s>':'')+'</span></label>'}).join('');
 drawItems();
}
$('kits').addEventListener('change',function(e){kit=+e.target.value;drawKits()});
$('products').addEventListener('click',function(e){
 var link=e.target.closest('[data-product]');
 if(!link)return;
 items.slice(0,kit).forEach(function(item){item.product=link.dataset.product});
 drawItems();
});
function updateItem(e){var item=items[+e.target.dataset.index];item[e.target.dataset.type==='product'?'product':'size']=e.target.value}
$('items').addEventListener('change',updateItem);
drawProducts();
drawKits();
function tick(){
 var d=OFFER_END-new Date();
 if(d<=0){$('tm').style.display='none';return}
 var s=Math.floor(d/1000),v=[['Dias',Math.floor(s/86400)],['Horas',Math.floor(s%86400/3600)],['Min',Math.floor(s%3600/60)],['Seg',s%60]];
 $('tm').innerHTML=v.map(function(x){return '<div><b>'+String(x[1]).padStart(2,'0')+'</b><small>'+x[0]+'</small></div>'}).join('');
}
tick();setInterval(tick,1000);
function sub(){return kitObj().p}
function ship(){return sub()>=199?0:19.9}
function disc(){var r=document.querySelector('input[name=pg]:checked');return r&&r.value==='Pix'?sub()*.05:0}
function total(){return sub()-disc()+ship()}
function ck(){
 var k=kitObj();
 var orderItems=items.slice(0,kit).map(function(item,index){return 'Camisa '+(index+1)+': '+productObj(item.product).name.replace('Camisa ','')+' - '+item.size}).join('<br>');
 $('sm').innerHTML='<b>'+k.l+'</b><small>'+orderItems+'</small>';
 $('ckf').innerHTML='<div class="row"><span>Subtotal</span><span>'+brl(sub())+'</span></div>'+(disc()?'<div class="row"><span>Desconto Pix</span><span>-'+brl(disc())+'</span></div>':'')+'<div class="row"><span>Frete</span><span>'+(ship()?brl(ship()):'Grátis')+'</span></div><div class="row t"><span>Total</span><span>'+brl(total())+'</span></div><button class="btn" type="submit">Revisar pedido</button>';
}
document.querySelectorAll('input[name=pg]').forEach(function(r){r.onchange=ck});
function openD(){ck();$('vC').style.display='flex';$('vD').style.display='none';$('dt').textContent='Seu pedido';$('dr').classList.add('open');$('ov').classList.add('open')}
function closeD(){$('dr').classList.remove('open');$('ov').classList.remove('open')}
$('buy').onclick=openD;$('cl').onclick=closeD;$('ov').onclick=closeD;$('back').onclick=closeD;
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeD()});
$('form').onsubmit=function(e){
 e.preventDefault();
 var num='BT-'+Math.floor(10000+Math.random()*89999),k=kitObj();
 var selectedItems=items.slice(0,kit).map(function(item,index){return 'Camisa '+(index+1)+': '+productObj(item.product).name.replace('Camisa ','')+' - tamanho '+item.size});
 var L=['Pedido '+num,'',k.l+' - '+brl(k.p)].concat(selectedItems,['','Frete: '+(ship()?brl(ship()):'Grátis'),'Pagamento: '+document.querySelector('input[name=pg]:checked').value,'Total: '+brl(total()),'','Nome: '+$('nome').value,'WhatsApp: '+$('tel').value,'Endereço: '+$('end').value+', '+$('bai').value+', '+$('cid').value+', CEP '+$('cep').value]);
 $('num').textContent='Número do pedido: '+num;
 $('wa').href='https://wa.me/'+WHATS+'?text='+encodeURIComponent(L.join('\n'));
 $('dt').textContent='Pedido';$('vC').style.display='none';$('vD').style.display='block';
};