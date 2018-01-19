import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

class RulesStore {
  @observable
  data = {
    percentage: { A: 85.0, C: 100.0, B: 100.0 },
    error: {
      A: [
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/application_controller/ApplicationController.java',
          message:
            'Assign this magic number 6 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 84,
            startLine: 84,
            startOffset: 105,
            endOffset: 106
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/GUIGenerator.java',
          message:
            'Assign this magic number .45 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 71,
            startLine: 71,
            startOffset: 27,
            endOffset: 30
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/GUIGenerator.java',
          message:
            'Assign this magic number .1 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 107,
            startLine: 107,
            startOffset: 84,
            endOffset: 86
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/GUIGenerator.java',
          message:
            'Assign this magic number .2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 113,
            startLine: 113,
            startOffset: 40,
            endOffset: 42
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/GUIGenerator.java',
          message:
            'Assign this magic number .6 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 114,
            startLine: 114,
            startOffset: 39,
            endOffset: 41
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
          message:
            'Assign this magic number 3 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 79,
            startLine: 79,
            startOffset: 73,
            endOffset: 74
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
          message:
            'Assign this magic number 200 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 90,
            startLine: 90,
            startOffset: 21,
            endOffset: 24
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
          message:
            'Assign this magic number 2000 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 91,
            startLine: 91,
            startOffset: 20,
            endOffset: 24
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
          message:
            'Assign this magic number 5000 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 92,
            startLine: 92,
            startOffset: 18,
            endOffset: 22
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
          message:
            'Assign this magic number 1000 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 93,
            startLine: 93,
            startOffset: 18,
            endOffset: 22
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
          message:
            'Assign this magic number 8 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 115,
            startLine: 115,
            startOffset: 12,
            endOffset: 13
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/HighScoreScene.java',
          message:
            'Assign this magic number 8 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 129,
            startLine: 129,
            startOffset: 15,
            endOffset: 16
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelWindow.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 254,
            startLine: 254,
            startOffset: 102,
            endOffset: 103
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/sprite_display/SpriteDisplay.java',
          message:
            'Assign this magic number 25 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 104,
            startLine: 104,
            startOffset: 20,
            endOffset: 22
          }
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/Left.java',
          message:
            'Assign this magic number 100 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 46,
            startLine: 46,
            startOffset: 25,
            endOffset: 28
          }
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/Right.java',
          message:
            'Assign this magic number 100 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 47,
            startLine: 47,
            startOffset: 26,
            endOffset: 29
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelVertical.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 38,
            startLine: 38,
            startOffset: 104,
            endOffset: 105
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelVertical.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 38,
            startLine: 38,
            startOffset: 147,
            endOffset: 149
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelVertical.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 42,
            startLine: 42,
            startOffset: 104,
            endOffset: 105
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelVertical.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 42,
            startLine: 42,
            startOffset: 172,
            endOffset: 174
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/back_end/keycode_handler/MovementHandlerFactory.java',
          message:
            'Assign this magic number .5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 15,
            startLine: 15,
            startOffset: 26,
            endOffset: 28
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/back_end/keycode_handler/MovementHandlerFactory.java',
          message:
            'Assign this magic number .5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 16,
            startLine: 16,
            startOffset: 29,
            endOffset: 31
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/application_controller/GamePlayController.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 214,
            startLine: 214,
            startOffset: 93,
            endOffset: 94
          }
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/Bottom.java',
          message:
            'Assign this magic number 60 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 48,
            startLine: 48,
            startOffset: 154,
            endOffset: 156
          }
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/Left.java',
          message:
            'Assign this magic number 60 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 49,
            startLine: 49,
            startOffset: 110,
            endOffset: 112
          }
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/Right.java',
          message:
            'Assign this magic number 60 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 49,
            startLine: 49,
            startOffset: 110,
            endOffset: 112
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/characteristics/Breakable.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 45,
            startLine: 45,
            startOffset: 17,
            endOffset: 19
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelHorizontal.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 38,
            startLine: 38,
            startOffset: 104,
            endOffset: 106
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelHorizontal.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 38,
            startLine: 38,
            startOffset: 171,
            endOffset: 172
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelHorizontal.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 42,
            startLine: 42,
            startOffset: 82,
            endOffset: 84
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/LaunchWithLevelHorizontal.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 42,
            startLine: 42,
            startOffset: 151,
            endOffset: 152
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelWindow.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 247,
            startLine: 247,
            startOffset: 40,
            endOffset: 41
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/application_controller/ApplicationController.java',
          message:
            'Define and throw a dedicated exception instead of using a generic one.',
          textRange: {
            endLine: 160,
            startLine: 160,
            startOffset: 32,
            endOffset: 41
          }
        },
        {
          path: 'duke-compsci308:sonar_test:src/author/model/AuthorModel.java',
          message: 'Either remove or fill this block of code.',
          textRange: {
            endLine: 83,
            startLine: 83,
            startOffset: 29,
            endOffset: 30
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ProjectileDefaultBuilder.java',
          message:
            'Assign this magic number 10 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 49,
            startLine: 49,
            startOffset: 22,
            endOffset: 24
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ProjectileDefaultBuilder.java',
          message:
            'Assign this magic number 10 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 50,
            startLine: 50,
            startOffset: 23,
            endOffset: 25
          }
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/Bottom.java',
          message:
            'Assign this magic number 100 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 46,
            startLine: 46,
            startOffset: 26,
            endOffset: 29
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/characteristics/ScoreBasedOnPosition.java',
          message:
            'Replace this if-then-else statement by a single return statement.',
          textRange: {
            endLine: 82,
            startLine: 82,
            startOffset: 2,
            endOffset: 4
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/EnginePlayerController.java',
          message: 'Either remove or fill this block of code.',
          textRange: {
            endLine: 54,
            startLine: 54,
            startOffset: 26,
            endOffset: 27
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/UserProfileScene.java',
          message:
            'Assign this magic number 50 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 61,
            startLine: 61,
            startOffset: 22,
            endOffset: 24
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelWindow.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 206,
            startLine: 206,
            startOffset: 49,
            endOffset: 50
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelWindow.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 208,
            startLine: 208,
            startOffset: 50,
            endOffset: 51
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/application_controller/GamePlayController.java',
          message:
            'Define and throw a dedicated exception instead of using a generic one.',
          textRange: {
            endLine: 231,
            startLine: 231,
            startOffset: 37,
            endOffset: 46
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/characteristics/Breakable.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 83,
            startLine: 83,
            startOffset: 24,
            endOffset: 26
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/back_end/keycode_handler/KeyCodeHandler.java',
          message:
            'Assign this magic number 180 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 81,
            startLine: 81,
            startOffset: 39,
            endOffset: 42
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/characteristics/Pacer.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 73,
            startLine: 73,
            startOffset: 54,
            endOffset: 55
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/characteristics/Pacer.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 73,
            startLine: 73,
            startOffset: 92,
            endOffset: 93
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/characteristics/Pacer.java',
          message:
            'Assign this magic number 60 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 73,
            startLine: 73,
            startOffset: 97,
            endOffset: 99
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/AbstractNavigationPlayerScene.java',
          message:
            'Assign this magic number .45 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 50,
            startLine: 50,
            startOffset: 39,
            endOffset: 42
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/context_menu/SpriteContextMenu.java',
          message:
            'Assign this magic number 15 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 51,
            startLine: 51,
            startOffset: 55,
            endOffset: 57
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/context_menu/SpriteContextMenu.java',
          message:
            'Assign this magic number 15 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 51,
            startLine: 51,
            startOffset: 96,
            endOffset: 98
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/drag_resize/DragResizeMod.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 289,
            startLine: 289,
            startOffset: 32,
            endOffset: 33
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/util/game_info/GameInfoEditWindow.java',
          message:
            'Assign this magic number 150 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 106,
            startLine: 106,
            startOffset: 35,
            endOffset: 38
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/util/game_info/GameInfoEditWindow.java',
          message:
            'Assign this magic number 50 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 120,
            startLine: 120,
            startOffset: 30,
            endOffset: 32
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/util/game_info/GameInfoEditWindow.java',
          message:
            'Assign this magic number 50 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 121,
            startLine: 121,
            startOffset: 31,
            endOffset: 33
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/ListOfCollidingSprites.java',
          message:
            'Assign this magic number .2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 108,
            startLine: 108,
            startOffset: 34,
            endOffset: 36
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/BounceTopOnly.java',
          message:
            'Assign this magic number .5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 62,
            startLine: 62,
            startOffset: 57,
            endOffset: 59
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/HitTop.java',
          message:
            'Assign this magic number .5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 63,
            startLine: 63,
            startOffset: 65,
            endOffset: 67
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_engine/actions/HitTop.java',
          message:
            'Assign this magic number .2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 27,
            startLine: 27,
            startOffset: 48,
            endOffset: 50
          }
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/actions/Stick.java',
          message:
            'Assign this magic number 60 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 27,
            startLine: 27,
            startOffset: 83,
            endOffset: 85
          }
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/actions/Stick.java',
          message:
            'Assign this magic number 60 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 31,
            startLine: 31,
            startOffset: 83,
            endOffset: 85
          }
        },
        {
          path: 'duke-compsci308:sonar_test:src/game_engine/actions/Stick.java',
          message:
            'Assign this magic number .5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 40,
            startLine: 40,
            startOffset: 56,
            endOffset: 58
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/sprite/editor/controllable/ControllableEditor.java',
          message:
            'Assign this magic number 10 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 121,
            startLine: 121,
            startOffset: 27,
            endOffset: 29
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/util/inputfields/EnabledField.java',
          message:
            'Assign this magic number 10 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 21,
            startLine: 21,
            startOffset: 20,
            endOffset: 22
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/EnemyDefaultBuilder.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 21,
            startLine: 21,
            startOffset: 32,
            endOffset: 47
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/EnemyDefaultBuilder.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 25,
            startLine: 25,
            startOffset: 23,
            endOffset: 29
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ItemDefaultBuilder.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 21,
            startLine: 21,
            startOffset: 32,
            endOffset: 47
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ItemDefaultBuilder.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 25,
            startLine: 25,
            startOffset: 23,
            endOffset: 29
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/PlayerDefaultBuilder.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 24,
            startLine: 24,
            startOffset: 32,
            endOffset: 47
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/PlayerDefaultBuilder.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 28,
            startLine: 28,
            startOffset: 23,
            endOffset: 29
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ProjectileDefaultBuilder.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 26,
            startLine: 26,
            startOffset: 32,
            endOffset: 47
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/ProjectileDefaultBuilder.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 32,
            startLine: 32,
            startOffset: 23,
            endOffset: 29
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/TerrainDefaultBuilder.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 22,
            startLine: 22,
            startOffset: 32,
            endOffset: 47
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/sprites/builders/defaults/TerrainDefaultBuilder.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 26,
            startLine: 26,
            startOffset: 23,
            endOffset: 29
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/button_generator/FacebookButton.java',
          message:
            'Assign this magic number 10 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 18,
            startLine: 18,
            startOffset: 22,
            endOffset: 24
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/button_generator/FacebookButton.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 22,
            startLine: 22,
            startOffset: 23,
            endOffset: 25
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/UserProfileScene.java',
          message:
            'Assign this magic number .1 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 49,
            startLine: 49,
            startOffset: 39,
            endOffset: 41
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message:
            'Assign this magic number 10 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 85,
            startLine: 85,
            startOffset: 18,
            endOffset: 20
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 86,
            startLine: 86,
            startOffset: 32,
            endOffset: 34
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message:
            'Assign this magic number 10 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 86,
            startLine: 86,
            startOffset: 36,
            endOffset: 38
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 86,
            startLine: 86,
            startOffset: 40,
            endOffset: 42
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/menu/HelpDialog.java',
          message:
            'Assign this magic number 800 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 39,
            startLine: 39,
            startOffset: 32,
            endOffset: 35
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/menu/HelpDialog.java',
          message:
            'Assign this magic number 600 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 39,
            startLine: 39,
            startOffset: 37,
            endOffset: 40
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/GamePlayScene.java',
          message:
            'Assign this magic number 0.5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 41,
            startLine: 41,
            startOffset: 24,
            endOffset: 27
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 32,
            startLine: 32,
            startOffset: 22,
            endOffset: 27
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 33,
            startLine: 33,
            startOffset: 22,
            endOffset: 32
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message:
            'Assign this magic number 500 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 56,
            startLine: 56,
            startOffset: 28,
            endOffset: 31
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message:
            'Assign this magic number 500 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 56,
            startLine: 56,
            startOffset: 33,
            endOffset: 36
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message:
            'Assign this magic number 10 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 76,
            startLine: 76,
            startOffset: 18,
            endOffset: 20
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 77,
            startLine: 77,
            startOffset: 32,
            endOffset: 34
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message:
            'Assign this magic number 100 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 77,
            startLine: 77,
            startOffset: 36,
            endOffset: 39
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/splash_screen/AuthoringSplashScreen.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 77,
            startLine: 77,
            startOffset: 41,
            endOffset: 43
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/LevelSelectionPopUp.java',
          message:
            'Assign this magic number 10 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 32,
            startLine: 32,
            startOffset: 33,
            endOffset: 35
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/LevelSelectionPopUp.java',
          message:
            'Assign this magic number 5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 34,
            startLine: 34,
            startOffset: 22,
            endOffset: 23
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/LevelSelectionPopUp.java',
          message:
            'Assign this magic number 5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 35,
            startLine: 35,
            startOffset: 25,
            endOffset: 26
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/combobox_generator/GameSelectionComboBox.java',
          message:
            'Assign this magic number 4 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 19,
            startLine: 19,
            startOffset: 27,
            endOffset: 28
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/ConcreteMovableSprite.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 66,
            startLine: 66,
            startOffset: 29,
            endOffset: 30
          }
        },
        {
          path: 'duke-compsci308:sonar_test:src/util/RelativePathFinder.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 11,
            startLine: 11,
            startOffset: 22,
            endOffset: 30
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/sprite/page/SpriteQuickView.java',
          message:
            'Assign this magic number 100 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 31,
            startLine: 31,
            startOffset: 27,
            endOffset: 30
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/sprite/page/SpriteQuickView.java',
          message:
            'Assign this magic number 100 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 32,
            startLine: 32,
            startOffset: 26,
            endOffset: 29
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/application_controller/GamePlayController.java',
          message:
            'Assign this magic number 30 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 189,
            startLine: 189,
            startOffset: 90,
            endOffset: 92
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/application_controller/ApplicationController.java',
          message:
            'Assign this magic number 30 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 78,
            startLine: 78,
            startOffset: 90,
            endOffset: 92
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/application_scene/MainMenuScene.java',
          message:
            'Assign this magic number 10 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 34,
            startLine: 34,
            startOffset: 137,
            endOffset: 139
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/sprite/page/SpriteScroller.java',
          message:
            'Assign this magic number 5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 93,
            startLine: 93,
            startOffset: 21,
            endOffset: 22
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/sprite/page/SpriteScroller.java',
          message:
            'Assign this magic number 5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 94,
            startLine: 94,
            startOffset: 21,
            endOffset: 22
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/util/edit_window/GameObjectEditBox.java',
          message:
            'Assign this magic number 5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 48,
            startLine: 48,
            startOffset: 26,
            endOffset: 27
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/util/edit_window/GameObjectEditBox.java',
          message:
            'Assign this magic number 3 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 49,
            startLine: 49,
            startOffset: 32,
            endOffset: 33
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/animated_display/AnimatedDisplay.java',
          message:
            'Assign this magic number 5000 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 12,
            startLine: 12,
            startOffset: 48,
            endOffset: 52
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/background_display/BackgroundDisplayFactory.java',
          message:
            'Assign this magic number 100 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 41,
            startLine: 41,
            startOffset: 24,
            endOffset: 27
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/background_display/BackgroundDisplayFactory.java',
          message:
            'Assign this magic number 100 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 41,
            startLine: 41,
            startOffset: 29,
            endOffset: 32
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/level_edit_window/LevelEditBox.java',
          message:
            'Assign this magic number 5 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 76,
            startLine: 76,
            startOffset: 26,
            endOffset: 27
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/level_edit_window/LevelEditBox.java',
          message:
            'Assign this magic number 3 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 77,
            startLine: 77,
            startOffset: 32,
            endOffset: 33
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/animation_loop/AnimationLoop.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 12,
            startLine: 12,
            startOffset: 25,
            endOffset: 37
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/characteristics/LosableByTime.java',
          message: 'Remove this unused "collidedSprite" local variable.',
          textRange: {
            endLine: 42,
            startLine: 42,
            startOffset: 13,
            endOffset: 27
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/game_data/characteristics/LosableOnCollision.java',
          message: 'Remove this unused "collidedSprite" local variable.',
          textRange: {
            endLine: 30,
            startLine: 30,
            startOffset: 13,
            endOffset: 27
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelProgressionWindow.java',
          message:
            'Assign this magic number 150 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 45,
            startLine: 45,
            startOffset: 33,
            endOffset: 36
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/view/pages/level_editor/windows/LevelProgressionWindow.java',
          message:
            'Assign this magic number 150 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 46,
            startLine: 46,
            startOffset: 33,
            endOffset: 36
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/author/model/game_observables/draggable_sprite/DraggableSprite.java',
          message:
            'Assign this magic number 2 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 71,
            startLine: 71,
            startOffset: 29,
            endOffset: 30
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/button_generator/ImageButton.java',
          message:
            'Assign this magic number 40 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 18,
            startLine: 18,
            startOffset: 25,
            endOffset: 27
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/gui_generator/button_generator/ImageButton.java',
          message:
            'Assign this magic number 40 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 19,
            startLine: 19,
            startOffset: 24,
            endOffset: 26
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/AbstractPopUp.java',
          message: 'Make this final field static too.',
          textRange: {
            endLine: 25,
            startLine: 25,
            startOffset: 19,
            endOffset: 23
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/AbstractPopUp.java',
          message:
            'Assign this magic number 40 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 34,
            startLine: 34,
            startOffset: 23,
            endOffset: 25
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/PlayerOptionsPopUp.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 29,
            startLine: 29,
            startOffset: 28,
            endOffset: 30
          }
        },
        {
          path:
            'duke-compsci308:sonar_test:src/gameplayer/front_end/popup/PlayerOptionsPopUp.java',
          message:
            'Assign this magic number 20 to a well-named constant, and use the constant instead.',
          textRange: {
            endLine: 47,
            startLine: 47,
            startOffset: 29,
            endOffset: 31
          }
        }
      ],
      C: [],
      B: []
    }
  };

  @action
  getRules = async (): Promise<*> => {
    try {
      const data = await getRequest('/sonartest', {});
      console.log(data);
      this.data = data;
    } catch (err) {
      console.log(err);
    }
  };
}

export default RulesStore;
