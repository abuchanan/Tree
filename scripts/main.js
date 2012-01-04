define(['domReady', 'three/Three', 
        'three/Stats', 'three/Detector', 'three/RequestAnimationFrame',
        'threex/THREEx.WindowResize'], function(domReady) {

  domReady(function() {

    console.log('read');

    var stats, scene, renderer, mesh, arc3d, c;
    var geo;
    var camera, controls;
    var parent;

    var clock = new THREE.Clock();


    if( !init() )	animate();

    // init the scene
    function init(){

      if( Detector.webgl ){
        renderer = new THREE.WebGLRenderer({
          antialias		: true,	// to get smoother output
          preserveDrawingBuffer	: true	// to allow screenshot
        });
        renderer.setClearColorHex( 0xffffff, 1 );
      // uncomment if webgl is required
      //}else{
      //	Detector.addGetWebGLMessage();
      //	return true;
      }else{
        renderer	= new THREE.CanvasRenderer();
      }
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.getElementById('container').appendChild(renderer.domElement);

      // add Stats.js - https://github.com/mrdoob/stats.js
      stats = new Stats();
      stats.domElement.style.position	= 'absolute';
      stats.domElement.style.bottom	= '0px';
      document.body.appendChild( stats.domElement );

      // create a scene
      scene = new THREE.Scene();

      // put a camera in the scene
      camera = new THREE.PerspectiveCamera();
      camera.position.set(0, 0, 100);
      camera.lookAt( new THREE.Vector3( 0, 0, 0 ));
      scene.add(camera);

      /*
      controls = new THREE.RollControls( camera );

      controls.movementSpeed = 100;
      controls.lookSpeed = 2;
      controls.lookVertical = true;
      */

      var light = new THREE.DirectionalLight( 0xffffff );
      light.position.set( 0, 90, 100 );
      light.position.normalize();
      scene.add( light );

      // transparently support window resize
      THREEx.WindowResize.bind(renderer, camera);

      parent = new THREE.Object3D();
      scene.add( parent );

      var material = new THREE.MeshLambertMaterial({
        color: 0xdddddd,
      });

      
      var material = new THREE.ParticleBasicMaterial({ 
        size: 3, 
        opacity: 0.85,
        vertexColors: true,
      } );

      geo = new THREE.CylinderGeometry( 1, 30, 100, 20, 20, true );

      var pgeo = new THREE.Geometry();
      var colors = [
        new THREE.Color( 0xFF0000 ),
        new THREE.Color( 0x16C91C ),
        new THREE.Color( 0x0015FF ),
      ];

      var points = THREE.GeometryUtils.randomPointsInGeometry( geo, 5000 );

      var a = new THREE.Vector3( 1, 25, 0 );
      var b = new THREE.Vector3( 20, 20, 0 );
      var c = new THREE.Vector3( 10, 10, 0 );

      var d = new THREE.Vector3().sub(b, a);
      var e = new THREE.Vector3().sub(c, a);
      var f = new THREE.Vector3().add(d, e);
      var g = new THREE.Vector3().add(a, f.setLength(30));


      // red
      pgeo.vertices.push(new THREE.Vertex( a ));

      // green
      pgeo.vertices.push(new THREE.Vertex( b ));

      // blue
      pgeo.vertices.push(new THREE.Vertex( c ));

      pgeo.vertices.push(new THREE.Vertex( g ));

      pgeo.vertices.push(new THREE.Vertex( new THREE.Vector3( 0, 0, 0 ) ));

      pgeo.colors.push(colors[0]);
      pgeo.colors.push(colors[1]);
      pgeo.colors.push(colors[2]);
      pgeo.colors.push(new THREE.Color( 0xaaaaaa ));
      pgeo.colors.push(new THREE.Color( 0xdddddd ));

      var particles = new THREE.ParticleSystem( pgeo, material );
      parent.add(particles);


    /*
      var arcShape = new THREE.Shape();
      arcShape.moveTo( 0, 0 );
      arcShape.arc( 0, 0, 2, 0, Math.PI*2, false );

      var bendPath = new THREE.Path();
      bendPath.moveTo( 0, 0 );
      bendPath.quadraticCurveTo(  20, 20, 100, 0 );

      arc3d = arcShape.extrude({ amount: 50, bendPath: bendPath });

      var arcMesh = new THREE.Mesh( arc3d, material );
      arcMesh.rotation.y = 1 * i;
      arcMesh.position.y = (300 / 20) * i;
      parent.add( arcMesh );

      for( var i = 1; i < 21; i++) {
        var arcShape = new THREE.Shape();
        arcShape.moveTo( 0, 0 );
        arcShape.arc( 0, 0, 2, 0, Math.PI*2, false );

        var extrudePath = new THREE.Path();
        extrudePath.moveTo( 0, 0 );
        extrudePath.quadraticCurveTo(  50, -20, 100,  10 );

        var extrudeSettings = {	
          extrudePath: extrudePath,
        }; 

        arc3d = arcShape.extrude( extrudeSettings );

        var arcMesh = new THREE.Mesh( arc3d, material );
        arcMesh.rotation.y = 1 * i;
        arcMesh.position.y = (300 / 20) * i;
        parent.add( arcMesh );

      }

      var trunkMesh = new THREE.Mesh(new THREE.CylinderGeometry(5, 10, 300), material );
      trunkMesh.position.y += 150;
      parent.add( trunkMesh );

      var geo = new THREE.Geometry();
      geo.vertices.push( new THREE.Vertex( new THREE.Vector3( 0, 0, 0 )));
      geo.vertices.push( new THREE.Vertex( new THREE.Vector3( 10, 10, 10 )));
      geo.vertices.push( new THREE.Vertex( new THREE.Vector3( 100, 100, 100 )));
      //parent.add( new THREE.Line( geo, new THREE.LineBasicMaterial( { color: 0xbbb, opacity: 1, linewidth: 3 })));

    */
      /*
      var d = THREE.CSG.toCSG( a );
      var e = THREE.CSG.toCSG( b );
      var geo = THREE.CSG.fromCSG( e.union(d) );
      */

      //c = new THREE.CylinderGeometry(40, 40, 100, 8, 4);

      /*
      c.faces[4].vertexColors[0] = new THREE.Color( 0x000000 );
      */


      /*
      mesh = THREE.SceneUtils.createMultiMaterialObject( d, [ 
        new THREE.MeshLambertMaterial({
          color: 0xffffff,
          shading: THREE.FlatShading,
          vertexColors: THREE.VertexColors,
        } ), 
        new THREE.MeshBasicMaterial( { 
          color: 0x000000, 
          wireframe: true, 
          transparent: true 
      } ) ] );
      mesh.position.set( 100, 0, 0);
      //parent.add( mesh );
      */
      
    }

    // animation loop
    function animate() {

      // loop on request animation loop
      // - it has to be at the begining of the function
      // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
      requestAnimationFrame( animate );

      // do the render
      render();

      // update stats
      stats.update();
    }

    // render the scene
    function render() {


      //controls.update( clock.getDelta() );
      // actually render the scene
      //parent.rotation.y += 0.005;
      renderer.render( scene, camera );
    }

  });
});
