'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/** Fixed hex geometry; independent, eased piston travel on Z only. */
export default function HubHexBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' }) }
    catch { return }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
    renderer.setClearColor('#000000', 1)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 300)
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
    const lowPower = Boolean(device.connection?.saveData || (device.deviceMemory && device.deviceMemory <= 4))
    // Black faces and gap light are lit only by the rotating lighthouse beam.
    const uniforms={uTime:{value:0},uBeam:{value:new THREE.Vector2(0,6)}}
    const vertex=`varying vec3 vWorld;varying vec3 vNormal;varying float vLocalZ;
      void main(){vec4 local=instanceMatrix*vec4(position,1.);vec4 world=modelMatrix*local;vWorld=world.xyz;vLocalZ=position.z;
      vNormal=normalize(mat3(modelMatrix)*mat3(instanceMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*world;}`
    const palette=`uniform vec2 uBeam;
      // Lighthouse beam rotating from the top of the screen.
      // Two opposed beams rotating clockwise from the logo's lighthouse; the only light source.
      float beamField(vec2 p,float t){vec2 d=p-uBeam;float a=atan(d.y,d.x),b=-t*.42;float w=abs(mod(a-b+1.5708,3.14159)-1.5708);
        return (smoothstep(.15,0.,w)*2.+smoothstep(.45,0.,w)*.5)/(1.+length(d)*.025);}
      vec3 glowColor(vec2 p,float t){float k=smoothstep(-2.5,2.5,p.x*.7-p.y*.5);return mix(vec3(.06,.22,1.),vec3(1.,.28,.02),k);}`
    const face=new THREE.ShaderMaterial({uniforms,vertexShader:vertex,fragmentShader:`uniform float uTime;varying vec3 vWorld;varying vec3 vNormal;varying float vLocalZ;${palette}
      float strip(float d,float w,float soft){return smoothstep(w+soft,w,abs(d));}
      void main(){
        vec3 N=normalize(vNormal),V=normalize(vWorld-cameraPosition),R=reflect(V,N);
        float cosT=clamp(dot(-V,N),0.,1.),fres=.045+.955*pow(1.-cosT,5.);
        // Reflected ceiling point; drives the per-tile film hue.
        float h=(7.-vWorld.z)/max(R.z,.05);vec2 c=vWorld.xy+R.xy*h;float t=uTime;
        float u=c.x*.3+t*.05,v=c.y*.3-t*.03;
        // Thin-film iridescence: periwinkle -> teal -> copper with angle and position.
        float film=fract(cosT*2.3+u*.045+v*.03);
        vec3 peri=vec3(.41,.49,1.),teal=vec3(.08,.72,.65),copper=vec3(.92,.35,.05);
        vec3 tint=film<.33?mix(peri,teal,film*3.):film<.66?mix(teal,copper,(film-.33)*3.):mix(copper,peri,(film-.66)*3.);
        // Bevel catches the underglow so every edge is lit from below.
        float bevel=1.-smoothstep(.9,.995,N.z);
        float bf=beamField(vWorld.xy,t);
        vec3 col=tint*bf*(fres*2.5+.04)+glowColor(vWorld.xy,t)*bevel*bf*3.;
        gl_FragColor=vec4(pow(col/(1.+col),vec3(1./2.2)),1.);}`})
    const side=new THREE.ShaderMaterial({uniforms,vertexShader:vertex,fragmentShader:`uniform float uTime;varying vec3 vWorld;varying vec3 vNormal;varying float vLocalZ;${palette}
      void main(){float depth=clamp(-vLocalZ/1.45,0.,1.);float fx=beamField(vWorld.xy,uTime)*3.;vec3 g=glowColor(vWorld.xy,uTime)*fx;
        vec3 col=g*(.22+pow(depth,1.2)*1.8)+vec3(.003);gl_FragColor=vec4(pow(col/(1.+col),vec3(1./2.2)),1.);}`})
    const floorMaterial=new THREE.ShaderMaterial({uniforms,vertexShader:`varying vec3 vWorld;void main(){vec4 w=modelMatrix*vec4(position,1.);vWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}`,
      fragmentShader:`uniform float uTime;varying vec3 vWorld;${palette}void main(){float fx=beamField(vWorld.xy,uTime)*2.5;vec3 col=glowColor(vWorld.xy,uTime)*1.8*fx;gl_FragColor=vec4(pow(col/(1.+col),vec3(1./2.2)),1.);}`})
    const floor=new THREE.Mesh(new THREE.PlaneGeometry(1,1),floorMaterial);floor.position.z=-1.9;scene.add(floor)
    const shape=new THREE.Shape(),radius=.8
    for(let i=0;i<6;i++){const a=Math.PI/3*i+Math.PI/6,x=Math.cos(a)*.76,y=Math.sin(a)*.76;if(i===0)shape.moveTo(x,y);else shape.lineTo(x,y)}
    shape.closePath()
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:1.45,bevelEnabled:true,bevelThickness:.025,bevelSize:.018,bevelSegments:2,curveSegments:1})
    geometry.translate(0,0,-1.45)
    let mesh:THREE.InstancedMesh|undefined
    let tiles:{x:number;y:number;phase:number;period:number}[]=[]
    let frame=0,previous=0
    const dummy=new THREE.Object3D()
    const seed=(x:number,y:number)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n)}
    const ease=(v:number)=>v*v*v*(v*(v*6-15)+10)
    const draw=(t:number)=>{
      if(!mesh)return
      const sample:number[]=[]
      tiles.forEach((tile,i)=>{
        const phase=(t/tile.period+tile.phase)%1
        // Two stationary holds and two quintic eased strokes. No tilt, XY travel or scale.
        const stroke=phase<.2?0:phase<.5?ease((phase-.2)/.3):phase<.7?1:1-ease((phase-.7)/.3)
        const z=(stroke-.5)*.56
        dummy.position.set(tile.x,tile.y,z);dummy.rotation.set(0,0,0);dummy.scale.set(1,1,1)
        dummy.updateMatrix();mesh!.setMatrixAt(i,dummy.matrix)
        if(i<6)sample.push(Number(z.toFixed(4)))
      })
      mesh.instanceMatrix.needsUpdate=true
      uniforms.uTime.value=t
      renderer.render(scene,camera);canvas.dataset.rendered='true';canvas.dataset.pistonSample=JSON.stringify(sample)
    }
    const tick=(now:number)=>{if(now-previous>1000/(innerWidth<=600?24:30)){draw(now/1000);previous=now}frame=requestAnimationFrame(tick)}
    const start=()=>{cancelAnimationFrame(frame);draw(2.4);if(!reduced.matches&&!lowPower&&!document.hidden)frame=requestAnimationFrame(tick)}
    // Beam origin tracks the lantern in the header logo, including while scrolling.
    const beamHit=new THREE.Vector3(),beamRay=new THREE.Raycaster(),beamPlane=new THREE.Plane(new THREE.Vector3(0,0,1),0)
    const aimBeam=()=>{const width=innerWidth,height=innerHeight,logo=document.querySelector('.brand-logo')?.getBoundingClientRect()
      beamRay.setFromCamera(new THREE.Vector2(logo?(logo.left+logo.width*.506)/width*2-1:0,logo?-((logo.top+logo.height*.147)/height)*2+1:.9),camera)
      if(beamRay.ray.intersectPlane(beamPlane,beamHit))uniforms.uBeam.value.set(beamHit.x,beamHit.y)}
    const onScroll=()=>{aimBeam();if(!frame)renderer.render(scene,camera)}
    const resize=()=>{
      const width=innerWidth,height=innerHeight;renderer.setSize(width,height,false)
      const tilePixels=width<=600?55:67,H=height*(radius*2/tilePixels),W=H*width/height,dist=H/2/Math.tan(THREE.MathUtils.degToRad(17))
      camera.aspect=width/height;camera.position.set(0,-H*.3,dist);camera.lookAt(0,0,0);camera.far=dist*4;camera.updateProjectionMatrix()
      aimBeam()
      tiles=[];const dx=Math.sqrt(3)*radius,dy=1.5*radius
      for(let row=Math.floor(-H*.95/dy);row<Math.ceil(H*.75/dy);row++)for(let col=Math.floor(-W*.7/dx)-2;col<Math.ceil(W*.7/dx)+2;col++){
        tiles.push({x:col*dx+(row%2?dx/2:0),y:row*dy,phase:seed(col,row),period:16+seed(col+37,row-19)*8})
      }
      if(mesh){scene.remove(mesh);mesh.dispose()}
      floor.scale.set(W*3,H*3,1)
      mesh=new THREE.InstancedMesh(geometry,[face,side],tiles.length);mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);scene.add(mesh)
      start()
    }
    resize();addEventListener('resize',resize);addEventListener('scroll',onScroll,{passive:true});reduced.addEventListener('change',start);document.addEventListener('visibilitychange',start)
    return()=>{cancelAnimationFrame(frame);removeEventListener('resize',resize);removeEventListener('scroll',onScroll);reduced.removeEventListener('change',start);document.removeEventListener('visibilitychange',start);mesh?.dispose();for(const item of [geometry,face,side,floorMaterial,floor.geometry,renderer])item.dispose()}
  },[])
  return <canvas ref={ref} className="hex-canvas" aria-hidden="true" />
}
