import './index.css'
import * as BABYLON from '@babylonjs/core'
// import '@babylonjs/loaders/glTF'
// import { initPhysics, addPhysicsImposter } from './physics'
import { addPostProcess } from './addPostProcess'

type YemboWall = {
    index: number,
    vertices: BABYLON.Vector3[],
    cutouts: YemboCutout[]
};

type YemboCutout = {
    parentWallIndex: number,
    vertices: BABYLON.Vector3[][],
    type: YemboCutoutType
};

type YemboCutoutType = 'window' | 'door';

const roomScalar = new BABYLON.Vector3(25, 10, 19);
const unitSize = 1;

let walls: YemboWall[] = [
    {
        index: 0,
        vertices: [
            new BABYLON.Vector3(unitSize, 0, unitSize),
            new BABYLON.Vector3(unitSize, 0, -unitSize),
            new BABYLON.Vector3(-unitSize, 0, -unitSize),
            new BABYLON.Vector3(-unitSize, 0, unitSize),
        ],
        cutouts: [
            {
                parentWallIndex: 0,
                vertices: [
                    [
                        new BABYLON.Vector3(-0.4 / (roomScalar.x * 0.1), 0, 0.4 / (roomScalar.y * 0.1)),
                        new BABYLON.Vector3(-0.4 / (roomScalar.x * 0.1), 0, -0.4 / (roomScalar.y * 0.1)),
                        new BABYLON.Vector3(0.4 / (roomScalar.x * 0.1), 0, -0.4 / (roomScalar.y * 0.1)),
                        new BABYLON.Vector3(0.4 / (roomScalar.x * 0.1), 0, 0.4 / (roomScalar.y * 0.1))
                    ]
                ],
                type: 'window'
            },
        ]
    },
    {
        index: 1,
        vertices: [
            new BABYLON.Vector3(unitSize, 0, unitSize),
            new BABYLON.Vector3(unitSize, 0, -unitSize),
            new BABYLON.Vector3(-unitSize, 0, -unitSize),
            new BABYLON.Vector3(-unitSize, 0, unitSize),
        ],
        cutouts: [
            {
                parentWallIndex: 1,
                vertices: [
                    [
                        new BABYLON.Vector3(-0.4 / (roomScalar.z * 0.1), 0, 0.4 / (roomScalar.y * 0.1)),
                        new BABYLON.Vector3(-0.4 / (roomScalar.z * 0.1), 0, -0.4 / (roomScalar.y * 0.1)),
                        new BABYLON.Vector3(0.4 / (roomScalar.z * 0.1), 0, -0.4 / (roomScalar.y * 0.1)),
                        new BABYLON.Vector3(0.4 / (roomScalar.z * 0.1), 0, 0.4 / (roomScalar.y * 0.1))
                    ]
                ],
                type: 'window'
            },
        ]
    },
    {
        index: 2,
        vertices: [
            new BABYLON.Vector3(unitSize, 0, unitSize),
            new BABYLON.Vector3(unitSize, 0, -unitSize),
            new BABYLON.Vector3(-unitSize, 0, -unitSize),
            new BABYLON.Vector3(-unitSize, 0, unitSize),
        ],
        cutouts: [
            {
                parentWallIndex: 1,
                vertices: [
                    [
                        new BABYLON.Vector3(-0.4 / (roomScalar.x * 0.1), 0, 0.4 / (roomScalar.y * 0.1)),
                        new BABYLON.Vector3(-0.4 / (roomScalar.x * 0.1), 0, -unitSize),
                        new BABYLON.Vector3(0.4 / (roomScalar.x * 0.1), 0, -unitSize),
                        new BABYLON.Vector3(0.4 / (roomScalar.x * 0.1), 0, 0.4 / (roomScalar.y * 0.1))
                    ]
                ],
                type: 'door'
            },
        ]
    },
    {
        index: 3,
        vertices: [
            new BABYLON.Vector3(unitSize, 0, unitSize),
            new BABYLON.Vector3(unitSize, 0, -unitSize),
            new BABYLON.Vector3(-unitSize, 0, -unitSize),
            new BABYLON.Vector3(-unitSize, 0, unitSize),
        ],
        cutouts: []
    }
];

BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = () => {}

// const canvas = document.createElement('canvas')
// document.body.append(canvas)

// const antialias = true
// const adaptToDeviceRatio = true

// let engine: BABYLON.Engine | BABYLON.WebGPUEngine

// if (navigator.gpu) {
//   engine = new BABYLON.WebGPUEngine(canvas, { antialias, adaptToDeviceRatio })
//   await (engine as BABYLON.WebGPUEngine).initAsync()
// } else {
//   engine = new BABYLON.Engine(canvas, antialias, {}, adaptToDeviceRatio)
// }

// const scene = new BABYLON.Scene(engine)

// const alpha = 0
// const beta = 0
// const radius = 5
// const target = new BABYLON.Vector3(-4, 1, 5)
// const camera = new BABYLON.ArcRotateCamera('camera', alpha, beta, radius, target, scene)

// camera.setTarget(BABYLON.Vector3.Zero())
// camera.attachControl(canvas, true)

// await Promise.all([
//   BABYLON.SceneLoader.AppendAsync('assets/glb/', 'pixel_room.glb', scene),
//   initPhysics(scene)
// ])

// let inspectorReady = false
// let inspectorOpen = true

// if (import.meta.env.MODE === 'development') {
//   window.addEventListener('keydown', async ({ key }) => {
//     if (key.toLowerCase() !== 'i') return
  
//     if (inspectorReady === false) {
//       await import('@babylonjs/core/Debug/debugLayer')
//       await import('@babylonjs/inspector')
//       inspectorReady = true
//     }

//     if (inspectorOpen === true) {
//       localStorage.setItem('inspector', 'true')
//       scene.debugLayer.hide()
//     } else {
//       localStorage.removeItem('inspector')
//       scene.debugLayer.show()
//     }
//   })

//   if (localStorage.getItem('inspector')) {
//     scene.debugLayer.show()
//   }  
// }

// for (const texture of scene.textures) {
//   texture.updateSamplingMode(1)
// }

// {
//   const width = 3.8
//   const height = 3.8
//   const subdivisions = 1
//   const ground = BABYLON.MeshBuilder.CreateGround('ground', { width, height, subdivisions }, scene)
//   ground.position.y = -0.01
//   addPhysicsImposter(ground, BABYLON.PhysicsShapeType.BOX, scene, 0)
// }

// {
//   const segments = 32
//   const diameter = 1
//   const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments, diameter }, scene)
//   sphere.position.y = 15
//   addPhysicsImposter(sphere, BABYLON.PhysicsShapeType.SPHERE, scene)
// }

// addPostProcess(scene, [camera])

// engine.runRenderLoop(() => scene.render())









window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    // canvas.id = "renderCanvas";
    // canvas.style.width = "100%";
    // canvas.style.height = "100%";
    document.body.appendChild(canvas);

		const antialias = true
const adaptToDeviceRatio = true

let engine: BABYLON.Engine | BABYLON.WebGPUEngine

// if (navigator.gpu) {
//   engine = new BABYLON.WebGPUEngine(canvas, { antialias, adaptToDeviceRatio })
//   await (engine as BABYLON.WebGPUEngine).initAsync()
// } else {
//   engine = new BABYLON.Engine(canvas, antialias, {}, adaptToDeviceRatio)
// }

// const scene = new BABYLON.Scene(engine)


// const engine = new BABYLON.Engine(canvas, true);
		engine = new BABYLON.Engine(canvas, antialias, {}, adaptToDeviceRatio)
				let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
    const run = Playground.CreateScene(engine, scene);

    engine.runRenderLoop(() => {
        run.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });
});


class Playground {
    public static CreateScene(engine: BABYLON.Engine, scene: BABYLON.Scene){
        // let scene = new BABYLON.Scene(engine);
        // scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

				// await Promise.all([
				// 	BABYLON.SceneLoader.AppendAsync('assets/glb/', 'pixel_room.glb', scene),
				// 	// initPhysics(scene)
				// ])

         // This creates and positions a free camera (non-mesh)
                let camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 3, 65, new BABYLON.Vector3(0, 0, 4.5), scene);
                // Set min to diable camera clipping
                camera.minZ = 0;
                // Increase camera fov to make it feel less claustrophobic 
                camera.fov = 1.2;
                camera.attachControl(engine.canvas, true);
                // This targets the camera to scene origin
                camera.setTarget(BABYLON.Vector3.Zero());
                // This attaches the camera to the canvas
                camera.attachControl(engine.canvas, true);
                // Parent object to attach scaled objects too
                const parentNode = new BABYLON.TransformNode("parent", scene);
                // Arr of Objects to recieve shadows
                const shadowCasterArr = [];
                // Step 2: Render the four walls
                // Step 3: add a window hole to 2 of the walls and a door hole to 1 other wall, leaving 1 wall hole-less
                
                function CreateWallMaterial() {
                    const wallMat = new BABYLON.StandardMaterial("wallMat", scene);
                    wallMat.maxSimultaneousLights = 8;
                    const uvScale = 3;
                    const texArray = [];
                    wallMat.diffuseColor = new BABYLON.Color3(0.16, 0.16, 1);
                    const diffuseTex = new BABYLON.Texture("https://i.imgur.com/rmUTHev.jpg", scene);
                    wallMat.diffuseTexture = diffuseTex;
                    texArray.push(diffuseTex);
                    const normalTex = new BABYLON.Texture("https://i.imgur.com/G74GQPK.jpg", scene);
                    wallMat.bumpTexture = normalTex;
                    wallMat.invertNormalMapX = true;
                    wallMat.invertNormalMapY = true;
                    texArray.push(normalTex);
                    const aoTex = new BABYLON.Texture("https://i.imgur.com/NWecEJo.png", scene);
                    wallMat.ambientTexture = aoTex;
                    texArray.push(aoTex);
                    const specTex = new BABYLON.Texture("https://i.imgur.com/oM0QalI.png", scene);
                    wallMat.specularTexture = specTex;
                    texArray.push(specTex);
                    texArray.forEach((tex) => {
                        // Scale UV
                        tex.uScale = uvScale;
                        tex.vScale = uvScale;
                    });
                    return wallMat;
                }
                // Create walls and apply offsets for rotation and position
                walls.forEach((wall) => {
                    const plane = BABYLON.MeshBuilder.CreatePolygon(`plane${wall.index}`, { shape: walls[wall.index].vertices, holes: walls[wall.index].cutouts[0]?.vertices, sideOrientation: BABYLON.Mesh.FRONTSIDE }, scene);
                    // Extra credit: apply textures to the walls, make it look good
                    plane.material = CreateWallMaterial();
                    // Calculate the angle for each wall
                    const angle = Math.PI / 2 * wall.index;
                    const cos = Math.cos(angle);
                    const sin = Math.sin(angle);
                    // Position the wall based on its index
                    plane.position.set(sin * unitSize, unitSize, cos * unitSize);
                    // rotate X to face center of room
                    plane.rotation.x = -Math.PI / 2;
                    // rotate Y to face center of room
                    plane.rotation.y = angle;
                    // Parent the plane to the TransformNode
                    plane.parent = parentNode;
                    // Apply shadows to plane for light
                    shadowCasterArr.push(plane);
                });
                // ___ Render ground, floor and ceiling ________________________________________________________________
                // Ground
                const ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 500, width: 500 }, scene);
                ground.position.y = -0.05; // offset to prevent z-fighting
                const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
                groundMaterial.diffuseColor = new BABYLON.Color3(0.35, 0.35, 0.35);
                groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                // Apply the ground material to the polygon
                ground.material = groundMaterial;
                // Apply shadows to ground
                ground.receiveShadows = true;
                // Ceiling
                // Create and position the Ceiling plane
                const ceiling = BABYLON.MeshBuilder.CreatePlane("ceiling", { size: unitSize * 2 }, scene);
                ceiling.position.y = unitSize * 2;
                ceiling.rotation.x = -Math.PI / 2;
                const ceilingMaterial = new BABYLON.StandardMaterial('ceilingMaterial', scene);
                ceilingMaterial.maxSimultaneousLights = 8;
                ceilingMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
                ceilingMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                // Apply the ceiling material to the polygon
                ceiling.material = ceilingMaterial;
                // Parent the ceiling to the TransformNode
                ceiling.parent = parentNode;
                // Apply shadows to ceiling
                ceiling.receiveShadows = true;
                // Floor
                // Create and position the Floor plane
                const floor = BABYLON.MeshBuilder.CreatePlane("floor", { size: unitSize * 2 }, scene);
                floor.position.y = 0;
                floor.rotation.x = Math.PI / 2;
                // Create floor material
                function CreateFloorMaterial() {
                    const floorMat = new BABYLON.StandardMaterial("floorMat", scene);
                    floorMat.maxSimultaneousLights = 8;
                    const uvScale = roomScalar.x / 10;
                    const texArray = [];
                    floorMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
                    const diffuseTex = new BABYLON.Texture("https://i.imgur.com/f7bgeXo.jpg", scene);
                    floorMat.diffuseTexture = diffuseTex;
                    texArray.push(diffuseTex);
                    const normalTex = new BABYLON.Texture("https://i.imgur.com/X2zHCRw.png", scene);
                    floorMat.bumpTexture = normalTex;
                    floorMat.invertNormalMapX = true;
                    floorMat.invertNormalMapY = true;
                    texArray.push(normalTex);
                    const aoTex = new BABYLON.Texture("https://i.imgur.com/8NLViIC.png", scene);
                    floorMat.ambientTexture = aoTex;
                    texArray.push(aoTex);
                    const specTex = new BABYLON.Texture("https://i.imgur.com/BFfDCIK.png", scene);
                    floorMat.specularTexture = specTex;
                    texArray.push(specTex);
                    texArray.forEach((tex) => {
                        // Scale UV
                        tex.uScale = uvScale;
                        tex.vScale = uvScale;
                        // Rotate the texture
                        tex.wAng = Math.PI / 2; // Rotate the texture 90 degrees
                    });
                    return floorMat;
                }
                // Apply the floor material to the polygon
                floor.material = CreateFloorMaterial();
                // Parent the floor to the TransformNode
                floor.parent = parentNode;
                // Apply shadows to floor
                floor.receiveShadows = true;
                // __ Lights __________________________________________________
                // By default only 4 lights are allowed in a scene. Add maxSimultaneousLights to materials that need to show more.       
                function createLight(scene, name, position, target, intensity, color, shadowCasterArr) {
                    // Create the SpotLight
                    // target is relative to light so .subtract(position).normalize() will pont the light inward
                    let spotLight = new BABYLON.SpotLight(name, position, target.subtract(position).normalize(), Math.PI / 1.1, 4, scene);
                    spotLight.intensity = intensity;
                    spotLight.diffuse = color;
                    spotLight.specular = color;
                    // // Create light helpers for positioning (sphere)
                    // let lightImpostor = BABYLON.Mesh.CreateSphere(name + "Impostor", 16, 1, scene);
                    // let lightImpostorMat = new BABYLON.StandardMaterial(name + "Mat", scene);
                    // lightImpostor.material = lightImpostorMat;
                    // lightImpostorMat.emissiveColor = BABYLON.Color3.Yellow();
                    // lightImpostorMat.linkEmissiveWithDiffuse = true;
                    // // Parent the impostor to the light
                    // lightImpostor.parent = spotLight;
                    // Create Shadow Generator
                    let shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight);
                    shadowCasterArr.forEach((shadowCaster) => {
                        shadowGenerator.addShadowCaster(shadowCaster);
                    });
                    shadowGenerator.useBlurExponentialShadowMap = true;
                    shadowGenerator.useKernelBlur = true;
                    shadowGenerator.blurKernel = 6;
                    return spotLight;
                }
                // Common parameters
                const intensity = 1.6;
                const color = new BABYLON.Color3(1, 0.98, 0.85);
                const positions = [
                    {
                        position: new BABYLON.Vector3(-roomScalar.x / 1.5, (roomScalar.y * 2) - 0.8, -roomScalar.z / 1.5),
                        target: new BABYLON.Vector3(0, 0, 0)
                    },
                    {
                        position: new BABYLON.Vector3(roomScalar.x / 1.5, (roomScalar.y * 2) - 0.8, -roomScalar.z / 1.5),
                        target: new BABYLON.Vector3(0, 0, 0)
                    },
                    {
                        position: new BABYLON.Vector3(roomScalar.x / 1.5, (roomScalar.y * 2) - 0.8, roomScalar.z / 1.5),
                        target: new BABYLON.Vector3(0, 0, 0)
                    },
                    {
                        position: new BABYLON.Vector3(-roomScalar.x / 1.5, (roomScalar.y * 2) - 0.8, roomScalar.z / 1.5),
                        target: new BABYLON.Vector3(0, 0, 0)
                    }
                ];
                // Create lights with shadow generation
                positions.forEach((posObj, index) => {
                    createLight(scene, `pointLight${index + 1}`, posObj.position, posObj.target, intensity, color, shadowCasterArr);
                });
                // Interior Light to light up ceiling and fill out room
                let interiorLight = new BABYLON.PointLight("interiorLight", new BABYLON.Vector3(0, roomScalar.y, 0), scene);
                interiorLight.intensity = 0.6;
                interiorLight.diffuse = new BABYLON.Color3(1, 0.98, 0.85);
                interiorLight.specular = new BABYLON.Color3(1, 0.98, 0.85);
                // // Create light helper for positioning
                // let lightImpostor1 = BABYLON.Mesh.CreateSphere("lightImpostor1", 16, 1, scene);
                // let lightImpostorMat1 = new BABYLON.StandardMaterial("mat", scene);
                // lightImpostor1.material = lightImpostorMat1;
                // lightImpostorMat1.emissiveColor = BABYLON.Color3.Red();
                // lightImpostorMat1.linkEmissiveWithDiffuse = true;
                // lightImpostor1.parent = interiorLight;
                let interiorshadowGenerator = new BABYLON.ShadowGenerator(1024, interiorLight);
                shadowCasterArr.forEach((shadowCaster) => {
                    interiorshadowGenerator.addShadowCaster(shadowCaster);
                });
                interiorshadowGenerator.useBlurExponentialShadowMap = true;
                interiorshadowGenerator.useKernelBlur = true;
                interiorshadowGenerator.blurKernel = 64;
                // __ Scale the parent node ________________________________________
                // Doing it this way lets you control the size of the room without having to change how the walls fit together if the width and depth are not the same value
                parentNode.scaling = new BABYLON.Vector3(roomScalar.x, roomScalar.y, roomScalar.z);
                // scene.debugLayer.show()
                return scene;
    }
}


