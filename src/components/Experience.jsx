import { CameraControls, Html, PerspectiveCamera, useTexture, useVideoTexture} from "@react-three/drei";
import { angleToRadians } from "../utils/angle";
import { useEffect, useRef, useState } from "react";

const Experience = () => {
    /** Textures*/
    const tPath = "../../public/textures/"

    const cucotextures = useTexture({
      map0: tPath+"cucoteamo.jpg",
      map1: tPath+"miamor.jpg"
    })

  const cuco2 = useVideoTexture(tPath+"cuco2.mp4")
  const videoMeshRef = useRef();
  const leftWall = useRef();
  const [message, setMessage] = useState("Cuco is not singing because it is paused :c");
  const [image, setImage] = useState(cucotextures.map0);

  useEffect(()=>{
    if(videoMeshRef){
      const video = videoMeshRef.current.material.map.image;
      video.muted = false;

      video.pause()
    }
  }, [videoMeshRef])

  const handleOver = () => {

    if (image.source.data.currentSrc === cucotextures.map0.source.data.currentSrc) {

      setImage(cucotextures.map1);
    } else if (image.source.data.currentSrc === cucotextures.map1.source.data.currentSrc) {
      setImage(cucotextures.map0);
    }  
  }
  const handleSceneClick = () => {
    const video = videoMeshRef.current.material.map.image;
      if (video.paused){
        video.play();
        setMessage("Cuco is singing!");

      }else{
        video.pause();
        setMessage("Cuco is not singing because it is paused :c, click wall");

      }
    
  };
  return (

    
    <>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[-10, 5, 0]} />
          <CameraControls   />
          <ambientLight args={["#ffffff", 0.5]}/>

            {/* floor */}
            <mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color="#1ea3d8"/>
                </mesh>

            {/* wall */}
            <group>
            <mesh  onPointerOver={handleOver} position={[0, 2.5, -4]} rotation={[0,angleToRadians(-90),0]} ref={leftWall} receiveShadow>
                    <boxGeometry args={[5, 5]} />
                    <meshStandardMaterial color="#F5DEB3"
                      map={image}
                        />
                </mesh>  
               
            </group>
            {/* wall */}
            <group>
            <mesh onClick={handleSceneClick} position={[0, 2.5, 4]} rotation={[0,angleToRadians(-90),0]}  ref={videoMeshRef} receiveShadow >
                    <boxGeometry args={[5, 5]} />
                    <meshStandardMaterial color="#F5DEB3" map={cuco2} toneMapped={false} />
            </mesh>  
              <Html
                wrapper
                Center
                wrapperClass="label"
                distanceFactor={6}
                occlude={[leftWall]}
                >
                  <h1> {message} </h1>
            </Html>
            </group>

    </>
  );
};

export default Experience;
