import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';
import { sessionStoragePrefix } from 'constants/app';
import { notification } from 'antd';
import AppStore from 'stores/AppStore';

class RulesStore {
  app: AppStore;

  @observable
  data: Object = {
    percentage: {
      Communication: 83.01886792452831,
      'Code Smells': 90.0,
      Modularity: 76.47058823529412,
      Flexibility: 71.42857142857143,
      'Java Notes': 88.13559322033898
    },
    error: {
      Communication: {
        'Same level code': {
          'category description':
            'At all points, code should be "at the same level" (try not to mix method calls and low-level if logic in same method)',
          detail: []
        },
        'Meaningful names': {
          'category description':
            'Meaningful names: give variables, methods, classes, and packages non-abbreviated, intention-revealing names',
          detail: [
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/SpeedBoost.java',
              message: 'Rename field "speedBoost"',
              code: [
                '\t<span class="k">private</span> <span class="k">double</span> <span class="sym-9 sym">speedBoost</span>;'
              ],
              textRange: {
                endLine: 13,
                startLine: 13,
                startOffset: 16,
                endOffset: 26
              },
              rule:
                'A field should not duplicatethe name of its containing class'
            }
          ]
        },
        'No magic values': {
          'category description':
            'No magic values: use constants for all values used multiple times or in program logic',
          detail: [
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/application_controller/ApplicationController.java',
              message:
                'Assign this magic number 6 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-25 sym">myCurrentDisplay</span>.setBackground(getButtonLabels().getString(<span class="s">"Shirt"</span> + (<span class="k">int</span>) Math.floor(Math.random() * <span class="c">6</span>)), getStage().getScene().getWidth(), getStage().getScene().getHeight());'
              ],
              textRange: {
                endLine: 84,
                startLine: 84,
                startOffset: 105,
                endOffset: 106
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/GUIGenerator.java',
              message:
                'Assign this magic number .45 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-52 sym">box</span>.setMaxWidth(<span class="sym-50 sym">aWidth</span> * <span class="c">.45</span>);'
              ],
              textRange: {
                endLine: 71,
                startLine: 71,
                startOffset: 27,
                endOffset: 30
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/GUIGenerator.java',
              message:
                'Assign this magic number .1 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t<span class="sym-68 sym">hbox</span>.getChildren().add(createImage(<span class="sym-63 sym">aListOfFilePaths</span>.get(<span class="sym-67 sym">i</span>), <span class="sym-65 sym">box</span>.getMaxWidth() * <span class="c">.1</span>));'
              ],
              textRange: {
                endLine: 107,
                startLine: 107,
                startOffset: 84,
                endOffset: 86
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/GUIGenerator.java',
              message:
                'Assign this magic number .2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-69 sym">name</span>.setMaxWidth(<span class="sym-65 sym">box</span>.getMaxWidth() * <span class="c">.2</span>);'
              ],
              textRange: {
                endLine: 113,
                startLine: 113,
                startOffset: 40,
                endOffset: 42
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/GUIGenerator.java',
              message:
                'Assign this magic number .6 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-70 sym">des</span>.setMaxWidth(<span class="sym-65 sym">box</span>.getMaxWidth() * <span class="c">.6</span>);'
              ],
              textRange: {
                endLine: 114,
                startLine: 114,
                startOffset: 39,
                endOffset: 41
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
              message:
                'Assign this magic number 3 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tHBox <span class="sym-44 sym">box</span> = <span class="k">new</span> HBox(FrontEndResources.BOX_INSETS.getDoubleResource() * <span class="c">3</span>);'
              ],
              textRange: {
                endLine: 79,
                startLine: 79,
                startOffset: 73,
                endOffset: 74
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
              message:
                'Assign this magic number 200 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-46 sym">scores</span>.setMaxWidth(<span class="c">200</span>);'
              ],
              textRange: {
                endLine: 90,
                startLine: 90,
                startOffset: 21,
                endOffset: 24
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
              message:
                'Assign this magic number 2000 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-45 sym">users</span>.setMaxWidth(<span class="c">2000</span>);'
              ],
              textRange: {
                endLine: 91,
                startLine: 91,
                startOffset: 20,
                endOffset: 24
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
              message:
                'Assign this magic number 5000 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-44 sym">box</span>.setMaxWidth(<span class="c">5000</span>);'
              ],
              textRange: {
                endLine: 92,
                startLine: 92,
                startOffset: 18,
                endOffset: 22
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
              message:
                'Assign this magic number 1000 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-44 sym">box</span>.setMinWidth(<span class="c">1000</span>);'
              ],
              textRange: {
                endLine: 93,
                startLine: 93,
                startOffset: 18,
                endOffset: 22
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
              message:
                'Assign this magic number 8 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="k">if</span> (<span class="sym-56sym">i</span> == <span class="c">8</span>) {'
              ],
              textRange: {
                endLine: 115,
                startLine: 115,
                startOffset: 12,
                endOffset: 13
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
              message:
                'Assign this magic number 8 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t<span class="k">if</span> (<span class="sym-63 sym">aDex</span> &lt; <span class="c">8</span>) {'
              ],
              textRange: {
                endLine: 129,
                startLine: 129,
                startOffset: 15,
                endOffset: 16
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelWindow.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\tRandomMoveHandler <span class="sym-114 sym">randomMoveHandler</span> = <span class="sym-107 sym">checkMenuItem</span>.isSelected() ? <span class="k">this</span>.<span class="sym-55 sym">selectedSprites</span>.size() == <span class="c">2</span>? <span class="k">new</span> RandomMoveConjointHandler(<span class="sym-112 sym">draggableSprite</span>.getSprite(), <span class="sym-111 sym">orientation</span>, <span class="sym-106 sym">aSprite</span>.getSprite().getLocation().calculateDistance(<span class="sym-112 sym">draggableSprite</span>.getSprite().getLocation())- <span class="sym-113 sym">offset</span>) : <span class="k">new</span> RandomMoveDisjointHandler(<span class="sym-111 sym">orientation</span>) : <span class="k">new</span> RandomMoveDisjointHandler(Orientation.NULL);'
              ],
              textRange: {
                endLine: 254,
                startLine: 254,
                startOffset: 102,
                endOffset: 103
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/sprite_display/SpriteDisplay.java',
              message:
                'Assign this magic number 25 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="k">return</span> Math.round(<span class="c">25</span> / <span class="sym-41 sym">numberOfAnimations</span>);'
              ],
              textRange: {
                endLine: 104,
                startLine: 104,
                startOffset: 20,
                endOffset: 22
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_engine/Left.java',
              message:
                'Assign this magic number 100 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t<span class="sym-16 sym">aSprite</span>.setXVelocity(<span class="c">100</span>);'
              ],
              textRange: {
                endLine: 46,
                startLine: 46,
                startOffset: 25,
                endOffset: 28
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_engine/Right.java',
              message:
                'Assign this magic number 100 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t<span class="sym-16 sym">aSprite</span>.setXVelocity(-<span class="c">100</span>);'
              ],
              textRange: {
                endLine: 47,
                startLine: 47,
                startOffset: 26,
                endOffset: 29
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelVertical.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-7 sym">myProjectile</span>.getLocation().setLocation(<span class="sym-6 sym">myLauncher</span>.getLocation().getXLocation()+<span class="sym-6 sym">myLauncher</span>.getWidth()/<span class="c">2</span>, <span class="sym-6 sym">myLauncher</span>.getLocation().getYLocation()-<span class="c">20</span>);'
              ],
              textRange: {
                endLine: 38,
                startLine: 38,
                startOffset: 104,
                endOffset: 105
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelVertical.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-7 sym">myProjectile</span>.getLocation().setLocation(<span class="sym-6 sym">myLauncher</span>.getLocation().getXLocation()+<spanclass="sym-6 sym">myLauncher</span>.getWidth()/<span class="c">2</span>, <span class="sym-6 sym">myLauncher</span>.getLocation().getYLocation()-<span class="c">20</span>);'
              ],
              textRange: {
                endLine: 38,
                startLine: 38,
                startOffset: 147,
                endOffset: 149
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelVertical.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-7 sym">myProjectile</span>.getLocation().setLocation(<span class="sym-6 sym">myLauncher</span>.getLocation().getXLocation()+<span class="sym-6 sym">myLauncher</span>.getWidth()/<span class="c">2</span>, <span class="sym-6 sym">myLauncher</span>.getLocation().getYLocation() + <span class="sym-6 sym">myLauncher</span>.getHeight()+<span class="c">20</span>);'
              ],
              textRange: {
                endLine: 42,
                startLine: 42,
                startOffset: 104,
                endOffset: 105
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelVertical.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-7 sym">myProjectile</span>.getLocation().setLocation(<span class="sym-6 sym">myLauncher</span>.getLocation().getXLocation()+<span class="sym-6 sym">myLauncher</span>.getWidth()/<span class="c">2</span>, <span class="sym-6 sym">myLauncher</span>.getLocation().getYLocation() + <span class="sym-6 sym">myLauncher</span>.getHeight()+<span class="c">20</span>);'
              ],
              textRange: {
                endLine: 42,
                startLine: 42,
                startOffset: 172,
                endOffset: 174
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/back_end/keycode_handler/MovementHandlerFactory.java',
              message:
                'Assign this magic number .5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="k">double</span> <span class="sym-15 sym">screenRatioTop</span> = <span class="c">.5</span>;'
              ],
              textRange: {
                endLine: 15,
                startLine: 15,
                startOffset: 26,
                endOffset: 28
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/back_end/keycode_handler/MovementHandlerFactory.java',
              message:
                'Assign this magic number .5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="k">double</span> <span class="sym-16 sym">screenRatioBottom</span> = <span class="c">.5</span>;'
              ],
              textRange: {
                endLine: 16,
                startLine: 16,
                startOffset: 29,
                endOffset: 31
              },
              rule: 'Magic numbers shouldnot be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/application_controller/GamePlayController.java',
              message:
                'Assign this magic number 2to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-33 sym">myGamePlayScene</span>.addNode(getGUIGenerator().createLabel(<span class="s">"Score: "</span> + <span class="sym-92 sym">d</span>.doubleValue(), <span class="c">0</span>, <span class="c">0</span>), <span class="c">2</span>);'
              ],
              textRange: {
                endLine: 214,
                startLine: 214,
                startOffset: 93,
                endOffset: 94
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_engine/Bottom.java',
              message:
                'Assign this magic number 60 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-17 sym">movableSprite</span>.getLocation().setLocation(<span class="sym-17 sym">movableSprite</span>.getLocation().getXLocation(), <span class="sym-17 sym">movableSprite</span>.getLocation().getYLocation()+(<span class="sym-16 sym">aSprite</span>.getYVelocity()/<span class="c">60</span>));'
              ],
              textRange: {
                endLine: 48,
                startLine: 48,
                startOffset: 154,
                endOffset: 156
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_engine/Left.java',
              message:
                'Assign this magic number 60 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-17 sym">movableSprite</span>.getLocation().setLocation(<span class="sym-17 sym">movableSprite</span>.getLocation().getXLocation()+(<span class="sym-16 sym">aSprite</span>.getXVelocity()/<span class="c">60</span>), <span class="sym-17 sym">movableSprite</span>.getLocation().getYLocation());'
              ],
              textRange: {
                endLine: 49,
                startLine: 49,
                startOffset: 110,
                endOffset: 112
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_engine/Right.java',
              message:
                'Assign this magic number 60 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-17 sym">movableSprite</span>.getLocation().setLocation(<span class="sym-17 sym">movableSprite</span>.getLocation().getXLocation()+(<span class="sym-16 sym">aSprite</span>.getXVelocity()/<span class="c">60</span>), <span class="sym-17 sym">movableSprite</span>.getLocation().getYLocation());'
              ],
              textRange: {
                endLine: 49,
                startLine: 49,
                startOffset: 110,
                endOffset: 112
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/Breakable.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-23 sym">timeSinceHit</span> = <span class="c">20</span>;'
              ],
              textRange: {
                endLine: 45,
                startLine: 45,
                startOffset: 17,
                endOffset: 19
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelHorizontal.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-7 sym">myProjectile</span>.getLocation().setLocation(<span class="sym-6 sym">myLauncher</span>.getLocation().getXLocation()+<span class="sym-6 sym">myLauncher</span>.getWidth()+<span class="c">20</span>, <span class="sym-6 sym">myLauncher</span>.getLocation().getYLocation()+<span class="sym-6 sym">myLauncher</span>.getHeight()/<span class="c">2</span>);'
              ],
              textRange: {
                endLine: 38,
                startLine: 38,
                startOffset: 104,
                endOffset: 106
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelHorizontal.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-7 sym">myProjectile</span>.getLocation().setLocation(<span class="sym-6 sym">myLauncher</span>.getLocation().getXLocation()+<span class="sym-6 sym">myLauncher</span>.getWidth()+<span class="c">20</span>, <span class="sym-6 sym">myLauncher</span>.getLocation().getYLocation()+<span class="sym-6 sym">myLauncher</span>.getHeight()/<span class="c">2</span>);'
              ],
              textRange: {
                endLine: 38,
                startLine: 38,
                startOffset: 171,
                endOffset: 172
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelHorizontal.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-7 sym">myProjectile</span>.getLocation().setLocation(<span class="sym-6 sym">myLauncher</span>.getLocation().getXLocation()-<span class="c">20</span>, <span class="sym-6 sym">myLauncher</span>.getLocation().getYLocation() + <span class="sym-6 sym">myLauncher</span>.getHeight()/<span class="c">2</span>);'
              ],
              textRange: {
                endLine: 42,
                startLine: 42,
                startOffset: 82,
                endOffset: 84
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelHorizontal.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="sym-7 sym">myProjectile</span>.getLocation().setLocation(<span class="sym-6 sym">myLauncher</span>.getLocation().getXLocation()-<span class="c">20</span>, <span class="sym-6 sym">myLauncher</span>.getLocation().getYLocation() + <span class="sym-6 sym">myLauncher</span>.getHeight()/<span class="c">2</span>);'
              ],
              textRange: {
                endLine: 42,
                startLine: 42,
                startOffset: 151,
                endOffset: 152
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelWindow.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="k">else</span> <span class="k">if</span> (<span class="k">this</span>.<span class="sym-55 sym">selectedSprites</span>.size()&gt;<span class="c">2</span>) <span class="sym-115 sym">showAlert</span>(<span class="s">"Can Only Conjoin Two Entities"</span>);'
              ],
              textRange: {
                endLine: 247,
                startLine: 247,
                startOffset: 40,
                endOffset: 41
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ProjectileDefaultBuilder.java',
              message:
                'Assign this magic number 10 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-14 sym">projectile</span>.setWidth(<span class="c">10</span>);'
              ],
              textRange: {
                endLine: 49,
                startLine: 49,
                startOffset: 22,
                endOffset: 24
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ProjectileDefaultBuilder.java',
              message:
                'Assign this magic number 10 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-14 sym">projectile</span>.setHeight(<span class="c">10</span>);'
              ],
              textRange: {
                endLine: 50,
                startLine: 50,
                startOffset: 23,
                endOffset: 25
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_engine/Bottom.java',
              message:
                'Assign this magic number 100 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t<span class="sym-16 sym">aSprite</span>.setYVelocity(-<span class="c">100</span>);'
              ],
              textRange: {
                endLine: 46,
                startLine: 46,
                startOffset: 26,
                endOffset: 29
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/UserProfileScene.java',
              message:
                'Assign this magic number 50 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tHBox <span class="sym-33 sym">box</span> = <span class="k">new</span> HBox(<span class="c">50</span>);'
              ],
              textRange: {
                endLine: 61,
                startLine: 61,
                startOffset: 22,
                endOffset: 24
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelWindow.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t\t\t+ <span class="sym-87 sym">draggableSprite</span>.getSprite().getWidth() / <span class="c">2</span>);'
              ],
              textRange: {
                endLine: 206,
                startLine: 206,
                startOffset: 49,
                endOffset: 50
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelWindow.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t\t\t+ <span class="sym-87 sym">draggableSprite</span>.getSprite().getHeight() / <span class="c">2</span>);'
              ],
              textRange: {
                endLine: 208,
                startLine: 208,
                startOffset: 50,
                endOffset: 51
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/Breakable.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="k">return</span> <span class="sym-23 sym">timeSinceHit</span> &lt; <span class="c">20</span>;'
              ],
              textRange: {
                endLine: 83,
                startLine: 83,
                startOffset: 24,
                endOffset: 26
              },
              rule: 'Magic numbers should not beused'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/back_end/keycode_handler/KeyCodeHandler.java',
              message:
                'Assign this magic number 180 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t<span class="sym-18 sym">myMainPlayerImage</span>.get(<span class="sym-36 sym">i</span>).setRotate(<span class="c">180</span>);'
              ],
              textRange: {
                endLine: 81,
                startLine: 81,
                startOffset: 39,
                endOffset: 42
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/Pacer.java',
              message:
                'Assign this magic number 2 to a well-namedconstant, and use the constant instead.',
              code: [
                '\t\t<span class="k">return</span> Math.sqrt( Math.pow(<span class="sym-13 sym">mySprite</span>.getXVelocity(), <span class="c">2</span>) + Math.pow(<span class="sym-13 sym">mySprite</span>.getYVelocity(),<span class="c">2</span>) )/<span class="c">60</span>;'
              ],
              textRange: {
                endLine: 73,
                startLine: 73,
                startOffset: 54,
                endOffset: 55
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/Pacer.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="k">return</span> Math.sqrt( Math.pow(<span class="sym-13 sym">mySprite</span>.getXVelocity(), <span class="c">2</span>) + Math.pow(<span class="sym-13 sym">mySprite</span>.getYVelocity(),<span class="c">2</span>) )/<span class="c">60</span>;'
              ],
              textRange: {
                endLine: 73,
                startLine: 73,
                startOffset: 92,
                endOffset: 93
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/Pacer.java',
              message:
                'Assign this magic number 60 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="k">return</span> Math.sqrt( Math.pow(<span class="sym-13 sym">mySprite</span>.getXVelocity(), <span class="c">2</span>) + Math.pow(<span class="sym-13 sym">mySprite</span>.getYVelocity(),<span class="c">2</span>) )/<span class="c">60</span>;'
              ],
              textRange: {
                endLine: 73,
                startLine: 73,
                startOffset: 97,
                endOffset: 99
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/AbstractNavigationPlayerScene.java',
              message:
                'Assign this magic number .45 to a well-named constant, and use the constant instead.',
              code: [
                '\t    getOptions().setMaxWidth(<span class="sym-29 sym">aWidth</span> * <span class="c">.45</span>);'
              ],
              textRange: {
                endLine: 50,
                startLine: 50,
                startOffset: 39,
                endOffset: 42
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/context_menu/SpriteContextMenu.java',
              message:
                'Assign this magic number 15 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t\t<span class="k">new</span> Location(<span class="sym-27 sym">clone</span>.getLocation().getXLocation() + <span class="c">15</span>, <span class="sym-27 sym">clone</span>.getLocation().getYLocation() + <span class="c">15</span>));'
              ],
              textRange: {
                endLine: 51,
                startLine: 51,
                startOffset: 55,
                endOffset: 57
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/context_menu/SpriteContextMenu.java',
              message:
                'Assign this magic number 15 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t\t<span class="k">new</span> Location(<span class="sym-27 sym">clone</span>.getLocation().getXLocation() + <span class="c">15</span>, <span class="sym-27 sym">clone</span>.getLocation().getYLocation() + <span class="c">15</span>));'
              ],
              textRange: {
                endLine: 51,
                startLine: 51,
                startOffset: 96,
                endOffset: 98
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/drag_resize/DragResizeMod.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t<span class="k">if</span> (<span class="sym-117 sym">event</span>.getClickCount() == <span class="c">2</span>) {'
              ],
              textRange: {
                endLine: 289,
                startLine: 289,
                startOffset: 32,
                endOffset: 33
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/util/game_info/GameInfoEditWindow.java',
              message:
                'Assign this magicnumber 150 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-35 sym">myDescriptionField</span>.setPrefHeight(<span class="c">150</span>);'
              ],
              textRange: {
                endLine: 106,
                startLine: 106,
                startOffset: 35,
                endOffset: 38
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/util/game_info/GameInfoEditWindow.java',
              message:
                'Assign this magic number 50 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-37 sym">myIconImageView</span>.setFitWidth(<span class="c">50</span>);'
              ],
              textRange: {
                endLine: 120,
                startLine: 120,
                startOffset: 30,
                endOffset: 32
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/util/game_info/GameInfoEditWindow.java',
              message:
                'Assign this magic number 50 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-37 sym">myIconImageView</span>.setFitHeight(<span class="c">50</span>);'
              ],
              textRange: {
                endLine: 121,
                startLine: 121,
                startOffset: 31,
                endOffset: 33
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/ListOfCollidingSprites.java',
              message:
                'Assign this magic number .2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t.getLocation().getYLocation()+<span class="c">.2</span>*<span class="sym-12 sym">targetSprite</span>.getHeight() &amp;&amp; <span class="sym-36 sym">myPlayerSprite</span>.getYVelocity() &gt;= <span class="c">0</span>;'
              ],
              textRange: {
                endLine: 108,
                startLine: 108,
                startOffset: 34,
                endOffset: 36
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/BounceTopOnly.java',
              message:
                'Assign this magic number .5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t.getLocation().getYLocation()+(<span class="sym-7 sym">myBouncer</span>.getHeight()*<span class="c">.5</span>) &amp;&amp; <span class="sym-6 sym">myPlayerSprite</span>.getYVelocity()&gt;=<span class="c">0</span>;'
              ],
              textRange: {
                endLine: 62,
                startLine: 62,
                startOffset: 57,
                endOffset: 59
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/HitTop.java',
              message:
                'Assign this magic number .5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t.getLocation().getYLocation()+(<span class="sym-10 sym">myNonPlayerSprite</span>.getHeight()*<span class="c">.5</span>) &amp;&amp; <span class="sym-9 sym">myPlayerSprite</span>.getYVelocity()&gt;=<span class="c">0</span>;'
              ],
              textRange: {
                endLine: 63,
                startLine: 63,
                startOffset: 65,
                endOffset: 67
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/HitTop.java',
              message:
                'Assign this magic number .2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-8 sym">collisionBuffer</span> = <span class="sym-15 sym">nonPlayerSprite</span>.getHeight()*<span class="c">.2</span>;'
              ],
              textRange: {
                endLine: 27,
                startLine: 27,
                startOffset: 48,
                endOffset: 50
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/Stick.java',
              message:
                'Assign this magic number 60 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t<span class="sym-11 sym">xLoc</span> = <span class="sym-3 sym">myCollidedSprite</span>.getLocation().getXLocation() + <span class="sym-4 sym">mySprite</span>.getXVelocity()/<span class="c">60</span>;'
              ],
              textRange: {
                endLine: 27,
                startLine: 27,
                startOffset: 83,
                endOffset: 85
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/Stick.java',
              message:
                'Assign this magic number 60 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t<span class="sym-12 sym">yLoc</span> = <span class="sym-3 sym">myCollidedSprite</span>.getLocation().getYLocation() + <span class="sym-4 sym">mySprite</span>.getYVelocity()/<span class="c">60</span>;'
              ],
              textRange: {
                endLine: 31,
                startLine: 31,
                startOffset: 83,
                endOffset: 85
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/Stick.java',
              message:
                'Assign this magic number .5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t.getLocation().getYLocation()+(<span class="sym-4 sym">mySprite</span>.getHeight()*<span class="c">.5</span>) &amp;&amp; <span class="sym-3 sym">myCollidedSprite</span>.getYVelocity()&gt;=<span class="c">0</span>;'
              ],
              textRange: {
                endLine: 40,
                startLine: 40,
                startOffset: 56,
                endOffset: 58
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/sprite/editor/controllable/ControllableEditor.java',
              message:
                'Assign this magic number 10 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\tPane <span class="sym-80 sym">editBox</span> = <span class="k">new</span> HBox(<span class="c">10</span>);'
              ],
              textRange: {
                endLine: 121,
                startLine: 121,
                startOffset: 27,
                endOffset: 29
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/util/inputfields/EnabledField.java',
              message:
                'Assign this magic number 10 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-7 sym">myPane</span> = <span class="k">new</span> HBox(<span class="c">10</span>);'
              ],
              textRange: {
                endLine: 21,
                startLine: 21,
                startOffset: 20,
                endOffset: 22
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/button_generator/FacebookButton.java',
              message:
                'Assign this magic number 10 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tHBox <span class="sym-15 sym">box</span> = <span class="k">new</span> HBox(<span class="c">10</span>);'
              ],
              textRange: {
                endLine: 18,
                startLine: 18,
                startOffset: 22,
                endOffset: 24
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/button_generator/FacebookButton.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-17 sym">fbImage</span>.setFitHeight(<span class="c">20</span>);'
              ],
              textRange: {
                endLine: 22,
                startLine: 22,
                startOffset: 23,
                endOffset: 25
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/UserProfileScene.java',
              message:
                'Assign this magic number .1 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-29 sym">profilePicture</span>.setFitWidth(<span class="sym-18 sym">myWidth</span> * <span class="c">.1</span>);'
              ],
              textRange: {
                endLine: 49,
                startLine: 49,
                startOffset: 39,
                endOffset: 41
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message:
                'Assign this magic number 10 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-40 sym">hBox</span>.setSpacing(<span class="c">10</span>);'
              ],
              textRange: {
                endLine: 85,
                startLine: 85,
                startOffset: 18,
                endOffset: 20
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-40 sym">hBox</span>.setPadding(<span class="k">new</span> Insets(<span class="c">0</span>, <span class="c">20</span>, <span class="c">10</span>, <span class="c">20</span>));'
              ],
              textRange: {
                endLine: 86,
                startLine: 86,
                startOffset: 32,
                endOffset: 34
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message:
                'Assign this magic number 10 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-40 sym">hBox</span>.setPadding(<span class="k">new</span> Insets(<span class="c">0</span>, <span class="c">20</span>, <span class="c">10</span>, <span class="c">20</span>));'
              ],
              textRange: {
                endLine: 86,
                startLine: 86,
                startOffset: 36,
                endOffset: 38
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-40 sym">hBox</span>.setPadding(<span class="k">new</span>Insets(<span class="c">0</span>, <span class="c">20</span>, <span class="c">10</span>, <span class="c">20</span>));'
              ],
              textRange: {
                endLine: 86,
                startLine: 86,
                startOffset: 40,
                endOffset: 42
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/menu/HelpDialog.java',
              message:
                'Assign this magic number 800 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tScene <span class="sym-20 sym">scene</span> = <span class="k">new</span> Scene(<span class="sym-13 sym">pane</span>, <span class="c">800</span>, <span class="c">600</span>);'
              ],
              textRange: {
                endLine: 39,
                startLine: 39,
                startOffset: 32,
                endOffset: 35
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/menu/HelpDialog.java',
              message:
                'Assign this magic number 600 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tScene <span class="sym-20 sym">scene</span> = <span class="k">new</span> Scene(<span class="sym-13 sym">pane</span>, <span class="c">800</span>, <span class="c">600</span>);'
              ],
              textRange: {
                endLine: 39,
                startLine: 39,
                startOffset: 37,
                endOffset: 40
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/GamePlayScene.java',
              message:
                'Assign this magic number 0.5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-17 sym">myGamePlay</span>.setOpacity(<span class="c">0.5</span>);'
              ],
              textRange: {
                endLine: 41,
                startLine: 41,
                startOffset: 24,
                endOffset: 27
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message:
                'Assign this magic number 500 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tScene <span class="sym-31 sym">s</span> = <span class="k">new</span> Scene(<span class="sym-22 sym">menu</span>, <span class="c">500</span>, <span class="c">500</span>);'
              ],
              textRange: {
                endLine: 56,
                startLine: 56,
                startOffset: 28,
                endOffset: 31
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message:
                'Assign this magic number 500 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tScene <span class="sym-31 sym">s</span> = <span class="k">new</span> Scene(<span class="sym-22 sym">menu</span>, <span class="c">500</span>, <span class="c">500</span>);'
              ],
              textRange: {
                endLine: 56,
                startLine: 56,
                startOffset: 33,
                endOffset: 36
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message:
                'Assign this magic number 10 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-22 sym">menu</span>.setSpacing(<span class="c">10</span>);'
              ],
              textRange: {
                endLine: 76,
                startLine: 76,
                startOffset: 18,
                endOffset: 20
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-22 sym">menu</span>.setPadding(<span class="k">new</span> Insets(<span class="c">0</span>, <span class="c">20</span>, <span class="c">100</span>, <span class="c">20</span>));'
              ],
              textRange: {
                endLine: 77,
                startLine: 77,
                startOffset: 32,
                endOffset: 34
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message:
                'Assign this magic number 100 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-22 sym">menu</span>.setPadding(<span class="k">new</span> Insets(<span class="c">0</span>, <span class="c">20</span>, <span class="c">100</span>, <span class="c">20</span>));'
              ],
              textRange: {
                endLine: 77,
                startLine: 77,
                startOffset: 36,
                endOffset: 39
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-22 sym">menu</span>.setPadding(<span class="k">new</span> Insets(<span class="c">0</span>, <span class="c">20</span>, <span class="c">100</span>, <span class="c">20</span>));'
              ],
              textRange: {
                endLine: 77,
                startLine: 77,
                startOffset: 41,
                endOffset: 43
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/LevelSelectionPopUp.java',
              message:
                'Assign this magic number 10 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tHBox <span class="sym-16 sym">levelSelection</span> = <span class="k">new</span> HBox(<span class="c">10</span>);'
              ],
              textRange: {
                endLine: 32,
                startLine: 32,
                startOffset: 33,
                endOffset: 35
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/LevelSelectionPopUp.java',
              message:
                'Assign this magic number 5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="k">int</span> <span class="sym-18 sym">levelsPerLine</span> = <span class="c">5</span>;'
              ],
              textRange: {
                endLine: 34,
                startLine: 34,
                startOffset: 22,
                endOffset: 23
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/LevelSelectionPopUp.java',
              message:
                'Assign this magic number 5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="k">if</span> (<span class="sym-9 sym">myNumberOfLevels</span> &lt; <span class="c">5</span>) <span class="sym-18 sym">levelsPerLine</span> = <span class="sym-9 sym">myNumberOfLevels</span>;'
              ],
              textRange: {
                endLine: 35,
                startLine: 35,
                startOffset: 25,
                endOffset: 26
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/combobox_generator/GameSelectionComboBox.java',
              message:
                'Assign this magic number 4 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-7 sym">myBox</span>.setVisibleRowCount(<span class="c">4</span>);'
              ],
              textRange: {
                endLine: 19,
                startLine: 19,
                startOffset: 27,
                endOffset: 28
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/ConcreteMovableSprite.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t<span class="k">if</span> (<span class="sym-22 sym">e</span>.getClickCount() == <span class="c">2</span>) {'
              ],
              textRange: {
                endLine: 66,
                startLine: 66,
                startOffset: 29,
                endOffset: 30
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/sprite/page/SpriteQuickView.java',
              message:
                'Assign this magic number 100 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-15 sym">myImageView</span>.setFitHeight(<span class="c">100</span>);'
              ],
              textRange: {
                endLine: 31,
                startLine: 31,
                startOffset: 27,
                endOffset: 30
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/sprite/page/SpriteQuickView.java',
              message:
                'Assign this magic number 100 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-15 sym">myImageView</span>.setFitWidth(<span class="c">100</span>);'
              ],
              textRange: {
                endLine: 32,
                startLine: 32,
                startOffset: 26,
                endOffset: 29
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/application_controller/GamePlayController.java',
              message:
                'Assign this magic number 30 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tImageView <span class="sym-85 sym">image</span> = getGUIGenerator().createImage(<span class="s">"data/gui/clip_art_hawaiian_flower.png"</span>,<span class="c">30</span>);'
              ],
              textRange: {
                endLine: 189,
                startLine: 189,
                startOffset: 90,
                endOffset: 92
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/application_controller/ApplicationController.java',
              message:
                'Assign this magic number 30 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tImageView <span class="sym-42 sym">image</span> = getGUIGenerator().createImage(<span class="s">"data/gui/clip_art_hawaiian_flower.png"</span>,<span class="c">30</span>);'
              ],
              textRange: {
                endLine: 78,
                startLine: 78,
                startOffset: 90,
                endOffset: 92
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/MainMenuScene.java',
              message:
                'Assign this magic number 10 to a well-named constant, anduse the constant instead.',
              code: [
                '\t\tgetOptions().getChildren().add(<span class="sym-7 sym">myAnimation</span>.makeFadeTransition(<span class="sym-9 sym">myGUIGenerator</span>.createImage(<span class="s">"data/gui/praying-for-the-six.png"</span>, <span class="sym-8 sym">myWidth</span> / <span class="c">10</span>)));'
              ],
              textRange: {
                endLine: 34,
                startLine: 34,
                startOffset: 137,
                endOffset: 139
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/sprite/page/SpriteScroller.java',
              message:
                'Assign this magic number 5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-27 sym">myFlowPane</span>.setHgap(<span class="c">5</span>);'
              ],
              textRange: {
                endLine: 93,
                startLine: 93,
                startOffset: 21,
                endOffset: 22
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/sprite/page/SpriteScroller.java',
              message:
                'Assign this magic number 5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-27 sym">myFlowPane</span>.setVgap(<span class="c">5</span>);'
              ],
              textRange: {
                endLine: 94,
                startLine: 94,
                startOffset: 21,
                endOffset: 22
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/util/edit_window/GameObjectEditBox.java',
              message:
                'Assign this magic number 5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tVBox <span class="sym-24 sym">editBox</span> = <span class="k">new</span> VBox(<span class="c">5</span>);'
              ],
              textRange: {
                endLine: 48,
                startLine: 48,
                startOffset: 26,
                endOffset: 27
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/util/edit_window/GameObjectEditBox.java',
              message:
                'Assign this magic number 3 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-24 sym">editBox</span>.setPadding(<span class="k">new</span> Insets(<span class="c">3</span>));'
              ],
              textRange: {
                endLine: 49,
                startLine: 49,
                startOffset: 32,
                endOffset: 33
              },
              rule: 'Magic numbers shouldnot be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/animated_display/AnimatedDisplay.java',
              message:
                'Assign this magic number 5000 to a well-named constant, and use the constant instead.',
              code: [
                '\t            <span class="k">new</span> FadeTransition(Duration.millis(<span class="c">5000</span>), <span class="sym-6 sym">aObject</span>);'
              ],
              textRange: {
                endLine: 12,
                startLine: 12,
                startOffset: 48,
                endOffset: 52
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/background_display/BackgroundDisplayFactory.java',
              message:
                'Assign this magic number 100 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t\t<span class="k">new</span> BackgroundSize(<span class="c">100</span>, <span class="c">100</span>, <span class="k">true</span>, <span class="k">true</span>, <span class="k">true</span>, <span class="k">true</span>));'
              ],
              textRange: {
                endLine: 41,
                startLine: 41,
                startOffset: 24,
                endOffset: 27
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/background_display/BackgroundDisplayFactory.java',
              message:
                'Assign this magic number 100 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t\t<span class="k">new</span> BackgroundSize(<span class="c">100</span>, <span class="c">100</span>, <span class="k">true</span>, <span class="k">true</span>, <span class="k">true</span>, <span class="k">true</span>));'
              ],
              textRange: {
                endLine: 41,
                startLine: 41,
                startOffset: 29,
                endOffset: 32
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/level_edit_window/LevelEditBox.java',
              message:
                'Assign this magic number 5 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tVBox <span class="sym-35 sym">editBox</span> = <span class="k">new</span> VBox(<span class="c">5</span>);'
              ],
              textRange: {
                endLine: 76,
                startLine: 76,
                startOffset: 26,
                endOffset: 27
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/level_edit_window/LevelEditBox.java',
              message:
                'Assign this magic number 3 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-35 sym">editBox</span>.setPadding(<span class="k">new</span> Insets(<span class="c">3</span>));'
              ],
              textRange: {
                endLine: 77,
                startLine: 77,
                startOffset: 32,
                endOffset: 33
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelProgressionWindow.java',
              message:
                'Assign this magic number 150 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="k">super</span>.getWindow().setMaxHeight(<span class="c">150</span>);'
              ],
              textRange: {
                endLine: 45,
                startLine: 45,
                startOffset: 33,
                endOffset: 36
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelProgressionWindow.java',
              message:
                'Assign this magic number 150 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="k">super</span>.getWindow().setMinHeight(<span class="c">150</span>);'
              ],
              textRange: {
                endLine: 46,
                startLine: 46,
                startOffset: 33,
                endOffset: 36
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/DraggableSprite.java',
              message:
                'Assign this magic number 2 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t\t\t<span class="k">if</span> (<span class="sym-30 sym">e</span>.getClickCount() == <span class="c">2</span>) {'
              ],
              textRange: {
                endLine: 71,
                startLine: 71,
                startOffset: 29,
                endOffset: 30
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/button_generator/ImageButton.java',
              message:
                'Assign this magic number 40 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-15 sym">imageView</span>.setFitHeight(<span class="c">40</span>);'
              ],
              textRange: {
                endLine: 18,
                startLine: 18,
                startOffset: 25,
                endOffset: 27
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/button_generator/ImageButton.java',
              message:
                'Assign this magic number 40 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-15 sym">imageView</span>.setFitWidth(<span class="c">40</span>);'
              ],
              textRange: {
                endLine: 19,
                startLine: 19,
                startOffset: 24,
                endOffset: 26
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/AbstractPopUp.java',
              message:
                'Assign this magic number 40 to a well-named constant, and use the constant instead.',
              code: [
                '\t\t<span class="sym-22 sym">myOptions</span> = <span class="k">new</span> VBox(<span class="c">40</span>);'
              ],
              textRange: {
                endLine: 34,
                startLine: 34,
                startOffset: 23,
                endOffset: 25
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/PlayerOptionsPopUp.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tHBox <span class="sym-15 sym">keyOption</span> = <span class="k">new</span> HBox(<span class="c">20</span>);'
              ],
              textRange: {
                endLine: 29,
                startLine: 29,
                startOffset: 28,
                endOffset: 30
              },
              rule: 'Magic numbers should not be used'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/PlayerOptionsPopUp.java',
              message:
                'Assign this magic number 20 to a well-named constant, and use the constant instead.',
              code: [
                '\t\tHBox <span class="sym-25 sym">fontOption</span> = <span class="k">new</span> HBox(<span class="c">20</span>);'
              ],
              textRange: {
                endLine: 47,
                startLine: 47,
                startOffset: 29,
                endOffset: 31
              },
              rule: 'Magic numbers should not be used'
            }
          ]
        },
        'Use scope wisely': {
          'category description':
            'Use scope wisely: variables should be declared as close as possible to where they are used',
          detail: []
        },
        'Concise code': {
          'category description':
            'Code should be "concise" (use booleans wisely, for-each loop where possible, use Java API calls instead of implementing yourself)',
          detail: [
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/ScoreBasedOnPosition.java',
              message:
                'Replace this if-then-else statement by a single return statement.',
              code: [
                '\t\t<span class="k">if</span>((<span class="sym-17 sym">initX</span> &lt; <span class="sym-23 sym">cur</span> &amp;&amp; <span class="sym-22 sym">scrollDirection</span> == ScrollType.HORIZONTAL_RIGHT) || (<span class="sym-17 sym">initX</span>&gt;<span class="sym-23 sym">cur</span> &amp;&amp; <span class="sym-22 sym">scrollDirection</span>==ScrollType.HORIZONTAL_LEFT) || (<span class="sym-18 sym">initY</span> &lt; <span class="sym-23 sym">cur</span> &amp;&amp; <span class="sym-22 sym">scrollDirection</span> == ScrollType.VERTICAL_DOWN) || (<span class="sym-18 sym">initY</span>&gt;<span class="sym-23 sym">cur</span> &amp;&amp; <span class="sym-22 sym">scrollDirection</span>==ScrollType.VERTICAL_UP)){'
              ],
              textRange: {
                endLine: 82,
                startLine: 82,
                startOffset: 2,
                endOffset: 4
              },
              rule:
                'Return of boolean expressions should not be wrapped into an "if-then-else" statement'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/AuthorView.java',
              message: 'Make this anonymous inner class a lambda',
              code: [
                '\t\tPlatform.runLater(<span class="k">new</span> Runnable() {'
              ],
              textRange: {
                endLine: 60,
                startLine: 60,
                startOffset: 24,
                endOffset: 32
              },
              rule:
                'Anonymous inner classes containing only one method should become lambdas'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/LosableByTime.java',
              message: 'Remove this unused "collidedSprite" local variable.',
              code: [
                '\t\t<span class="k">for</span>(Sprite <span class="sym-19 sym">collidedSprite</span>:<span class="sym-18 sym">myCollisionMap</span>.keySet()){'
              ],
              textRange: {
                endLine: 42,
                startLine: 42,
                startOffset: 13,
                endOffset: 27
              },
              rule: 'Unused local variablesshould be removed'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/LosableOnCollision.java',
              message: 'Remove this unused "collidedSprite" local variable.',
              code: [
                '\t\t<span class="k">for</span>(Sprite <span class="sym-14 sym">collidedSprite</span>:<span class="sym-13 sym">myCollisionMap</span>.keySet()){'
              ],
              textRange: {
                endLine: 30,
                startLine: 30,
                startOffset: 13,
                endOffset: 27
              },
              rule: 'Unused local variables should be removed'
            }
          ]
        },
        'Readable code': {
          'category description':
            'Write readable code instead of comments: use comments only to explain important design decisions or purpose of code, not to restate code logic',
          detail: []
        },
        'No warning': {
          'category description':
            'Code should contain no warnings from Java compiler or CheckStyle',
          detail: [
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
              message:
                'Equality tests should not be made with floating point values.',
              code: [
                '\t\t\t<span class="k">if</span> (<span class="sym-23 sym">myHighscoreManager</span>.getHighscores().get(<span class="sym-64 sym">i</span>) == <span class="sym-62 sym">aScore</span>) {'
              ],
              textRange: {
                endLine: 124,
                startLine: 124,
                startOffset: 49,
                endOffset: 51
              },
              rule: 'Floating point numbers should not be tested for equality'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/application_controller/ApplicationController.java',
              message:
                'Define and throw a dedicated exception instead of using a generic one.',
              code: [
                '\t<span class="k">private</span> <span class="k">void</span> <span class="sym-67 sym">getLevel</span>() <span class="k">throws</span> Exception {'
              ],
              textRange: {
                endLine: 160,
                startLine: 160,
                startOffset: 32,
                endOffset: 41
              },
              rule: 'Generic exceptions should never be thrown'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/AuthorModel.java',
              message: 'Either remove or fill this block of code.',
              code: [
                '\t\t<span class="k">catch</span> (Exception <span class="sym-34sym">exception</span>){'
              ],
              textRange: {
                endLine: 83,
                startLine: 83,
                startOffset: 29,
                endOffset: 30
              },
              rule: 'Nested blocks of code should notbe left empty'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/EnginePlayerController.java',
              message: 'Either remove or fill this block of code.',
              code: [
                '\t\t\t<span class="k">if</span>(<span class="sym-27 sym">s</span> <span class="k">instanceof</span> Player){'
              ],
              textRange: {
                endLine: 54,
                startLine: 54,
                startOffset: 26,
                endOffset: 27
              },
              rule: 'Nested blocks of code should not be left empty'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/application_controller/GamePlayController.java',
              message:
                'Define and throw a dedicated exception instead of using a generic one.',
              code: [
                '\t<span class="k">private</span> <span class="k">void</span> <span class="sym-97 sym">handleRestart</span>() <span class="k">throws</span> Exception {'
              ],
              textRange: {
                endLine: 231,
                startLine: 231,
                startOffset: 37,
                endOffset: 46
              },
              rule: 'Generic exceptions should never be thrown'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_data/Sprite.java',
              message:
                'Equality tests should not be made with floating point values.',
              code: [
                '\t\t<span class="k">if</span> (<span class="k">this</span>.<span class="sym-18 sym">myXVelocity</span>!=<span class="sym-70 sym">myVelocity</span>){'
              ],
              textRange: {
                endLine: 180,
                startLine: 180,
                startOffset: 22,
                endOffset: 24
              },
              rule: 'Floating point numbers should not be tested for equality'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_data/Sprite.java',
              message:
                'Equality tests should not be made with floating point values.',
              code: [
                '\t\t<span class="k">if</span> (<span class="k">this</span>.<span class="sym-19 sym">myYVelocity</span>!=<span class="sym-72 sym">myVelocity</span>){'
              ],
              textRange: {
                endLine: 193,
                startLine: 193,
                startOffset: 22,
                endOffset: 24
              },
              rule: 'Floating point numbers should not be tested for equality'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_data/Location.java',
              message:
                'Equality tests should not be made with floating point values.',
              code: [
                '\t\t\t<span class="k">return</span> (<span class="sym-14 sym">location</span>.<span class="sym-7 sym">getXLocation</span>() == <span class="k">this</span>.<span class="sym-7 sym">getXLocation</span>() '
              ],
              textRange: {
                endLine: 33,
                startLine: 33,
                startOffset: 35,
                endOffset: 37
              },
              rule: 'Floating point numbers should not be tested for equality'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_data/Location.java',
              message:
                'Equality tests should not be made with floating point values.',
              code: [
                '\t\t\t\t\t&amp;&amp; <span class="sym-14 sym">location</span>.<span class="sym-8 sym">getYLocation</span>() == <span class="k">this</span>.<span class="sym-8 sym">getYLocation</span>());'
              ],
              textRange: {
                endLine: 34,
                startLine: 34,
                startOffset: 32,
                endOffset: 34
              },
              rule: 'Floating point numbers should not be tested for equality'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/EnemyDefaultBuilder.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> Characteristic[] <span class="sym-12sym">CHARACTERISTICS</span> = <span class="k">new</span> Characteristic[] {'
              ],
              textRange: {
                endLine: 21,
                startLine: 21,
                startOffset: 32,
                endOffset: 47
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/EnemyDefaultBuilder.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> State[] <span class="sym-13 sym">STATES</span> = <span class="k">new</span> State[] { '
              ],
              textRange: {
                endLine: 25,
                startLine: 25,
                startOffset: 23,
                endOffset: 29
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ItemDefaultBuilder.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> Characteristic[] <span class="sym-11 sym">CHARACTERISTICS</span> = <span class="k">new</span> Characteristic[] {'
              ],
              textRange: {
                endLine: 21,
                startLine: 21,
                startOffset: 32,
                endOffset: 47
              },
              rule:
                'Publicconstants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ItemDefaultBuilder.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> State[] <span class="sym-12 sym">STATES</span> = <span class="k">new</span> State[] { '
              ],
              textRange: {
                endLine: 25,
                startLine: 25,
                startOffset: 23,
                endOffset: 29
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/PlayerDefaultBuilder.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> Characteristic[] <span class="sym-14 sym">CHARACTERISTICS</span> = '
              ],
              textRange: {
                endLine: 24,
                startLine: 24,
                startOffset: 32,
                endOffset: 47
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/PlayerDefaultBuilder.java',
              message: 'Makethis final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> State[] <span class="sym-15 sym">STATES</span> = '
              ],
              textRange: {
                endLine: 28,
                startLine: 28,
                startOffset: 23,
                endOffset: 29
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ProjectileDefaultBuilder.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> Characteristic[] <span class="sym-15 sym">CHARACTERISTICS</span> = '
              ],
              textRange: {
                endLine: 26,
                startLine: 26,
                startOffset: 32,
                endOffset: 47
              },
              rule:
                'Public constants andfields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ProjectileDefaultBuilder.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> State[] <span class="sym-16 sym">STATES</span> = '
              ],
              textRange: {
                endLine: 32,
                startLine: 32,
                startOffset: 23,
                endOffset: 29
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/TerrainDefaultBuilder.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> Characteristic[] <span class="sym-12 sym">CHARACTERISTICS</span> = <span class="k">new</span> Characteristic[] {'
              ],
              textRange: {
                endLine: 22,
                startLine: 22,
                startOffset: 32,
                endOffset: 47
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/TerrainDefaultBuilder.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> State[] <span class="sym-13 sym">STATES</span> = <span class="k">new</span> State[] { '
              ],
              textRange: {
                endLine: 26,
                startLine: 26,
                startOffset: 23,
                endOffset: 29
              },
              rule:
                'Public constants andfields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> String <span class="sym-23 sym">TITLE</span> = <span class="s">"VOOGA Authoring"</span>;'
              ],
              textRange: {
                endLine: 32,
                startLine: 32,
                startOffset: 22,
                endOffset: 27
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> String <span class="sym-24 sym">STYLESHEET</span> = <span class="s">"data/GUI/author-style.css"</span>;'
              ],
              textRange: {
                endLine: 33,
                startLine: 33,
                startOffset: 22,
                endOffset: 32
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/util/RelativePathFinder.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> String <span class="sym-3 sym">RELATIVE</span> = <span class="s">"voogasalad_letsjustprayitworks/"</span>;'
              ],
              textRange: {
                endLine: 11,
                startLine: 11,
                startOffset: 22,
                endOffset: 30
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelWindow.java',
              message:
                'Equality tests should not be made with floating point values.',
              code: [
                '\t\t<span class="k">if</span> (<span class="k">this</span>.<span class="sym-47 sym">levelScroller</span>.getWidth() != <span class="c">0.0</span>){'
              ],
              textRange: {
                endLine: 288,
                startLine: 288,
                startOffset: 36,
                endOffset: 38
              },
              rule: 'Floating point numbers should not be tested for equality'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/animation_loop/AnimationLoop.java',
              message: 'Make this final field static too.',
              code: [
                '   <span class="k">private</span> <span class="k">final</span> <span class="k">double</span> <span class="sym-8 sym">SECOND_DELAY</span> = <span class="c">1.0</span> / <span class="sym-6 sym">FRAMES_PER_SECOND</span>;'
              ],
              textRange: {
                endLine: 12,
                startLine: 12,
                startOffset: 25,
                endOffset: 37
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/AbstractPopUp.java',
              message: 'Make this final field static too.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> <span class="k">int</span> <span class="sym-20 sym">SIZE</span> = <span class="c">500</span>;'
              ],
              textRange: {
                endLine: 25,
                startLine: 25,
                startOffset: 19,
                endOffset: 23
              },
              rule:
                'Public constants and fields initialized at declaration should be "static final" rather than merely "final"'
            }
          ]
        }
      },
      'Code Smells': [
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/characteristics/Movable.java',
          message:
            'Refactor this code to not nest more than 4 if/for/while/switch/try statements.',
          code: [
            '\t\t\t\t\t\t\t<span class="k">if</span>(<span class="sym-28 sym">temp</span>.isHorizontal()){'
          ],
          textRange: {
            endLine: 50,
            startLine: 50,
            startOffset: 7,
            endOffset: 9
          },
          rule:
            'Control flow statements "if", "for", "while", "switch" and "try" should not be nested too deeply'
        }
      ],
      Modularity: {
        'Data responsibility': {
          'category description':
            "Tell, don't ask: classes should be responsible for their own data and delegate to other objects instead of doing it themselves",
          detail: [
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/AbstractLevelEditorWindow.java',
              message:
                'Rename "draggableSprites" which hides the field declared at line 34.',
              code: [
                '\t\t\t<span class="sym-6 sym">Set</span>&lt;DraggableSprite&gt; <span class="sym-33 sym">draggableSprites</span> = <span class="k">new</span> <span class="sym-4 sym">HashSet</span>&lt;&gt;();'
              ],
              textRange: {
                endLine: 55,
                startLine: 55,
                startOffset: 24,
                endOffset: 40
              },
              rule: 'Local variables should not shadow class fields'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/AbstractLevelEditorWindow.java',
              message:
                'Rename "draggableSprites" which hides the field declared at line 34.',
              code: [
                '\t\t\t<span class="sym-6 sym">Set</span>&lt;DraggableSprite&gt; <span class="sym-39 sym">draggableSprites</span> = <span class="k">new</span> <span class="sym-4 sym">HashSet</span>&lt;&gt;();'
              ],
              textRange: {
                endLine: 74,
                startLine: 74,
                startOffset: 24,
                endOffset: 40
              },
              rule: 'Local variables should not shadow class fields'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/util/undo/GameChangeEvent.java',
              message:
                'Rename "invalidationListener" whichhides the field declared at line 17.',
              code: [
                '\t\tInvalidationListener <span class="sym-24 sym">invalidationListener</span> = ((<span class="sym-25 sym">listener</span>) -&gt; {'
              ],
              textRange: {
                endLine: 82,
                startLine: 82,
                startOffset: 23,
                endOffset: 43
              },
              rule: 'Local variables should not shadow class fields'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/util/undo/RevertManager.java',
              message:
                'Rename "level" which hides the field declared at line 25.',
              code: [
                '\t\t<span class="sym-22 sym">aLevel</span>.addListener((<span class="sym-23 sym">level</span>) -&gt; {'
              ],
              textRange: {
                endLine: 55,
                startLine: 55,
                startOffset: 22,
                endOffset: 27
              },
              rule: 'Local variables should not shadow class fields'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/drag_resize/DragResizeMod.java',
              message:
                'Rename "state" which hides the field declared at line 106.',
              code: [
                '\t\t<span class="sym-47 sym">S</span> <span class="sym-95 sym">state</span> = <span class="sym-97 sym">currentMouseState</span>(<span class="sym-94 sym">event</span>);'
              ],
              textRange: {
                endLine: 173,
                startLine: 173,
                startOffset: 4,
                endOffset: 9
              },
              rule: 'Local variables should notshadow class fields'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/drag_resize/DragResizeMod.java',
              message:
                'Rename "state" which hides the field declared at line 106.',
              code: [
                '\t\t<span class="sym-47 sym">S</span> <span class="sym-99 sym">state</span> = <spanclass="sym-47 sym">S</span>.<span class="sym-48 sym">DEFAULT</span>;'
              ],
              textRange: {
                endLine: 179,
                startLine: 179,
                startOffset: 4,
                endOffset: 9
              },
              rule: 'Local variables should not shadow class fields'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/drag_resize/DragResizeMod.java',
              message:
                'Rename "nodeX" which hides the field declared at line 104.',
              code: [
                '\t\t<span class="k">double</span> <span class="sym-126 sym">nodeX</span> = <span class="sym-145 sym">nodeX</span>() + <span class="sym-72 sym">MARGIN</span>;'
              ],
              textRange: {
                endLine: 326,
                startLine: 326,
                startOffset: 9,
                endOffset: 14
              },
              rule: 'Local variables should not shadow class fields'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/drag_resize/DragResizeMod.java',
              message:
                'Rename "nodeY" which hides the field declared at line 104.',
              code: [
                '\t\t<span class="k">double</span> <span class="sym-127 sym">nodeY</span> = <span class="sym-146 sym">nodeY</span>() + <span class="sym-72 sym">MARGIN</span>;'
              ],
              textRange: {
                endLine: 327,
                startLine: 327,
                startOffset: 9,
                endOffset: 14
              },
              rule: 'Local variables should not shadow class fields'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/level_window/LevelWindowPane.java',
              message:
                'Rename "gridPane" which hides the field declared at line 23.',
              code: [
                '\t\tGridPane <span class="sym-19 sym">gridPane</span> = <span class="k">new</span> GridPane();'
              ],
              textRange: {
                endLine: 37,
                startLine: 37,
                startOffset: 11,
                endOffset: 19
              },
              rule: 'Local variables should not shadow class fields'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/DraggableSprite.java',
              message:
                'Rename "invalidationListener" which hides the field declared at line 25.',
              code: [
                '\t\tInvalidationListener <span class="sym-27 sym">invalidationListener</span> = (<span class="sym-28 sym">sprite</span>) -&gt; {'
              ],
              textRange: {
                endLine: 62,
                startLine: 62,
                startOffset: 23,
                endOffset: 43
              },
              rule: 'Local variables should not shadow class fields'
            }
          ]
        },
        'Get method give minimum info': {
          categorydescription:
            'get methods should give away the minimal information possible',
          detail: []
        },
        'No static variables': {
          'category description':
            'No static variables: there should be no reason for shared global public state',
          detail: []
        },
        'Superclasses are their own class': {
          'category description':
            'Superclasses are their own class: thus should not contain instance variables or methods specific to only some subclasses',
          detail: []
        },
        'Get method validate input': {
          'category description': ['set methods should validate data received'],
          detail: []
        },
        'Active classes': {
          'category description':
            'Active classes: classes should not consist of only get/set methods and, in general, should minimize their use. ',
          detail: []
        },
        'No manager classes': {
          'category description':
            'No "manager" classes: create several classes that work together distributing intelligence, rather than one "smart" class and a few "dumb" helpers',
          detail: [
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/AuthorView.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 13 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-19 sym">AuthorView</span> <span class="k">implements</span> ILanguageUser{'
              ],
              textRange: {
                endLine: 29,
                startLine: 29,
                startOffset: 13,
                endOffset: 23
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelSelectionWindow.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 13 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-20 sym">LevelSelectionWindow</span> <span class="k">extends</span> AbstractLevelEditorWindow <span class="k">implements</span> ILanguageUser{'
              ],
              textRange: {
                endLine: 32,
                startLine: 32,
                startOffset: 13,
                endOffset: 33
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelWindow.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 27 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-46 sym">LevelWindow</span> <span class="k">extends</span> AbstractLevelEditorWindow <span class="k">implements</span> ILevelWindowInternal, ILanguageUser {'
              ],
              textRange: {
                endLine: 58,
                startLine: 58,
                startOffset: 13,
                endOffset: 24
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/sprite/page/SpriteScroller.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 16 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-25 sym">SpriteScroller</span> <span class="k">implements</span> ILanguageUser{'
              ],
              textRange: {
                endLine: 30,
                startLine: 30,
                startOffset: 13,
                endOffset: 27
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/sprite/page/SpritesPage.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 14 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-17 sym">SpritesPage</span> <span class="k">implements</span> InvalidationListener, ILanguageUser {'
              ],
              textRange: {
                endLine: 25,
                startLine: 25,
                startOffset: 13,
                endOffset: 24
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/context_menu/SpriteContextMenu.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from11 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-17 sym">SpriteContextMenu</span> <span class="k">implements</span> ISpriteContextMenu, ILanguageUser {'
              ],
              textRange: {
                endLine: 28,
                startLine: 28,
                startOffset: 13,
                endOffset: 30
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/menu/AuthorMenu.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 17 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-23 sym">AuthorMenu</span> <span class="k">implements</span> ILanguageUser{'
              ],
              textRange: {
                endLine: 27,
                startLine: 27,
                startOffset: 13,
                endOffset: 23
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/util/game_info/GameInfoEditWindow.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 17 to the maximumauthorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-27 sym">GameInfoEditWindow</span> <span class="k">implements</span> iGameInfoEditWindow {'
              ],
              textRange: {
                endLine: 31,
                startLine: 31,
                startOffset: 13,
                endOffset: 31
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/sprite/editor/controllable/ControllableEditor.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 19 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-28 sym">ControllableEditor</span> <span class="k">implements</span> InvalidationListener {'
              ],
              textRange: {
                endLine: 33,
                startLine: 33,
                startOffset: 13,
                endOffset: 31
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/AbstractPopUp.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 14 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-16 sym">AbstractPopUp</span> {'
              ],
              textRange: {
                endLine: 19,
                startLine: 19,
                startOffset: 13,
                endOffset: 26
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/InvincibilityPowerUpper.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 13 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-18 sym">InvincibilityPowerUpper</span> <span class="k">extends</span> TemporalPowerUpper <span class="k">implements</span> Characteristic {'
              ],
              textRange: {
                endLine: 29,
                startLine: 29,
                startOffset: 13,
                endOffset: 36
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/SpeedPowerUpper.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 12 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-14 sym">SpeedPowerUpper</span> <span class="k">extends</span> TemporalPowerUpper <span class="k">implements</span> Characteristic{'
              ],
              textRange: {
                endLine: 28,
                startLine: 28,
                startOffset: 13,
                endOffset: 28
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/UpdateStates.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 24to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-29 sym">UpdateStates</span> <span class="k">implements</span> IUpdateStatesAndPowerUps {'
              ],
              textRange: {
                endLine: 51,
                startLine: 51,
                startOffset: 13,
                endOffset: 25
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/drag_resize/DragResizeMod.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 11 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-14 sym">DragResizeMod</span> {'
              ],
              textRange: {
                endLine: 49,
                startLine: 49,
                startOffset: 13,
                endOffset: 26
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/drag_resize/DragResizeMod.java',
              message:
                'Reduce this anonymous class number of lines from 24 to at most 20, or make it a named class.',
              code: [
                '\t<span class="k">private</span> <span class="k">final</span> <span class="sym-15 sym">OnDragResizeEventListener</span> <span class="sym-28 sym">defaultListener</span> = <span class="k">new</span> OnDragResizeEventListener() {'
              ],
              textRange: {
                endLine: 56,
                startLine: 56,
                startOffset: 59,
                endOffset: 88
              },
              rule:
                'Lambdas and anonymous classes should not have too many lines of code'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 11 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-20 sym">AuthoringSplashScreen</span> <span class="k">implements</span> IAuthoringSplashScreen {'
              ],
              textRange: {
                endLine: 28,
                startLine: 28,
                startOffset: 13,
                endOffset: 34
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/back_end/keycode_handler/KeyCodeHandler.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 11 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-13 sym">KeyCodeHandler</span> {'
              ],
              textRange: {
                endLine: 17,
                startLine: 17,
                startOffset: 13,
                endOffset: 27
              },
              rule:
                'Classes should not be coupled to too manyother classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/Controllable.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 13 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-18 sym">Controllable</span> {'
              ],
              textRange: {
                endLine: 24,
                startLine: 24,
                startOffset: 13,
                endOffset: 25
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/sprite/editor/settings/SpriteSettingsEditor.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 14 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">abstract</span> <span class="k">class</span> <span class="sym-15 sym">SpriteSettingsEditor</span> {'
              ],
              textRange: {
                endLine: 19,
                startLine: 19,
                startOffset: 22,
                endOffset: 42
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/GamePlayScene.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 17 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-14 sym">GamePlayScene</span> <span class="k">extends</span> AbstractPlayerScene {'
              ],
              textRange: {
                endLine: 18,
                startLine: 18,
                startOffset: 13,
                endOffset: 26
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/application_controller/AbstractController.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 11 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">abstract</span> <span class="k">class</span> <span class="sym-11 sym">AbstractController</span> {'
              ],
              textRange: {
                endLine: 15,
                startLine: 15,
                startOffset: 22,
                endOffset: 40
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/application_controller/ApplicationController.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 16 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-22 sym">ApplicationController</span> <span class="k">extends</span> AbstractController {'
              ],
              textRange: {
                endLine: 32,
                startLine: 32,
                startOffset: 13,
                endOffset: 34
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/application_controller/GamePlayController.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 29 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-28 sym">GamePlayController</span> <span class="k">extends</span> AbstractController {'
              ],
              textRange: {
                endLine: 30,
                startLine: 30,
                startOffset: 13,
                endOffset: 31
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/AbstractLevelEditorWindow.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 14 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">abstract</span> <span class="k">class</span> <span class="sym-20 sym">AbstractLevelEditorWindow</span> <span class="k">implements</span> ILevelEditorWindowExternal, ILevelEditorWindowInternal{'
              ],
              textRange: {
                endLine: 31,
                startLine: 31,
                startOffset: 22,
                endOffset: 47
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/Bouncer.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 11 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-18 sym">Bouncer</span> <span class="k">implements</span> Characteristic {'
              ],
              textRange: {
                endLine: 29,
                startLine: 29,
                startOffset: 13,
                endOffset: 20
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/EnginePlayerController.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 15 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-11 sym">EnginePlayerController</span> <span class="k">implements</span> IEnginePlayerControllerInterface {'
              ],
              textRange: {
                endLine: 20,
                startLine: 20,
                startOffset: 13,
                endOffset: 35
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/UserProfileScene.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 13 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-14 sym">UserProfileScene</span> <span class="k">extends</span> AbstractNavigationPlayerScene {'
              ],
              textRange: {
                endLine: 18,
                startLine: 18,
                startOffset: 13,
                endOffset: 29
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/Movable.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 12 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-14 sym">Movable</span> <span class="k">implements</span> Characteristic{'
              ],
              textRange: {
                endLine: 20,
                startLine: 20,
                startOffset: 13,
                endOffset: 20
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/author/view/pages/sprite/editor/inheritance/base/BaseSpriteEditPage.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 17 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">abstract</span> <span class="k">class</span> <span class="sym-25 sym">BaseSpriteEditPage</span> {'
              ],
              textRange: {
                endLine: 34,
                startLine: 34,
                startOffset: 22,
                endOffset: 40
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/GUIGenerator.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 19 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-24 sym">GUIGenerator</span> <span class="k">implements</span> IGUIGenerator {'
              ],
              textRange: {
                endLine: 27,
                startLine: 27,
                startOffset: 13,
                endOffset: 25
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/heads_up_display/HeadsUpDisplay.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 11 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-14 sym">HeadsUpDisplay</span> {'
              ],
              textRange: {
                endLine: 17,
                startLine: 17,
                startOffset: 13,
                endOffset: 27
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/Damager.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 11 to the maximum authorized10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-16 sym">Damager</span> <span class="k">implements</span> Characteristic{'
              ],
              textRange: {
                endLine: 27,
                startLine: 27,
                startOffset: 13,
                endOffset: 20
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_data/Game.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 12 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-10 sym">Game</span> <span class="k">extends</span> GameObject {'
              ],
              textRange: {
                endLine: 22,
                startLine: 22,
                startOffset: 13,
                endOffset: 17
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path: 'duke-compsci308:sonar_test:src/game_data/Sprite.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 12 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">abstract</span> <span class="k">class</span> <span class="sym-12 sym">Sprite</span> <span class="k">extends</span> GameObject {'
              ],
              textRange: {
                endLine: 22,
                startLine: 22,
                startOffset: 22,
                endOffset: 28
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
              message:
                'Split this class into smaller and more specialized ones to reduce itsdependencies on other classes from 14 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-19 sym">HighScoreScene</span> <span class="k">extends</span> AbstractNavigationPlayerScene {'
              ],
              textRange: {
                endLine: 22,
                startLine: 22,
                startOffset: 13,
                endOffset: 27
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/Breakable.java',
              message:
                'Split this class into smaller and more specialized ones to reduce its dependencies on other classes from 11 to the maximum authorized 10 or less.',
              code: [
                '<span class="k">public</span> <span class="k">class</span> <span class="sym-15 sym">Breakable</span> <span class="k">implements</span> Characteristic{'
              ],
              textRange: {
                endLine: 26,
                startLine: 26,
                startOffset: 13,
                endOffset: 22
              },
              rule:
                'Classes should not be coupled to too many other classes (Single Responsibility Principle)'
            }
          ]
        },
        'No public instance variables': {
          'category description':
            'No public instance variables: keep implementation details of your class hidden from the public interface',
          detail: [
            {
              path:
                'duke-compsci308:sonar_test:src/gameplayer/front_end/background_display/BackgroundDisplayFactory.java',
              message:
                'Make myBackgroundMap a static final constant or non-public and provide accessors if needed.',
              code: [
                '\t<span class="k">public</span> <span class="sym-3 sym">Map</span>&lt;String, Background&gt; <span class="sym-14 sym">myBackgroundMap</span>;'
              ],
              textRange: {
                endLine: 19,
                startLine: 19,
                startOffset: 32,
                endOffset: 47
              },
              rule: 'Class variable fields should not have public accessibility'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/StopMovement.java',
              message:
                'Make mySprite a static final constant or non-public and provide accessors if needed.',
              code: [
                '\t<span class="k">public</span> Sprite<span class="sym-3 sym">mySprite</span>;'
              ],
              textRange: {
                endLine: 6,
                startLine: 6,
                startOffset: 15,
                endOffset: 23
              },
              rule: 'Class variable fields should not have public accessibility'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/StopMovement.java',
              message:
                'Make myVelocity astatic final constant or non-public and provide accessors if needed.',
              code: [
                '\t<span class="k">public</span> <span class="k">double</span> <span class="sym-4 sym">myVelocity</span>;'
              ],
              textRange: {
                endLine: 7,
                startLine: 7,
                startOffset: 15,
                endOffset: 25
              },
              rule: 'Class variable fields shouldnot have public accessibility'
            }
          ]
        }
      },
      Flexibility: {
        'Single Purpose': {
          'category description':
            'No "manager" classes: create several classes that work together distributing intelligence, rather than one "smart" class and a few "dumb" helpers',
          detail: [
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/ScoreBasedOnPosition.java',
              message:
                'Reduce the number of conditional operators (7) used in the expression (maximum allowed 3).',
              code: [
                '\t\t<span class="k">if</span>((<span class="sym-17 sym">initX</span> &lt; <span class="sym-23 sym">cur</span> &amp;&amp; <span class="sym-22 sym">scrollDirection</span> == ScrollType.HORIZONTAL_RIGHT) || (<span class="sym-17 sym">initX</span>&gt;<span class="sym-23 sym">cur</span> &amp;&amp; <span class="sym-22 sym">scrollDirection</span>==ScrollType.HORIZONTAL_LEFT) || (<span class="sym-18 sym">initY</span> &lt; <span class="sym-23 sym">cur</span> &amp;&amp; <span class="sym-22 sym">scrollDirection</span> == ScrollType.VERTICAL_DOWN) || (<span class="sym-18 sym">initY</span>&gt;<span class="sym-23 sym">cur</span> &amp;&amp; <span class="sym-22 sym">scrollDirection</span>==ScrollType.VERTICAL_UP)){'
              ],
              textRange: {
                endLine: 82,
                startLine: 82,
                startOffset: 5,
                endOffset: 252
              },
              rule: 'Expressions should not be too complex'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/UpdateGame.java',
              message:
                'Method has 8 parameters, which is greaterthan 7 authorized.',
              code: [
                '\t<span class="k">public</span> <span class="k">void</span> <span class="sym-13 sym">update</span>(<span class="k">double</span> <span class="sym-14 sym">aTimeElapsed</span>, <span class="sym-2 sym">Set</span>&lt;KeyCode&gt; <span class="sym-15 sym">aKeysPressed</span>, <span class="sym-2 sym">Set</span>&lt;KeyCode&gt; <span class="sym-16 sym">aKeysReleased</span>, <span class="sym-1 sym">Map</span>&lt;Sprite, ImageView&gt; <span class="sym-17 sym">aSpriteImages</span>, <span class="k">double</span> <span class="sym-18 sym">aScreenHeight</span>, <span class="k">double</span> <span class="sym-19 sym">aScreenWidth</span>, <span class="k">double</span> <span class="sym-20 sym">aScreenXPosition</span>, <span class="k">double</span> <span class="sym-21 sym">aScreenYPosition</span>){'
              ],
              textRange: {
                endLine: 21,
                startLine: 21,
                startOffset: 13,
                endOffset: 19
              },
              rule: 'Methods should not have too many parameters'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/UpdateStates.java',
              message:
                'Method has 8 parameters, which is greater than 7 authorized.',
              code: [
                '\t<span class="k">public</span> <span class="k">void</span> <span class="sym-49 sym">update</span>(<span class="k">double</span> <span class="sym-50 sym">aTimeElapsed</span>, <span class="sym-26 sym">Set</span>&lt;KeyCode&gt; <span class="sym-51 sym">aKeysPressed</span>, <span class="sym-26 sym">Set</span>&lt;KeyCode&gt; <span class="sym-52 sym">aKeysReleased</span>, <span class="sym-25 sym">Map</span>&lt;Sprite, ImageView&gt; <span class="sym-53 sym">aSpriteImages</span>, <span class="k">double</span> <span class="sym-54 sym">aScreenHeight</span>, <span class="k">double</span> <span class="sym-55 sym">aScreenWidth</span>, <span class="k">double</span> <span class="sym-56 sym">aScreenXPosition</span>, <span class="k">double</span> <span class="sym-57 sym">aScreenYPosition</span>){'
              ],
              textRange: {
                endLine: 85,
                startLine: 85,
                startOffset: 13,
                endOffset: 19
              },
              rule: 'Methods should not have too many parameters'
            }
          ]
        },
        'Behavior Driven Design': {
          'category description':
            'No static variables: there should be no reason for shared global public state',
          detail: []
        },
        'No duplicated code': {
          'category description':
            "Tell, don't ask: classes should be responsible for their own data and delegate to other objects instead of doing it themselves",
          detail: [
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/Breakable.java',
              message: '2 duplicated blocks of code must be removed.',
              textRange: {},
              rule: 'Source files should not have any duplicated blocks'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/LaunchProxyHorizontal.java',
              message: '1 duplicated blocks of code must be removed.',
              textRange: {},
              rule: 'Source files should not have any duplicated blocks'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/actions/LaunchProxyVertical.java',
              message: '1 duplicated blocks of code must be removed.',
              textRange: {},
              rule: 'Source files should not have any duplicated blocks'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_data/characteristics/Damager.java',
              message: '2 duplicated blocks of code must be removed.',
              textRange: {},
              rule: 'Source files should not have any duplicated blocks'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/TopOrBottom.java',
              message: '1 duplicated blocks of code must be removed.',
              textRange: {},
              rule: 'Source files should not have any duplicated blocks'
            },
            {
              path:
                'duke-compsci308:sonar_test:src/game_engine/LeftOrRight.java',
              message: '1 duplicated blocks of code must be removed.',
              textRange: {},
              rule: 'Source files should not have any duplicated blocks'
            }
          ]
        },
        'General type': {
          'category description':
            'No public instance variables: keep implementation details of your class hidden from the public interface',
          detail: []
        },
        Polymorphism: {
          'category description':
            'Active classes: classes should not consist of only get/set methods and, in general, should minimize their use. ',
          detail: [
            {
              path:
                'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/drag_resize/DragResizeMod.java',
              message: 'Reduce the number of switch cases from 9 to at most 8.',
              code: [
                '\t\t<span class="k">switch</span> (<span class="sym-105 sym">state</span>){'
              ],
              textRange: {
                endLine: 208,
                startLine: 208,
                startOffset: 2,
                endOffset: 8
              },
              rule:
                '"switch" statements should not have too many "case" clauses'
            }
          ]
        }
      },
      'Java Notes': [
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelSelectionWindow.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="k">void</span> <span class="sym-47 sym">invalidated</span>(Observable <span class="sym-48 sym">arg0</span>) {'
          ],
          textRange: {
            endLine: 137,
            startLine: 137,
            startOffset: 13,
            endOffset: 24
          },
          rule: 'Methods should not be empty'
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/states/ScreenRatio.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="k">void</span> <span class="sym-12 sym">updateState</span>(<span class="k">double</span> <span class="sym-13 sym">pointsUp</span>) {'
          ],
          textRange: {
            endLine: 33,
            startLine: 33,
            startOffset: 13,
            endOffset: 24
          },
          rule: 'Methods should not be empty'
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/sprite_display/SpriteDisplay.java',
          message:
            'Use isEmpty() to check whether the collection is empty or not.',
          code: [
            '\t\t\t<span class="k">if</span> (<span class="sym-13 sym">myAnimationSpriteImage</span>.size() &lt; <span class="c">1</span>) {'
          ],
          textRange: {
            endLine: 50,
            startLine: 50,
            startOffset: 7,
            endOffset: 40
          },
          rule: 'Collection.isEmpty() should be used to test for emptiness'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/Bottom.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-4 sym">Bottom</span>() {'
          ],
          textRange: {
            endLine: 8,
            startLine: 8,
            startOffset: 8,
            endOffset: 14
          },
          rule: 'Methods should not be empty'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/Left.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-4 sym">Left</span>() {'
          ],
          textRange: {
            endLine: 8,
            startLine: 8,
            startOffset: 8,
            endOffset: 12
          },
          rule: 'Methods should not be empty'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/LeftOrRight.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-4 sym">LeftOrRight</span>(){'
          ],
          textRange: {
            endLine: 8,
            startLine: 8,
            startOffset: 8,
            endOffset: 19
          },
          rule: 'Methods should not be empty'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/Right.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-4 sym">Right</span>() {'
          ],
          textRange: {
            endLine: 8,
            startLine: 8,
            startOffset: 8,
            endOffset: 13
          },
          rule: 'Methods should not be empty'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/Side.java',
          message: 'Convert the abstract class "Side" into an interface.',
          code: [
            '<span class="k">public</span> <span class="k">abstract</span> <span class="k">class</span> <span class="sym-3 sym">Side</span> {'
          ],
          textRange: {
            endLine: 6,
            startLine: 6,
            startOffset: 22,
            endOffset: 26
          },
          rule:
            'Abstract classes without fields should be converted to interfaces'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/Top.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-5 sym">Top</span>() {'
          ],
          textRange: {
            endLine: 9,
            startLine: 9,
            startOffset: 8,
            endOffset: 11
          },
          rule: 'Methods should not be empty'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/TopOrBottom.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-4 sym">TopOrBottom</span>(){'
          ],
          textRange: {
            endLine: 8,
            startLine: 8,
            startOffset: 8,
            endOffset: 19
          },
          rule: 'Methods should not be empty'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_data/Location.java',
          message:
            'This classoverrides "equals()" and should therefore also override "hashCode()".',
          code: [
            '\t<span class="k">public</span> <span class="k">boolean</span> <span class="sym-12 sym">equals</span>(Object <span class="sym-13 sym">object</span>){'
          ],
          textRange: {
            endLine: 30,
            startLine: 30,
            startOffset: 16,
            endOffset: 22
          },
          rule:
            '"equals(Object obj)" and "hashCode()" should be overridden in pairs'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_data/Location.java',
          message: 'Compare to "this.getClass()" instead.',
          code: [
            '\t\t<span class="k">if</span> (<span class="sym-13 sym">object</span> <span class="k">instanceof</span> <span class="sym-1 sym">Location</span>) {'
          ],
          textRange: {
            endLine: 31,
            startLine: 31,
            startOffset: 6,
            endOffset: 32
          },
          rule: '"equals" methods should be symmetric and work for subclasses'
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-28 sym">AuthoringSplashScreen</span>() {'
          ],
          textRange: {
            endLine: 39,
            startLine: 39,
            startOffset: 8,
            endOffset: 29
          },
          rule: 'Methods should not be empty'
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/context_menu/FunctionalMenuItemFactory.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-4 sym">FunctionalMenuItemFactory</span>() {'
          ],
          textRange: {
            endLine: 12,
            startLine: 12,
            startOffset: 8,
            endOffset: 33
          },
          rule: 'Methods should not be empty'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/actions/Shoot.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="k">void</span> <span class="sym-6 sym">act</span>() {'
          ],
          textRange: {
            endLine: 16,
            startLine: 16,
            startOffset: 13,
            endOffset: 16
          },
          rule: 'Methods should not be empty'
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/ProjectilePowerup.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-3 sym">ProjectilePowerup</span>(){'
          ],
          textRange: {
            endLine: 7,
            startLine: 7,
            startOffset: 8,
            endOffset: 25
          },
          rule: 'Methods should not be empty'
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/util/authoring_buttons/LabelFactory.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-4 sym">LabelFactory</span>() {'
          ],
          textRange: {
            endLine: 8,
            startLine: 8,
            startOffset: 8,
            endOffset: 20
          },
          rule: 'Methods should not be empty'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_data/Sprite.java',
          message: 'Return an empty collection instead of null.',
          code: [
            '\t\t\t<span class="k">return</span> <span class="k">null</span>;'
          ],
          textRange: {
            endLine: 104,
            startLine: 104,
            startOffset: 10,
            endOffset: 14
          },
          rule:
            'Empty arrays and collections should be returned instead of null'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_data/Sprite.java',
          message: 'Return an empty collection instead of null.',
          code: [
            '\t\t\t<span class="k">return</span> <span class="k">null</span>;'
          ],
          textRange: {
            endLine: 114,
            startLine: 114,
            startOffset: 10,
            endOffset: 14
          },
          rule:
            'Empty arrays and collections should be returned instead of null'
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/menu/MenuFactory.java',
          message:
            'Add a nestedcomment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-4 sym">MenuFactory</span>() {'
          ],
          textRange: {
            endLine: 9,
            startLine: 9,
            startOffset: 8,
            endOffset: 19
          },
          rule: 'Methods should not be empty'
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelWindowFactory.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-17 sym">LevelWindowFactory</span>() {'
          ],
          textRange: {
            endLine: 35,
            startLine: 35,
            startOffset: 8,
            endOffset: 26
          },
          rule: 'Methods should not be empty'
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/util/authoring_buttons/ButtonFactory.java',
          message:
            'Add a nested comment explaining why this method is empty, throw an UnsupportedOperationException or complete the implementation.',
          code: [
            '\t<span class="k">public</span> <span class="sym-5 sym">ButtonFactory</span>() {'
          ],
          textRange: {
            endLine: 13,
            startLine: 13,
            startOffset: 8,
            endOffset: 21
          },
          rule: 'Methodsshould not be empty'
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/CollisionHandler.java',
          message:
            'Remove this empty class, write its code or make it an "interface".',
          code: [
            '<span class="k">public</span> <span class="k">class</span> <span class="sym-1 sym">CollisionHandler</span> {'
          ],
          textRange: {
            endLine: 3,
            startLine: 3,
            startOffset: 13,
            endOffset: 29
          },
          rule: 'Classes should not be empty'
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_data/KeyCommand.java',
          message:
            'Remove this empty class, write its code or make it an "interface".',
          code: [
            '<span class="k">public</span> <span class="k">class</span> <span class="sym-1 sym">KeyCommand</span> {'
          ],
          textRange: {
            endLine: 3,
            startLine: 3,
            startOffset: 13,
            endOffset: 23
          },
          rule: 'Classes should not be empty'
        }
      ]
    }
  };

  @observable loading = false;
  @observable projectConfirmed = true;
  @observable activeCategory: string = 'Communication';

  @action
  confirmProject = () => {
    this.projectConfirmed = true;
    this.getRules();
  };

  @action
  clearProject = () => {
    this.app.setProjectName(undefined);
    this.projectConfirmed = false;
    this.loading = true;
    sessionStorage.setItem(`${sessionStoragePrefix}_overview`, '');
  };

  @action
  changeCategory = (category: string) => {
    this.activeCategory = category;
  };

  @action
  getRules = async (): Promise<*> => {
    if (!this.app.projectName || this.app.projectName === '') {
      throw new Error('Project name not defined');
    }
    try {
      const res = await getRequest(`/show`, { project: this.app.projectName });
      if (res['err']) {
        notification.open({
          message: 'Project Error',
          description: 'Project not found',
          style: {}
        });
        this.app.setProjectName(undefined);
        this.projectConfirmed = false;
        return;
      }
      this.data = res;
      this.activeCategory = Object.keys(res.error)[0];
      sessionStorage.setItem(
        `${sessionStoragePrefix}_overview`,
        JSON.stringify({
          data: res,
          activeCategory: this.activeCategory
        })
      );
      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  };

  constructor(app: AppStore) {
    this.app = app;
    const cached = sessionStorage.getItem(`${sessionStoragePrefix}_overview`);
    if (cached) {
      const { data, activeCategory } = JSON.parse(cached);
      this.data = data;
      this.activeCategory = activeCategory;
      this.loading = false;
      this.projectConfirmed = true;
    }
  }
}

export default RulesStore;
