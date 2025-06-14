import { Scene } from './components/Scene/Scene';
import { Camera } from './components/Scene/Camera';
import { Lighting } from './components/Scene/Lighting';
import { VRMViewer } from './components/VRMViewer/VRMViewer';
import { PoseManager } from './components/VRMViewer/PoseManager';
import { PoseControls } from './components/VRMViewer/PoseControls';

async function main() {
  try {
    // シーンの初期化
    const camera = new Camera();
    const scene = new Scene(camera.getCamera(), document.body);
    const lighting = new Lighting();
    lighting.addToScene(scene.getScene());

    // VRMビューアーの初期化
    const vrmViewer = new VRMViewer(
      {
        modelPath: __APP_MODEL_PATH__,
        onLoad: (vrm) => {
          console.log('VRMモデルの読み込みが完了しました');

          // ポーズマネージャーの初期化
          const poseManager = new PoseManager(vrm);
          
          // ポーズコントロールUIの初期化
          const poseControls = new PoseControls(poseManager);

          // デフォルトはTポーズ
          poseManager.applyPoseByName('tpose');
        },
        onError: (error) => {
          console.error('VRMモデルの読み込みに失敗:', error);
        }
      },
      scene.getScene()
    );

    // VRMモデルの読み込み
    await vrmViewer.load();

    // アニメーションループ
    function animate() {
      requestAnimationFrame(animate);
      scene.render();
    }
    animate();

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', () => {
      camera.updateAspect();
    });

  } catch (error) {
    console.error('初期化に失敗:', error);
  }
}

// アプリケーションの開始
main().catch(console.error); 
